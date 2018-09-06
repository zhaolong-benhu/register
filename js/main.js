/******************************
** 文件描述 :  页面收据交互操作
** 时    间 ： 2018.02
** 作    者 ： zhaolong
** E-mail： zhaolong@DFWSGROUP.COM
*******************************/
var gender = "男";
//获取性别选择值
function getValue(){
    var radio = document.getElementsByName("DoorCt");
    for (i=0; i<radio.length; i++) {
        if (radio[i].checked) {
            gender = radio[i].value;
            // console.log(radio[i].value);
        }
    }
}
//初始化日期插件
$('#born_date').cxCalendar();

//获取图形验证码
function getCaptcha(){
    var t = (new Date()).valueOf();
    var img = document.getElementById("captcha");
    img.src =  "http://sso.veryeast.cn/user/captcha?v="+t;
}
getCaptcha();

//发送短信验证码
function sendCode(mobile,captcha){
    $.ajax({
        url: "http://sso.veryeast.cn/user/mobile_code",
        // type: "get",
        catch:false,
        dataType: "jsonp",
        data:{
        "sms_type":2,
        "mobile":mobile,
        "captcha":captcha,
        "appid":1,
        "redirect":"http://i.veryeast.cn/user/register",
        "return_type":"callback_json"
      },xhrFields:{
           withCredentials: true
      },
        success: function( data ){
            if(data.flag == 0){
                countDown();
                $('.error-code').css({"display":'none'});
            }
        },
        error: function (e) {
            console.log("error");
            $('.error-code').css({"display":'initial'});
            document.getElementById('error-code').innerText=e.errMsg;
        }
 })

}

//获取验证码
var countdown = 60;
var isFirst = true;
//获取短信验证码
function getCode(val){
    var mobile = document.getElementById("phone").value;
    var captcha =  document.getElementById("code").value;
    var mobile_reg=/^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/i;//验证手机正则
    var isValid = false;
    if(mobile === ""){
        $('.error-phone').css({"display":'initial'});
        isValid = false;
    }else if(!mobile_reg.test(mobile)){
        $('.error-phone').css({"display":'initial'});
        document.getElementById('error-phone').innerText="请输入正确的手机号";
        isValid = false;
    }else {
        $('.error-phone').css({"display":'none'});
        isValid = true;
    }
    if(captcha == ""){
        $('.error-code').css({"display":'initial'});
    }else if(!/^[A-z0-9]{4,6}$/.test(captcha)){
        $('.error-code').css({"display":'initial'});
        document.getElementById('error-code').innerText="验证码错误，请重新输入";
    }else {
        $('.error-code').css({"display":'none'});
        if(isValid){
            if(isFirst){
                isFirst = false;
                sendCode(mobile,captcha);
            }
            // countDown();
        }
    }
}

//60m倒计时
function countDown(){
    var val = document.getElementById('getcode-btn');
    if (countdown == 0) {
        val.removeAttribute("disabled");
        val.innerHTML="重新发送";
        isFirst = true;
        countdown=60;
        return;
    }else {
        val.setAttribute("disabled", true);
        val.innerHTML=countdown+"秒倒计时";
        countdown--;
    }
    setTimeout(function() {
        countDown(val);
    },1000)
}

//注册用户
function onRegisterBtn(){
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var code = document.getElementById("code").value;
    var phone_code = document.getElementById("phone-code").value;
    var password = document.getElementById("password").value;
    var love_job = document.getElementById("love-job").innerHTML;
    var love_trade = document.getElementById("love-trade").innerHTML;
    var born_date = document.getElementById("born_date").value;
    var schooling = $('.schooling option:selected').attr("value");
    if(name === ""){
        $('.error-name').css({"display":'initial'});
    }else {
        $('.error-name').css({"display":'none'});
    }

    var mobile_reg=/^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/i;//验证手机正则
    if(phone === ""){
        $('.error-phone').css({"display":'initial'});
    }else if(!mobile_reg.test(phone)){
        $('.error-phone').css({"display":'initial'});
        document.getElementById('error-phone').innerText="请输入正确的手机号";
    }else {
        $('.error-phone').css({"display":'none'});
    }

    var pwd_reg = /^[A-Za-z0-9]{6,20}$/;//验证密码规则
    if(password === ""){
        $('.error-password').css({"display":'initial'});
    }else if(!pwd_reg.test(password)){
        $('.error-password').css({"display":'initial'});
        document.getElementById('error-password').innerText="请输入正确的密码";
    }else {
        $('.error-password').css({"display":'none'});
    }
    if(love_job === "选择/修改"){
        $('.error-love-job').css({"display":'initial'});
    }else {
        $('.error-love-job').css({"display":'none'});
    }
    if(love_trade === "选择/修改"){
        $('.error-love-trade').css({"display":'initial'});
    }else {
        $('.error-love-trade').css({"display":'none'});
    }
    if(born_date === ""){
        $('.error-born-date').css({"display":'initial'});
    }else {
        $('.error-born-date').css({"display":'none'});
    }
    if(schooling === ""){
        $('.error-schooling').css({"display":'initial'});
    }else {
        $('.error-schooling').css({"display":'none'});
    }
    var person_desired_position = document.getElementById("funtype").value;
    var person_desired_industry = document.getElementById("company_type").value;

    if(name!="" && phone!="" && password!="" && love_job!="" && love_trade!="" && born_date!="" && schooling!=""){
        var user_ticket = getCookie("user_ticket");
        $.ajax({
            url: "http://interface.veryeast.cn/user/register",
            // type: "POST",
            dataType: "JSONP",
            async: false,
            data: {
                'username':name,
                'mobile':phone,
                'password':password,
                'person_desired_position':person_desired_position,
                'person_desired_industry':person_desired_industry,
                'degree':schooling,
                'birthday':born_date,
                'register_type':"callback_json",
                'user_type':1,
                'user_ticket':user_ticket
            },
            xhrFields:{
                 withCredentials: true
            },
            success: function( data ){
                if(data.status == 1){

                }else{

                }
            },
            error: function () {
                console.log('error');
                set_micro_resume();
            }

        })
    }
}

//保存微简历信息
function set_micro_resume(){
    var user_ticket = getCookie("user_ticket");
    var appchannel = "";
    var gender = gender;
    var mobile = document.getElementById("phone").value;
    var birthday = document.getElementById("born_date").value;
    var person_desired_position = document.getElementById("funtype").value;
    var person_desired_industry = document.getElementById("company_type").value;
    var degree =  $('.schooling option:selected').attr("value");
    $.ajax({
        url: "http://mobile.interface.veryeast.cn/resume/set_micro_resume",
        // type: "POST",
        dataType: "JSONP",
        async: false,
        data: {
            'user_ticket':name,
            'appchannel':'1',
            'gender':gender,
            'mobile':mobile,
            'birthday':birthday,
            'person_desired_position':person_desired_position,
            'person_desired_industry':person_desired_industry,
            'degree':degree
        },
        xhrFields:{
             withCredentials: true
        },
        success: function( data ){
            if(data.status == 1){
                window.location.href = "http://www.veryeast.cn/";
            }else{

            }
        },
        error: function () {
            console.log('error');
        }

    })
}
