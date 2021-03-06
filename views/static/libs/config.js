require.config({
	baseUrl : "/views",
	paths : {
		"jquery" : "assets/jquery/jquery.min",
		"cookie" : "assets/jquery-cookie/jquery.cookie",
		"form" : "assets/jquery-form/jquery.form",
		"template" : "assets/artTemplate/template",
		"bootstrap" : "assets/bootstrap/js/bootstrap.min",
		"util" : "static/js/util",
		"nprogress" : "assets/nprogress/nprogress",
		"datepiker" : "assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
		"datepicker-CN" : "assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
		"validate" : "assets/jquery-validate/jquery-validate.min",
		"ckeditor" : "assets/ckeditor/ckeditor",
		"region" : "assets/jquery-region/jquery.region",
		"uploadify" : "assets/uploadify/jquery.uploadify",
		"jcrop" : "assets/Jcrop/js/Jcrop"
	},
	shim : {
		"bootstrap" : {
			deps : ["jquery"]
		},
		"datepicker-CN" : {
			deps : ["datepiker"]
		},
		"validate" : {
			deps : ["jquery"]
		},
		"ckeditor" : {
			exports : "CKEDITOR"
		},
		"uploadify" : {
			deps : ["jquery"]
		},
		"jcrop" : {
			deps : ["jquery"]
		}
	}
})