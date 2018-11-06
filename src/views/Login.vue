<template>
    <div>
        <fmt-login></fmt-login>
    </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
import LoginComponent from '../components/auth/Login'
export default {
    components: {
        'fmt-login': LoginComponent
    }
}
</script>
