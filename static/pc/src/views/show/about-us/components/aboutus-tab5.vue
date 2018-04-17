<template>
  <div class="content-info" v-once>

<p>乐娱客服中心，为您提供 7/24 小时的在线咨询服务。</p>

<p>欢迎您通过以下的联系方式随时联系我们，我们会全力于第一时间提供您最优质的服务。</p>

<p>备用网址：</p>

<ol>
<li>http://www.leyu7.com  </li>
<li>http://www.leyu2.com  </li>
<li>http://www.leyu3.com  </li>
<li>http://www.leyu68.com  </li>
<li>http://www.leyu86.com  </li>
 </ol>

<p>在线客服：登入备用网址，点击在线客服。</p>

<p>电话客服：登入备用网址，点击电话回拨，输入电话号码，客服会于收到讯息的第一时间回拨。</p>

<p>乐娱客服邮箱：{{SETTING.email}}</p>

<p>乐娱投诉邮箱：{{SETTING.tousuemail}}</p>

  </div>
</template>
<script>
  import {SETTING} from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        SETTING
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed>
</style>
