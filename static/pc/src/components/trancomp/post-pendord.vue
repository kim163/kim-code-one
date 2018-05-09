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
            买入价格：
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            买入数量：
            <input type="text" class="ps-input"> <span></span> CNY
          </div>
          <div  class="form-input-box">
            支付方式：
            <select class="ps-input">
              <option>请选择您要支付的方式</option>
              <option>微信</option>
              <option>支付宝</option>
              <option>银行卡</option>
            </select>
          </div>


        </div>
        <div v-if="postItem=='seller'">
          <div class="form-input-box">
            卖出价格：
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            卖出数量：
            <input type="text" class="ps-input"> <span></span> CNY
          </div>
          <div  class="form-input-box">
            支付方式：
            <select class="ps-input">
              <option>请选择您要支付的方式</option>
              <option>微信</option>
              <option>支付宝</option>
              <option>银行卡</option>
            </select>
          </div>


        </div>

        <div class="btn-groups">
          <span class="btn" @click="$emit('hide',false)">取消</span>
          <span class="btn btn-primary" @click="GetuserInfo">发布</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { show } from 'api'
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
        postItem:'buyer'
      }
    },
    computed: {
      ...mapGetters(["userData"]),
    },
    methods: {
      generateTitle,
      //GetuserInfo(userData.userId)
      GetuserInfo(){
        this.requestdata={
          userId: this.userData.userId
        }
        //alert()
        show.GetuserInfo(this.requestdata).then((res) => {
          //this.getimg()
          if (res.code == 10000) {

          }
        }).catch(err => {
          //this.getimg()
        })
      }

    },

    created() {
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

</style>
