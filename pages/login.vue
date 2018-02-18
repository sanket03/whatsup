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
#login-container {
    width: 100%;
    max-width: 800px;
    text-align: center;
    margin: 40px auto;

    .application.theme--light {
        background-color: #FFF;

        .application--wrap {
            > div {
                margin: 5px 0;
                font-size: 16pt
            }

            .btn {
                color: #FFF;
            }
        }
    }
}
</style>