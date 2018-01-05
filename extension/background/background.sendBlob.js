const BlobSender = (function () {

    
    function BlobSender () { }

    BlobSender.prototype.sendToServer = function ( option ) {
        return new Promise( function (resolve, reject) {
            console.log('sendToServerzzzzzzzzzzzzzzzzzzzzzzzzsssssssssssss');
            const argsErr = 'check arguments : object > blobData, url, filename, fieldname',
                blob = option.blobData ? option.blobData : reject( argsErr ),
                url = option.url ? option.url : reject( argsErr ),
                filename = option.filename ? option.filename : reject( argsErr )
                fieldname = option.fieldname ? option.fieldname : reject( argsErr )

            let formData = new FormData();
            formData.append(fieldname/*'upl'*/, blob, filename + '.webm');

            let xhr = new XMLHttpRequest(); 
            xhr.onload = function() {
                if ( xhr.status === 200 || xhr.status === 201 ) {
                    console.log( xhr.status, 'TAB은  모두 업로드 되었답니다.' ); // 성공
                } else {
                    console.error( xhr.responseText ); // 실패
                }
            };
            xhr.open( 'POST', url/*'http://localhost:7777/record/upload'*/ );
            xhr.send( formData ); // 폼 데이터 객체 전송

        })
    }

    return BlobSender

})();

