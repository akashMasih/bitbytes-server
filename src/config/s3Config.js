import AWS from 'aws-sdk';

export default async function s3Config() {
    try {
        const s3 = new AWS.S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            },
            region: 'us-east-1'
        });
        // console.log(s3,"hello1111");
        return s3;
    } catch (error) {
        return error
    }


}