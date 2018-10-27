<template>
    <span v-if="password">
        <span>{{desc}}&nbsp;-&nbsp;{{password.split('\n').length}}个</span>
        <Poptip content="已复制" v-model="visible">
            <Button type="primary" @click="copy">复制</Button>
        </Poptip>
        <Input :value="password" type="textarea" :rows="rows" :placeholder="placeholder" ref="textnode"></Input>
    </span>
</template>

<script>

    export default {
        name: "password",
        data() {
            return {
                placeholder: '密码',
                visible:false
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
                this.visible=true;
                let textNode = this.$refs.textnode.$el.children[0];
                textNode.select();
                document.execCommand("Copy"); // 执行浏览器复制命令
                textNode.blur();
                setTimeout(()=>{this.visible=false},1000);
            }
        }
    }
</script>

<style scoped>
    Button{
        margin: 10px 0;
    }
</style>