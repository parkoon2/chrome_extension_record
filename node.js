const http = require( 'http' );
const express = require( 'express' );
const app = express();
const path = require( 'path' );
const multer = require( 'multer' )

const mkdirp = require( 'mkdirp' )
//https://stackoverflow.com/questions/39677993/send-blob-data-to-node-using-fetch-multer-express
//https://stackoverflow.com/questions/23986953/blob-saved-as-object-object-nodejs
//https://www.zerocho.com/category/HTML/post/59465380f2c7fb0018a1a263
//https://www.zerocho.com/category/HTML/post/594bc4e9991b0e0018fff5ed
//http://bcho.tistory.com/1078

app.use(express.static(path.join(__dirname, './public')));


app.get('/record', function (req, res) {
    res.sendFile( path.join(__dirname, 'public/record.html') )
})



//var upload = multer({ dest: path.join(__dirname , 'public/uploads/') });
var fs = require('fs');




let recordFilePath

const recordUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
      
        recordFilePath = path.join( __dirname, '/public/rec_uploads', req.params.userId) 

        mkdirp( recordFilePath, function (err) {
          if ( err ) console.error( err )
          else callback( null, recordFilePath )
        });

     
      },
      filename: function (req, file, callback) {
          console.log('file.originalname', path.extname(file.originalname))
          console.log('req.params1.', req.params)
       
        callback(null, file.originalname)
      }
    })
});

var type = recordUpload.single('record');
app.post('/record/upload/:userId', type, function (req, res) {
  console.log(req.file);
  // do stuff with file
  res.status(200).end();

});



// app.get('/record4', function (req, res) {
//     res.sendFile( path.join(__dirname, 'public/index4.html') )
// })

// app.get('/record0', function (req, res) {
//     res.sendFile( path.join(__dirname, 'public/index.html') )
// })


// app.get('/record2', function (req, res) {
//     res.sendFile( path.join(__dirname, 'public/index2.html') )
// })
const server = http.createServer( app ).listen( 7777 , function() {
    console.log('::: HTTP ::: App Server Started - PORT : ' + 7777);
})