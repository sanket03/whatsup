<template>
    <v-app>
        <div id = 'post-container' :class = '{fade: dialog}'>
            <div>
                <nuxt-link to = 'app/home'>
                    <v-icon left>arrow_back</v-icon>
                </nuxt-link>
            </div>
            <div>
                <v-avatar class='grey lighten-4'>
                    <img :src = 'imgSrc' alt = ''/>
                </v-avatar>
                <textarea  
                    @input = 'expandArea' 
                    :style = 'styleObject' 
                    v-model = 'postData.post' 
                    placeholder = 'Whats up' 
                />
            </div>
            <div>
                <v-btn flat icon color="red" @click = 'dialog = true'>
                    <v-icon>camera_alt</v-icon>
                </v-btn>
                <nuxt-link to = 'app/home'>
                    <v-btn flat icon color="red" @click = 'postToHomePage'>
                        <v-icon>reply</v-icon>
                    </v-btn>
                </nuxt-link>
            </div>
        </div>
        <CameraDialog :dialog = 'dialog' :closeDialog = 'closeDialog'/>
    </v-app>    
</template>

<script>
    import appConfig from '../assets/scripts/config';
    import utilityModule from '../assets/scripts/utility';
    import globalStates from '../assets/scripts/globalStates';
    import CameraDialog from '../components/cameraDialog'

    export default {

        components : {
            CameraDialog
        },

        data() {
            return {
                imgSrc: ``,
                styleObject: {
                    height: '30px'
                },
                postData: {
                    post:'',
                    image:'',
                    location:''
                },
                dialog: false
            }
        },

        mounted(){
            let userId = utilityModule.getFromLocalStorage('userId');
            this.imgSrc = `${appConfig.graphUrl}/${userId}/picture?type=small`;
        },

        methods: {
            expandArea() {
                let area = document.querySelector('textarea');
                if(area.scrollHeight>30)
                    this.styleObject.height = (area.scrollHeight) + 'px';
            },

            postToHomePage() {
                globalStates.post.push(this.postData);
            },

            closeDialog() {
                this.dialog = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #post-container {
        width: 400px;
        margin: 0 auto 0 auto;
        z-index: 1;
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
                overflow: hidden;
            }
            border-bottom: 1px solid #d3d3d3;
        }

        div:nth-of-type(3) {
            display: flex;
            justify-content: flex-end;
            a {
                text-decoration: none;
            }
        }
    }

    .fade {
            opacity: 0.2;
    }

    @media screen and (max-width: 800px) {
        #post-container {
            width: 100%;
        }
    }
</style>
