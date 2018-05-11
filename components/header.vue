<template>
  <div id = 'header-container'>
    <nuxt-link to = 'home'>
      <v-btn flat icon>
        <v-icon medium>home</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to = 'search'>
      <v-btn flat icon>
        <v-icon medium>search</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to = 'notification'>
      <v-btn flat icon>
        <v-icon medium>notifications</v-icon>
      </v-btn>
    </nuxt-link>
    <v-text-field
      name='search-field'
      placeholder='search'
      class='input-group--focused'
    ></v-text-field>
    <v-avatar :size='30' class='grey lighten-4'>
      <img v-bind:src = 'imgSrc'/>
    </v-avatar>
    <span>{{this.userDetails.userName}}</span>
  </div>
</template>

<script>
const config  = require('../server/config')
export default {
  props: ['userDetails'],
  
  // Watcher is required to update data whenever prop changes
  watch: {
    userDetails : function() {
      this.imgSrc = `${config.graphUrl}/${this.userDetails.userId}/picture?type=small`
    }
  },
  data() {
    return {
     imgSrc: ''
    }
  }
}
</script>

<style lang= 'scss' scoped>
  #header-container {
    margin: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .avatar {
      align-self: center;
    }

    .input-group--focused {
      max-width: 300px;
    }

    span {
      font-weight: 600;
      margin-left: 5px;
    }

    button {
      color: transparent;
      .icon {
        color: grey;
      }
    }
    button:hover {
        .icon {
          color: red;
        }
      }
    .active-route {
      border-bottom: 2px solid red;
    }
  }
</style>

