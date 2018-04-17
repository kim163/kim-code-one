<template>
  <div class="page_content_wrap withdraw_content_wrap">
    <div class="layout_form layout_form04">
      <div class="form_field_warp">
        <div class="form_field with_right_label">
          <span class="form_field_label">联系号码</span>
          <div class="form_field_input"><input v-model.number="phone" type="text" maxlength="16"></div>
        </div>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0);" class="btn btn01" @click="submit">电话回拨</a>
      </div>
    </div>
  </div>
</template>
<script>
  import  {makeCall} from "api/show"
  import check from '@/util/RegExp'
  export default {
    data() {
      return {
        phone:""
      };
    },
    props:{},
    methods:{
      sbumit(){

        if(check.phone.test(this.phone))return toast("手机格式不正确");
        makeCall().then(res=>{
          toast(res.message)
        }).catch(err=>{
          toast("系统繁忙,请稍后重试...")
        })
      }
    },
    components:{}
  };
</script>
<style>
</style>
