import { db } from "../../upload/Aws";
import { bucket } from "../../config/config";
import Jimp from 'jimp';

export const fileUpload = (file, folderName = '') => {
    return new Promise((resolve, reject) => {
        console.log(file[0])
        const extension = file[0].name.split('.')[1]
        var path = (window.URL || window.webkitURL).createObjectURL(file[0]);
    console.log('path', path);
        Jimp.read(path, (err, lenna) => {
            if (err) throw err;
            // console.log(lenna)
            lenna
              .resize(300, 300) // resize
              .quality(60) // set greyscale
              .getBase64(Jimp.AUTO, function(err, data) {
                // console.log(data);
                const fileConverted = dataURLtoFile(data, `${file[0].name}`)
                // console.log(fileConverted)
                // document.getElementById("image").setAttribute("src", data);
                    const key = `${folderName}/${Math.floor((10 + Math.random()) * 100000000)}.${extension}`
                    const params = { Bucket: bucket, Key: key, Body: fileConverted, ACL: 'public-read' };
                    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
                    return db.upload(params, options, function (err, data) {
                        if (err) {
                            console.log('uploading >>', err)
                            return reject(err)
                        }
                        console.log('data uploaded >> ', data)
                        // console.log('here')
                        resolve(data)
                    })
              }); // save
          });
        
    })
}

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

//Usage example:
// var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
// console.log(file);