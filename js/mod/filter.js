/*'use strict';

*//* Filters *//*
app.filter('checkName',function () {
        return function (text) {
            if (text) {
                var reg = /^[(\u4e00-\u9fa5)a-z][(\u4e00-\u9fa5)a-zA-Z0-9_]{1,15}$/;
                var len = utf8.stringToBytes(text).length;
                if (!reg.test(text)) {
                    return '支持汉字、小写字母a-z、数字0-9、或下划线_，请以汉字或小写字母开头';
                } else if (len > 0 && len < 5) {
                    return '长度必须大于5字节，一个汉字3字节';
                } else if (len > 15) {
                    return '长度必须小于15字节，一个汉字3字节';
                } else {
                    return false;
                }
            }
        };
    }).
    filter('length',function () {
        return function (text) {
            if (text) {
                return utf8.stringToBytes(text).length;
            } else {
                return 0;
            }
        };
    }).
    filter('cutText',function () {
        return function (text, len) {
            if (typeof text !== 'string') {
                return text;
            }
            text = text.replace(/\s+/g, ' ');
            var bytes = utf8.stringToBytes(text);
            len = len || 0;
            if (bytes.length > len) {
                bytes.length = len;
                text = utf8.bytesToString(bytes);
                text = text.slice(0, -2) + '…';
            }
            return text;
        };
    }).*/
    app.filter('formatDate', ['$filter',
        function ($filter) {
            return function (date) {
                date = date*1000;
                var o = Date.now() - date;
                if (o > 259200000) {
                    return $filter('date')(date, 'yy-MM-dd HH:mm'); // 三天前直接显示标准日期格式
                } else if (o > 86400000) {
                    return Math.floor(o / 86400000) + '天前';
                } else if (o > 3600000) {
                    return Math.floor(o / 3600000) + '小时前';
                } else if (o > 60000) {
                    return Math.floor(o / 60000) + '分钟前';
                } else {
                    return "刚刚";
                }
            };
        }
    ]);