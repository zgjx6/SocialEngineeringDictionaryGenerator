<template>
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1">
            <router-link to="/index"><Avatar :src="psu"></Avatar></router-link>
        </MenuItem>
        <MenuItem name="1">
            <router-link to="/index"><Icon type="home"></Icon>首页</router-link>
        </MenuItem>
        <MenuItem name="2">
            <router-link to="/common"><Icon type="unlocked"></Icon>常用密码</router-link>
        </MenuItem>
        <MenuItem name="3">
            <a href="https://github.com/zgjx/SocialEngineeringDictionaryGenerator/blob/master/README.md" target="_blank">
                <Icon type="help-circled"></Icon>帮助
            </a>
        </MenuItem>
        <MenuItem name="4">
            <a href="https://github.com/zgjx/SocialEngineeringDictionaryGenerator/" target="_blank">
                <Icon type="information-circled"></Icon>社会工程学密码生成器
            </a>
        </MenuItem>
    </Menu>
</template>
<script>
    import psu from '../static/imgs/psu.jpg'
    export default {
        data () {
            return {
                theme: 'dark',
                psu:psu
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