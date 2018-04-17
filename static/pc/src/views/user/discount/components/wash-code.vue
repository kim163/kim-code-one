<template>
  <div class="wash-code">
      <p class="inputbox">
        <label class="label">选择游戏平台：</label>
        <select v-model="type">
          <option value="">选择游戏平台</option>
          <option v-for="(item,i) in platformData" :value="item.value">
            {{item.name}}</option>
        </select>
      </p>

      <div v-show="showLoad">
        <loadding>正在查询</loadding>
      </div>
      <div >
        <p class="inputbox">
          <label class="label">开始时间：</label>
          <input readonly disabled type="text" :value="data.startDate">
        </p>
        <p class="inputbox" >
          <label class="label">结束时间：</label>
          <input readonly disabled type="text" :value="data.endDate">
        </p>
        <p class="inputbox">
          <label class="label">总有效投注额：</label>
          <input readonly disabled type="text" :value="data.validAmount">
        </p>
        <p class="inputbox">
          <label class="label">洗码比率：</label>
          <input readonly disabled type="text" :value="data.rate">
        </p>
        <p class="inputbox">
          <label class="label">返水金额：</label>
          <input readonly disabled type="text" :value="data.ximaAmount">
        </p>
        <div>
          <button :disabled="!show"  type="button" @click="doXima" class="formbtn">确定洗码</button>
        </div>
      </div>

  </div>
</template>

<script>
  import {getXimaData,doXima} from "api/preferential-terms"
  import loadding from "components/loadding"
  import  {platformData} from "@/assets/data"
  export default {
    data() {
      return {
        type:"",
        platformData,
        show:false,
        showLoad:false,
        data:{
          startDate:"无投注记录",
          endDate:"无投注记录",
          validAmount:0,
          ximaAmount:0,
          rate:0,
        }
      };
    },
    watch:{
      type(val){
        val==''||this.search();
      }
    },
    methods:{
      search(){
        if(this.type=="") return toast("请选择洗码平台!");
        this.showLoad=true;
        getXimaData({gameId:this.type}).then(res=>{
          this.show=res.success;
          this.showLoad=false;
          if(res.success){
            Object.assign(this.data,res.data)
          }else{
            this.data.startDate="无投注记录";
            this.data.endDate="无投注记录";
            this.data.validAmount=0;
            this.data.ximaAmount=0;
            this.data.rate=0;
            toast(res.message);
          }
        }).catch(()=>{
          this.show=this.showLoad=false
          toast("请求错误请稍后重新尝试...");
        })
      },
      doXima(){
        doXima({gameId:this.type}).then(res=>{
          toast(res.message);
          if(res.success){
            this.show=false;
            this.type="";
          }
        }).catch(()=>{
          toast("洗码失败请重新尝试...");
        })
      }
    },
    computed:{},
    created(){
    },
    components:{
      loadding
    }
  };
</script>
<style lang="scss">
  .wash-code{

  }
</style>
