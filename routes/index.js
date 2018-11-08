var express = require('express');
var THREE = require('three');
var router = express.Router();
var fs = require('fs'); //read file
var datajson = './data.json'
var modeljson ='./images.json'

/* GET home page. */
router.get('/', function(req, res) {
    console.log("get html");
    res.sendFile('index.html',{
      root:'C:/Users/Gerta/Desktop/uni/project/visualisation/views'
    });
});


router.get('/getmodel',function(req,res){
  fs.readFile(modeljson, function (err, obj) {
      if (err) console.error(err)
      modeljson=JSON.parse(obj);
      res.json(modeljson);
    });
});

router.get('/getdata',function(req,res){
  fs.readFile(datajson, function (err, obj) {
      if (err) console.error(err)

      datajson = JSON.parse(obj);

      var array = [];
      var images = datajson.images;

      Object.keys(images).forEach(function(key) {
        console.log('\n' + key + ':');
        var tag = images[key].tag;
        var data = images[key].data;
        console.log(data)
        var triangle1 = data[0].concat(data[1]).concat(data[3]);
        console.log("triangle1 : " +  triangle1);
        var triangle2 = data[0].concat(data[2]).concat(data[3]);
        console.log("triangle2 : " +  triangle2);
        var square = triangle1.concat(triangle2);
        console.log("square: ", square);
        array.push(square);
      });
      console.log("\nFINAL ARRAY :" + array);
      var newdata={
        data: array
      };

      res.json(newdata);
    });
});


module.exports = router;
