<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails'/>
        <v-btn fab dark color="indigo" id = 'add-photo'>
        <v-icon dark>add</v-icon>
        </v-btn>
        <nuxt-child/>
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
        margin: 10px;
    }

    #add-photo {
        position : absolute;
        bottom : 30px;
        right : 30px;    
    }
}
</style>