# tableExport.js #

最近项目中做了一个`table`导出文件的东西，网上找了好久但是很多缺陷，要么就是很大一个库，要么就是中文乱码，于是自己弄了一下，很小，而且不会中文乱码，现在共享出来。

还很不完善，没有作太多的兼容处理，目前只做了`json`、`txt`、`csv`、`xsl`，要加`pdf`或者图片什么的可能要加入更多的依赖库，所以我没有做，需要的话自己加进去。

原始的代码是可以不依赖别的任何库的（jquery只是因为项目中用了所以直接写成了jquery插件的形式）：

![](http://blog.u.qiniudn.com/uploads%2FtableExport.jpg)

原始的代码在`jquery.tableExport.js`中，用法如下：

	<a download="filename.json" href="javascript:;" onclick="$('#J-table').tableExport(this, 'json');">JSON</a>

通过浏览器的`download`属性来实现文件名设置，这个目前只有firefox和chrome支持这个属性。

### tableExport.js ###

后来稍微作了一下修改，加入了两个依赖库：[FileSaver.js](https://github.com/eligrey/FileSaver.js) 和 [Blob.js](https://github.com/eligrey/Blob.js)

在导出的时候只提取`table`里面的文本信息，链接什么的会被过滤掉，代码也很简单，使用也很简单：
	
	document.getElementById('xls').addEventListener('click', function(e){
		e.preventDefault();
		//tableId  filename  filetype:json txt csv doc xls
		tableExport('table1', '测试测试', 'doc');
	}, false);


想用的可以下载下来根据自己的需要修改。








	










	

	

