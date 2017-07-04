define(["jquery","form"],function($){
	// 点击 创建课程 发送ajax请求
	$("#course-save").click(function(){
		var value = $("#course-title").val().trim();
		if (value != "") {
			$("#course-title").attr("value",value);
			$("form").ajaxSubmit({
				url : "/api/course/create",
				type : "post",
				success : function(data) {
					if (data.code == 200) {
						location.href = "/course/step1?cs_id="+data.result.cs_id;
					}
				}
			});
		}
		
		return false;
	})
})