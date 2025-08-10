// vitepress-plugin-rewrite.js
import fs from 'fs';
import path from 'path';

export default function rewritePlugin() {
  let outDir;
  let processed = false;
  
  return {
    name: 'vitepress-plugin-rewrite',

    configResolved(config) {
      // 获取 VitePress 的实际输出目录
      outDir = config.build.outDir;
      console.log('VitePress 输出目录:', outDir);
    },

    // 在构建完成后执行
    async buildEnd() {
      // 避免重复处理
      if (processed) return;
      processed = true;
      
      console.log('构建完成，开始处理 HTML 文件...');
      
      // 确保 outDir 已定义
      if (!outDir) {
        // 如果 configResolved 没有被调用，使用默认值
        outDir = path.resolve(process.cwd(), '.vitepress/dist');
      }
      
      // 等待一段时间确保文件写入完成
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('检查输出目录是否存在:', outDir);
      
      // 检查输出目录是否存在
      if (!fs.existsSync(outDir)) {
        console.log('输出目录不存在');
        return;
      }

      // 遍历输出目录中的所有文件
      function traverseDir(dir) {
        const files = fs.readdirSync(dir);
        console.log(`处理目录: ${dir}, 文件数: ${files.length}`);

        files.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            // 如果是目录，递归遍历
            traverseDir(filePath);
          } else if (stat.isFile() && file.endsWith('.html') && file !== 'index.html') {
            // 如果是 .html 文件且不是 index.html
            try {
              const content = fs.readFileSync(filePath, 'utf-8');
              const dirName = path.join(dir, path.parse(file).name);
              const indexFilePath = path.join(dirName, 'index.html');

              // 创建目录
              fs.mkdirSync(dirName, { recursive: true });

              // 写入 index.html
              fs.writeFileSync(indexFilePath, content, 'utf-8');
              
              // 使用正斜杠输出路径，便于在Windows上查看
              const displayPath = dirName.split(path.sep).join('/') + '/index.html';
              console.log(`创建目录和文件: ${displayPath}`);
            } catch (error) {
              console.error(`处理文件 ${filePath} 时出错:`, error.message);
            }
          }
        });
      }

      // 开始遍历输出目录
      console.log('开始处理文件...');
      try {
        traverseDir(outDir);
        console.log('文件处理完成');
        
        // 验证文件是否真的被创建
        console.log('验证创建的目录...');
        function verifyDir(dir) {
          const files = fs.readdirSync(dir);
          files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
              // 检查目录是否包含 index.html
              const indexPath = path.join(filePath, 'index.html');
              if (fs.existsSync(indexPath)) {
                const displayPath = filePath.split(path.sep).join('/');
                console.log(`验证目录存在: ${displayPath} (包含 index.html)`);
              }
              verifyDir(filePath);
            }
          });
        }
        verifyDir(outDir);
      } catch (error) {
        console.error('处理文件时出错:', error.message);
      }
    }
  };
}