const http = require( 'http' );
const express = require( 'express' );
const app = express();
const path = require( 'path' );
const multer = require( 'multer' )
//https://stackoverflow.com/questions/39677993/send-blob-data-to-node-using-fetch-multer-express
//https://stackoverflow.com/questions/23986953/blob-saved-as-object-object-nodejs
//https://www.zerocho.com/category/HTML/post/59465380f2c7fb0018a1a263
//https://www.zerocho.com/category/HTML/post/594bc4e9991b0e0018fff5ed

app.use(express.static(path.join(__dirname, './public')));


app.get('/record', function (req, res) {
    res.sendFile( path.join(__dirname, 'public/record.html') )
})



var upload = multer({ dest: __dirname + '/../public/uploads/' });
var type = upload.single('upl');
app.post('/api/test', type, function (req, res) {
  console.log(req.body);
  console.log(req.file);
  // do stuff with file
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