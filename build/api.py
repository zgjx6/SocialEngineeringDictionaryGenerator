# coding:utf-8
'''
Social Engineering Dictionary Generator
社会工程学字典生成器
灵感源于亦思社会工程学字典生成器，但是该软件多年未更新，且生成的密码过少，故打算自己重新做一个。
初步设想为：根据常见的个人信息，分别生成少量、中量、大量密码，以应付不同的需求。
'''

from flask import Flask, render_template, request, jsonify, redirect, url_for

import string
import re
import itertools
import json
import sys
import os

app = Flask(__name__,template_folder='')
dirname = sys.path[0]


def getLowAndUpStr(s):  # 得到字符串大小写，小于三位自动重复
    if not s:
        return ['']
    temp = [s.lower(), s.upper(), s.capitalize()]
    if 0 < len(s) < 4 or (len(s) == 4 and s.lower()[0:2] != s.lower()[2:]):
        temp += getLowAndUpStr(s * 2)
    return temp


def distinctList(l):  # 列表去重,去空
    r = []
    for i in l:
        if i and i not in r:
            r.append(i)
    return r


def dropHeadTail(l, start=6, end=16):  # 列表去掉过长和过短
    r = []
    for i in l:
        if start <= len(i) <= end:
            r.append(i)
    return r


def dropStingInt(l, rtype):  # 去掉字母或数字
    r = []
    for i in l:
        if rtype == 'str':
            pattern = '^[a-zA-Z]*$'
        elif rtype == 'int':
            pattern = '^[0-9]*$'
        else:
            return l
        if re.match(pattern, i) == None:
            r.append(i)
    return r

@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

@app.route('/api/getPassword', methods=["post"])
def index_get():
    data = json.loads(request.data)
    # name
    firstName = data.get('firstName', '')
    firstNameCombine = getLowAndUpStr(firstName) if re.match('^[a-zA-Z]*$', firstName) != None else ['']
    lastName = [data.get('secondName', ''), data.get('thirdName', '')]
    lastNameCombine = getLowAndUpStr(''.join(lastName)) if re.match('^[a-zA-Z]*$', ''.join(lastName)) != None else ['']
    name_all = [''.join(firstNameCombine[0] + lastNameCombine[0])] + [''.join(lastNameCombine[0] + firstNameCombine[0])]
    lastNameAB = lastName[0][0:1] + lastName[1][0:1]
    for i in [firstName[0:1] + lastNameAB, firstNameCombine[0] + lastNameAB, lastNameAB + firstName[0:1], lastNameAB + firstNameCombine[0], firstName[0:1] + ''.join(lastName)]:
        name_all += [i]
    name_all += [''.join(lastName), firstName]
    # print('name_all',name_all)
    # birthday
    birthday = data.get('birthday', '')
    birthday2 = data.get('birthday2', '')
    birthday_all = []
    for i in [birthday, birthday2]:
        if re.match('^[0-9]{4}-[0-9]{2}-[0-9]{2}$', i) != None:
            i = i.replace('-', '')
            birthday_all.append(i)
            birthday_all.append(i[:4])
            birthday_all.append(i[-4:])
            if i[4] == '0':
                birthday_all.append(i[-3:])
    # print('birthday_all',birthday_all)
    # email
    email = data.get('email', '')
    email_all = []
    if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email) != None:
        email_all.append(email.split('@')[0])
        # email_all.append(email.split('@')[1])
        # email_all.append(email.split('@')[1].replace('.', ''))
        # email_all.append(email.split('@')[1].split('.')[0])
    # print('email_all',email_all)
    # telephone
    telephone = data.get('telephone', '')
    mobilephone = data.get('mobilephone', '')
    phone_all = []
    for i in [telephone, mobilephone]:
        if re.match('^[0-9-]*$', i) != None:
            phone_all += i.split('-')
            phone_all += [''.join(i.split('-'))]
            phone_all.append(i)
            phone_all.append(i[-6:])
            phone_all.append(i[-4:])
            phone_all.append(i[-3:])
    # print('phone_all',phone_all)
    # other
    userName = data.get('userName', '')
    account = data.get('account', '')
    qq = data.get('qq', '') if re.match('^[0-9]{5,13}$', data.get('qq', '')) != None else ''
    # url=data.get('telephone', '')
    organization = data.get('organization', '') if re.match(
        '^[0-9a-zA-Z@./ -]*$', data.get('organization', '')) != None else ''
    company = data.get('company', '') if re.match('^[0-9a-zA-Z@./ -]*$', data.get('company', '')) != None else ''
    password = data.get('password', '')
    # password1=data.get('password1', '')
    password2 = data.get('password2', '')
    likeuse = data.get('likeuse', '')
    other = ''
    other_all = [userName, account, qq, organization, company, likeuse, other]
    # print('other_all',other_all)
    # idcard
    idcard = data.get('idcard', '') if re.match(r'(^\d{15}$)|(^\d{17}(x|X|\d)$|^$)', data.get('idcard', '')) != None else ''
    idcard_all = []
    if idcard:
        if len(idcard) == 18:
            idcard_all.append(idcard[-8:])
            idcard_all.append(idcard[-6:])
            idcard_all.append(idcard[-4:])
            idcard_all.append(idcard[-3:])
            idcard_all.append(idcard[-9:-1])
            idcard_all.append(idcard[-7:-1])
            idcard_all.append(idcard[-5:-1])
            idcard_all.append(idcard[-4:-1])
    # print('idcard_all',idcard_all)
    # workNo
    workNo = data.get('workNo', '') if re.match('^[0-9a-zA-Z@./ -]*$', data.get('workNo', '')) != None else ''
    workNo_all = [workNo]
    if workNo:
        if len(workNo) >= 3:
            workNo_all.append(workNo[-3:])
        if len(workNo) >= 4:
            workNo_all.append(workNo[-4:])
        if len(workNo) >= 6:
            workNo_all.append(workNo[-6:])
        if len(workNo) >= 8:
            workNo_all.append(workNo[-8:])
    # print('workNo_all',workNo_all)
    # second person
    metaFirstName = data.get('firstName2', '')
    mateLastName = [data.get('secondName2', ''), data.get('thirdName2', '')]
    metaBirthday = data.get('birthday3', '')
    metaBirthday2 = data.get('birthday4', '')
    connector = data.get('connector', '')
    common = list(map(str, range(10))) + ['a', 'z', 'q'] + ['11', '12', '01', 'qq', 'aa', 'zz', '00', '66', '88', '99',
                                                            'ab', 'zx', 'az', 'qw', 'qa'] + ['123', '888', '666', '000', '111', 'aaa', 'abc', 'qaz', 'qwe', 'asd', 'zxc']
    # generate password
    pass_list_all = []
    for i in [name_all, birthday_all, phone_all, idcard_all, workNo_all, other_all]:
        t = []
        for j in i:
            t += distinctList(getLowAndUpStr(j))
        pass_list_all.append(t)
    pass_list_all.append(email_all)
    pass_list_all.append(common)
    pass_first_all = itertools.chain(*pass_list_all)
    pass_first_all = distinctList(pass_first_all)
    numberFilter = data.get('numberFilter', '')
    stringFilter = data.get('stringFilter', '')
    shortFilter = data.get('shortFilter', '')
    longFilter = data.get('longFilter', '')
    short = data.get('short', '')
    _long = data.get('long', '')
    # print(numberFilter,stringFilter,shortFilter,longFilter,short,_long)
    if shortFilter == True:
        short = int(short) if int(short) > 0 else 1
    else:
        short = 1
    if longFilter == True:
        _long = int(_long) if int(_long) > 0 else 100
    else:
        _long = 100
    pass_first_all = dropHeadTail(pass_first_all, start=short, end=_long)
    if numberFilter == True:
        pass_first_all = dropStingInt(pass_first_all, 'int')
    if stringFilter == True:
        pass_first_all = dropStingInt(pass_first_all, 'str')
    pass_second_all = []
    for i, j in enumerate(pass_list_all):
        for k in pass_list_all[i + 1:]:
            pass_second_all += [''.join(m) for m in list(itertools.product(j, k))] + [''.join(m)
                                                                                      for m in list(itertools.product(k, j))]
    pass_second_all = distinctList(pass_second_all)
    pass_second_all = dropHeadTail(pass_second_all, start=short, end=_long)
    if numberFilter == True:
        pass_second_all = dropStingInt(pass_second_all, 'int')
    if stringFilter == True:
        pass_second_all = dropStingInt(pass_second_all, 'str')
    # print(len(pass_first_all))
    # print(len(pass_second_all))
    return jsonify({"pass_first_all": '\n'.join(pass_first_all), "pass_second_all": '\n'.join(pass_second_all)})


@app.route('/api/getCommon', methods=['post'])
def common():
    with open(os.path.join(dirname, 'static', 'file', 'mypass100.txt'), 'r') as f:
        content100 = f.read()
    with open(os.path.join(dirname, 'static', 'file', 'csdn_1700.txt'), 'r') as f:
        content1700 = f.read()
    return jsonify({'content100':content100,'content1700':content1700})
if __name__ == "__main__":
    from flask_compress import Compress
    Compress(app)
    app.run(debug=False)


# 二阶密码优化
# 第二人
# 三阶
# 密码数量显示