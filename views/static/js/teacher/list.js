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

	// 点击注销 修改发送ajax请求 
	$("#teacherArr").on("click",".btn-onoff",function(){
		var id = $(this).parent().data("id");
		var status = $(this).data("status");
		var $that = $(this);
		$.ajax({
			url : "/api/teacher/handle",
			type : "post",
			data : { tc_id : id , tc_status : status },
			success : function(data) {
				if (data.code == 200) {
					$that.data("status",data.result.tc_status);
					if ($that.data("status") == 0) {
						$that.html("注 销").removeClass("btn-success").addClass("btn-warning");
					} else {
						$that.html("启 用").removeClass("btn-warning").addClass("btn-success");
					}
				}
			}
		})
	})



		



})