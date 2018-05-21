<template>
    <div id = 'main-container'>
        <nuxt-link to = 'app/home'>
            <v-btn color="red" dark> 
                <v-icon left>arrow_back</v-icon>
            </v-btn>
        </nuxt-link>

        <v-avatar :size='30' class='grey lighten-4'>
                <img :src = 'imgSrc' alt = ''/>
        </v-avatar>

        <textarea placeholder = 'Type here' maxlength = 30% width = 100%>
        </textarea>
    </div>
</template>


<style lang="scss" scoped>
#main-container {
    max-width: 800px;
    margin: auto;
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display : grid;

    grid-template-columns : repeat(8,1fr);
    grid-template-rows : repeat(3,1fr);
}

v-btn{
    text-decoration : none;
}
</style>



<script>
import appConfig from '../assets/scripts/config';
import utilityModule from '../assets/scripts/utility'
export default {
    data() {
        return {
            imgSrc: ``,
            userDetails: {}
        }
    },
    mounted(){
        utilityModule.fetchData(appConfig.url).then((res)=>{
            this.userDetails=res;
            this.imgSrc = `${appConfig.graphUrl}/${this.userDetails.userId}/picture?type=small`;
            console.log(res);
        })
    }
}
</script>