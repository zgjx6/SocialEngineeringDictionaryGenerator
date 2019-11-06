<template>
    <div>
        <nav-menu></nav-menu>
        <p>社会工程学密码生成器，是一个利用个人信息生成密码的工具，灵感源于亦思社会工程学字典生成器，但是该软件多年未更新，且生成的密码过少，故根据其构思重新做了一个。<br>本工具根据个人信息生成大量相关密码，既可以用于猜解他人密码，也可以用于校验自己密码的安全强度。</p><br>
        <p>它根据输入的个人信息，将每条信息进行截取，然后与其他部分的信息进行排列组合（除了个人信息外还包含常用的字符组合如：abc，1qaz，qwer,1234等），生成多种人们可能使用的密码。<br>
            组合共分三阶：<br>
            一阶密码：仅根据一项个人信息生成的密码；<br>
            二阶密码：根据两项个人信息组合生成的密码；<br>
            三阶密码：由于部分人喜欢在两项个人信息中间加入一个特殊符号，以加强密码复杂度和强度，为了包含这种情况，故根据两项个人信息以及一个常用的连接符号（默认：.!_-#@:$&*~?%+=/|，<b>建议尽量减少连接符，否则会极大增加密码数量，甚至导致内存溢出从而生成失败</b>）生成三阶密码。</p><br>
        <p>除了社会工程学密码以外，还提供了一些常用的弱密码（top100，csdn-top1700，常用10000，以及英国国家网络安全中心公布的10万个最常被黑的密码，更多密码字典可自行搜索），两者结合可以大幅提高密码破解概率。</p>
        <p>为了安全起见，本程序不会记录任何日志，且代码开源于<a href="https://github.com/zgjx6/SocialEngineeringDictionaryGenerator">我的Github。</a></p>
        <p>最后再附一个发现的一个类型的网站 <a href="http://www.bugku.com/mima/">http://www.bugku.com/mima</a>, 以及<a href="https://github.com/r35tart/RW_Password)">密码字典</a>、<a href="https://pan.baidu.com/s/1PXkEo-Mk6AiFIBUUXhvhVg">字典超超超全</a>-提取码:tz2a、<a href="https://github.com/rootphantomer/Blasting_dictionary">爆破字典</a>。</p>
    </div>

</template>

<script>
    import NavMenu from './nav.vue'
    export default {
        name: "readme",
        components: {
            NavMenu
        },
    }
</script>

<style scoped>
    p{
        font-size: 1.6em;
        padding: 10px 0 0 20px;
    }
</style>