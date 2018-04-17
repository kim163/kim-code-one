@echo off
echo "========build pc start======="

call npm --prefix static/pc run build

echo "========build pc finished======="

call release.bat