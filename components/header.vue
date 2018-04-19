<template>
         <v-avatar
          :size="30"
          class="grey lighten-4"
        >
        <img v-bind:src = 'imgSrc' alt="avatar">
        <div>{{userDetails.displayName}}</div>
        </v-avatar>

</template>

<script>
export default {
  props: ['userDetails'],
  data() {
    return {
      imgSrc: `https://graph.facebook.com/${this.userDetails['userId']}/picture?type=small`
    }
  }
}
</script>
