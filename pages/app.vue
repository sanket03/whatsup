<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails' :imgSrc = 'imgSrc'/>
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
            imgSrc: '',
            userDetails: {}
        }
    },
    mounted() {
        utilityModule.fetchData(`${appConfig.url}userProfile`).then((res)=>{
            this.userDetails = res;
            utilityModule.setLocalStorage('userId', this.userDetails.userId);
            this.imgSrc = `${appConfig.graphUrl}/${this.userDetails.userId}/picture?type=small`;
            console.log(res);
        })
    }
}
</script>

<style lang="scss" scoped>
#app-container {
    max-width: 800px;
    margin: auto;
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    .route-pages {
        width: 800px;
        padding: 10px 10px;
        position: absolute;
        top: 80px;
        z-index: -1;
        min-height: 100vh;
    }

    #add-post-link {
        position: fixed;
        width: 800px;
        bottom: 0;

        #add-post-btn {
            position : absolute;
            right: 0;
            bottom: 10px;
        }
    }
}

@media screen and (max-width: 800px){
    #app-container {
        .route-pages {
            top: 120px;
            width: 100%;
        }

        #add-post-link {
            width: 100%;
        }
    }
}
</style>