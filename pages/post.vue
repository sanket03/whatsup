<template>
    <v-app>
        <div id = 'post-container'>
            <div>
                <nuxt-link to = 'app/home'>
                    <v-icon left>arrow_back</v-icon>
                </nuxt-link>
                <v-btn round color = 'red' dark>Say it</v-btn>
            </div>
            <div>
                <v-avatar class='grey lighten-4'>
                    <img :src = 'imgSrc' alt = ''/>
                </v-avatar>
                <textarea  v-on:input = 'expandArea' v-bind:style = 'styleObject'  placeholder = 'Whats up'/>
            </div>
        </div>
    </v-app>    
</template>

<script>
    import appConfig from '../assets/scripts/config';;
    import utilityModule from '../assets/scripts/utility';

    export default {
        data() {
            return {
                imgSrc: ``,
                styleObject: {
                    height: '100px'
                },
            }
        },
        mounted(){
            let userId = utilityModule.getFromLocalStorage('userId');
            this.imgSrc = `${appConfig.graphUrl}/${userId}/picture?type=small`;
        },
        methods: {
            expandArea: function() {
                var area = document.querySelector('textarea');
                if(area.scrollHeight>100)
                    this.styleObject.height = (area.scrollHeight) + 'px';
            }
        }
    }
</script>

<style lang="scss" scoped>
    #post-container {
        width: 400px;
        margin: 0 auto 0 auto;
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

        div:nth-of-type(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px;

            a {
                text-decoration: none;
            }

            button {
                margin: 0;
                text-transform: none;
            }
        }

        div:nth-of-type(2) {
            display: flex;
            margin: 10px;
            textarea {
                width: 100%;
                outline: none;
                margin-left: 5px;
            }
        }
    }

    @media screen and (max-width: 800px) {
        #post-container {
            width: 100%;
        }
    }
</style>
