#!/usr/bin/env sh
# Lokaler Build mit Wiederholung: Das Repo liegt in OneDrive, das beim Synchronisieren gelegentlich
# Dateien in .next sperrt (EPERM). Dann .next löschen und bis zu dreimal neu bauen.
# Aufruf: sh scripts/build.sh [logdatei]
log="${1:-/dev/null}"
for versuch in 1 2 3; do
  if npm run build > "$log" 2>&1; then
    echo "Build ok (Versuch $versuch)"
    exit 0
  fi
  if grep -q "EPERM" "$log"; then
    echo "OneDrive-Sperre (EPERM), Versuch $versuch — neu"
    rm -rf .next
    sleep 3
  else
    echo "Build-Fehler:"; grep -iE "error" "$log" | head -5
    exit 1
  fi
done
exit 1
