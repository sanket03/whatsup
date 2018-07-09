<template>
  <div class = 'route-pages'>
    <span v-if = 'post.length>0'>
          {{post[0].post}}
    </span>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import username from '../../components/username.vue';
import globalStates from '../../assets/scripts/globalStates';

export default {
  components : {
    username
  },

  data() {
    return {
      post: globalStates.post.reverse()
    }
  }
}
</script>
