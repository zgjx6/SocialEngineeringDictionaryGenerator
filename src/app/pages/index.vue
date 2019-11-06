<template>
    <div>
        <nav-menu></nav-menu>
        <QueryForm v-on:get_data="get_data"></QueryForm>
        <Row>
            <Col span="3" offset="1"><PasswordArea :password="password1" desc="一阶密码"></PasswordArea></Col>
            <Col span="3" offset="1"><PasswordArea :password="password2" desc="二阶密码"></PasswordArea></Col>
            <Col span="3" offset="1"><PasswordArea :password="password3" desc="三阶密码"></PasswordArea></Col>
            <Col span="3" offset="1"><PasswordArea :password="password4" desc="全部密码"></PasswordArea></Col>
        </Row>
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
                password1:'',
                password2:'',
                password3:''
            }
        },
        computed: {
            password4: function () {
                return this.password1+(this.password2?'\n'+this.password2:'')+(this.password3?'\n'+this.password3:'')
            }
        },
        methods:{
            get_data:function (data){
                this.$Spin.show();
                this.$http.post('/api/get_password', data).then(response=> {
                    this.password1=response.data['pass_first'];
                    this.password2=response.data['pass_second'];
                    this.password3=response.data['pass_third'];
                    this.$Spin.hide();
                }).catch(error=> {
                    this.password1='';
                    this.password2='';
                    this.password3='';
                    console.log(error);
                    this.$Spin.hide();
                });
            }
        }
    }
</script>