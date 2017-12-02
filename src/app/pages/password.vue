<template>
    <span v-if="password">
        <span>{{desc}}</span>
        <Button type="primary" @click="copy">复制</Button>
        <Input :value="password" type="textarea" :rows="rows" :placeholder="placeholder"></Input>
    </span>
</template>

<script>

    export default {
        name: "password",
        data() {
            return {
                placeholder: '密码'
            }
        },
        props: ['password','desc'],
        computed: {
            rows: function () {
                return this.password.split('\n').length*1.01
            }
        },
        methods: {
            copy: function (event) {
                var textParent=event.path[2].children[0]||event.path[2];
                var textNode=textParent.children[1].children[0];
                textNode.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                textNode.blur();
            }
        }
    }
</script>

<style scoped>
    Button{
        margin: 10px 0;
    }
</style>