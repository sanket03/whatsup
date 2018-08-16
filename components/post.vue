<template>
    <div class = 'post'>
        <Avatar 
            :classes = '"grey lighten-4"'
            :userId = 'post.userId'
            :size = '30'
        />
        <div class = 'post-content-container'>
            <b><span class = 'username-container'>{{post.userName}}</span></b>
            <div class = 'content-container'>{{post.post}}</div>
            <img :src = 'post.image'/>
            <span class = 'location-container'>{{post.location.address}}</span>
        </div>
    </div>
</template>

<script>
  import Avatar from '../components/avatar';

  export default {
    components : {
      Avatar
    },
    props: ['post'],

    data() {
        return {

        }
    },
  }
</script>

<style lang= 'scss' scoped>
  @import '../assets/styles/global.scss';
  .post {
    @include flexbox;
    @include margin($top: 30px, $bottom: 30px);
    
    .post-content-container {
        @include margin($left: 15px);

        .content-container {
            @include margin($top: 10px, $bottom: 10px);
            word-break: break-all;
        }
        
        > img {
            max-width: 100%;
            max-height: 200px;
            border-radius: 5px;
            object-fit: cover;
        }
    }
  }

    @media screen and (min-width: 800px){
        .post {
            @include dimension($width: 80%);

            .post-content-container {
                img {
                    @include dimension($width: 350px);
                }  
            }
        }
    }

    @media screen and (max-width: 800px) {
        .post {
            .post-content-container {
                img {
                    @include dimension($width: 350px);
                }
            }
        }
    }

    @media screen and (max-width: 450px) {
        .post {
            .post-content-container {
                img {
                    @include dimension($width:100%);
                }   
            }
        }
    }
</style>

