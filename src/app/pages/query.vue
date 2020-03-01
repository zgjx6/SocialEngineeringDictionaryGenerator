<template>
    <Form :model="form_item" :label-width="100">
        <FormItem label="姓名">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.first_name" :placeholder="title.first_name" :title="title.first_name" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.second_name" :placeholder="title.second_name" :title="title.second_name" type="text"></Input>
                </Col>
                <Col span="4" class="inline-item">
                <Input v-model="form_item.third_name" :placeholder="title.third_name" :title="title.third_name" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="3" class="inline-item">
                <DatePicker type="date" format="yyyy-MM-dd" :placeholder="title.birthday" :title="title.birthday" v-model="form_item.birthday"></DatePicker>
                </Col>
                <Col span="3" class="inline-item">
                <DatePicker type="date" format="yyyy-MM-dd" :placeholder="title.birthday2" :title="title.birthday2"
                            v-model="form_item.birthday2"></DatePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Email">
            <Row>
                <Col span="3">
                <Input v-model="form_item.email" :placeholder="title.email" :title="title.email" type="email"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="电话">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.telephone" :placeholder="title.telephone" :title="title.telephone" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.mobile" :placeholder="title.mobile" :title="title.mobile" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="用户名">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.user_name" :placeholder="title.user_name" :title="title.user_name" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.account" :placeholder="title.account" :title="title.account" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="QQ号">
            <Row>
                <Col span="3">
                <Input v-model="form_item.qq" :placeholder="title.qq" :title="title.qq" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="组织">
            <Row>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.organization" :placeholder="title.organization" :title="title.organization" type="text"></Input>
                </Col>
                <Col span="3" class="inline-item">
                <Input v-model="form_item.company" :placeholder="title.company" :title="title.company" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="短语">
            <Row>
                <Col span="3">
                <Input v-model="form_item.like_use" :placeholder="title.like_use" :title="title.like_use" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="身份证号">
            <Row>
                <Col span="3">
                <Input v-model="form_item.id_card" :placeholder="title.id_card" :title="title.id_card" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="工号">
            <Row>
                <Col span="3">
                <Input v-model="form_item.work_no" :placeholder="title.work_no" :title="title.work_no" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="连接符">
            <Row>
                <Col span="3">
                <Input v-model="form_item.connector" :placeholder="title.connector" :title="title.connector" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="常用词组">
            <Row>
                <Col span="15">
                <Input v-model="form_item.common" :placeholder="title.common" :title="title.common" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="最近年份">
            <Row>
                <Col span="1">
                <i-switch v-model="form_item.have_year"></i-switch>
                </Col>
                <Col span="1">
                <Input v-model="form_item.year" :placeholder="title.year" :title="title.year" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤纯数字">
            <Row>
                <Col span="1">
                <i-switch v-model="form_item.number_filter"></i-switch>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤纯字母">
            <Row>
                <Col span="1">
                <i-switch v-model="form_item.string_filter"></i-switch>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤长度小于">
            <Row>
                <Col span="1">
                <i-switch v-model="form_item.short_filter"></i-switch>
                </Col>
                <Col span="1">
                <Input v-model="form_item.short" :placeholder="title.short" :title="title.short" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="过滤长度大于">
            <Row>
                <Col span="1">
                <i-switch v-model="form_item.long_filter"></i-switch>
                </Col>
                <Col span="1">
                <Input v-model="form_item.long" :placeholder="title.long" :title="title.long" type="text"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="emit_data">生成密码</Button>
            <Button type="ghost" @click="reset">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name: 'query',
        data() {
            return {
                form_item_origin: {
                    first_name: '',
                    second_name: '',
                    third_name: '',
                    birthday: '',
                    birthday2: '',
                    email: '',
                    telephone: '',
                    mobile: '',
                    user_name: '',
                    account: '',
                    qq: '',
                    organization: '',
                    company: '',
                    like_use: '',
                    id_card: '',
                    work_no: '',
                    connector: '',
                    common:'0,1,2,3,4,5,6,7,8,9,a,z,q,11,12,01,qq,aa,zz,00,66,88,99,ab,zx,az,qw,qa,123,888,666,000,111,aaa,abc,qaz,qwe,asd,zxc,1234,1qaz,qwer,asdf,zxcv,1357,2468,0123,6789,12345,123456',
                    number_filter: false,
                    string_filter: false,
                    short_filter: true,
                    long_filter: true,
                    short: '6',
                    long: '16',
                    have_year: true,
                    year: '10'
                },
                form_item: {},
                title: {
                    "first_name": "请输入姓(英文)",
                    "second_name": "请输入名的第一个字(英文)",
                    "third_name": "请输入名的第二个字(如果有，否则不用输入，英文)",
                    "birthday": "公历生日",
                    "birthday2": "农历生日",
                    "email": "请输入邮箱",
                    "telephone": "请输入座机",
                    "mobile": "请输入手机",
                    "user_name": "请输入常用用户名(英文)",
                    "account": "请输入常用用户账号",
                    "qq": "请输入QQ号",
                    "organization": "请输入组织名(英文)",
                    "company": "请输入公司名(英文)",
                    "like_use": "请输入常用短语(英文),如iloveyou",
                    "id_card": "请输入身份证号",
                    "work_no": "请输入工号",
                    "connector": "请输入连接符(如.!_-#@:$&*~?%+=/|),尽量减少,否则会极大增加密码数量",
                    "common": "请输入常用词组,如123456,abcd等，多个用逗号分隔。",
                    "year": "最近几年的年份",
                    "short": "请输入最小长度",
                    "long": "请输入最大长度"
                }
            }
        },
        mounted: function () {
            this.reset();
        },
        methods: {
            emit_data: function () {
                this.form_item.birthday=this.format(this.form_item.birthday);
                this.form_item.birthday2=this.format(this.form_item.birthday2);
                this.$emit('get_data', this.form_item);
            },
            format: function (date) {
                if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date)){
                    return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
                }
                return date
            },
            reset: function () {
                this.form_item = Object.assign({}, this.form_item_origin);
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
