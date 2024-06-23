function reset() {
    document.getElementById('first_name').value = '';
    document.getElementById('second_name').value = '';
    document.getElementById('third_name').value = '';
    document.getElementById('birthday').value = '';
    document.getElementById('birthday2').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('username').value = '';
    document.getElementById('account').value = '';
    document.getElementById('organization').value = '';
    document.getElementById('company').value = '';
    document.getElementById('like_use').value = '';
    document.getElementById('id_card').value = '';
    document.getElementById('connector').value = '';
    document.getElementById('connector_left').checked = false;
    document.getElementById('connector_middle').checked = false;
    document.getElementById('connector_right').checked = false;
    document.getElementById('common').value = '123,888,666,000,111,aaa,abc,qaz,qwe,asd,zxc,!@#,1234,1qaz,qwer,asdf,zxcv,!@#$,1357,2468,0123,6789,6666,8888,12345,123456';
    document.getElementById('have_year').checked = false;
    document.getElementById('year').value = '';
    document.getElementById('number_filter').checked = false;
    document.getElementById('string_filter').checked = false;
    document.getElementById('long').value = 16;
    document.getElementById('short').value = 6;
    document.getElementById('capitalize').checked = true;
    document.getElementById('lowercase').checked = false;
    document.getElementById('uppercase').checked = false;
    document.getElementById('result').style.display = 'none';
}

/**
 * 得到字符串大写,包含原文,去空
 * @param l list,需要处理的字符串列表
 */
function get_upper(l) {
    const upperPattern = new RegExp(".*[a-z].*");
    return l.concat(l.map(i => upperPattern.test(i) ? i.toUpperCase() : '')).filter(Boolean);
}

/**
 * 得到字符串小写,包含原文,去空
 * @param l list,需要处理的字符串列表
 */
function get_lower(l) {
    const lowerPattern = new RegExp(".*[A-Z].*");
    return l.concat(l.map(i => lowerPattern.test(i) ? i.toLowerCase() : '')).filter(Boolean);
}

/**
 * 首字母大写,包含原文,去空
 * @param l list,需要处理的字符串列表
 */
function get_capitalize(l) {
    const capitalizePattern = new RegExp("^[a-z].*");
    return l.concat(l.map(i => capitalizePattern.test(i) ? i.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : '')).filter(Boolean);
}

/**
 * 去重去空后的列表
 * @param l list,需要处理的字符串列表
 */
function get_distinct_list(l) {
    return Array.from(new Set(l)).filter(Boolean);
}

/**
 * 小于等于x位自动重复, 返回原文及重复后的列表组合,去空
 * @param l list,需要重复的列表
 * @param x int,小于等于此长度将自动重复
 */
function get_repeat(l, x) {
    x = (typeof x === 'undefined') ? 3 : x;
    const lr = l.map(i => (i.length > 0 && i.length <= x) ? i + i : '');
    return l.concat(lr).filter(Boolean);
}

/**
 * 取密码前几位及后几位,包含原文,去空
 * @param s str, 需要处理的字符串
 * @param l int, 需要的长度,可输入任意数量
 */
function get_head_tail(s, ...l) {
    return [s].concat(l.map(i => s.length > i ? [s.substring(0, i), s.substring(s.length - i)] : []).reduce((a, b) => a.concat(b))).filter(Boolean);
}

/**
 * 列表去掉过长和过短
 * @param l list, 需要处理的字符串列表
 * @param start 最小长度
 * @param end 最大长度
 */
function drop_short_long(l, start, end) {
    start = (typeof start === 'undefined') ? 6 : start;
    end = (typeof end === 'undefined') ? 16 : end;
    return l.filter(i => ((start ? i.length >= start : true) && (end ? i.length <= end : true)));
}

/**
 * 去掉纯字母或纯数字
 * @param l 需要处理的字符串列表
 * @param rtype 可选str或int
 */
function drop_string_int(l, rtype) {
    if (['str', 'int'].indexOf(rtype) < 0) {
        return l;
    }
    const pattern = rtype === 'str' ? /^[a-zA-Z]*$/ : /^[0-9]*$/;
    return l.filter(i => !pattern.test(i));
}

/**
 * 计算array的笛卡尔积，相当于python中的itertools.product
 * calc_descartes([['2019', '2020'], ['白色', '灰色', '蓝色']]) => ['2019白色', '2019灰色', '2019蓝色', '2020白色', '2020灰色', '2020蓝色']
 * @param array
 */
function calc_descartes(array) {
    if (array.length < 2) return array[0] || [];
    return array.reduce((total, currentValue) => {
        let res = [];
        total.forEach(t => {
            currentValue.forEach(cv => {
                res.push([t, cv]);
            })
        })
        return res;
    })
}

/**
 * 数组排列组合，等于python中的itertools.permutations，permutations([1,2,3,4], 2) => [[1,2],[1,3],[1,4],[2,1],[2,3],[2,4],[3,1],[3,2],[3,4],[4,1],[4,2],[4,3]]
 * @param arr 源数组
 * @param size 选取元素的个数
 */
function permutations(arr, size) {
    //定义数组保存结果
    let result = [];

    //selected数组包含已经选中的元素
    //arr数组包含未选中元素数组，size表示还需选取元素的个数
    function _combine(selected, arr, size) {
        //如果size===0，则一次组合完成，存入result数组并返回
        if (size === 0) {
            result.push(selected);
            return;
        }
        //遍历所有可能选中的元素，遍历的次数为数组长度减去(size-1)
        for (let i = 0; i < arr.length; i++) {
            //复制数组，避免对selected数组数据的更改
            let temp = selected.slice();
            temp.push(arr[i]);
            _combine(temp, arr.slice(0, i).concat(arr.slice(i + 1)), size - 1);
        }
    }

    _combine([], arr, size);
    return result;
}

function show_loading() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
}

function hide_loading() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
}

function main() {
    show_loading();
    setTimeout(() => {
        const start_time = new Date().getTime();
        const pass_list = generate();

        const pass_first_length = document.getElementById('pass_first_length');
        const pass_first_text = document.getElementById('pass_first_text');
        const pass_second_length = document.getElementById('pass_second_length');
        const pass_second_text = document.getElementById('pass_second_text');
        const pass_third_length = document.getElementById('pass_third_length');
        const pass_third_text = document.getElementById('pass_third_text');
        const pass_all_length = document.getElementById('pass_all_length');
        const pass_all_text = document.getElementById('pass_all_text');
        const result = document.getElementById('result');
        pass_first_text.value = pass_list[0].join('\n');
        pass_first_text.rows = pass_list[0].length;
        pass_first_length.innerText = pass_list[0].length.toString();
        pass_second_text.value = pass_list[1].join('\n');
        pass_second_text.rows = pass_list[1].length;
        pass_second_length.innerText = pass_list[1].length.toString();
        pass_third_text.value = pass_list[2].join('\n');
        pass_third_text.rows = pass_list[2].length;
        pass_third_length.innerText = pass_list[2].length.toString();
        let pass_all = pass_list.flat();
        pass_all_text.value = pass_all.join('\n');
        pass_all_text.rows = pass_all.length;
        pass_all_length.innerText = pass_all.length.toString();
        result.style.display = 'flex';

        const end_time = new Date().getTime();
        console.log(`cost ${end_time - start_time}ms`)

        hide_loading();
    }, 0);
}

function download() {
    const list = generate().flat();
    console.log(list.length);

    const ele = document.createElement('a');
    ele.download = "passwords.txt";
    ele.style.display = "none";

    const blob = new Blob([list.join("\n")]);
    ele.href = URL.createObjectURL(blob);
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
}

function generate() {
    const first_name = document.getElementById('first_name')['value'];
    const second_name = document.getElementById('second_name')['value'];
    const third_name = document.getElementById('third_name')['value'];
    const birthday = document.getElementById('birthday')['value'];
    const birthday2 = document.getElementById('birthday2')['value'];
    const email = document.getElementById('email')['value'];
    const mobile = document.getElementById('mobile')['value'];
    const telephone = document.getElementById('telephone')['value'];
    const username = document.getElementById('username')['value'];
    const account = document.getElementById('account')['value'];
    const organization = document.getElementById('organization')['value'];
    const company = document.getElementById('company')['value'];
    const like_use = document.getElementById('like_use')['value'];
    const id_card = document.getElementById('id_card')['value'];
    const work_no = document.getElementById('work_no')['value'];
    const connector = document.getElementById('connector')['value'].split('');
    const connector_left = document.getElementById('connector_left')['checked'];
    const connector_middle = document.getElementById('connector_middle')['checked'];
    const connector_right = document.getElementById('connector_right')['checked'];
    const common = document.getElementById('common')['value'];
    const have_year = document.getElementById('have_year')['checked'];
    const year = parseInt(document.getElementById('year')['value']);
    const number_filter = document.getElementById('number_filter')['checked'];
    const string_filter = document.getElementById('string_filter')['checked'];
    const long = parseInt(document.getElementById('long')['value']);
    const short = parseInt(document.getElementById('short')['value']);
    const capitalize = document.getElementById('capitalize')['checked'];
    const lowercase = document.getElementById('lowercase')['checked'];
    const uppercase = document.getElementById('uppercase')['checked'];

    const first_name_combine = /^[a-zA-Z0-9]+$/.test(first_name) ? get_repeat([first_name], 3) : [''];
    const last_name_combine = /^[a-zA-Z0-9]+$/.test(second_name + third_name) ? get_repeat([second_name + third_name], 3) : [''];
    let name_all = [first_name_combine[0] + last_name_combine[0], last_name_combine[0] + first_name_combine[0]];
    const last_name_a_b = second_name.substring(0, 1) + third_name.substring(0, 1);
    name_all = name_all.concat([first_name.substring(0, 1) + last_name_a_b, first_name_combine[0] + last_name_a_b, last_name_a_b + first_name.substring(0, 1), last_name_a_b + first_name_combine[0], first_name.substring(0, 1) + second_name + third_name, second_name + third_name, first_name]);
    name_all = name_all.concat(get_repeat(get_head_tail(username, 3, 4))).concat(get_repeat(get_head_tail(account, 3, 4)))
    name_all = get_distinct_list(name_all);
    console.log('name_all', name_all);

    let birthday_all = [];
    let b = birthday.replaceAll('-', '');
    let b2 = birthday2.replaceAll('-', '');
    birthday_all = birthday_all.concat(get_head_tail(b, 4)).concat(get_head_tail(b2, 4));
    birthday_all = birthday_all.concat(b.substring(4, 5) === '0' ? [b.substring(5, 8), b.substring(5, 8) + b.substring(5, 8)] : []);
    birthday_all = birthday_all.concat(b2.substring(4, 5) === '0' ? [b2.substring(5, 8), b2.substring(5, 8) + b2.substring(5, 8)] : []);
    birthday_all = get_distinct_list(birthday_all);
    console.log('birthday_all', birthday_all);

    const email_all = get_distinct_list([email].concat(get_repeat(get_head_tail(email.split('@')[0], 3, 4), 3)));
    console.log('email_all', email_all);

    let phone_all = get_distinct_list(get_repeat(get_head_tail(mobile, 3, 4, 5, 6)).concat(get_repeat(get_head_tail(telephone, 3, 4, 5, 6))));
    console.log('phone_all', phone_all);

    let id_card_all = id_card.length > 0 ? get_distinct_list(get_repeat(get_head_tail(id_card, 3, 4, 6, 8).concat(get_head_tail(id_card.substring(0, id_card.length - 1), 3, 4, 6, 8).slice(1)))) : [];
    console.log('id_card_all', id_card_all);

    let work_no_all = get_distinct_list(get_repeat(get_head_tail(work_no, 3, 4, 6, 8)));
    console.log('work_no_all', work_no_all);

    let org_all = get_distinct_list([organization, company].map(i => get_repeat(get_head_tail(i, 3, 4))).reduce((a, b) => a.concat(b)));
    console.log('org_all', org_all);

    let like_all = get_distinct_list(like_use.split(',').map(i => get_repeat(get_head_tail(i, 3, 4))).reduce((a, b) => a.concat(b)));
    console.log('like_all', like_all);

    let common_all = common.split(',');
    if (have_year) {
        Array.from(Array(year), (el, i) => common_all.push((new Date().getFullYear() - year + i).toString()));
    }
    console.log('common_all', common_all);

    let pass_list_all = [name_all, birthday_all, email_all, phone_all, id_card_all, work_no_all, org_all, like_all, common_all];
    let pass_first = pass_list_all.reduce((a, b) => a.concat(b));
    console.log('pass_first', pass_first);

    let pass_second = [];
    let pass_third = [];

    permutations(pass_list_all, 2).forEach(passArr => {
        let pass_combine = calc_descartes(passArr);
        pass_second = pass_second.concat(pass_combine.map(p => p[0] + p[1]));
        pass_combine.forEach(p => {
            connector.forEach(c => {
                if (connector_left) {
                    pass_third.push(c + p[0] + p[1]);
                }
                if (connector_middle) {
                    pass_third.push(p[0] + c + p[1]);
                }
                if (connector_right) {
                    pass_third.push(p[0] + p[1] + c);
                }
            });
        });
    });

    let pass_list = [pass_first, pass_second, pass_third];
    pass_list = pass_list.map(i => drop_short_long(i, short, long));
    if (number_filter) {
        pass_list = pass_list.map(i => drop_string_int(i, 'int'));
    }
    if (string_filter) {
        pass_list = pass_list.map(i => drop_string_int(i, 'str'));
    }
    if (capitalize) {
        pass_list = pass_list.map(i => get_capitalize(i));
    }
    if (lowercase) {
        pass_list = pass_list.map(i => get_lower(i));
    }
    if (uppercase) {
        pass_list = pass_list.map(i => get_upper(i));
    }
    pass_list = pass_list.map(i => get_distinct_list(i));
    return pass_list;
}

function copy(cid) {
    const textNode = document.getElementById(cid);
    textNode.select();
    document.execCommand("Copy");
    textNode.blur();
    const notification = document.getElementById('notification');
    notification.style.right = '20px';
    notification.style.visibility = 'visible';
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.right = '-20px';
        notification.style.visibility = 'hidden';
        notification.style.opacity = '0';
    }, 3000)
}
