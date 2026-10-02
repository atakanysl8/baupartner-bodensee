#!/usr/bin/env sh
# Lokaler Build für das in OneDrive liegende Repo.
# - Vorher .next und out löschen: OneDrive sperrt Dateien (EPERM) und legt Konfliktkopien
#   (*-LAPTOP-*) an; ein alter Cache verweist zudem auf gelöschte Ortsseiten.
# - Bei EPERM bis zu dreimal neu bauen.
# - Nachher abbrechen, wenn out/ Konfliktkopien enthält — so ein out/ darf nie hochgeladen werden.
# Aufruf: sh scripts/build.sh [logdatei]
log="${1:-/dev/null}"
for versuch in 1 2 3; do
  rm -rf .next out
  if npm run build > "$log" 2>&1; then
    konflikte=$(find out -name '*-LAPTOP-*' | wc -l)
    if [ "$konflikte" -gt 0 ]; then
      echo "OneDrive-Konfliktkopien in out/ ($konflikte), Versuch $versuch — neu"
      sleep 3
      continue
    fi
    echo "Build ok (Versuch $versuch)"
    exit 0
  fi
  if grep -q "EPERM" "$log"; then
    echo "OneDrive-Sperre (EPERM), Versuch $versuch — neu"
    sleep 3
  else
    echo "Build-Fehler:"; grep -iE "error" "$log" | head -5
    exit 1
  fi
done
echo "Build nach 3 Versuchen nicht sauber — außerhalb von OneDrive bauen oder Synchronisierung pausieren."
exit 1
