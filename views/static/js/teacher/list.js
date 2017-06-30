define(["jquery","template","bootstrap"],function($,template){
	// 将讲师信息 渲染到页面上
	$.ajax({
		url : "/api/teacher",
		type : "get",
		success : function(data) {
			if (data.code == 200) {
				var html = template("teacherArr-tpl",data);
				$("#teacherArr").html(html);
			}
		}
	})

	// 点击查看 查看讲师详细信息
	$("#teacherArr").on("click",".btn-check",function(){
		var tcId = $(this).parent().data("id")
		$.ajax({
			url : "/api/teacher/view",
			type : "get",
			data : { tc_id : tcId },
			success : function(data) {
				if(data.code == 200) {
					var html = template("teacherInfo-tpl",data.result);
					// 渲染 讲师个人信息
					$("#teacherInfo").html(html);
					// 弹出模态框  用bootstrap里面内置的方法
					$("#teacherModal").modal("show");
				}
			}
		}) 
	})	
})