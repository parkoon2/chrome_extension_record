const BlobSender = (function () {

    
    function BlobSender () { }

    BlobSender.prototype.sendToServer = function ( option ) {
        return new Promise( function (resolve, reject) {
            
            const argsErr   = 'check arguments : object > blobData, url, filename, fieldname',
                  blob      = option.blobData  ? option.blobData  : reject( argsErr ),
                  url       = option.url       ? option.url       : reject( argsErr ),
                  filename  = option.filename  ? option.filename  : reject( argsErr ),
                  fieldname = option.fieldname ? option.fieldname : reject( argsErr )

            let formData = new FormData(),
                xhr      = new XMLHttpRequest(); 

            formData.append( fieldname/*'record'*/, blob, filename + '.webm' );

            xhr.onload = function() {
                if ( xhr.status === 200 || xhr.status === 201 ) {
                    console.log( xhr.status, 'MIC Upload Success' )

                    resolve( xhr.response )
            
                } else {
                    console.error( xhr.status, xhr.responseText )
                }
            };
            xhr.open( 'POST', url );
            xhr.send( formData ); // 폼 데이터 객체 전송

        })
    }

    return BlobSender

})();

