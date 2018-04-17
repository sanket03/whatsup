<template>
    <div id = 'app-container'>
        <Header/>
    </div>
</template>

<script>
import Header from '../components/header.vue';
export default {
    components: {
        Header
    },
    mounted() {
        fetch('http://localhost:3000/userProfile', {
            credentials: 'include'
        }). then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
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