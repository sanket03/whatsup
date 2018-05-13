<template>
  <div id = 'header-container'>
    <nuxt-link to = '/app/home' id = 'home'>
      <v-btn flat block>
        <v-icon medium>home</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to = '/app/search'  id = 'search'>
      <v-btn flat block>
        <v-icon medium>search</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to = '/app/notification'  id = 'notification'>
      <v-btn flat block>
        <v-icon medium>notifications</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to = '/app/chat' id = 'chat'>
      <v-btn flat block >
        <v-icon medium>mail</v-icon>
      </v-btn>
    </nuxt-link>
    <v-text-field
      name='search-field'
      placeholder='search'
      class='input-group--focused'
    ></v-text-field>
    <v-avatar :size='30' class='grey lighten-4' id = 'user-avatar'>
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
  /* #header-container {
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
  } */
  


  #header-container {
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-template-rows: repeat(2,minmax(0px, auto));
    align-items: center;
    grid-template-areas: 'home search notifications chat search-input search-input search-input avatar';
    justify-items: center;
      #home {
        grid-area: home;
      }

      #search {
        grid-area: search;
      }

      #notifications {
        grid-area: notifications;
      }

      #chat {
        grid-area: chat;
      }

      #user-avatar {
        grid-area: avatar;
      }

      .input-group--focused {
        max-width: 200px;
        grid-area: search-input
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

      @media screen and (max-width: 850px){
        grid-template-columns: repeat(4,1fr);
        grid-template-areas: 
          'avatar . search-input . '
          'home search notifications chat'
      }
    }

</style>

