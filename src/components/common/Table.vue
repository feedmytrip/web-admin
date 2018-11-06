<template>
    <div>
        <ul id="example-1">
        <li v-for="(item, index) in data" :key='index'>
            <ul>
                <li v-for="(value, key, index) in item" :key="index">
                    <div v-if="typeof value === 'object'">
                    --> {{ key }}:
                    <ul>
                        <li v-for="(value, key, index) in value" :key="index">
                            ----> {{ key }}: {{ value }}
                        </li>
                    </ul>
                    </div>
                    <div v-else>
                    --> {{ key }}: {{ value }}
                    </div>
                </li>
            </ul>
            <br/>
        </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'fmt-table',
    props: {
        data: Array
    }
}
</script>
