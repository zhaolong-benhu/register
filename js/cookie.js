/******************************
** 文件描述 :  Cookie操作
** 时    间 ： 2018.01
** 作    者 ： zhaolong
** E-mail： zhaolong@DFWSGROUP.COM
*******************************/
//设置Cookie
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    document.cookie = name + "="+ escape (encodeURI(value));//默认不设置expires 浏览器关闭 cookie自动失效
}
//读取Cookie
function getCookie(cookie_name){
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);
    if (cookie_pos != -1){
            cookie_pos += cookie_name.length + 1;
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            if (cookie_end == -1){
                cookie_end = allcookies.length;
            }
             return decodeURI(allcookies.substring(cookie_pos, cookie_end));
    }
}
//删除Cookie
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=$.cookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//获取url中的参数
 function getUrlParam(name) {
		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		 var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		 if (r != null) return unescape(r[2]); return null; //返回参数值
 }
// 价格转化方法
 function toDecimal (num, size) {
    return (String(num) + Array((size || 2) + 1).join('0')).replace(/\./g, '').replace(new RegExp('(' + parseInt(num) + ')'), '$1.').match(new RegExp('\\d+\\.\\d{' + size + '}'))[0]
  }
