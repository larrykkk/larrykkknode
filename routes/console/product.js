var express = require("express");
var router = express.Router();
var pool = require("../../models/hdb");

// 解析上傳檔案模組
var formidable = require("formidable"),
  http = require("http"),
  util = require("util");

const storagePath = "http://localhost:3000/uploads/"; //儲存路徑

//商品列表
router.get("/", function(req, res, next) {
  var query = pool.query("select * from product", function(err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    res.render("console/product/product", {
      product: data
    });
  });
});

//新增商品
router.get("/add", function(req, res, next) {
  res.render("console/product/productAdd");
});

router.post("/add", function(req, res, next) {
  var form = new formidable.IncomingForm();

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "../../../public/uploads/" + file.name;
  });

  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });

  form.parse(req, function(err, fields, files) {
    var imgUrl = storagePath + files.img.name; //照片連結

    var product = [[fields.name, fields.price, imgUrl, fields.description]];
    var insertProduct = pool.query(
      "insert into product (name, price, image, description) VALUES ?",
      [product],
      function(err, rows) {
        if (err) {
          console.log(err);
          res.render("console/product/productAdd", {
            success: "錯誤: " + JSON.stringify(err)
          });
        }
        res.render("console/product/productAdd", {
          success: "新增成功 內容: " + JSON.stringify(product)
        });
      }
    );
  });
});

//修改商品
router.get("/edit", function(req, res, next) {
  var id = req.query.id;
  var query = pool.query("SELECT * FROM product WHERE name = ?", [id], function(
    err,
    rows
  ) {
    var data = rows;
    // console.log(data)
    res.render("console/product/productEdit", { product: data[0] });
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

  form.parse(req, function(err, fields, files) {
    var update = {
      name: fields.name,
      price: fields.price,
      img: storagePath + files.img.name,
      description: fields.description
    };

    var query = pool.query(
      "UPDATE product SET name = ?, price = ?, image = ?, description = ? WHERE name = ?",
      [update.name, update.price, update.img, update.description, update.name],
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        res.redirect("/console/product");
      }
    );
  });
});

//刪除商品
router.get("/delete", function(req, res, next) {
  var productDel = req.query.id;

  var query = pool.query(
    "DELETE FROM product WHERE name = ?",
    [productDel],
    function(err, rows) {
      if (err) {
        console.log(err);
      }
      res.redirect("/console/product");
    }
  );
});

module.exports = router;
