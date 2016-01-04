利用互联网去发展这个博客，充分利用互联网思维，让这个网站像野草，像病毒一样蔓延到人们的心中，日常生活之中！
我希望这个项目从头至尾，包括后期的网站推广，都充分利用互联网资源，充分利用互联网思维方式！

人们在写博客的时候，很多是不希望被别人看到的，只想被自己希望的人看到并且评论，对每篇自己的文章指定一些人可以看到，而不是现行互联网上被一堆不相干的所谓朋友看到，也不希望被一堆不相干的人骚扰，这正是这个网站希望达到的最初目的，我想知道，在这种情况下，它会发展成什么样的一种环境？工作经验的分享？写给情人的文章？分享旅游的快乐？分享偷情的愉悦？

技术关键词：node.js, mongodb, css, eje.

要顺利运行起来，在npm install生成node_modules后，需要手工修改一小段代码：
newblog/node_modules/connect-mongo/lib/connect-mongo.js

line 161:

 //throw new Error('Error setting TTL index on collection : ' + self.db_collection_name);
 console.log(err);
 
 这是模块兼容的问题，我目前没找到彻底解决方法，但是这样就可以work around了。

感谢N-blog的博主，在此引用了他的框架系统，在此系统上进行功能修改和延伸。

目前具备的功能：用户注册，登录，退出，发博客，转载，留言，博客编辑，删除，文件上传。

拓展/修改功能清单：

第一阶段:
	好友管理：
1．	注册用户可以加入别的用户作为好友，好友通过搜索获取，系统要马上通知好友的id是否有效；
2．	对好友进行分类成朋友圈，每个朋友圈有一个唯一识别号，系统要提示重复的识别号；

	博客可见性：
1．文章在发布后，缺省是私有，可以分享给单个，多个好友或者单个，多个朋友圈；
2．在home主页，注册用户只能看到自己发布的博客；
3．在share主页，注册用户才能看到朋友分享给他/她看的文章；

	留言
1．	看得见博客，就能够留言；
2．	采用第三方 Disqus实现留言管理。
3．	留言的人只能看到自己的留言和博主对自己的回复，无法看见别人的留言。

	博客编辑的改进
1．	使用KindEditor；
2.  使用 name 、day 、title 查询一篇文章有个小 bug ，即不能在同一天发表相同标题的文章，或者说发表了相同标题的文章后只能返回最近发表的那篇文章。使用 _id 就可以很好的避免这个 bug；



第二阶段:
	采用数据库连接池；
	网站首页
1.  有心灵鸡汤文字和图片，系统需要提供网站管理员编辑功能；
2.  注册用户写的文章他自己可以选择公开，那么将出现在网站首页；
