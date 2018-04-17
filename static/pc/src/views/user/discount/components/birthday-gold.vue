<template>
  <div class="birthday-gold">
    <p class="title-tip">
      在生日当天，您可申请生日礼金，自助申请后，请联系在线客服为您处理<br/> 祝您生日快乐.多多盈利！
    </p>
    <br/>
    <p class="tbrithday" v-show="!isBirthday&&userData.birthday!=''">
      距您的生日 <span class="">{{userData.birthday | Date('MM月dd日')}}</span> 还有 <span>{{days()}}</span>&nbsp;天
    </p>
    <p class="tbrithday" v-show="isBirthday&&userData.birthday!=''">
      祝您生日快乐
    </p>
    <p class="txtct" v-show="userData.birthday!=''">
      <button :disabled="!isSubmit" class="formbtn"
               @click="submit">{{message}}
      </button>
    </p>
    <p class="txtct" v-show="userData.birthday==''">
      <router-link class="formbtn btn-reset" :to="{name:'user_datum'}">设置生日</router-link>
    </p>
  </div>
</template>

<script>
  import {canClaimBirthdayCoupon, claimBirthdayCoupon} from "api/preferential-terms"
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        message: "领取礼金",
        isSubmit: false
      };
    },
    props: {},
    methods: {
      days() {
        if (this.userData.birthday == "")
          return ""
        let today = new Date().getTime(),
          birthday =this.userData.birthday.toString().toDate().setFullYear(new Date().getFullYear());
        if (today > birthday) {
          birthday =this.userData.birthday.toString().toDate().setFullYear(new Date().getFullYear() + 1)
        }
        return parseInt((birthday - today) / (1000 * 60 * 60 * 24)) + 1;
      },
      submit() {
        if (!this.isSubmit) return;
        claimBirthdayCoupon().then(data => {
          toast(data.message)
        });
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      isBirthday() {
        let birthday = this.userData.birthday.toString().toDate()
        let today = new Date()
        return (today.getMonth() == birthday.getMonth() && today.getDate() == birthday.getDate())
      }
    },
    created() {
      canClaimBirthdayCoupon().then(data => {
        this.isSubmit = data.success;
        if (!data.success) {
          this.message = data.message;
        }
      })
    },
    components: {}
  };
</script>

<style>
  .birthday-gold .tbrithday {
    font-size: 24px;
    color: #1e327e;
    text-align: center;
    width: 100%;
  }
</style>
