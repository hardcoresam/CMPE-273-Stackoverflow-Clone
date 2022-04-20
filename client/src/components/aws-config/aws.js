import aws from 'aws-sdk'

const config = {
    "bucketName": process.env.REACT_APP_BUCKET_NAME,
    "region": process.env.REACT_APP_region,
    "accessKeyId": process.env.REACT_APP_accessKeyId,
    "secretAccessKey": process.env.REACT_APP_secretAccessKey,
    "signatureVersion": process.env.REACT_APP_signatureVersion
}

export const bucketName = config.bucketName

export const s3 = new aws.S3({
    region: config.region,
    signatureVersion: config.signatureVersion,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: config.Bucket,
})
