<template>
    <div>
        <NavMenu></NavMenu>
        <Row>
            <Col span="3" offset="1">
            <PasswordArea :password="password100" desc="常用密码100"></PasswordArea>
            </Col>
            <Col span="3" offset="1">
            <PasswordArea :password="password1700" desc="常用密码1700"></PasswordArea>
            </Col>
            <Col span="3" offset="1">
            <PasswordArea :password="password10000" desc="常用密码10000"></PasswordArea>
            </Col>
            <Col span="3" offset="1">
            <PasswordArea :password="NCSC100k" desc="NCSC_Top100k"></PasswordArea>
            </Col>
        </Row>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import NavMenu from './nav.vue'
    import PasswordArea from './password.vue'

    export default {
        name: 'xml',
        components: {
            NavMenu,
            PasswordArea
        },
        data() {
            return {
                spinShow: false,
                password100: '',
                password1700: '',
                password10000: '',
                NCSC100k: ''
            }
        },
        mounted: function () {
            this.getCommon();
        },
        methods: {
            getCommon: function (data) {
                this.spinShow = true;
                this.$http.post('/api/get_common', data).then(response => {
                    this.password100 = response.data['content100'];
                    this.password1700 = response.data['content1700'];
                    this.password10000 = response.data['content10000'];
                    this.NCSC100k = response.data['NCSC100k'];
                    this.spinShow = false;
                }).catch(error => {
                    console.log(error);
                    this.spinShow = false
                });
            }
        }
    }
</script>