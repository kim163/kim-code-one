# 功能：一键打包前端资源到dist目录下面
# 注意：记得在目录node_modules，dist在svn上设置忽略，不要提交到svn
#--------------------------------------------

# 打包pc页面到dist目录下面
echo ==========start pc build ==========
npm --prefix static/pc run build
echo ==========end pc build ==========
echo
echo

# 执行rsync同步脚本，根据自己的情况设置rsync
echo ==========start rsync ==========
sh release.sh



