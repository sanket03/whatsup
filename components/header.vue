<template>
  <div id = 'header-container'>
    <nuxt-link 
      v-for = 'link in headerLinks' 
      :key = 'link'
      :id = 'link'
      :to = 'link'
      active-class = 'active-link'
    > 
      <v-btn flat block @click = 'setActiveLink'>
        <v-icon medium>{{link}}</v-icon>
      </v-btn>
    </nuxt-link>
    <div>
      <input
        name='search-field'
        placeholder='search'
        :class = '[activeLink == "Search" ? "show" : ""]'
      />
      <div id = 'user-avatar'>
          <Avatar 
              :classes = '"grey lighten-4"'
              :userId = 'userDetails.userId'
              :size = '30'
          />
        <span v-if = 'activeLink !== "Search"'>{{activeLink | toTitleCase}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../components/avatar';
  export default {
    components: {
      Avatar
    },

    props: ['userDetails'],

    data() {
      return {
        headerLinks: ['home', 'search', 'notifications', 'message'],
        activeLink: 'home'
      }
    },

    filters: {
      toTitleCase(string) {
        return string[0].toUpperCase() + string.substring(1);
      }
    },

    mounted() {
      const href = window.location.href;
      this.activeLink = href.substring(href.lastIndexOf('/')+1);
    },

    methods: {
      setActiveLink(event) {
        this.activeLink = event.currentTarget.parentNode.id;
      }
    }
  }
</script>

<style lang= 'scss' scoped>
@import '../assets/styles/global.scss';

  #header-container {
    @include dimension($width:800px);
    @include position($type: fixed);
    @include padding($top: 10px);
    background-color: $color-white;
    border-bottom: 1px solid #d3d3d3;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-template-rows: repeat(2,minmax(0px, auto));
    align-items: flex-end;
    grid-template-areas: 'home search notifications messages search-avatar search-avatar search-avatar search-avatar';
    justify-items: center;

    a {
      @include dimension($width:100%);
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
      @include dimension($height: 100%);
      @include flexbox($alignItems: center);
      justify-self: flex-end;
      grid-area: search-avatar;

      input {
        @include dimension($height: 50%);
        @include padding(12px, 5px, 12px, 5px);
        grid-area: search-input;
        border: 1px solid #d3d3d3;
        border-radius: 10px;
      }

      input:focus {
        outline: none;
        border-color: $color-red;
      }

      #user-avatar {
        @include margin($left: 20px);
        grid-area: avatar;
        align-self: center;

        span {
          @include margin($left: 5px);
          font-weight: 600;
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
          color: $color-red;
        }
      }
  }

  .active-link {
    @include margin($bottom: -2px);
    border-bottom: 2px solid $color-red;
  }

  @media screen and (max-width: 800px){
    #header-container {
      @include dimension($width: 100%);
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
          @include margin($left: 10px);
          span {
            display: inline;
          }
        }
      }
    }
  }
</style>

