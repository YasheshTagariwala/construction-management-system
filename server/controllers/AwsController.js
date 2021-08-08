import AWS from "aws-sdk";
import path from "path";
import fs from "fs";
import axios from "axios";

const awsOptions = {
    accessKeyId: 'AKIAZRIIQEOJE5FKJFEB',
    secretAccessKey: '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',
    useAccelerateEndpoint: true,
    region: "ap-south-1",
    apiVersion: '2010-12-01'
};

const s3 = new AWS.S3(awsOptions);

exports.getFileExtension = (filename) => {
    const nameParts = filename.split('.');

    if(!nameParts.length) return null;
    return nameParts[nameParts.length - 1].toLowerCase();
}

exports.generateFileName = (length, extension = null) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if (extension) return result + "." + extension;
    return result;
}

exports.createSignedUrl = (contentType, originalFileName) => {
    if (!contentType || !originalFileName) return;
    return new Promise((resolve, reject) => {
        const fileNameLength = 30;
        const extension = this.getFileExtension(originalFileName)
        const file = this.generateFileName(fileNameLength, extension);
        const params = {
            Bucket: 'c360-dev',
            Key: file,
            Expires: 1200, // seconds
            ContentType: contentType
        };
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) reject(err);
            else resolve({ url, file });
        });
    })
};

exports.uploadFile = (filePath, contentType) => {
    return new Promise(async (resolve, reject) => {
        const fileName = path.parse(filePath).base;
        let val = await this.createSignedUrl(contentType, fileName).catch(err => reject(err));
        let { url, file } = val;

        if (url && file) {
            const { origin, pathname } = new URL(url);
            const thumbnail = `${origin}${pathname}`;
            let buffer = fs.readFileSync(filePath);
            axios
                .put(url, buffer, {
                    headers: { 'Content-Type': contentType },
                }).then(() => {
                resolve({ url: thumbnail, file })
            }).catch((err) => reject(err));
        }
    })
}

exports.removeFile = (url) => {
    return new Promise((resolve, reject) => {
        const params = { Key: url.split('/').pop(), Bucket: "c360-dev" };
        s3.deleteObject(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    })
}