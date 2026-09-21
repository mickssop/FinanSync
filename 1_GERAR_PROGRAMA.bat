@echo off
title FinanSync V51 - Gerar programa
cd /d "%~dp0"
echo ===============================================
echo FinanSync V51 - Gerar programa
echo ===============================================
echo.
call npm.cmd install --no-audit --no-fund
if errorlevel 1 goto erro
call npm.cmd run check
if errorlevel 1 goto erro
call npm.cmd run test:parsing
if errorlevel 1 goto erro
call npm.cmd test
if errorlevel 1 goto erro
call npm.cmd run dist-unpacked
if errorlevel 1 goto erro
echo.
echo PRONTO! Abra: release\win-unpacked\FinanSync V51.exe
pause
exit /b 0
:erro
echo.
echo ERRO: algo falhou. Copie a tela inteira e mande para o ChatGPT.
pause
exit /b 1
