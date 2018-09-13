<template>
    <v-app>
        <div id = 'post-container' :class = '{fade: dialog}'>
            <div>
                <nuxt-link to = 'app/home'>
                    <v-icon left>arrow_back</v-icon>
                </nuxt-link>
            </div>
            <div>
                <Avatar 
                    :classes = '"grey lighten-4"'
                    :userId = 'userId'
                    :size = '30'
                />
                <textarea  
                    @input = 'expandArea' 
                    :style = 'styleObject' 
                    v-model = 'postData.post' 
                    placeholder = 'Whats up' 
                />
            </div>
            <div>
                <span v-if = 'postData.image.length > 0'>Image Uploaded</span>
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
        <CameraDialog :dialog = 'dialog' :uploadImage = 'uploadImage.bind(this)'/>
    </v-app>    
</template>

<script>
    import CameraDialog from '../components/cameraDialog';
    import Avatar from '../components/avatar';
    import appConfig from '../assets/scripts/config';
    import utilityModule from '../assets/scripts/utility';
    import store from '../assets/scripts/store';

    export default {

        components : {
            CameraDialog,
            Avatar
        },

        data() {
            return {
                imgSrc: ``,
                styleObject: {
                    height: '30px'
                },
                postData: {
                    userId: '',
                    userName: '',
                    post:'',
                    image:'',
                    location:''
                },
                dialog: false,
                userId: ''
            }
        },

        mounted() {
            this.userId = utilityModule.getFromLocalStorage('userId');
            utilityModule.getUserLocation();
        },

        methods: {
            expandArea() {
                let area = document.querySelector('textarea');
                if(area.scrollHeight>30)
                    this.styleObject.height = (area.scrollHeight) + 'px';
            },

            // Append posts
            postToHomePage() {
                this.postData.userId = this.userId;
                this.postData.userName = utilityModule.getFromLocalStorage('userName');
                this.postData.location = store.state.location;
                store.setPostAction(this.postData);
            },

            // Close camera dialog
            closeDialog() {
                this.dialog = false;
            },

            uploadImage(dataURL) {
                this.postData.image = dataURL;
                this.closeDialog();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/global.scss';
    #post-container {
        @include dimension($width: 400px);
        @include margin(0, auto, 0, auto);
        @include position($zindex: 1);
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

        div:nth-of-type(1) {
            @include flexbox('row', 'space-between', 'center');
            @include margin($all: 10px);

            a {
                text-decoration: none;
            }

            button {
                @include margin($all: 0px);
                text-transform: none;
            }
        }

        div:nth-of-type(2) {
            @include flexbox;
            @include margin($all: 10px);

            textarea {
                @include dimension($width: 100%);
                @include margin($left: 5px);
                outline: none;
                overflow: hidden;
            }
            border-bottom: 1px solid #d3d3d3;
        }

        div:nth-of-type(3) {
            @include flexbox($justifyContent: flex-end);
            a {
                text-decoration: none;
            }

            > span {
                align-self: center;
            }
        }
    }

    .fade {
            opacity: 0;
    }

    @media screen and (max-width: 800px) {
        #post-container {
            @include dimension(100%, auto);
        }
    }
</style>
