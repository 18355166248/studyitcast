<?php 
    // 如果能够获取到用户在线接最后面传进来的 /模块名称/文件名
    // 就可以找到php代码找到该文件并且返回

    // 1. 获取用户在连接后面传进来的 /模块名称/文件名
    //默认值  不传值  默认用这个
    $path = "/dashboard/index";
    if (array_key_exists("PATH_INFO",$_SERVER)) {
        $path = $_SERVER['PATH_INFO'];
    }
    // 2. 获取目录名称
    $pathArr = explode("/",substr($path,1));
    // 如果用户啥都没传  就用默认值
    $directory = "dashboard";
    $fileName = "index";

    if (count($pathArr) == 2) {
        $directory = $pathArr[0];
        $fileName = $pathArr[1];
    }

    $filePath = "/views/".$directory."/".$fileName.".html";

    include $filePath;
 ?>