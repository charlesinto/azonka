import { db } from "../../upload/Aws";
import { bucket } from "../../config/config";

export const fileUpload = (file, folderName = '') => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.')[1]
        const key = `${folderName}/${Math.floor((10 +Math.random()) * 100000000)}.${extension}`
        const params = {Bucket: bucket, Key: key, Body: file, ACL: 'public-read'};
        const options = {partSize: 10 * 1024 * 1024, queueSize: 1}; 
        return db.upload(params,options, function(err, data) {
            if(err){
                console.log('uploading >>', err)
               return reject(err)
            }
            console.log('here')
            resolve(data)
        } )
    })
}