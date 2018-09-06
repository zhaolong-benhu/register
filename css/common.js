/******************************
** 文件描述 :  字典表单
** 时    间 ： 2018.01.17
** 作    者 ： same
** E-mail： zhengkui@dfwsgroup.com
*******************************/
(function($) {
  var Common = {
      //api数据请求
      getData:function(url,parameter,callback) {
        $.ajax({
          type:"post",
          url:'/mv2'+url,
          data:parameter,
          dataType:'json',
          success: function(v){
              callback(v)
          },
          error:function(err){
              console.log(err);
          }
        })
      },
      getUrlParam:function(name) {
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if (r != null) return unescape(r[2]); return null;
      }
  }
  window.C=Common;
}(jQuery))
