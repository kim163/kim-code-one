<template>
  <div class="pagination" v-if="data.totalPages>1">
    <a href="javascript:void(0);" @click="pageFun(1)">首页</a>&nbsp;
    <a href="javascript:void(0);"  @click="prev">上一页</a>
    <div>每页<span>{{data.size}}</span>条记录
    第<span>{{data.pageNumber}}/{{data.totalPages}}</span>页
    </div>
    <a href="javascript:void(0);"  @click="next">下一页</a>&nbsp
    <a href="javascript:void(0);"  @click="pageFun(data.totalPages)">尾页</a>&nbsp;
  </div>
</template>
<script>
  export default {
    data() {
      return {pageNumber: 1}
    },
    props: {
      data: {
        type: Object,
        default() {
          return {
            totalPages:0
          }
        }
      }
    },
    methods: {
      pageFun(index) {
        this.$emit("search", index, this.data.size);
      },
      prev() {
        if (this.data.pageNumber == 1) return;
        this.pageFun(this.data.pageNumber-1);
      },
      next() {
        if (this.data.pageNumber >= this.data.totalPages) return
        this.pageFun(this.data.pageNumber+1);
      }
    }
  }
</script>
<style scoped="">
  div.pagination {
    padding: 20px 0 10px 0;
    text-align: center;
  }
  div.pagination a, div.pagination span {
    display: inline-block;
    color: #313131;
  }
  div.pagination a, div.pagination div {
    display: inline-block;
    border: solid 1px transparent;
    margin: 0 10px;
    height: 16px;
    line-height: 16px;
    transition: all .3s;
    color: #bbb;
  }
  div.pagination a.active {
    background: #13a1ca;
    border: solid 1px #13a1ca;
  }

  div.pagination a:hover {
    color: #13a1ca;
  }
</style>
