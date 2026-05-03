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

$typ     = isset($data['typ'])     ? implode(', ', (array)$data['typ']) : '–';
$zeit    = isset($data['zeit'])    ? htmlspecialchars($data['zeit'])    : '–';
$beschr  = isset($data['beschr'])  ? htmlspecialchars($data['beschr'])  : '–';
$ort     = isset($data['ort'])     ? htmlspecialchars($data['ort'])     : '–';
$budget  = isset($data['budget'])  ? htmlspecialchars($data['budget'])  : '–';
$vorname = isset($data['vorname']) ? htmlspecialchars($data['vorname']) : '';
$nachname= isset($data['nachname'])? htmlspecialchars($data['nachname']): '';
$email   = isset($data['email'])   ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$telefon = isset($data['telefon']) ? htmlspecialchars($data['telefon']) : '–';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$to      = 'info@bodensee-baupartner.de';
$subject = '=?UTF-8?B?' . base64_encode("Neue Projektanfrage: $typ") . '?=';

$body = "
<!DOCTYPE html>
<html>
<body style='font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a'>
  <div style='background:#14365C;padding:24px 32px;border-radius:8px 8px 0 0'>
    <span style='color:#fff;font-size:18px;font-weight:700'>Bodensee BauPartner</span>
  </div>
  <div style='padding:32px;background:#f9f9f9;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px'>
    <h2 style='margin:0 0 24px;color:#14365C'>Neue Projektanfrage</h2>
    <table style='width:100%;border-collapse:collapse'>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;width:40%;color:#666;font-size:14px'>Projektart</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'>$typ</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px'>Zeitrahmen</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'>$zeit</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px'>Ort / PLZ</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'>$ort</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px'>Budget</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'>$budget</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px'>Name</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'>$vorname $nachname</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px'>E-Mail</td><td style='padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px'><a href='mailto:$email' style='color:#14365C'>$email</a></td></tr>
      <tr><td style='padding:8px 0;color:#666;font-size:14px'>Telefon</td><td style='padding:8px 0;font-size:14px'>$telefon</td></tr>
    </table>
    <div style='margin-top:24px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5'>
      <div style='font-size:12px;color:#666;margin-bottom:8px'>Projektbeschreibung</div>
      <div style='font-size:14px;line-height:1.6'>$beschr</div>
    </div>
    <div style='margin-top:24px;font-size:12px;color:#999'>
      Diese Anfrage wurde über das Kontaktformular auf bodensee-baupartner.de gesendet.
    </div>
  </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Bodensee BauPartner <info@bodensee-baupartner.de>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail konnte nicht gesendet werden.']);
}
