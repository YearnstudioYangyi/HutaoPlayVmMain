@echo off
setlocal enabledelayedexpansion

echo 正在处理 VitePress 构建输出...

REM 设置输出目录
set "OUTPUT_DIR=.vitepress\dist"

REM 检查输出目录是否存在
if not exist "%OUTPUT_DIR%" (
    echo 错误：输出目录 %OUTPUT_DIR% 不存在
    pause
    exit /b 1
)

REM 调用 PowerShell 脚本来处理文件
powershell -ExecutionPolicy Bypass -File "%~dp0post-build.ps1"

if %ERRORLEVEL% EQU 0 (
    echo 处理完成！
) else (
    echo 处理过程中出现错误！
)

pause