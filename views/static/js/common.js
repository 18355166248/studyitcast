define(["jquery","template","cookie"],function($,template){
	$(function(){
		if ("/dashboard/login" != location.pathname) {
			var userInfo = JSON.parse($.cookie("userInfo"));
	    var str = template("profile-tpl",userInfo);
	    $("#avater").html(str);
		}
  })
})
//  获取 cookie里面的数据