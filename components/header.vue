<template>
  <div id = 'header-container'>
    <nuxt-link 
      v-for = 'link in headerLinks' 
      :key = 'link'
      :id = 'link'
      :to = 'link.toLowerCase()'
      active-class = 'active-link'
    > 
      <v-btn flat block @click = 'setActiveLink'>
        <v-icon medium>{{link.toLowerCase()}}</v-icon>
      </v-btn>
    </nuxt-link>
    <div>
      <input
        name='search-field'
        placeholder='search'
        :class = '[activeLink == "Search" ? "show" : ""]'
      />
      <div id = 'user-avatar'>
        <v-avatar :size='30' class='grey lighten-4'>
          <img v-bind:src = 'imgSrc' alt = ''/>
        </v-avatar>
        <span v-if = 'activeLink !== "Search"'>{{activeLink}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from '../assets/scripts/config';
export default {
  props: ['userDetails'],
  
  // Watcher is required to update data whenever prop changes
  watch: {
    userDetails : function() {
      this.imgSrc = `${appConfig.graphUrl}/${this.userDetails.userId}/picture?type=small`
    }
  },

  data() {
    return {
     imgSrc: '',
     headerLinks: ['Home', 'Search', 'Notifications', 'Message'],
     activeLink: ''
    }
  },

  methods: {
      setActiveLink(event) {
        this.activeLink = event.currentTarget.parentNode.id;
      }
  }
}
</script>

<style lang= 'scss' scoped>
  #header-container {
    background-color: #FFF;
    position: fixed;
    width: 800px;
    padding: 10px 0 0 0;
    border-bottom: 1px solid #d3d3d3;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-template-rows: repeat(2,minmax(0px, auto));
    align-items: flex-end;
    grid-template-areas: 'home search notifications messages search-avatar search-avatar search-avatar search-avatar';
    justify-items: center;

    a {
      width: 100%;
      text-decoration: none;
    }

    #home {
      grid-area: home;
    }

    #search {
      grid-area: search;
    }

    #notifications {
      grid-area: notifications;
    }

    #message {
      grid-area: messages;
    }

    div {
      grid-area: search-avatar;
      display: flex;
      height: 100%;
      align-items: center;
      justify-self: flex-end;

      input {
        grid-area: search-input;
        border: 1px solid #d3d3d3;
        border-radius: 10px;
        height: 50%;
        padding: 12px 5px;
      }

      input:focus {
        outline: none;
        border-color: #FF0000;
      }

      #user-avatar {
        grid-area: avatar;
        align-self: center;
        margin-left: 20px;

        span {
          font-weight: 600;
          margin-left: 5px;
          display: none;
        }
      }
    }

    button {
      color: transparent;
      .icon {
        color: #778899;
      }
    }
    button:hover {
        .icon {
          color: #FF0000;
        }
      }
  }

  .active-link {
    border-bottom: 2px solid #FF0000;
    margin-bottom: -2px;
  }

  @media screen and (max-width: 800px){
    #header-container {
      width: 100%;
      grid-template-columns: repeat(4,1fr);
      grid-template-areas: 
        'search-avatar search-avatar search-avatar search-avatar'
        'home search notifications messages';

      > div {
        display: grid;
        justify-self: flex-start;
        justify-content: flex-start;
        grid-template-columns: repeat(4,minmax(auto,auto));
        grid-column-gap: 20px;
        grid-template-areas: 
          'avatar search-input search-input search-input';

        input {
          visibility: hidden;
        }

        .show {
          visibility: visible;
        }

        #user-avatar {
          margin-left: 10px;
          span {
            display: inline;
          }
        }
      }
    }
  }
</style>

