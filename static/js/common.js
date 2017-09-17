$('#common').addClass('layui-this');

var copy = function (the_id) {
    var Url2 = document.getElementById(the_id);
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
};

$(document).ready(function () {
    var len = $('#result').val().split('\n').length;
    $('#result').css('height', len * 20.2 + 'px');
    var len2 = $('#result2').val().split('\n').length;
    $('#result2').css('height', len2 * 20.2 + 'px');
    $('.result').css('width', '300px');
});