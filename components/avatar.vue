<template>
      <v-avatar :size = 'size' :class = 'classes'>
        <img :src = 'imgSrc' alt = ''/>
      </v-avatar>
</template>

<script>
import appConfig from '../assets/scripts/config';

  export default {
    props: ['size', 'classes', 'userId'],

    data() {
        return {
            imgSrc: '',
        }
    },

    watch: {
        userId() {
            this.imgSrc =  `${appConfig.graphUrl}/${this.userId}/picture?type=small`;
        }
    },

    mounted() {
        this.imgSrc  =  this.userId > 0 ? `${appConfig.graphUrl}/${this.userId}/picture?type=small` : ''; 
    }
  }
</script>

<style lang= 'scss' scoped>
</style>

