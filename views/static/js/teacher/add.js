define(["jquery","template","util","form","datepiker","datepicker-CN","validate"],function($,template,util){
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
					    language : "zh-CN"
					});
					getVolidate();
				}
			}
		})
		
	} else {
		var html = template("teacheradd-tpl",{
			title : "添加",
			btnAdd : "添 加"
		})
		$("#teacheradd").html(html);
		$('#datetimepicker').datepicker({
		    format: 'yyyy-mm-dd',
		    language : "zh-CN"
		});
		getVolidate();

	}


	// volidate 封装一下
	function getVolidate() {
		$("#teacherform").validate({
			sendForm : false,
			onBlur : true,
			valid : function() {
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
			},
			eachValidField : function() {
				this.parent().parent().removeClass("has-error").addClass('has-success');
			},
			eachInvalidField : function() {
				this.parent().next().removeClass('hide');
				this.parent().parent().removeClass("has-success").addClass('has-error');
			},
			description : {
				"tcname" : {
					required : "用户名不能为空!",
					pattern : "请输入5-10个以字母开头,可带数字"
				},
				"tcpass" : {
					required : "密码不能为空!",
					pattern : "请输入字母+数字或特殊字符"
				},
				"tc_join_date" : {
					required : "用户名不能为空!"
				}
			}
		})
	}
	
})