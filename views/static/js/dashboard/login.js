define(["jquery","cookie","form"],function($){
	$(function() {
      // 判断有没有cookie 渲染登录页头像
      if ($.cookie("userInfo")) {
        var userinfo = JSON.parse($.cookie("userInfo"));
        $(".avatar>img").attr("src",userinfo.tc_avatar);
      } else {
        $(".avatar>img").attr("src","/views/static/uploads/monkey.png");
      }
      // 点击登录 发送ajax请求
      $("#login-form").submit(function(){
          $(this).ajaxSubmit({
              url : "/api/login",
              type : "post",
              success : function(data) {
                  if (data.code == 200) {
                      // 请求成功 存储cookie 并跳转首页
                      $.cookie("userInfo",JSON.stringify(data.result),{expires:2 , path: '/'});
                      location.href = "/";
                  }
              },
              error : function() {
                  console.log("出错了");
              }
          });
          return false;
      })
  })
})