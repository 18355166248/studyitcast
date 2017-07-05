define(["jquery","template","util","nprogress","uploadify","jcrop"],function($,template,util,NProgress){
	// 获取地址栏cs_id数据
	var csid = util.getObject("cs_id");
	// 定义 4个变量 为 裁剪图片 左上角 x y值 还要 宽 高
	var x , y , w , h;
	var jcropApi;
	$.ajax({
		url : "/api/course/picture",
		data : { cs_id : csid },
		success : function(data) {
			if (data.code == 200) {
				// console.log(data);
				var html = template("step2-tpl",data.result);
				$(".steps").html(html);
				// 添加 uploadify插件  点击上传图片的时候 给后台发送ajax请求
				$("#uploadbtn").uploadify({
					swf : "/views/assets/uploadify/uploadify.swf",
					uploader : "/api/uploader/cover",
					//设置 按钮文字
					buttonText : "选择图片",
					// 给按钮标签添加类名
					buttonClass : "btn btn-success btn-sm",
					// 清空 渲染描述
					itemTemplate : "<p></p>",
					width : 70,
					// 要在服务器端使用文件对象的名称
					fileObjName : "cs_cover_original",
					// 可以设置 附加发送给服务器端数据值
					formData : {
						cs_id : csid
					},
					// 在文件上传之前触发
					onUploadStart : function() {
						NProgress.start();
						// 上传文件前 将裁剪按钮禁用 直到完成上传再释放裁剪按钮
						$("#cut-img").attr("disabled","disabled");
					},
					// 文件上传成功触发
					onUploadSuccess : function(file,data,response) {
						var data = JSON.parse(data);
						$(".preview>img").attr("src",data.result.path);
						//判断 如果有jcrop插件 就移除插件
						if(jcropApi) {
							jcropApi.destroy();
							$("#cut-img").text("裁切图片");
						}
					},
					// 文件上传不管失败成功后都会触发
					onUploadComplete : function() {
						NProgress.done();
						//  删除 disablued 属性 
						$("#cut-img").removeAttr("disabled");
					}
				})
				// 设置行高 使文字对齐
				$("#uploadbtn-button").css("lineHeight",1.5);
				// 点击裁剪 裁剪图片
				$('#cut-img').on("click",function(){
					//将上方小图片位置的图片删除
					$(".thumb>img").remove();
					
					// 判断 如果内容为裁剪图片 那么就裁剪并修改文内文字
					if ($(this).text() == "裁切图片") {
						$("#jcrop-img").Jcrop({
							// 设置纵横比 宽/高
							aspectRatio : 2,
							// 设置画布 高度 200
							boxHeight : 200,
							// 设置 初始化选取 左上角坐标和 宽高
							setSelect : [100,100,800,500]
						},function(){
						  jcropApi = this;
						  thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120 ,$thumb : $(".thumb")});
						});
						$(this).text("保存图片")
					} else {
						// 点击保存图片 发送ajax请求给后台
						
						$.ajax({
							url : "/api/course/update/picture",
							type : "post",
							data : {
								cs_id : csid,
								x : x,
								y : y,
								w : w,
								h : h
							},
							success : function(data) {
								if (data.code == 200){
									//跳转到step3
									location.href = "/course/step3?cs_id="+csid
								}
							}
						})
					}
					
				})
				// c是一个对象 里面有6个属性 宽 高 左上角x y值 右下角 x y值
				$('.preview').on('cropmove',function(e,s,c){
				  // 随着 选框的拖动 触发 cropmove事件 
				  x = c.x;
				  y = c.y;
				  w = c.w;
				  h = c.h;
				})
			}
		}
	})


})