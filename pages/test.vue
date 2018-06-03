<template>
<v-app>
    <div id = 'test-container'>
       

        <div id = 'back-button'>
        <nuxt-link to = 'app/home'>
            <v-btn flat color="red" dark> 
                    <v-icon left>arrow_back</v-icon>
            </v-btn>
        </nuxt-link>
        </div>

      

        <v-btn outline color="red" id="post-button">NAME ME</v-btn>

        <div id='avatar'>
            <v-avatar class='grey lighten-4'>
                <img :src = 'imgSrc' alt = ''/>
            </v-avatar>
        </div>
        

        <textarea  v-on:input="expandArea" placeholder = 'Type anything here'></textarea>

        <hr>
    </div>
</v-app>
</template>

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
    },
    methods: {
        expandArea: function(){
            var area = document.querySelector('textarea');
            area.style.height = 'auto';

            if(area.scrollHeight>100)
                area.style.height = (area.scrollHeight) + 'px';
            else
                area.style.height= 100 +'px';
        }
    }
}
</script>

<style lang="scss" scoped>
#test-container{
    max-width: 800px;
    align-self: center;
    display:grid;
    grid-template-rows : 50px 200px 20px;
    grid-template-columns : 100px 250px 250px 150px; 

    textarea{
        grid-column: 2/-1;
        grid-row: 2/2;
        justify-self: start;
        //display:block;
        box-sizing: padding-box;
        overflow: hidden;
        padding: 10px;

        font-size: 14px;            margin: 50px auto;
        border-radius: 6px;
        box-shadow: 2px 2px 8px rgba(black, .3);
        border: 0;

        outline: none;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        width : 100%;
        border-bottom: solid;
        border-style: solid;
        border-color:#D3D3D3;
        resize:none;
    }

    #back-button{
        grid-column: 1/2;
        grid-row: 1/1;
        
    }

    #post-button{
        grid-column: 4/-1;
        grid-row: 1/1;
    }

    #avatar{
        grid-column: 1/1;
        grid-row: 2/2;

        justify-self: center;
    }

    hr { 
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    grid-row: 3/3;
    grid-column:1/-1; 
    } 
}
</style>