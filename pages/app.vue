<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails'/>
        <nuxt-child/>
        <nuxt-link to = '/post' id = 'add-post-link'>
            <v-btn fab color = 'red' id = 'add-post-btn'>
                <v-icon color = 'white'>add</v-icon>
            </v-btn>
        </nuxt-link>
    </div>
</template>

<script>
import Header from '../components/header.vue';
import appConfig from '../assets/scripts/config';
import utilityModule from '../assets/scripts/utility'

export default {
    components: {
        Header
    },
    data() {
        return {
            userDetails: {}
        }
    },
    mounted() {
        utilityModule.fetchData(`${appConfig.url}userProfile`).then((res)=>{
            this.userDetails = res;
            utilityModule.setLocalStorage('userId', this.userDetails.userId);
            utilityModule.setLocalStorage('userName', this.userDetails.displayName);
        })
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/global.scss';

    #app-container {
        @include margin($all: auto);
        max-width: 800px;
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

        .route-pages {
            @include dimension($width: 800px);
            @include padding($all: 10px);
            @include position($type: absolute, $top: 80px, $zindex: -1);
        }

        #add-post-link {
            @include dimension($width: 800px);
            @include position($type: fixed, $bottom: 0);

            #add-post-btn {
                @include position($type: absolute, $right: 0, $bottom: 10px);
            }
        }
    }

    @media screen and (max-width: 800px){
        #app-container {
            .route-pages {
                @include dimension($width: 100%);
                @include position($type: absolute, $top: 120px, $zindex: -1);
            }

            #add-post-link {
                @include dimension($width: 100%);
            }
        }
    }
</style>