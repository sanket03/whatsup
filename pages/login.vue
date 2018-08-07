<template>
    <div id = 'login-container'>
        <v-app>
            <v-icon large color = 'red'>local_see</v-icon>
            <div>Whatsup</div>
            <div>A Universal PWA with Vue.js</div>
            <a href = '/auth/facebook'>
                <v-btn light color ='red'>
                    <img src = '~assets/images/facebook.png'/>
                </v-btn>
            </a>
        </v-app>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
#login-container {
    @include dimension($width: 100%);
    @include margin(40px, auto, 40px, auto);
    max-width: 800px;
    text-align: center;

    .application.theme--light {
        background-color: #FFF;

        .application--wrap {
            > div {
                @include margin(5px, 0px, 5px, 0px);
                font-size: 16pt
            }

            .btn {
                color: #FFF;
            }
        }
    }
}
</style>