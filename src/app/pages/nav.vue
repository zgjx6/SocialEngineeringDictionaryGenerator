<template>
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1">
            <router-link to="/index"><Avatar :src="pass"></Avatar></router-link>
        </MenuItem>
        <MenuItem name="1">
            <router-link to="/index"><Icon type="home"></Icon>首页</router-link>
        </MenuItem>
        <MenuItem name="2">
            <router-link to="/common"><Icon type="unlocked"></Icon>常用密码</router-link>
        </MenuItem>
        <MenuItem name="3">
            <router-link to="/readme"><Icon type="ios-paperplane"></Icon>说明</router-link>
        </MenuItem>
    </Menu>
</template>
<script>
    import pass from '../static/imgs/pass.png'
    export default {
        data () {
            return {
                theme: 'dark',
                pass:pass
            }
        }
    }
</script>
<style scoped="">
    a{
        color: hsla(0,0%,100%,.7);
    }
    a:hover {
        color: #57a3f3;
    }
</style>