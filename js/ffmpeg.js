
const FFmpeg = {
    path: require('path'),
    fs: require('fs'),
    spawn: require('child_process').spawn,
    videoSource: '',
    audioSource: '',
    output:'',
    process: null,

    mixing: function ( data ) {
        
        let self = this;
        
        self.videoSource = data.videoSource
        self.audioSource = data.audioSource
        self.output = data.output


        return new Promise ( function (resolve, reject) {

            let args = [
                '-y', 
                '-i', self.videoSource, 
                '-i', self.audioSource,  
                '-filter_complex', '[0:a][1:a]amerge=inputs=2[a]', 
                '-map', '0:v' ,
                '-map', '[a]', 
                '-c:v', 'copy', 
                '-c:a', 'libvorbis', 
                '-ac', '2', 
                `${ self.output }`
            ]

            let ffmpegPath = self.path.join( __dirname, '../ffmpeg/ffmpeg')
            self.process = self.spawn( ffmpegPath, args );

            self.process.on( 'close', function ( code ) {
                
                console.log(`child process exited with code ${code}`);
                //self.fs.unlinkSync(self.videoSource)
                //self.fs.unlinkSync(self.audioSource)
                
                resolve( self.output )
            });

            self.process.on( 'error', function ( err ) {
                reject( err )
            });
        })
    }

}

module.exports = FFmpeg