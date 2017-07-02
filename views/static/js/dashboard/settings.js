define(["jquery","ckeditor","region","datepiker","datepicker-CN"],function($,CKEDITOR){
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
	})
})