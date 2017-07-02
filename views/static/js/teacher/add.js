define(["jquery","template","util","form","datepiker","datepicker.zh-CN"],function($,template,util){
	// 判断 如果地址栏传值 那么就是编辑 否则就是添加
	if(util.getObject("id")) {
		$.ajax({
			url : "/api/teacher/edit",
			type : "get",
			data : { tc_id : util.getObject('id') },
			success : function(data) {
				if (data.code == 200) {
					data.result.title = "编辑";
					data.result.btnAdd = "保存";
					var html = template("teacheradd-tpl",data.result)
					$("#teacheradd").html(html);
					$('#datetimepicker').datepicker({
					    format: 'yyyy-mm-dd',
					    startDate : "-5d",
					    endDate : "+5d",
					    language : "zh-CN"
					});
				}
			}
		})
		
	} else {
		var html = template("teacheradd-tpl",{
			title : "添加",
			btnAdd : "添 加"
		})
		$("#teacheradd").html(html);
	}
	//   判断是编辑还是添加老师  保存讲师信息
	$("#teacheradd").on("click","#teachersave",function(){
		var url ;
		if (util.getObject("id")) {
			url = "/api/teacher/update";
		} else {
			url = "/api/teacher/add";
		}

		$("#teacherform").ajaxSubmit({
			url : url,
			type : "post",
			success : function(data) {
				if (data.code == 200) {
					location.href = "/teacher/list"
				}
			}
		})
		return false;
	})
	
})