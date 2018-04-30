@echo off

:: rsync 指向
set rsync_target=leo@47.52.202.233::9an-homepage
set rsync_target_test=leo@47.52.202.233::9an-homepage

:: 当前路径
set cur_dir=%~dp0

:: 将当前路径转化为rsync格式的
set rsync_cur_dir=%cur_dir::\=/%
set rsync_cur_dir=/cygdrive/%rsync_cur_dir:\=/%

:: 本地打包部署路径
set source_dir=%rsync_cur_dir%/static/dist/


:: 开始选择
:start
echo select deploy server
echo 1 online
echo 2 test
echo 3 exit
set choice=
set /p choice=input num:
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto online
if '%choice%'=='2' goto test
if '%choice%'=='3' goto exit
echo "%choice%" is not valid, try again
echo.

goto start

:online
echo ====online====
rsync -auvz --progress --delete  --password-file=/cygdrive/c/rsyncd.secrets<c:/pwd.txt %source_dir%  %rsync_target%  --exclude=*svn*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl
goto end

:test
echo ====test====
rsync -auvz --progress --delete  --password-file=/cygdrive/c/rsyncd.secrets<c:/pwd.txt %source_dir%  %rsync_target_test%  --exclude=*svn*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl
goto end

:exit
echo ====exit====
goto end

:end
:: pause

