<template>
    <div id = 'camera-dialog' :class = '{show: showCameraDialog, fade: !showCameraDialog}'>
        <canvas id = 'canvas'></canvas>
        <img id = 'image'  
             :src = 'imgSrc' 
             :class = '{media: true, hide: !imageCaptured}'
             alt = 'Capturing'
        />
        <video id = 'video'  :class = '{hide: imageCaptured , media: true}'></video>
        <v-btn v-if = '!imageCaptured' flat icon color = 'red' @click = 'captureImage'>
            <v-icon>face</v-icon>
        </v-btn>
        <div v-else>
            <v-btn flat icon color = 'red' @click = 'uploadImageFromChild'>
                <v-icon>done</v-icon>
            </v-btn>
            <v-btn flat icon color = 'red' @click = 'resetImage'>
                <v-icon>clear</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import icon from '../assets/images/icon.jpg';
  export default {

    props: ['dialog', 'uploadImage'],

    data() {
        return {
            showCameraDialog: false,
            imageCaptured: false,
            imgSrc: ''
        }
    },

    watch: {
        dialog() {
            this.showCameraDialog = this.dialog;
            this.showCameraDialog ? this.getUserImageFromCamera() : '';
        }
    },

    mounted() {
        this.$video = document.getElementById('video');
        this.$canvas = document.getElementById('canvas');
        this.$image = document.getElementById('image')
        this.hdConstraint = { video: {width: {min: 1280}, height: {min: 720}} };
        this.defaultConstraint = {video: true};
        this.imageCapture = '';
    },

    methods: {

        uploadImageFromChild() {
            this.uploadImage(this.imgSrc);
            this.imageCaptured = false;
            this.imgSrc = '';
        },

        resetImage() { 
            this.imgSrc = ""; 
            this.imageCaptured = false;
        },

        // show live stream from webcam
        getUserImageFromCamera() {
            if(this.showCameraDialog) {

                // Get access to the camera!
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const $video = this.$video;

                    // If Image Capture API is not supported
                    if(!window.ImageCapture) {
                        const hdConstraint = this.hdConstraint;
                        const fallbackConstraint = this.defaultConstraint;

                        navigator.mediaDevices.getUserMedia(hdConstraint).then((stream) => {
                            $video.srcObject = stream;
                            $video.play().catch(()=> {
                                console.log('plaback interrupted')
                            });
                        }).catch(()=>{
                            navigator.mediaDevices.getUserMedia(fallbackConstraint).then((stream) => {
                                $video.srcObject = stream;
                                $video.play().catch(()=> {
                                    console.log('plaback interrupted')
                                });
                            });
                        });
                    } 
                    
                    // Image capture API is supported
                    else {
                        navigator.mediaDevices.getUserMedia(this.defaultConstraint).then((stream) => {
                            const mediaStreamTrack = stream.getVideoTracks()[0];
                            this.imageCapture = new ImageCapture(mediaStreamTrack);
                            $video.srcObject = stream;
                            $video.play().catch(()=> {
                                console.log('plaback interrupted')
                            });
                        })
                    }
                }
            } else {
                window.scrollTo(document.body.scrollHeight,0);
            }
        },

        // Create an image from captured frame
        captureImage() {
            const $video = this.$video;
            const $image = this.$image;
            const $canvas = this.$canvas;

            // If Image Capture API is not supported
            if(!window.ImageCapture) {
                this.createImageFromCanvas($canvas.height, $canvas.width, $video, false);
            } 
            
            // Use hightest still image camera resolution
            else {
                this.imageCapture.takePhoto()
                    .then(blob => {
                        this.imgSrc = URL.createObjectURL(blob);
                        $image.onload = () => { URL.revokeObjectURL(this.src); }
                        this.imageCaptured = true;
                    })
                    .catch( (error) => {

                        // Use grab frame if takePhoto rejects (known chrome bug)
                        this.imageCapture.grabFrame()
                            .then(imageBitmap => {
                                this.createImageFromCanvas(imageBitmap.height, imageBitmap.width, imageBitmap,true);
                            })
                            .catch(error => console.error('grabFrame() error:', error));
                });
            }
        },

        // Create image from canvas
        createImageFromCanvas(height, width, imageBase, isSupportForImageCapture) {
            const $canvas = this.$canvas;
            const context = $canvas.getContext('2d');
            if(isSupportForImageCapture) {
                $canvas.width = width;
                $canvas.height = height;
                context.drawImage(imageBase, 0, 0);
            } else {
                context.drawImage(imageBase, 0, 0, width, height);
            }
            const imageData = $canvas.toDataURL('image/png');
            this.imgSrc = imageData;
            this.imageCaptured = true;
        }
    }
  }
</script>

<style lang= 'scss' scoped>
    @import '../assets/styles/global.scss';

    #camera-dialog {
        @include position($type: absolute);
        @include flexbox(column, center, center);
        @include dimension(100%, 100%);

        .media {
            @include dimension(300px, 300px);
        }

        #video {
            object-fit: fill;
        }

        #canvas {
            display: none;
        }
    }

    .show {
        opacity: 1;
        z-index: 2;
        transition: all 0.5s;
    }

    .fade {
        opacity: 0;
        transition: all 0.5s;
        visibility: hidden;
    }

    .hide {
        display: none;
    }

    @media screen and (max-width: 400px) {
        #camera-dialog {
            @include dimension(100%, 100%);
            @include flexbox(column, flex-start, center);

            .media {
                @include dimension(100%, 80%);              
            }
        }
    }

    @media screen and (max-height: 400px) {
        #camera-dialog {
            @include dimension(100%, 100%);
            @include flexbox(row, flex-start, center);

            .media {
                @include dimension(80%, 100%);              
            }
        }
    }
</style>
