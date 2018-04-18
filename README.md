# juan project vues

# 1.先安装nodejs，推荐安装 8 以上版本，node.js官网有下载。（并设置好nodejs的环境变量，新的安装包默认好像不用设置）

# 2.安装依赖
1. 首先进入到pc或者mobile目录下面安装所需要的依赖
npm install

# 3.本地运行开发服务（用于本地开发，先进入pc或者mobile目录） at localhost:9999
npm run dev

# 4.打包部署到测试环境或者线上
# 方式1：打包生成发布到测试环境或者线上（手动部署，先进入pc或者mobile目录）
npm run build

# 方式2：打包生成发布到测试环境或者线上（推荐）
> 运行脚本，然后在里面选择部署 test 或者 online <br><br>
> &nbsp;&nbsp;  Mac 版：<br>
> &nbsp;&nbsp;&nbsp;&nbsp;  build.sh <br><br>
> &nbsp;&nbsp;  Win 版：<br>
> &nbsp;&nbsp;&nbsp;&nbsp;  build.bat

# 注意事项
1. node_modules，dist 文件不需要提交到 Git 仓库，在本地就好。已经在 .gitignore 文件中设置了忽略，
还有各种编辑器产生的文件,比如 WebStorm 产生的 .idea 文件，想到的已添加到  .gitignore 忽略文件中,
如有发现遗漏，请自行添加到忽略文件中。

2. 编码规范遵循 Eslint 。
