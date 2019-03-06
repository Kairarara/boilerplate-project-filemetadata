'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer=require("multer")

var app = express();

/*
User stories:
    I can submit a form that includes a file upload.
    The form file input field has the "name" attribute set to "upfile". We rely on this in testing.
    When I submit something, I will receive the file name and size in bytes within the JSON response

Usage :
    Go to the main page, and upload a file using the provided form.

Hint:
    To handle the file uploading you should use the multer npm package.
*/
let upload=multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

//---------------------------------

app.post("/api/fileanalyse",upload.single("upfile"),(req,res)=>{
  let obj={
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  console.log(12);
  res.json(obj);
})

//---------------------------------

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
