<template>
  <div class="modal fade in">
    <div class="modal-dialog popup">
      <div type="button" class="close close-w" @click="$emit('hide',false)">
        <i class="iconfont icon-close"></i>
      </div>

      <div class="pop-con">
        <h2 class="alert-title">{{$t('postPend.postTitle')}}</h2>
          <div class="stab-box">
            <!--<span class="s active">买入挂单</span>-->
            <!--<span class="s">卖出挂单</span>-->
            <span v-for="item in postType" @click="postItem=item.value" class="s" :class="{active:postItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
            <!--{{item.name}}-->
          </span>

          </div>

        <div v-if="postItem=='buyer'">
          <div class="form-input-box">
            <span class="left">买入价格：</span>
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            <span class="left">买入数量：</span>
            <span class="ps-input fl"> <input type="text" class="ps-input-in" v-model="buyAmount"><span class="i-uet">UET</span> </span>
            <span class="fl"><span>&nbsp;{{buyAmountCny}}</span> CNY </span>
          </div>
          <div  class="form-input-box">
            <span class="left">支付方式：</span>
            <select class="ps-input" >
              <option>请选择您要支付的方式</option>
              <option v-for="item in bankList.data" :value="item.type">
                <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
                <span  v-if="item.type == '2'">微信 {{item.account}}</span>
                <span  v-if="item.type == '3'">{{item.bank}} {{subData(item.account)}}</span>
              </option>
            </select>
          </div>


        </div>
        <div v-if="postItem=='seller'">
          <div class="form-input-box">
            <span class="left">卖出价格：</span>
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            <span class="left">卖出数量：</span>
            <span class="ps-input fl"> <input type="text" class="ps-input-in" v-model="buyAmount"><span class="i-uet">UET</span> </span>
            <span class="fl"><span>&nbsp;{{buyAmountCny}}</span> CNY </span>
          </div>
          <div  class="form-input-box">
            <span class="left">支付方式：</span>
            <select class="ps-input" >
              <option>请选择您要支付的方式</option>
              <option v-for="item in bankList.data" :value="item.type">
                <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
                <span  v-if="item.type == '2'">微 信 {{item.account}}</span>
                <span  v-if="item.type == '3'">{{item.bank}}  {{subData(item.account)}}</span>
              </option>
            </select>
          </div>


        </div>

        <div class="btn-groups">
          <span class="btn" @click="$emit('hide',false)">取消</span>
          <span class="btn btn-primary" @click="publishBuy">发布</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { show } from 'api'
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        postType:[
          {name: "postPend.buyer", value: "buyer"},
          {name: "postPend.seller", value: "seller"}
        ],
        postItem:'buyer',
        bankList: {
          data: []
        },
        buyAmount:'',
//        buyAmountCny:''
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      buyAmountCny:function(){
        return Number(this.buyAmount) *0.01;
      }
    },
    methods: {
      generateTitle,
      getBankInfo(){
        this.requestdata={
          userId: this.userData.userId
        }
        //alert()
        show.getBankInfo(this.requestdata).then((res) => {
          //console.log('银行卡列表记录:');
//          console.log(res.data);
          this.bankList = res;

        }).catch(err => {

        })
      },
      publishBuy(){
        if(this.buyAmount =='' || !this.buyAmount){
          toast('数量不能为空')
        }
        if(this.buyAmount =='' || !this.buyAmount){
          toast('数量不能为空')
        }
        transaction.publishToBuy(this.requestdata).then((res) => {

          this.requestdata= {
            userId: this.userData.userId,
            accountCashVo: {
                account: '',
                bank:'',
                name:'',
                type:'',
                amount:''
            }
          }

        }).catch(err => {

        })
      },
      subData:function(item){
        return (item.substring(item.length-4))
      }


    },

    created() {
      this.getBankInfo()
    },
    mounted() {
    },
    activated() {
    },
    components: {
    }
  };
</script>
<style lang="scss">
  .form-input-box{
    height: 45px;
    line-height: 45px;
    margin:0 0 15px 0;
  }
  .popup .pop-con .ps-input{
    display:inline-block;
  }
  .popup .pop-con .ps-input-in{
    display:inline-block;
    height: 42px;
    line-height: 42px;
    margin-top:1px;
    border:0;
    float:left;
    width:80%;
    &:focus{
    outline: none;
     }
  }
  .form-input-box{
    position: relative;
  }
  .form-input-box .left{
    display:inline-block;
    float:left;
    height:45px;
    line-height: 45px;
  }
  .i-uet{
    position: absolute;
    left:350px;
    color:#777;
  }
</style>
