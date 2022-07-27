<template>
  <div class="page-header">
    <div class="header-section">
      <div class="header-container">

      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @file header.vue
 */

</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 1001;

  .header-section {
    height: 9.6rem;
    border-bottom: 1px solid @border-color;
    position: relative;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 1px 10px rgb(151 164 175 / 10%);

    .header-container {
      padding-left: 15px;
      padding-right: 15px;
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>
