<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// Honeypot: Menschen sehen das Feld nicht. Ist es gefüllt, war es ein Bot —
// wir antworten wie bei Erfolg, damit der Bot nichts lernt, senden aber nichts.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function feld($data, $key) {
    return isset($data[$key]) ? htmlspecialchars(trim((string)$data[$key]), ENT_QUOTES, 'UTF-8') : '';
}

$typ      = isset($data['typ']) ? htmlspecialchars(implode(', ', (array)$data['typ']), ENT_QUOTES, 'UTF-8') : '';
$objekt   = feld($data, 'objekt');
$zeit     = feld($data, 'zeit');
$plz      = feld($data, 'plz');
$ort      = feld($data, 'ort');
$rolle    = feld($data, 'rolle');
$budget   = feld($data, 'budget');
$beschr   = nl2br(feld($data, 'beschr'));
$name     = feld($data, 'name');
$telefon  = feld($data, 'telefon');
$email    = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$einwWeitergabe = !empty($data['einwWeitergabe']);
$einwTelefon    = !empty($data['einwTelefon']);

$fehler = [];
if ($typ === '')                          $fehler[] = 'typ';
if ($objekt === '')                       $fehler[] = 'objekt';
if ($zeit === '')                         $fehler[] = 'zeit';
if (!preg_match('/^\d{5}$/', $plz))       $fehler[] = 'plz';
if (mb_strlen($ort) < 2)                  $fehler[] = 'ort';
if ($rolle === '')                        $fehler[] = 'rolle';
if (mb_strlen($name) < 2)                 $fehler[] = 'name';
if ($telefon === '' && $email === '')     $fehler[] = 'kontakt';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $fehler[] = 'email';
if (!$einwWeitergabe)                     $fehler[] = 'einwWeitergabe';

if ($fehler) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid fields', 'fields' => $fehler]);
    exit;
}

date_default_timezone_set('Europe/Berlin');
$zeitpunkt = date('d.m.Y H:i:s');
$ip        = $_SERVER['REMOTE_ADDR'] ?? '';
// Nachweis der Einwilligung: Zeitpunkt und IP gehören zur Anfrage.
$einwWeitergabeText = $einwWeitergabe ? "Ja ($zeitpunkt)" : 'Nein';
$einwTelefonText    = $einwTelefon ? "Ja ($zeitpunkt)" : 'Nein';

function zeile($label, $wert, $letzte = false) {
    $rand = $letzte ? '' : 'border-bottom:1px solid #e5e5e5;';
    $wert = $wert === '' ? '–' : $wert;
    return "<tr><td style='padding:8px 0;{$rand}width:40%;color:#666;font-size:14px'>$label</td><td style='padding:8px 0;{$rand}font-size:14px'>$wert</td></tr>";
}

$emailLink = $email !== '' ? "<a href='mailto:$email' style='color:#14365C'>$email</a>" : '';
$telLink   = $telefon !== '' ? "<a href='tel:" . preg_replace('/[^\d+]/', '', $telefon) . "' style='color:#14365C'>$telefon</a>" : '';

$tabelle = zeile('Leistung', $typ)
    . zeile('Objektart', $objekt)
    . zeile('Zeitrahmen', $zeit)
    . zeile('PLZ / Ort', "$plz $ort")
    . zeile('Rolle', $rolle)
    . zeile('Budget', $budget)
    . zeile('Name', $name)
    . zeile('Telefon', $telLink)
    . zeile('E-Mail', $emailLink)
    . zeile('Einwilligung Weitergabe', $einwWeitergabeText)
    . zeile('Einwilligung Telefon', $einwTelefonText)
    . zeile('IP-Adresse', htmlspecialchars($ip, ENT_QUOTES, 'UTF-8'), true);

$beschrBlock = $beschr === '' ? '' : "
    <div style='margin-top:24px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5'>
      <div style='font-size:12px;color:#666;margin-bottom:8px'>Projektbeschreibung</div>
      <div style='font-size:14px;line-height:1.6'>$beschr</div>
    </div>";

$to      = 'info@bodensee-baupartner.de';
$subject = '=?UTF-8?B?' . base64_encode("Neue Projektanfrage: $typ – $plz $ort") . '?=';

$body = "
<!DOCTYPE html>
<html>
<body style='font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a'>
  <div style='background:#14365C;padding:24px 32px;border-radius:8px 8px 0 0'>
    <span style='color:#fff;font-size:18px;font-weight:700'>Bodensee BauPartner</span>
  </div>
  <div style='padding:32px;background:#f9f9f9;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px'>
    <h2 style='margin:0 0 24px;color:#14365C'>Neue Projektanfrage</h2>
    <table style='width:100%;border-collapse:collapse'>$tabelle</table>$beschrBlock
    <div style='margin-top:24px;font-size:12px;color:#999'>
      Eingegangen am $zeitpunkt über das Anfrageformular auf bodensee-baupartner.de.
    </div>
  </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Bodensee BauPartner <info@bodensee-baupartner.de>\r\n";
if ($email !== '') {
    $headers .= "Reply-To: $email\r\n";
}
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail konnte nicht gesendet werden.']);
}
