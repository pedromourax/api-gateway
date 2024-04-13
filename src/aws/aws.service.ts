import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {

    private logger = new Logger(AwsService.name);

    public async uploadArquivo(file: any, id: string) {


        const s3 = new S3({
            region: process.env.AWS_S3_REGION,
            credentials: {
                accessKeyId: process.env.AWS_KEY,
                secretAccessKey: process.env.AWS_SECRET
            }
        });

        const fileExtension = file.originalname.split('.')[1];     /* originalname.split('.')[1]; */
        const urlKey = `${id}.${fileExtension}`;

        this.logger.log(`urlKey: ${urlKey}`)

        const data = s3
            .putObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: urlKey,
                Body: file.buffer
            })
            .promise()
            .then(data => {
                return { url: `https://pedro-smartranking.s3.amazonaws.com/${urlKey}` }
            }, err => {
                this.logger.log(err);
                return err
            });

        return data

    }

}
