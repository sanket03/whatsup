<template>
    <div id = 'app-container'>
        <Header :userDetails = 'userDetails'/>
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
    max-width: 800px;
    margin: auto;
}
</style>