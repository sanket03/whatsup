<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails'/>
        <nuxt-child/>
        <nuxt-link to = '/post'>
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
        utilityModule.fetchData(appConfig.url).then((res)=>{
            this.userDetails=res;
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
    }

    #add-post-btn {
        position : fixed;
        right: 0;
        bottom: 0; 
    }
}

@media screen and (max-width: 800px){
    #app-container {
        .route-pages {
            top: 120px;
            width: 100%;
        }
    }
}
</style>