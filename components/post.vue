<template>
    <div>
        <username/>
    </div>
</template>

<style lang="scss" scoped>
</style>


<script>
import username from '../username.vue';
export default {
  components : {
    username
  },
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
