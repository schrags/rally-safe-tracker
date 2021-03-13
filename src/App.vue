<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
  @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";

  .mapCarIcon {
    background-image: url('../public/cartopdown.png');
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
    color: white;
    padding-left: 14px;
    padding-top: 22px;
    font-weight:bold;
  }
</style>
