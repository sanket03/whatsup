<template>
    <div id = 'app-container' v-if = 'userDetails.length >= 0'>
        <Header v-bind:userDetails = 'userDetails'/>
    </div>
</template>

<script>
import Header from '../components/header.vue';
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
        fetch('http://localhost:3000/userProfile', {
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
    max-width: 600px;
    margin: auto;
}
</style>