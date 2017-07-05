define(["jquery","template","util","bootstrap","form"],function($,template,util){
	// 获取地址栏cs_id数据
	var csid = util.getObject("cs_id");
	$.ajax({
		url : "/api/course/lesson",
		data : {cs_id : csid},
		success : function(data){
			if(data.code == 200) {
				// console.log(data);
				// 渲染页面
				var html = template("step3-tpl",data.result);
				$(".steps").html(html);
				// 同步课时数据
				$("dd:contains('课时：')").text('课时：'+data.result.lessons.length);
			}
		}
	})
	// 点击添加课时 弹出模态框
	$(".steps").on("click","#addcourse",function(){
		$("#chapterModal").modal("show");
		var html = template("mainModal",{
			title : "添加课时",
			add : "添 加"
		});
		$(".modal-content").html(html);
	})

	// 点击添加按钮 发送ajaxSubmit请求 添加课时
	$(".modal-content").on("click","#btnadd",function(){
		// 判断 免费课时 是否被勾上 判定是否免费 ct_is_free
		var ct_free = 0;
		if ($("#freecourse").prop("checked")){
			ct_free = 1;
		}
		var url = "/api/course/chapter/add" // 默认为添加课时
		//判断 如果 有data type 值 那么就是编辑页面 
		var type = $(this).data("type");
		if (type == "edit") {
			url = "/api/course/chapter/modify";
		}
		// 发送添加课时请求 
		$("form").ajaxSubmit({
			url : url,
			type : "post",
			data : {
				ct_cs_id : csid,
				ct_is_free : ct_free
			},
			success : function(data){
				if(data.code == 200) {
					//添加课时成功后 隐藏模态框 重新渲染 列表区域
					$("#chapterModal").modal("hide");
					// 发送ajax请求 渲染 子模板
					$.ajax({
						url : "/api/course/lesson",
						data : {cs_id : csid},
						success : function(data){
							if(data.code == 200) {
								var html = template("course-list-tpl",data.result);
								$("#courselist").html(html);
								// 同步课时数据
								$("dd:contains('课时：')").text('课时：'+data.result.lessons.length);
							}
						}
					})
				}
			}
		})
	})

	//点击编辑 发送ajax请求 渲染模态框  弹出模态框
	$(".steps").on("click",".editcourse",function(){
		$("#chapterModal").modal("show");
		// 获取 ct_id
		var ctid = $(this).data("id");
		// 发送ajax请求
		$.ajax({
			url : "/api/course/chapter/edit",
			data : {ct_id : ctid},
			success : function(data) {
				if(data.code = 200) {
					data.result.title= "编辑课时";
					data.result.add = "保 存";
					data.result.type = "edit";
					var html = template("mainModal",data.result);
					$(".modal-content").html(html);
				}
			}
		})
	})

	
})