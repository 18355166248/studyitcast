define(function() {
	return  {
		getObjectId : function() {
			var search = location.search.slice(1);
			var objs = search.split("&");
			var obj = {};
			objs.forEach( function(ele, i) {
				var arr = ele.split("=");
				obj[arr[0]] = arr[1];
			});
			return obj;
		},
		getObject : function(val) {
			return this.getObjectId()[val];
		}
	}
})