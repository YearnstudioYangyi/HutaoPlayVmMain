# post-build.ps1

Write-Host "开始处理 HTML 文件..."

# 设置输出目录
$OutputDir = ".vitepress\dist"

# 检查输出目录是否存在
if (-not (Test-Path $OutputDir)) {
    Write-Host "错误：输出目录 $OutputDir 不存在"
    exit 1
}

# 处理 HTML 文件的函数
function Process-HtmlFiles {
    param (
        [string]$Directory
    )
    
    # 处理当前目录中的文件
    $files = Get-ChildItem -Path $Directory -File
    foreach ($file in $files) {
        if ($file.Name -like "*.html" -and $file.Name -ne "index.html") {
            $HtmlFile = $file.FullName
            $FileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
            $DirectoryPath = $file.Directory.FullName
            $NewDirectory = Join-Path -Path $DirectoryPath -ChildPath $FileNameWithoutExtension
            $NewIndexPath = Join-Path -Path $NewDirectory -ChildPath "index.html"
            
            # 创建新目录
            $null = New-Item -ItemType Directory -Path $NewDirectory -Force
            
            # 复制 HTML 文件为 index.html
            Copy-Item -Path $HtmlFile -Destination $NewIndexPath -Force
            
            Write-Host "已创建: $NewIndexPath"
        }
    }
    
    # 递归处理子目录
    $subdirs = Get-ChildItem -Path $Directory -Directory
    foreach ($subdir in $subdirs) {
        Process-HtmlFiles -Directory $subdir.FullName
    }
}

# 开始处理文件
Process-HtmlFiles -Directory $OutputDir

Write-Host "文件处理完成！"