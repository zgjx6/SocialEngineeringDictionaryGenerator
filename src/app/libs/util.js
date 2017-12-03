let util = {};
util.title = function (title) {
    title = title ? title + ' - 社会工程学密码生成器':'其他 - 社会工程学密码生成器';
    window.document.title = title;
};

export default util;