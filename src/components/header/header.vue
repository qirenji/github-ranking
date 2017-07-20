<template>
  <div class="header">
   
   <i @click="showbar" class="icon-menu"></i>
   <h1>GitHub Ranking</h1> 

  </div>
</template>

<script>

export default {
  name: 'header',
  data() {
    return {

    }
  },
  methods: {
    showbar() {
      this.$emit('showbar');
    }
  }
}
</script>

<style lang="scss">
  .header {
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    height: 80px;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 1.8rem;
      color: #fff;
    }
    .icon-menu {
      position: absolute;
      width: 30px;
      height: 30px;
      display: block;
      left: 15px;
      top: 22px;
      background: url('../../common/icons/menu.svg') no-repeat;
      background-size: contain;
      cursor: pointer;
    }
  }

</style>
