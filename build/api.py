# coding:utf-8
"""
Social Engineering Dictionary Generator
社会工程学字典生成器
灵感源于亦思社会工程学字典生成器，但是该软件多年未更新，且生成的密码过少，故打算自己重新做一个。
初步设想为：根据常见的个人信息，分别生成少量、中量、大量密码，以应付不同的需求。
"""

from flask import Flask, render_template, request, jsonify

import re
import itertools
import json
import sys
import os
import time

app = Flask(__name__, template_folder='')
dirname = sys.path[0]


def get_low_and_up_str(l: list) -> list:
    """
    得到字符串大小写，
    :param l: list, 需要处理的字符串列表
    :return: 处理后的字符串列表,不包含原文
    """
    return [j for i in l if i for j in [i.lower(), i.upper()]]


def get_repeat(l: list, x: int=3) -> list:
    """
    小于x位自动重复
    :param l: list,需要重复的列表
    :param x: int,小于等于此长度将自动重复
    :return: 返回原文及重复后的列表组合
    """
    return l + [i*2 for i in l if 0 < len(i) <= x]


def get_capitalize(l: list) -> list:
    """
    :param l: list, 密码列表
    :return: 原密码，首字母大写，# 最后字符大写
    """
    return [j for i in l if i for j in [i, i.capitalize()]] # i[:-1]+i[-1].upper()


def get_head_tail(s: str, *l: int) -> list:
    """
    取密码前几位及后几位，可输入任意长度
    :param s: str, 需要处理的字符串
    :param *l: int, 需要的长度
    :return: 计算后的密码列表,不包含原文
    """
    return [j for i in l if len(s) > i for j in [s[:i], s[-i:]]]


def distinct_list(l: list) -> list:
    """
    :param l: list, 密码列表
    :return: 去重去空后的列表
    """
    return [i for i in list(set(l)) if i]


def drop_short_long(l: list, start: int=6, end: int=16) -> list:
    """
    列表去掉过长和过短
    :param l: list, 密码列表
    :param start: 最小长度
    :param end: 最大长度
    :return: 去掉过长和过短后的密码列表
    """
    return [x for x in l if start <= len(x) <= end]


def drop_sting_int(l: list, rtype: str) -> list:
    """
    去掉纯字母或纯数字
    :param l: list, 密码列表
    :param rtype: 可选str或int
    :return: 去掉纯字母或纯数字密码列表
    """
    if rtype not in ['str', 'int']:
        return l
    pattern = '^[a-zA-Z]*$' if rtype == 'str' else '^[0-9]*$'
    return [i for i in l if re.match(pattern, i) is None]


# SPA，单页面应用
@app.route('/', defaults={'path' : ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


@app.route('/api/get_password', methods=["post"])
def index_get():
    data = json.loads(request.data)
    # name
    first_name = data.get('first_name', '')
    first_name_combine = get_repeat(get_low_and_up_str([first_name])) if re.match('^[a-zA-Z0-9]+$', first_name) else ['']
    last_name = [data.get('second_name', ''), data.get('third_name', '')]
    last_name_combine = get_repeat(get_low_and_up_str([''.join(last_name)])) if re.match('^[a-zA-Z0-9]+$', ''.join(last_name)) else ['']
    name_combine = (first_name_combine[0], last_name_combine[0])
    name_all = [''.join(name_combine), ''.join(name_combine[::-1])]
    last_name_a_b = last_name[0][0:1] + last_name[1][0:1]
    for i in [first_name[0:1] + last_name_a_b, first_name_combine[0] + last_name_a_b, last_name_a_b + first_name[0:1],
              last_name_a_b + first_name_combine[0], first_name[0:1] + ''.join(last_name), ''.join(last_name),
              first_name]:
        name_all += [i]
    # birthday
    birthday, birthday2, birthday_all = data.get('birthday', ''), data.get('birthday2', ''), []
    for i in [birthday, birthday2]:
        if re.match('^[0-9]{4}-[0-9]{2}-[0-9]{2}$', i):
            i = i.replace('-', '')
            birthday_all += [i] + get_head_tail(i, 4)
            if i[4] == '0':
                birthday_all += [i[-3:], i[-3:] * 2]
    # email
    email, email_all = data.get('email', ''), []
    if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email):
        email_all.append(email.split('@')[0])
        email_all += get_repeat(get_head_tail(email.split('@')[0], 3, 4))
    # phone
    telephone = data.get('telephone', '')
    mobile = data.get('mobile', '')
    phone_all = []
    for i in [telephone, mobile]:
        if re.match('^[0-9-]+$', i):
            phone_all += i.split('-') + [''.join(i.split('-')), i]
            phone_all += get_repeat(get_head_tail(i, 3, 4, 5, 6))
    # other
    user_name = data.get('user_name', '')
    account = data.get('account', '')
    qq = data.get('qq', '') if re.match('^[0-9]{5,13}$', data.get('qq', '')) else ''
    organization = data.get('organization', '') if re.match('^[0-9a-zA-Z@./ -]+$', data.get('organization', '')) else ''
    company = data.get('company', '') if re.match('^[0-9a-zA-Z@./ -]+$', data.get('company', '')) else ''
    # password = data.get('password', '')
    # password1=data.get('password1', '')
    # password2 = data.get('password2', '')
    like_use = data.get('like_use', '')
    other = data.get('other', '')
    other_all = [user_name, account, qq, organization, company, like_use, other]
    other_all += [j for i in other_all for j in get_repeat(get_head_tail(i, 3, 4))]
    # id_card
    id_card = data.get('id_card', '') if re.match(r'(^\d{15}$)|(^\d{17}(x|X|\d)$|^$)', data.get('id_card', '')) else ''
    id_card_all = [] if len(id_card) != 18 else distinct_list(get_repeat(get_head_tail(id_card, 3, 4, 6, 8)) +
                                                              get_repeat(get_head_tail(id_card[:-1], 3, 4, 6, 8)))
    # work_no
    work_no = data.get('work_no', '') if re.match('^[0-9a-zA-Z@./ -]+$', data.get('work_no', '')) else ''
    work_no_all = get_repeat(get_head_tail(work_no, 3, 4, 6, 8))
    # second person
    # metaFirstName = data.get('firstName2', '')
    # mateLastName = [data.get('secondName2', ''), data.get('thirdName2', '')]
    # metaBirthday = data.get('birthday3', '')
    # metaBirthday2 = data.get('birthday4', '')
    connector = data.get('connector', '')
    # common = list(map(str, range(10))) + ['a', 'z', 'q'] + ['11', '12', '01', 'qq', 'aa', 'zz', '00', '66', '88',
    # '99','ab', 'zx', 'az', 'qw', 'qa'] + ['123', '888', '666', '000', '111', 'aaa', 'abc', 'qaz', 'qwe', 'asd', 'zxc']
    #  + ['1234','1qaz','qwer','asdf','zxcv','1357','2468','0123','6789']+['12345','123456']
    common = data.get('common', '').split(',')
    if data.get('have_year', ''):
        year = int(time.strftime("%Y"))
        common += list(map(str, range(year-int(data.get('year', '1')), year + 2)))
    # generate password
    name_all, birthday_all, email_all, phone_all, id_card_all, work_no_all, other_all, common = \
        [distinct_list(i) for i in
         [name_all, birthday_all, email_all, phone_all, id_card_all, work_no_all, other_all, common]]
    pass_list_all = [name_all, birthday_all, email_all, phone_all, id_card_all, work_no_all, other_all, common]
    pass_first = list(itertools.chain(*pass_list_all))
    # print(pass_list_all)
    number_filter = data.get('number_filter', '')
    string_filter = data.get('string_filter', '')
    short_filter = data.get('short_filter', '')
    long_filter = data.get('long_filter', '')
    short = data.get('short', '')
    long = data.get('long', '')
    # 开始生成二阶和三阶密码
    pass_second, pass_third = [], []
    for i, j in enumerate(pass_list_all):
        if connector:
            pass_third += [''.join(m) for m in itertools.product(j, connector, j)]
        for k in pass_list_all[:i] + pass_list_all[i+1:]:
            pass_second += [''.join(m) for m in itertools.product(j, k)]
            if connector:
                pass_third += [''.join(m) for m in itertools.product(j, connector, k)]
    pass_second += [''.join(m) for m in itertools.product(other_all, other_all)]
    # 过滤长度和纯字符、纯数字
    short = int(short) if short_filter and int(short) > 0 else 3    # 最小长度
    long = int(long) if long_filter and int(long) > 0 else 32    # 最大长度
    pass_first, pass_second, pass_third = [drop_short_long(distinct_list(get_capitalize(i)), start=short, end=long)
                                           for i in [pass_first, pass_second, pass_third]]
    if number_filter:
        pass_first, pass_second, pass_third = [drop_sting_int(i, 'int') for i in [pass_first, pass_second, pass_third]]
    if string_filter:
        pass_first, pass_second, pass_third = [drop_sting_int(i, 'str') for i in [pass_first, pass_second, pass_third]]
    return jsonify({"pass_first": '\n'.join(pass_first), "pass_second": '\n'.join(pass_second),
                    "pass_third": '\n'.join(pass_third)})


@app.route('/api/get_common', methods=['post'])
def get_common():
    with open(os.path.join(dirname, 'static', 'file', 'mypass100.txt'), 'r') as f:
        content100 = f.read()
    with open(os.path.join(dirname, 'static', 'file', 'csdn_1700.txt'), 'r') as f:
        content1700 = f.read()
    with open(os.path.join(dirname, 'static', 'file', '10000pass.txt'), 'r') as f:
        content10000 = f.read()
    with open(os.path.join(dirname, 'static', 'file', 'NCSC_PwnedPasswordTop100k.txt'), 'r', encoding='utf8') as f:
        NCSC100k = f.read()
    return jsonify({'content100': content100, 'content1700': content1700, 'content10000': content10000, 'NCSC100k': NCSC100k})


if __name__ == "__main__":
    from flask_compress import Compress
    Compress(app)
    app.run(debug=True)


# TODO:网址
# TODO:旧密码
# TODO:第二人名字

