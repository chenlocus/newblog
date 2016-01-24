var mongodb = require('./db');

function Friend(friend) {
  this.name = friend.name;
  this.friend_name =friend.friend_name;
  this.tags = friend.tags;
};

module.exports = Friend;

//存储用户信息
Friend.prototype.add = function(callback) {
  //要存入数据库的用户信息文档
  var friend = {
      name: this.name,
      friend_name: this.friend_name,
      tags: this.tags
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      console.log("failed to open database");
      return callback(err);//错误，返回 err 信息
    }
    //读取 friends 集合
    db.collection('friends', function (err, collection) {
      if (err) {
        console.log("failed to open database friends");
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(friend, {
        safe: true
      }, function (err,friend) {
        mongodb.close();
        if (err) {
          console.log("failed to insert data into database friends");
          return callback(err);
        }
        console.log("success add friend into database");
        callback(null);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

Friend.remove = function(name, friend_name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 friends 集合
    db.collection('friends', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查询要删除的文档
      collection.findOne({
        "name": name,
        "friend_name":friend_name 
      }, function (err, doc) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
      });
      collection.remove({
         "name": name,
        "friend_name":friend_name
        }, {
          w: 1
        }, function (err) {
          mongodb.close();
          if (err) {
            return callback(err);
          }
          callback(null);
      });
    });
  });
};

//返回用户所有标签
Friend.getTags = function(name,callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('friends', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //distinct 用来找出给定键的所有不同值
      collection.distinct("tags", { name: name }, function (err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};

//读取一个朋友信息
Friend.get = function(name,friend_name, callback) {
  //打开数据库
  console.log("Friend get database");
  mongodb.open(function (err, db) {
    if (err) {
      console.log("cannot open database");
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('friends', function (err, collection) {
      if (err) {
        console.log(err);
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name,
        friend_name: friend_name
      }, function (err, friend) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, friend);//成功！返回查询的用户信息
      });
    });
  });
}

//读取所有朋友信息
Friend.getAllFriends = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('friends', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      var myCursor =collection.find({
        name: name
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        console.log("getAllFriends");
        console.log(myCursor);
        console.log(name);
        callback(null, docs);//成功！返回查询的用户信息
      });
    });
  });
};