var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
const imageFolder = 'public/images/gallery/';
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tutorial', message: '', error: false });
});


/* GET gallery page. */
router.get('/gallery', function(req, res, next) {
  var images = [];
  var split,fileExtension;
fs.readdir(imageFolder, (err, files) => {
  files.forEach(file => {
    split = file.indexOf('.');
    fileExtension = file.substr(split);
    if(fileExtension == '.jpg' || fileExtension == '.jpeg' || fileExtension == '.tiff' || fileExtension == '.png' || fileExtension == '.svg' || fileExtension == '.gif' ){

    images.push(file);
  }
  });
    res.render('gallery', { title: 'Gallery', images: images, message: '', error: false});
  });
});

/* GET add image page. */
router.get('/add', function(req, res, next) {
  res.render('add-image', { title: 'Gallery', message: '', error: false });
});

/* POST Add Image to Gallery */
router.post('/add', function(req,res, next){

  var sampleFile, split, name;
     if (!req.files) {
         res.send('No files were uploaded.');
         return;
     }

     sampleFile = req.files.sampleFile;
     split = sampleFile.name.indexOf('.');
     fileName = sampleFile.name.substr(0,split);
     fileExtension = sampleFile.name.substr(split);

     if(fileExtension == '.jpg' || fileExtension == '.jpeg' || fileExtension == '.tiff' || fileExtension == '.png' || fileExtension == '.svg' || fileExtension == '.gif' ){
       sampleFile.mv('public/images/gallery/'+fileName+fileExtension, function(err) {
           if (err) {
             res.render('add-image', {title: 'Add Image to Gallery', message: 'Error uploading image', error: true});
           }
           else {
               res.render('add-image', {title: 'Add Image to Gallery', message: 'Image Added', error: false});
           }
       });
     }else{
       res.render('add-image', {title: 'Gallery', message: 'Invalid file extension', error: true});

     }
   })


module.exports = router;
