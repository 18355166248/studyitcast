define(["jquery","template"],function($,template){
	$.ajax({
		url : "/api/course",
		success : function(data) {
			if (data.code == 200) {
				console.log(data);
				var html = template("course-tpl",data);
				$("#course-list").html(html);
			}
		}
	})
})