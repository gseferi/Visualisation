var express = require('express');
var THREE = require('three');
var router = express.Router();
var fs = require('fs'); //read file
var datajson = './data.json'
var modeljson ='./images.json'

/* GET home page. */
router.get('/', function(req, res) {
    // jsonfile.readFile(file, function (err, obj) {
    //     if (err) console.error(err)
    //     console.log("readfile");
    //     console.dir(obj)
    //     console.log(obj.images.R);
    //   })
    console.log("get html");
    res.sendFile('index.html',{
      root:'C:/Users/Gerta/Desktop/uni/project/visualisation/views'
    });
});


router.get('/getmodel',function(req,res){
  fs.readFile(modeljson, function (err, obj) {
      if (err) console.error(err)
      console.log("readModel");
      console.dir("model obj", obj)
      modeljson=JSON.parse(obj);
      console.log("modeljson", modeljson);
      res.json(modeljson);
    });
});

router.get('/getdata',function(req,res){
  fs.readFile(datajson, function (err, obj) {
      if (err) console.error(err)
      console.log("readdata");
      console.dir("data obj", obj);
      // Concatenate RGBR here
      console.log("===============");



      // [-1.0, -1.0,  1.0],
      // [1.0, -1.0,  1.0],
      // [1.0,  1.0,  1.0],
      // [1.0,  1.0,  1.0]
      datajson=JSON.parse(obj);
      var array=[];
      var images=datajson.images;
      //console.log("length", Object.keys(datajson.images));
      Object.keys(images).forEach(function(key) {
        //console.log(images);
        console.log(key+'\n');
        var tag=images[key].tag;
        var data=images[key].data;
        console.log(data)
        var triangle1=data[0].concat(data[1]).concat(data[3]);
        console.log("triangle1 : " +  triangle1);
        var triangle2=data[0].concat(data[2]).concat(data[3]);
        console.log("triangle2 : " +  triangle2);
        var square=triangle1.concat(triangle2);
        console.log("square: ", square);
        array.push(square);
      });
      console.log("FINAL ARRAY :" + array);
      var newdata={
        data: array
      };

      //console.log(images);
      //console.log("upperleft: ", (datajson.images.UpperLeft["data"].concat(datajson.images.UpperRight["data"])).concat(datajson.images.BottomLeft["data"]));
      //console.log("datajson", datajson);
      res.json(newdata);
    });
});


module.exports = router;
