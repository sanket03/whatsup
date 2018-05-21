<template>
    <div>
        <div class = 'before-loading' v-bind:class = "{ loaded:isLoaded }" ></div>
    </div>
</template>

<style lang="scss" scoped>
.before-loading{
  background-color: #D3D3D3;
  width : 200px;
  height : 20px;
}

.loaded{
  background-color: red;
  height : 40px;
}
</style>

<script>
export default {
  data() {
    return{
      isLoaded : ''
    }
  },
  mounted(){
    setTimeout(() => {
      this.isLoaded = true;
    },2000);
  }
}
</script>