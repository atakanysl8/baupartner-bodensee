#!/usr/bin/env sh
# Lokaler Build für das in OneDrive liegende Repo.
# OneDrive sperrt beim Build Dateien in .next/out (EPERM, ENOTEMPTY, fehlende Chunks) und legt
# Konfliktkopien (*-LAPTOP-*) an. Deshalb: Projekt nach %LOCALAPPDATA%\bbp-build\repo spiegeln
# (ohne .next/out/.git), dort bauen, danach nur out/ zurückspiegeln.
# Abbruch, wenn out/ Konfliktkopien enthält — so ein out/ darf nie hochgeladen werden.
# Aufruf: sh scripts/build.sh [logdatei]
log="${1:-/dev/null}"
quelle="$(pwd -W 2>/dev/null || pwd)"
ziel="${LOCALAPPDATA:-$HOME/AppData/Local}/bbp-build/repo"

# robocopy: Exit-Code < 8 bedeutet Erfolg
robocopy "$quelle" "$ziel" //MIR //XD .next out .git .superpowers .playwright-mcp anfragen-lokal //NFL //NDL //NJH //NJS //NP > /dev/null
[ $? -ge 8 ] && { echo "Spiegeln nach $ziel fehlgeschlagen"; exit 1; }

( cd "$ziel" && rm -rf .next out && npm run build ) > "$log" 2>&1 || {
  echo "Build-Fehler:"; grep -iE "error" "$log" | head -5; exit 1
}

robocopy "$ziel/out" "$quelle/out" //MIR //NFL //NDL //NJH //NJS //NP > /dev/null
[ $? -ge 8 ] && { echo "Zurückspiegeln von out/ fehlgeschlagen"; exit 1; }

konflikte=$(find out -name '*-LAPTOP-*' | wc -l)
if [ "$konflikte" -gt 0 ]; then
  echo "OneDrive-Konfliktkopien in out/ ($konflikte) — out/ nicht hochladen, Build wiederholen"
  exit 1
fi
echo "Build ok (gebaut in $ziel)"
