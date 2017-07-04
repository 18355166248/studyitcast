define(["jquery","template","util","form"],function($,template,util){
	// 获取地址栏cs_id数据
	var csid = util.getObject("cs_id");
	// 发送ajax请求 渲染页面
	$.ajax({
		url : "/api/course/basic",
		data : {cs_id : csid},
		success : function(data){
			if (data.code == 200) {
				// console.log(data);
				var html = template("step1-tpl",data.result);
				$(".steps").html(html);
			}
		}
	})
	// 点击保存 发送ajax请求 更新基本信息
	$(".steps").on("submit","form",function(){
		$(this).ajaxSubmit({
			url : "/api/course/update/basic",
			type : "post",
			success : function(data) {
				if (data.code == 200) {
					location.href = "/course/step2?cs_id="+csid;
				}
			}
		})

		return false;
	})
})