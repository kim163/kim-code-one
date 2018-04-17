<template>
  <div class="user-conter user-discount">
    <div class="style_f">
      <router-link v-for="item in menuList" :to="item.to" :key="item.name"
                   class="style_i">
        {{item.name}}
      </router-link>
    </div>
    <div class="discount-content form-rowbox">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  let menuList = [
    {name: "体验金", to: "/user/discount/experience"},
    {name: "存送优惠", to: "/user/discount/savesend"},
    {name: "洗码", to: "/user/discount/washcode"},
    {name: "优惠券", to: "/user/discount/coupon"},
    {name: "救援金", to: "/user/discount/help"},
    {name: "VIP礼金", to: "/user/discount/vip"},
    {name: "生日礼金", to: "/user/discount/birthday"},
    {name: "推荐好友", to: "/user/discount/recommend"}
  ]
  export default {
    data() {
      return {
        menuList
      };
    }
  };
</script>
<style lang="scss">
  .user-discount {
    .discount-content {
      padding: 50px 30px 30px;
    }
    .title-tip{
      color: #666;
      font-size: 18px;
      text-align: center;
      margin: 0 0 20px;
      font-weight: bold;
      line-height: 1.5;
    }
    .bottom-tip{
      color: #1e327e;
      text-align: center;
      width: 100%;
      line-height: 1.5;
    }
  }
</style>
