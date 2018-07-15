<template>
  <div class = 'route-pages'>  
    <Post 
      v-for = '(post, index) in posts' 
      :key = 'index'
      :post = 'post'
    />
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import Post from '../../components/post';
  import globalStates from '../../assets/scripts/globalStates';

  export default {
    components : {
      Post
    },

    data() {
      return {
        posts: globalStates.postList
      }
    }
  }
</script>
