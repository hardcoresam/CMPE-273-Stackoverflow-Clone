import {s3,bucketName} from '../aws-config/aws.js'
export default async function save(uniquename,state){
    const imageName = `profile/santhosh_bodla${uniquename}/.jpeg`
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
            ContentType: 'image/*'
        }
        const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
        await fetch(new Request(uploadUrl, {
            method: "PUT",
            body: state,
            headers: new Headers({
                "Content-Type": 'image/*',
            })
        }))
        const imageUrl = uploadUrl.split('?')[0]
        console.log(imageUrl)
        return imageUrl
  }