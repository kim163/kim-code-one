<template>
  <div>
    <m-headnav>{{$t('postPend.postTitle')}}</m-headnav>

    <div class="tab-box-out">
      <ul class="pop-tab tab-box">
        <li v-for="item in pendingType" @click="pendingItem=item.value" class="s" :class="{active:pendingItem==item.value}" :key="item.value">
          {{generateTitle(item.name)}}
        </li>
      </ul>
    </div>
    <div v-if="pendingItem=='buyer'">

      <div class="white-box">
        <div class="line-box"></div>
        <div class="balance-box">
          <p>{{$t('postPend.balance')}} 252586456.21  UET</p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01</p>
        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" placeholder="挂单买入数量"> UET</div>
            <div  class="input-div"><input class="my-input" placeholder="=总数量"> CNY</div>
            <div  class="input-div">
              <select class="my-input">
                <option>{{$t('postPend.selectPay')}}</option>
              </select>
            </div>
            <div >
              <p class="s-title">{{$t('postPend.buyerRequest')}}</p>
              <div  class="input-div"><input class="my-input" placeholder="$t('postPend.minSell')"> CNY</div>
            </div>
        </div>
        <div class="line-box"></div>
      </div>

      <div class="btn-box">
        <input type="button" class="btn btn-primary"  value="确定挂单" />
      </div>

    </div>
    <div v-if="pendingItem=='seller'">
      <div class="white-box">
        <div class="balance-box">
          <p>{{$t('postPend.balance')}} 252586456.21  UET</p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01 <a class="c-blue">{{$t('postPend.allsell')}}</a></p>
        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" placeholder="挂单卖出数量"> UET</div>
            <div  class="input-div"><input class="my-input" placeholder="=总数量"> CNY</div>
            <div  class="input-div">
              <select class="my-input">
                <option>请选择支付方式</option>
              </select>
            </div>
            <div >
              <p class="s-title">买家要求</p>
              <div  class="input-div"><input class="my-input" placeholder="卖家最低买入数量"> CNY</div>
            </div>
        </div>
        <div class="line-box"></div>
      </div>
      <div class="btn-box">
        <input type="button" class="btn btn-primary"  value="确定挂单" />
      </div>

    </div>


    <mobile-nav-bar></mobile-nav-bar>
  </div>
</template>

<script>
  import MobileNavBar from 'components/m-navbar'
  import mHeadnav from 'components/m-headnav'
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'

  export default {
    name: "transaction-record",

    components: {
      MobileNavBar,
      mHeadnav
    },

    data(){
      return{
        pendingType:[
          {name: "postPend.buyer", value: "buyer"},
          {name: "postPend.seller", value: "seller"}
        ],
        pendingItem: 'buyer',
      }
    },
    methods: {
      generateTitle,
    }

  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
.white-box{
  background: #fff;
}
  .tab-box-out{
    background:#F5F5F5 ;
    padding:r(20) r(30);
  }
  .tab-box{
    color:#6b6b6b;
    border-radius: 5px;
    border: 1px solid #F5F5F5;
    overflow:hidden;
  .s{
    display:inline-block;
    height:r(35);
    padding:0 r(10);
    width:50%;
    text-align: center;
    line-height: r(35);
    cursor: pointer;
    background: #fff;
    color:#333;
    &:last-child{
       border:0;
     }
    &.active{
       background: #86A5F8;
       color:#fff;
     }
    &:hover,&:link,&:active{
                      opacity: .8;
     }
    }
  }

  .balance-box{
    margin:r(5) r(30);
    line-height: r(30);
  }
  .input-box{
    margin:r(20) r(30);
  }
  .line-box{
    border-bottom:1px solid #ddd;
  }
  .input-div{
    background: #FFFFFF;
    border: 1px solid #D8D8D8;
    height:r(41);
    margin-bottom:r(20);
    padding:0 r(10)
  }
  .my-input{
    height:r(39);
    border:0;
    width:87%;
    &:hover,&:focus{
      outline: none;
     }
  }
  select.my-input{
    width:100%;
  }

  .s-title{
    font-size: r(15);
    color: #333333;
    padding:0 0 r(20) 0;
    margin:0;
  }
  .btn{
    display:block;
    width:90%;
    margin:0 auto;
    background: #4982FF;
    border-radius: 4px;
    height:r(44);
    line-height:r(44) ;
    font-size:r(18);
    color:#fff;
    margin-top:r(40)
  }
  .c-gray{
    color:#666;
  }
  .c-blue{
    color: #4982FF;
  }
</style>
