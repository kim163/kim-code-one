# vues

# 1.先安装nodejs，（并设置好nodejs的环境变量，新的安装包默认好像不用设置）

# 2.安装依赖
1. 首先进入到pc或者mobile目录下面安装所需要的依赖
npm install

# 3.本地运行开发服务（用于本地开发，先进入pc或者mobile目录） at localhost:8080
npm run dev

# 方式1：打包生成发布到线上（用于部署，先进入pc或者mobile目录）
npm run build

# 方式2：打包生成发布到线上（一键部署mac版）
> 运行脚本
build.sh

# 注意事项
1. 记得在目录node_modules，dist在svn上设置忽略，不要提交到svn


