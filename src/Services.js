//khai bao thu vien, port,doi tuong ket noi mongodb
var express = require('express');
//tao doi tuong app theo kieu express
var app = express();

var fs = require('fs');
//dat port la 8080
app.listen(8080);
//tao doi tuog ket noi mongodb theo url
var urldb = "mongodb://localhost/27017";
var mongodb = require('mongodb').MongoClient;


//lay du lieu bang tu mongodb
app.get('/', function (req,res){
    //lay du lieu theo UTF-8
        //200 la so thong bao thao tac thanh cong
        res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' });
    //hien thi du lieu tu bang Thongtin
    mongodb.connect(urldb, function(err,db){
        if (err) throw err;
        var database =  db.db('ThongTinCaNhan');
        database.collection('Thongtin').find({}).toArray(function(err, result){
            if(err) throw err;
            //hien thi du lieu tren console Terminal
            console.log(result);
            //Xu ly du lieu sang json
          var json  = JSON.stringify(result);
          //co res.end() thi server moi hien tih duoc du lieu
          res.end(json);
            db.close();    
        })
    });
});