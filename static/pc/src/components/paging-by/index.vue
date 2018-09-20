<template>
<div class="page-wrap" v-if="data.total>data.limit">
  <ul v-show="prePage" class="li-page" @click="goPrePage"> < </ul>
  <ul>
    <li v-for="i, index in showPageBtn" :key="index" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage,'no-border': !i}"
        @click="pageOffset(i)">
      <a v-if="i" class="notPointer">{{i}}</a>
      <a v-else>···</a>
    </li>
  </ul>
  <ul v-show="nextPage" class="li-page" @click="goNextPage"> > </ul>
</div>
</template>

<script>
 export default {
  data() {
    return {
      total: 0,
      limit: 10
    }
  },
   props: {
     data: {
       type: Object,
       default() {
         return {
           total: 0
         }
       }
     }
   },
  computed: {
    prePage () {
      return  this.currentPage !== 1
    },

    nextPage () {
      return this.currentPage < this.totalPage
    },

    totalPage () {
      return Math.ceil(this.data.total / this.data.limit)
    },

    currentPage () {
      return Math.ceil(this.data.offset / this.data.limit) + 1
    },

    showPageBtn () {
      const pageNum = this.totalPage
      const index = this.currentPage
      if (pageNum <= 5) return [...new Array(this.totalPage)].map((v, i) => i + 1)
      if (index <= 2) return [1, 2, 3, 0, pageNum]
      if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      if (index === 3) return [1, 2, 3, 4, 0, pageNum]
      if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    }
  },

  methods: {
    pageFun(index) {
      console.log('this.data.total',this.data.total);
        this.$emit("search", index);
    },
    pageOffset (i) {

      if (i === 0 || i === this.currentPage) return
      this.pageFun(i);
    },
    goPrePage () {
      this.pageFun(this.currentPage-1);
    },

    goNextPage () {
      this.pageFun(this.currentPage+1);
    }
  }
}
</script>
<style lang="scss">
.page-wrap {
  text-align: center;
  font-size: 18px;
  margin-top: 10px;

  ul {
    display: inline-block;
    list-style: none;
    overflow: hidden;

    li {
      width: 30px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      float: left;
      color: #1e5a6b;
      margin: 0 5px;
      user-select: none;
      border: 1px solid #D3D3D3;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .hover {
    &:hover {
      border-color: #3573FA;
      color: #3573FA;
    }
  }

  .li-page {
    cursor: pointer;
    border: 1px solid #D3D3D3;
    width: 30px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    color: #C2C2C2;
    margin: 0 5px;
    &:hover {
      color: #3573FA;
      border-color: #3573FA;
    }
  }

  .active {
    background: #3573FA;
    color:#fff;
    border-color: #3573FA;
  }
  .no-border{
    border:none;
  }
}
</style>
