require.config({
	baseUrl : "/views",
	paths : {
		"jquery" : "assets/jquery/jquery.min",
		"cookie" : "assets/jquery-cookie/jquery.cookie",
		"form" : "assets/jquery-form/jquery.form",
		"template" : "assets/artTemplate/template",
		"bootstrap" : "assets/bootstrap/js/bootstrap.min",
		"util" : "static/js/util",
		"datepiker" : "assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
		"datepicker.zh-CN" : "assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
	},
	shim : {
		"bootstrap" : {
			deps : ["jquery"]
		},
		"datepicker.zh-CN" : {
			deps : ["datepiker"]
		}
	}
})