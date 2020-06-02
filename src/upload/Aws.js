import AWS from "aws-sdk";
import { endpoint, secretAccessKey, accessKeyId } from "../config/config";

const spacesEndpoint = new AWS.Endpoint(endpoint);

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId,
    secretAccessKey
});

export const db = s3;

 