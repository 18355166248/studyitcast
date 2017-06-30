define(["jquery","template","cookie"],function($,template){
	$(function(){
		if ("/dashboard/login" != location.pathname) {
			// 判断 如果在非登录页没有sessid这个值 表示没登录 需要跳转到登录页
			if (!$.cookie("PHPSESSID")) {
				location.href = "/dashboard/login";
			} else {
				//  获取 cookie里面的数据 头像和姓名 渲染到左上角
				var userInfo = JSON.parse($.cookie("userInfo"));
		    var str = template("profile-tpl",userInfo);
		    $("#avater").html(str);
			}
		}

		// 点击 退出 跳转到登录页面 
		$("#logout").click(function(){
			$.ajax({
				url : '/api/logout',
				type : "post",
				success : function(data) {
					if (data.code == 200) {
						location.href = "/dashboard/login";
					}
				}
			})
		})

		// 点击左侧栏 点击到哪个 给他添加active  其他删除active类
		$("#teacherlist>li").click(function(){
			$(this).children("a").addClass("active");
			$(this).siblings().children("a").removeClass("active");
		})

		// 左侧栏 点击课程管理可以显示隐藏二级菜单 
		$("#teacherlist>li>ul").parent().click(function(){
			var $ul = $(this).children("ul")
			$ul.toggle();

			// 判断 如果 二级菜单下有li 有active name就把父元素的active 给删除
			if ($ul.find("a.active").length > 0) {
				$(this).children("a").removeClass("active");
			}
		})

		// 判断地址 如果当前地址在哪个 就让哪个li显示
		$("#teacherlist a").each(function(i,v) {
			if($(v).attr("href") == location.pathname) {
				$(v).addClass("active");
				$(v).siblings().removeClass("active");
			}
		})
  })
})
