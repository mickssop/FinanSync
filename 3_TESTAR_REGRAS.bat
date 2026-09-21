@echo off
cd /d "%~dp0"
node scripts/test_parsing.mjs
if errorlevel 1 goto erro
node scripts/test_rules.mjs
if errorlevel 1 goto erro
node scripts/test_flows.mjs
if errorlevel 1 goto erro
node scripts/test_regressions.mjs
if errorlevel 1 goto erro
node scripts/test_monthly.mjs
if errorlevel 1 goto erro
node scripts/test_audit_fixes.mjs
if errorlevel 1 goto erro
echo Todos os testes passaram.
pause
exit /b 0
:erro
echo Falha nos testes. Copie a mensagem acima.
pause
exit /b 1
