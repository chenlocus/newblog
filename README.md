利用互联网去发展这个博客，充分利用互联网思维，让这个网站像野草，像病毒一样蔓延到人们的心中，日常生活之中！
我希望这个项目从头至尾，包括后期的网站推广，都充分利用互联网资源，充分利用互联网思维方式！
人们在写博客的时候，很多是不希望被别人看到的，只想被自己希望的人看到并且评论，对每篇自己的文章指定一些人可以看到，而不是现行互联网上被一堆不相干的所谓朋友看到，也不希望被一堆不相干的人骚扰，这正是这个网站希望达到的最初目的，我想知道，在这种情况下，它会发展成什么样的一种环境？工作经验的分享？写给情人的文章？分享旅游的快乐？分享偷情的愉悦？


要顺利运行起来，在npm install生成node_modules后，需要手工修改一小段代码：
newblog/node_modules/connect-mongo/lib/connect-mongo.js

line 161:

 //throw new Error('Error setting TTL index on collection : ' + self.db_collection_name);
 console.log(err);
 
 这是模块兼容的问题，我目前没找到彻底解决方法，但是这样就可以work around了。
