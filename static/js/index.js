$('#index').addClass('layui-this');
var app = new Vue({
    el: '#app',
    data: {
        firstName: '',
        secondName: '',
        thirdName: '',
        email: '',
        telephone: '',
        mobilephone: '',
        userName: '',
        account: '',
        qq: '',
        organization: '',
        company: '',
        password: '',
        password2: '',
        likeuse: '',
        idcard: '',
        workNo: '',
        firstName2: '',
        secondName2: '',
        thirdName2: '',
        connector: ' !@#$%&*-_=+.:`~',
        result: '一阶密码',
        result2: '二阶密码',
        result3: '三阶密码(开发中)',
        seen: false,
        short: 6,
        long: 16
    },
    // mounted: function () {
    //     this.init()
    // },
    methods: {
        init: function () {
            this.firstName = '';
            this.secondName = '';
            this.thirdName = '';
            this.email = '';
            this.telephone = '';
            this.mobilephone = '';
            this.userName = '';
            this.account = '';
            this.qq = '';
            this.organization = '';
            this.company = '';
            this.password = '';
            this.password2 = '';
            this.likeuse = '';
            this.idcard = '';
            this.workNo = '';
            this.firstName2 = '';
            this.secondName2 = '';
            this.thirdName2 = '';
            this.connector = ' !@#$%&*-_=+.:`~';
            this.short = 6;
            this.long = 16;
        },
        get: function () {
            this.result = '加载中。。';
            this.result2 = '加载中。。';
            // this.result3='';
            this.$http.post(
                '/index/get',
                {
                    firstName: this.firstName,
                    secondName: this.secondName,
                    thirdName: this.thirdName,
                    birthday: $('#birthday').val(),
                    birthday2: $('#birthday2').val(),
                    email: this.email,
                    telephone: this.telephone,
                    mobilephone: this.mobilephone,
                    userName: this.userName,
                    account: this.account,
                    qq: this.qq,
                    organization: this.organization,
                    company: this.company,
                    password: this.password,
                    password2: this.password2,
                    likeuse: this.likeuse,
                    idcard: this.idcard,
                    workNo: this.workNo,
                    firstName2: this.firstName2,
                    secondName2: this.secondName2,
                    thirdName2: this.thirdName2,
                    // birthday3:$('#birthday3').val(),
                    // birthday4:$('#birthday4').val(),
                    connector: this.connector,
                    numberFilter: $('#numberFilter').is(':checked'),
                    stringFilter: $('#stringFilter').is(':checked'),
                    shortFilter: $('#shortFilter').is(':checked'),
                    longFilter: $('#longFilter').is(':checked'),
                    short: this.short,
                    long: this.long
                }).then(function (response) {

                this.result = response.body.pass_first_all;
                if (this.result === '') {
                    this.result = '空';
                }
                $('#result').css('height', this.result.split('\n').length * 20.3 + 'px');
                this.result2 = response.body.pass_second_all;
                if (this.result2 === '') {
                    this.result2 = '空';
                }
                $('#result2').css('height', this.result2.split('\n').length * 20.3 + 'px');
                // response => {
                // console.log(response.body);
            });
        },
        copy: function (the_id) {
            var Url2 = document.getElementById(the_id);
            Url2.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
        }
    }
});


layui.use(['form', 'element', 'laydate', 'code', 'laytpl'], function () {
    var laydate = layui.laydate;

    laydate.render({
        elem: '#birthday', //指定元素
        calendar: true,
        theme: 'molv'
    });
    laydate.render({
        elem: '#birthday2', //指定元素
        calendar: true,
        theme: 'molv'
    });
    laydate.render({
        elem: '#birthday3', //指定元素
        calendar: true,
        theme: 'molv'
    });
    laydate.render({
        elem: '#birthday4', //指定元素
        calendar: true,
        theme: 'molv'
    });
    var form = layui.form;
    form.verify({
        string: [
            /^[a-zA-Z]*$|^$/, '只能包含字母'
        ],
        number: [/^[0-9]*$|^$/, '只能包含数字'],
        mydate: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$|^$/, '日期格式不正确'],
        myemail: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$|^$/, '邮箱格式不正确'],
        myphone: [/^1\d{10}$|^$/, "请输入正确的手机号"],
        myidentity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$|^$)/, "请输入正确的身份证号"]
    });
    //监听
    form.on('submit(init)', function (data) {
        $('#numberFilter').attr("checked", false);
        $('#stringFilter').attr("checked", false);
        $('#shortFilter').attr("checked", true);
        $('#longFilter').attr("checked", true);
        form.render('checkbox');
        $('#short').val(6);
        $('#long').val(16);
        return false;
    });

    // layui.code();
});
