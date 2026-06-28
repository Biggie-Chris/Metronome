@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo ============================================
echo   Metronome - Build ^& Package
echo ============================================
echo.

:: Step 1: Generate icon
echo [1/5] Generating icon...
node scripts\make-icon.cjs
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Icon generation failed
    pause
    exit /b 1
)

:: Step 2: Build web app
echo [2/5] Building web app...
call npx vite build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

:: Step 3: Prepare clean app directory for packaging
echo [3/5] Preparing app directory...
set APPDIR=release_temp
if exist "%APPDIR%" rmdir /s /q "%APPDIR%"
mkdir "%APPDIR%"
mkdir "%APPDIR%\electron"
xcopy /q /e /y dist "%APPDIR%\dist\" >nul
copy /y electron\main.cjs "%APPDIR%\electron\" >nul
copy /y electron\preload.cjs "%APPDIR%\electron\" >nul
copy /y package.json "%APPDIR%\" >nul
echo App files copied

:: Step 4: Package exe
echo [4/5] Packaging Metronome.exe...
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
call npx electron-packager "%APPDIR%" Metronome --platform=win32 --arch=x64 --out=release --icon=public/icon.ico --overwrite
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Package failed
    pause
    exit /b 1
)

:: Cleanup temp dir
rmdir /s /q "%APPDIR%"

:: Step 5: Create desktop shortcut (via temp powershell script)
echo [5/5] Creating desktop shortcut...
set PSFILE=%TEMP%\metronome_shortcut.ps1
echo $shell = New-Object -ComObject WScript.Shell > "%PSFILE%"
echo $desktop = [Environment]::GetFolderPath('Desktop') >> "%PSFILE%"
echo $shortcut = $shell.CreateShortcut("$desktop\Metronome.lnk") >> "%PSFILE%"
echo $shortcut.TargetPath = "%~dp0release\Metronome-win32-x64\Metronome.exe" >> "%PSFILE%"
echo $shortcut.IconLocation = "%~dp0release\Metronome-win32-x64\Metronome.exe,0" >> "%PSFILE%"
echo $shortcut.WorkingDirectory = "%~dp0release\Metronome-win32-x64" >> "%PSFILE%"
echo $shortcut.Save() >> "%PSFILE%"
echo Write-Host 'Shortcut created on Desktop' >> "%PSFILE%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%PSFILE%"
del "%PSFILE%"

echo.
echo ============================================
echo   Done! App is in release\Metronome-win32-x64\
echo   Shortcut added to Desktop
echo ============================================
pause
