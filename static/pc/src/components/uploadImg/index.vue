<template>
    <div>
      <input type="file" accept="image/*" value="打开照相机" class="openCamera" @change="upload">
      <viewer :images="list.img">
        <img :src="list.msg" alt="" class="contents_image">
      </viewer>
    </div>
</template>

<script>
    export default {
        name: "index",
      methods:{
        upload(e) {
          let reader = new FileReader();
          var file = e.target.files[0];

          console.log(this.demoTest,'速度')
          //区分2个地方 一个是给后台发 一个是给融云发
          if (file.type.indexOf('image') == 0) {
            reader.readAsDataURL(file)
            reader.onload = () => {
              var img = new Image()
              var canvas = document.createElement('canvas');
              var canvasNext = document.createElement('canvas');
              var context = canvas.getContext('2d');
              var ctx = canvas.getContext('2d');
              img.src = reader.result
              this.base64 = reader.result;
              /*如果图片的base64大于100kb 那么久压缩*/

              img.onload = () => {
                var originWidth = img.width;
                var originHeight = img.height;
                // 最大尺寸限制
                if (this.base64.length > 100000) {
                  canvasNext.width = 60;
                  canvasNext.height = 60;
                  ctx.clearRect(0, 0, 60, 60)
                  ctx.drawImage(img, 0, 0, 60, 60)
                  this.dataURLNext = canvasNext.toDataURL('image/png');
                  console.log(this.dataURLNext, '四度空间撒旦')
                  this.base64 = this.dataURLNext.replace(/^data:.*?;base64,/, '')
                } else {
                  this.base64 = this.base64.replace(/^data:.*?;base64,/, '')
                }
                var maxWidth = 400,
                  maxHeight = 400;
                // 目标尺寸
                var targetWidth = originWidth,
                  targetHeight = originHeight;
                if (originWidth > maxWidth || originHeight > maxHeight) {
                  if (originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                  } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                  }
                }
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                // canvas转为blob并上传
                this.dataURL = canvas.toDataURL('image/png');
                console.log(this.demoTest,'撒旦')

                this.demoTest.src = this.dataURL;
                // this.chatArr.push({msg: message.content.imageUri, user: 4, img: [message.content.imageUri]})
                /*this.demoArr.push({img:[this.dataURL]});*/
                var blob = this.dataURItoBlob(this.dataURL);
                const RamdomValue = Math.random();
                var fd = new FormData();
                this.uploadState = '';
                fd.append("file", blob, `${RamdomValue}.png`);
                fd.append('nodeId', process.env.NODE_ID)
                chatWith.uploadFile(fd).then(res => {
                  if (res.code == 10000) {
                    this.picUrl = res.data.url;
                    this.uploadState = true;
                    this.demoArr.push({img:[this.picUrl]});
                  } else {
                    this.uploadState = false
                  }
                }).catch(res => {

                })

              }
              //  fr.readAsDataURL(input.files[0]);
            }
          }
        },
      }
    }
</script>

<style scoped>

</style>
