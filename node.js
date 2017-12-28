const http = require( 'http' );
const express = require( 'express' );
const app = express();
const path = require( 'path' );

app.use(express.static(path.join(__dirname, './public')));


app.get('/record', function (req, res) {
    res.sendFile( path.join(__dirname, 'public/record.html') )
})


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