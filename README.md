# juan project vues

# 1.先安装nodejs，推荐安装 8 以上版本，node.js官网有下载。（并设置好nodejs的环境变量，新的安装包默认好像不用设置）

# 2.安装依赖
1. 首先进入到pc或者mobile目录下面安装所需要的依赖
npm install

# 3.本地运行开发服务（用于本地开发，先进入pc或者mobile目录） at localhost:9999
npm run dev

# 4.开发技巧
1. Vue-cli 项目调试神器 chrome 浏览器插件  vue-devtools
2. 查看某个对象值，可以 console 打印输出。例如：console.log('login request data: ' ,JSON.stringify( this.data));

# 5.打包部署到测试环境或者线上
# 方式1：打包生成发布到测试环境或者线上（手动部署，先进入pc或者mobile目录）
npm run build

# 方式2：打包生成发布到测试环境或者线上（推荐）
> 运行脚本，然后在里面选择部署 test 或者 online <br><br>
> &nbsp;&nbsp;  Mac 版：<br>
> &nbsp;&nbsp;&nbsp;&nbsp;  build.sh <br><br>
> &nbsp;&nbsp;  Win 版：<br>
> &nbsp;&nbsp;&nbsp;&nbsp;  build.bat
> <br><br>
> 注意事项：推送代码到服务器需要先把跟目录下面的 pwd.txt 文件复制到 C 盘根目录下；并且安装好 cwRsyncServer 简称小青蛙工具，配置好环境变量，使 rsync 在命令行中可以运行。做好这两步才能正常推送打包后的代码到服务器哦。

# 6. 推荐的开发工具：开发神器 WebStorm

# 注意事项
1. node_modules，dist 文件不需要提交到 Git 仓库，在本地就好。已经在 .gitignore 文件中设置了忽略，
还有各种编辑器产生的文件,比如 WebStorm 产生的 .idea 文件，想到的已添加到  .gitignore 忽略文件中,
如有发现遗漏，请自行添加到忽略文件中。

2. 编码规范遵循 Eslint 。

3. Git 上面版本命名比如 V8.0.0 ,遵循“大版本.次要版本.小版本”的格式规定。
> 小版本：解决了 Bug 或者一些较小的更改，增加最后一位数字，比如 8.0.1
> 次要版本：增加了新特性，同时不会影响之前的版本，增加中间一位数字，比如 8.1.0
> 大版本：大改版，无法兼容之前的，增加第一位数字，比如 9.0.0

# Creators 
> Anne  &nbsp;&nbsp;
> Clover  &nbsp;&nbsp;
> Polo   &nbsp;&nbsp;
> Lukas