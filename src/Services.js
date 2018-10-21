//khai bao thu vien, port,doi tuong ket noi mongodb
var express = require('express');
//tao doi tuong app theo kieu express
var app = express();

var bodyParer = require('body-parser');


var fs = require('fs');
//dat port la 8080
app.listen(8080);
//tao doi tuog ket noi mongodb theo url
var urldb = "mongodb://localhost/27017";
var mongodb = require('mongodb').MongoClient;
//thu vien body de lay doi tuong client
app.use(bodyParer.json());
app.use(bodyParer.urlencoded({extended: true}));


//lay du lieu bang tu mongodb
app.get('/Thongtin', function (req,res){
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
})
app.post('/addThongtin', function(req, res){
    res.writeHead(200, { 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
    //tao doi tuong body de ket noi den client data
    var NameAdd = req.body.Name
    var AgeAdd = req.body.Age
    var GenderAdd = req.body.Gender
    var AdressAdd = req.body.Adress
    var result
    mongodb.connect(urldb, function (err, db){
        if(err) throw err;
        var database = db.db('ThongTinCaNhan');
        var them = { Name: NameAdd, Age: AgeAdd, Gender: GenderAdd,Adress: AdressAdd};
        database.collection('Thongtin').insertOne(them, function(err, ob){
            if(err) throw err;
            console.log('Insert completed');
            db.close();
            if(ob.result.n>0)
            result = 'Insert completed'
            res.end(result);
        })
      
    })
})
