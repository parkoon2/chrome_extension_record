const http = require( 'http' );
const express = require( 'express' );
const app = express();
const path = require( 'path' );
const multer = require( 'multer' )

const mkdirp = require( 'mkdirp' )

const ffmpeg = require( './js/FFmpeg' );

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
let today

const recordUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {

        let y = String(new Date().getFullYear()),
          m = String((new Date().getMonth() + 1)).length === 1 ? '0' + String((new Date().getMonth() + 1)) : String((new Date().getMonth() + 1)),
          d = String(new Date().getDate()).length === 1 ? '0' + String(new Date().getDate()) : String(new Date().getDate())

        today = y + '-' + m + '-' + d 

        recordFilePath = path.join( __dirname, '/public/rec_uploads', req.params.userId, today) 

        mkdirp( recordFilePath, function (err) {
          if ( err ) console.error( err )
          else callback( null, recordFilePath )
        });

     
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname)
      }
    })
});

let records = [];

var type = recordUpload.single('record');
app.post('/record/upload/:userId', type, recordHandler )

function recordHandler ( req, res ) {
  console.log(req.file);
  
  records.push( req.file.path)
  // do stuff with file
  res.status(200).end();
    if ( records.length === 2) {
      console.log('records[0]', records[0])
      console.log('records[1]', records[1])
      ffmpeg.mixing( {
        videoSource: records[0].match( /tab/i ) ? records[0] : records[1],
        audioSource: records[0].match( /mic/i ) ? records[0] : records[1],
        output : path.join( req.file.destination, new Date().valueOf() +  '.webm' )
       //output : 'zz'
      })
  
      records = []
    }


}



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