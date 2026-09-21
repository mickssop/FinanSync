@echo off
cd /d "%~dp0"
if not exist "release\win-unpacked\FinanSync V51.exe" (
 echo Programa nao encontrado. Execute 1_GERAR_PROGRAMA.bat primeiro.
 pause
 exit /b 1
)
start "" "release\win-unpacked\FinanSync V51.exe"
