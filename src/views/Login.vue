<template>
    <div>
        <amplify-authenticator></amplify-authenticator>
    </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue';
export default {
    created(){
        this.findUser();
        AmplifyEventBus.$on('authState', info => {
            if(info === 'signedIn') {
                this.findUser();
            } else {
                this.$store.state.signedIn = false;
                this.$store.state.user = null;
            }
        });
    },
    methods: {
        async findUser() {
            try{
                const user = await Auth.currentAuthenticatedUser();
                this.$store.state.signedIn = true;
                this.$store.state.user = user;
                this.$router.push('/')
            }catch (err) {
                this.$store.state.signedIn = false
                this.$store.state.user = null;
            }
        }
    }
}
</script>
