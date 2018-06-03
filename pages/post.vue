<template>
    <v-app>
        <div id = 'main-container'>

            <div>
                <nuxt-link to = 'app/home'>
                    <v-btn id="back-button" color="red" dark> 
                        <v-icon left>arrow_back</v-icon>
                    </v-btn>
                </nuxt-link>
            </div>

            <div class="text-xs-center">
                <v-btn outline color="red" id="post-button">NAME ME</v-btn>
            </div>

            <div>
                <v-avatar class='grey lighten-4'>
                        <img :src = 'imgSrc' alt = ''/>
                </v-avatar>
            </div>

            <div>
                <textarea  v-on:input="expandArea"  placeholder = 'Type anything here'></textarea>
            </div>

        </div>
    </v-app>    
</template>


<style lang="scss" scoped>
#main-container {
    max-width: 800px;
    margin: auto;
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display : grid;

    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 50px 200px;
    
    
    v-avatar{
        grid-area: avatar;
        grid-row: 2/3;
        grid-column: 1/1;
    }

    v-btn{
        text-decoration : none;
    }

    textarea{
        display:block;
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

        height: 100px;

        grid-area: textarea;
        grid-row : 2/2;
        grid-column :2/-1;
    }

    #back-button{
        grid-area : back-button;
        grid-row : 1/1;
        grid-column :1/1;
    }

    #post-button{
        //height: 1000px;
        grid-row : 1/1;
        grid-column :4/-1;
        grid-area: post-button;
    }
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