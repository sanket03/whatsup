<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails'/>
        <nuxt-child/>
    </div>
</template>

<script>
import Header from '../components/header.vue';
import appConfig from '../assets/scripts/config';
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
        fetch(`${appConfig.url}userProfile`, {
            credentials: 'include'
        }). then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
            this.userDetails = data
        }).catch((error) => {
            console.log(error)
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
}
</style>