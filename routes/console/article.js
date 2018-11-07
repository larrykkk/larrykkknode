var express = require("express");
var router = express.Router();
var db = require("../../models/db");

// 解析上傳檔案模組
var formidable = require("formidable"),
  http = require("http"),
  util = require("util");

const storagePath = "http://localhost:3000/uploads/"; //儲存路徑

//文章
router.get("/", function(req, res, next) {
  var query = db.query("select * from article", function(err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    res.render("console/article/article", {
      article: data
    });
  });
});

router.get("/add", function(req, res, next) {
  res.render("console/article/articleAdd", {
    title: "addArticle",
    text: "hello world addArticle page"
  });
});

//接收新增的文章
router.post("/add", function(req, res, next) {
  var form = new formidable.IncomingForm();

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "../../../public/uploads/" + file.name;
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });

  form.parse(req, function(name, fields, files) {
    var addItem = {
      img: storagePath + files.img.name,
      name: fields.name,
      content: fields.content
    };

    console.log(addItem);

    var newArticle = [["", addItem.name, addItem.content, addItem.img]];

    console.log(newArticle);
    var query = db.query(
      "insert into article (ID, title, content, imgUrl) VALUES ?",
      [newArticle],
      function(err, rows) {
        if (err) {
          res.render("console/article/articleAdd", {
            errMsg: "新增失敗! 錯誤訊息: " + err
          });
        } else {
          res.render("console/article/articleAdd", {
            addItem: "新增成功! 內容: " + JSON.stringify(addItem)
          });
        }
      }
    );
  });
});

router.get("/edit", function(req, res, next) {
  var id = req.query.id;
  var query = db.query("SELECT * FROM article WHERE title = ?", [id], function(
    err,
    rows
  ) {
    var data = rows;
    res.render("console/article/articleEdit", { article: data[0] });
  });
});

router.post("/edit", function(req, res, next) {
  var form = new formidable.IncomingForm();

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "../../../public/uploads/" + file.name;
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });

  form.on("error", function(err) {
    console.log(err);
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }
    var article = {
      title: fields.title,
      content: fields.content,
      imgUrl: storagePath + files.img.name
    };

    var query = db.query(
      "UPDATE article SET title = ?, content = ?, imgUrl = ? WHERE title = ?",
      [article.title, article.content, article.imgUrl, article.title],
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        var data = rows;
        res.redirect("/console/article");
      }
    );
  });
});

router.get("/delete", function(req, res, next) {
  var article = req.query.id;

  var query = db.query(
    "DELETE FROM article WHERE title = ?",
    [article],
    function(err, rows) {
      if (err) {
        console.log(err);
      }
      res.redirect("/console/article");
    }
  );
});
module.exports = router;
