
const FFmpeg = {
    path: require('path'),
    fs: require('fs'),
    spawn: require('child_process').spawn,
    videoSource: '',
    audioSource: '',
    output:'',
    process: null,

    mixing: function ( data ) {
        
        this.videoSource = data.videoSource
        this.audioSource = data.audioSource
        this.output = data.output

        console.log(this.output)

        return new Promise (function (req, res) {
            // ffmpeg -y 
            // -i video.webm 
            // -i audio.webm 
            // -filter_complex "[0:a][1:a]amerge=inputs=2[a]" 
            // -map 0:v 
            // -map "[a]" 
            // -c:v copy 
            // -c:a libvorbis 
            // -ac 2 
            // test.webm
            let args = [
                '-y', 
                '-i', this.videoSource, 
                '-i', this.audioSource,  
                '-filter_complex', '[0:a][1:a]amerge=inputs=2[a]', 
                '-map', '0:v' ,
                '-map', '[a]', 
                '-c:v', 'copy', 
                '-c:a', 'libvorbis', 
                '-ac', '2', 
                `${ this.output }`
            ]

            let ffmpegPath = this.path.join( __dirname, '../ffmpeg/ffmpeg')
            this.process = this.spawn( ffmpegPath, args );

            this.process.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
              
            this.process.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
              
            this.process.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });

            ffmpegConfig.process.on( 'error', function ( err ) {
                reject( err )
            });
        }.bind( this ))
    }

}

module.exports = FFmpeg