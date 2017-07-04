define(["jquery","template","util"],function($,template,util){
	// 获取地址栏cs_id数据
	var csid = util.getObject("cs_id");
	$.ajax({
		url : "/api/course/lesson",
		data : {cs_id : csid},
		success : function(data){
			if(data.code == 200) {
				console.log(data);
				var html = template("step3-tpl",data.result);
				$(".steps").html(html);
			}
		}
	})
})