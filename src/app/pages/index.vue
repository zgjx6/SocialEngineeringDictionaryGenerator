<template>
    <div>
        <nav-menu></nav-menu>
        <QueryForm v-on:getData="getData"></QueryForm>
        <Row>
            <Col span="3" offset="1"><PasswordArea :password="password1" desc="一阶密码"></PasswordArea></Col>
            <Col span="3" offset="1"><PasswordArea :password="password2" desc="二阶密码"></PasswordArea></Col>
            <Col span="3" offset="1"><PasswordArea :password="password3" desc="三阶密码"></PasswordArea></Col>
        </Row>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import NavMenu from './nav.vue'
    import QueryForm from './query.vue'
    import PasswordArea from './password.vue'
    import '../static/css/index.css'
    export default {
        name: 'index',
        components: {
            NavMenu,QueryForm,PasswordArea
        },
        data(){
            return{
                spinShow:false,
                password1:'',
                password2:'',
                password3:''
            }
        },
        methods:{
            getData:function (data){
                this.spinShow=true;
                this.$http.post('/api/getPassword', data).then(response=> {
                    this.password1=response.data.pass_first_all;
                    this.password2=response.data.pass_second_all;
                    this.password3=response.data.pass_third_all;
                    this.spinShow=false;
                }).catch(error=> {
                    this.password1='';
                    this.password2='';
                    this.password3='';
                    console.log(error);
                    this.spinShow=false
                });
            }
        }
    }
</script>