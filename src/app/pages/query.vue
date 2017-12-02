<template>
    <Form :model="formItem" :label-width="100">
        <FormItem label="姓名">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.firstName" placeholder="请输入姓(英文)" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.secondName" placeholder="请输入名的第一个字(英文)" type="text"></Input>
                </Col>
                <Col span="4" class="inline-item">
                <Input v-model="formItem.thirdName" placeholder="请输入名的第二个字(如果有，否则不用输入，英文)" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="3" class="inline-item">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="公历生日" v-model="formItem.birthday"></DatePicker>
                </Col>
                <Col span="3" class="inline-item">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="农历生日"
                            v-model="formItem.birthday2"></DatePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Email">
            <Row>
                <Col span="3">
                <Input v-model="formItem.email" placeholder="请输入邮箱" type="email"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="电话">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.telephone" placeholder="请输入座机" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.mobilephone" placeholder="请输入手机" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="用户名">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.userName" placeholder="请输入常用用户名(英文)" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.account" placeholder="请输入常用用户账号" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="QQ号">
            <Row>
                <Col span="3">
                <Input v-model="formItem.qq" placeholder="请输入QQ号" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="组织">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.organization" placeholder="请输入组织名(英文)" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="formItem.company" placeholder="请输入公司名(英文)" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="短语">
            <Row>
                <Col span="3">
                <Input v-model="formItem.likeuse" placeholder="请输入常用短语(英文)" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="身份证号">
            <Row>
                <Col span="3">
                <Input v-model="formItem.idcard" placeholder="请输入身份证号" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="工号">
            <Row>
                <Col span="3">
                <Input v-model="formItem.workNo" placeholder="请输入工号" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤纯数字">
            <Row>
                <Col span="1">
                <Switch v-model="formItem.numberFilter"></Switch>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤纯字母">
            <Row>
                <Col span="1">
                <Switch v-model="formItem.stringFilter"></Switch>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤长度小于">
            <Row>
                <Col span="1">
                <Switch v-model="formItem.shortFilter"></Switch>
                </Col>
                <Col span="1">
                <Input v-model="formItem.short" placeholder="请输入最小长度" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤长度大于">
            <Row>
                <Col span="1">
                <Switch v-model="formItem.longFilter"></Switch>
                </Col>
                <Col span="1">
                <Input v-model="formItem.long" placeholder="请输入最大长度" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="emitData">生成密码</Button>
            <Button type="ghost">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name: 'query',
        data() {
            return {
                formItem: {
                    firstName: '',
                    secondName: '',
                    thirdName: '',
                    birthday: '',
                    birthday2: '',
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
                    // birthday3:$('#birthday3').val(),
                    // birthday4:$('#birthday4').val(),
                    connector: '',
                    numberFilter: false,
                    stringFilter: false,
                    shortFilter: true,
                    longFilter: true,
                    short: '6',
                    long: '16'
                }
            }
        },
        methods: {
            emitData: function () {
                console.log(this.formItem);
                // this.formItem.birthday=this.format(this.formItem.birthday);
                // this.formItem.birthday2=this.format(this.formItem.birthday2);
                this.$emit('getData', this.formItem)
            },
            format:function (date) {
                return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
            }
        }
    }
</script>
<style scoped="">
    Form {
        margin: 20px;
    }

    .inline-item {
        margin-right: 10px;
    }
</style>