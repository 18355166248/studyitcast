define(["jquery","ckeditor","template","nprogress","region","datepiker","datepicker-CN","uploadify","form"],function($,CKEDITOR,template,NProgress){
	var avaterImg ;
    //页面需要渲染  发送ajax请求
   	$.ajax({
   		url : "/api/teacher/profile",
   		success : function(data) {
   			if (data.code == 200) {
   				// 渲染页面 
   				var html = template("settin-tpl",data.result);
   				$(".settings").html(html);

   				// CKEDITOR 设置CKEDITOR 里面显示的功能
				CKEDITOR.replace("tc_introduce",{
					toolbarGroups : [
				        { name: 'clipboard'},
				        { name: 'links' },
				        { name: 'basicstyles' },
				        { name: 'styles' },
				        { name: 'colors' },
				        { name: 'about' }
				    ]
				});
				// 用region 插件 引入json数据
				$("#region").region({
					url : "/views/assets/jquery-region/region.json"
				});
				//出生日期插件 入职日期插件
				$("#tc_birthday").datepicker({
					format : "yyyy-mm-dd",
					language : "zh-CN",
					autoclose: true
				});
				$("#tc_join_date").datepicker({
					format : "yyyy-mm-dd",
					language : "zh-CN",
					autoclose: true
				});
				// 使用uploadify插件 使可以上传图片给服务器
			    $("#upfile").uploadify({
			        height :120,
			        width : 120,
			        //  放入flash标签
			        swf : '/views/assets/uploadify/uploadify.swf',
			        //  请求地址
			        uploader : '/api/uploader/avatar',
			        // 要在服务器端使用文件对象的名称  意思为请求参数
			        fileObjName : "tc_avatar",
			        // 隐藏中间文字
			        buttonText : "",
			        // 用空标签代替html模板 可以让其不显示
			        itemTemplate : "<div></div>",
			        // 文件上传之前立即触发  动态加载进度条样式
			        onUploadStart : function() {
			        	NProgress.start();
			        },
			        // 上传成功后触发的事件
			        onUploadSuccess : function(file,data,responce) {
			        	var data = JSON.parse(data);
			        	avaterImg = data.result.path;
			        	$(".preview>img").attr("src",data.result.path);
			        },
			        // 每个文件触发一次 无乱成功失败都会触发 动态加载结束进度条样式
			        onUploadComplete : function() {
			        	NProgress.done();
			        }
			    })

   			}
   		}
   	})


   	// 点击保存 触发button事件 自动将form表单中的vlaue属性值提交 需要用到form插件
   	$(".settings").on("submit","form",function(){
   		$(this).ajaxSubmit({
   			url : "/api/teacher/modify",
   			type : 'post',
   			success : function(data) {
   				if (data.code == 200) {
   					$("#avater img").attr("src",avaterImg);
   					alert("个人资料修改成功!");
   				}
   			}
   		});
   		return false;
   	})
})