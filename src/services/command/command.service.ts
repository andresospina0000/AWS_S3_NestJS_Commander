import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as readline from "readline";
import { S3BucketClient } from 'src/Proxy/S3BucletClient';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class CommandService {

    constructor(private readonly s3BucketClient: S3BucketClient,
        private readonly dbService: DataBaseService) { }

    async RunFileMigration(bucketName: string) {

        try {
            //const stream = fs.createReadStream('/your-local-file-path/testFile.csv');
            const stream = await this.DownloadS3File(bucketName);
            let rl: readline.Interface;
            try {
                rl = readline.createInterface(
                    {
                        input: stream,
                        crlfDelay: Infinity,
                    }
                );
            } catch (error) {
                console.log('file error')
            }

            for await (const newLine of rl) {
                const splitRow = newLine.split(',');

                let record = {
                    field1: splitRow[0].replace(/"/g, ''),
                    field2: parseInt(splitRow[1].replace(/"/g, ''))
                    //fieldN...
                };

                if (!isNaN(record.field2)) {
                    await this.dbService.migrate(record);
                }
            }

        } catch (ex) {
            console.error(ex)
        }
    }

    private async DownloadS3File(bucketName: string): Promise<fs.ReadStream> {
        try {
            //Getting the file as a stream from the S3 Bucket
            const migrationFile = await this.s3BucketClient.getS3File(bucketName);            
            const streamString = await (migrationFile).transformToString();
            
            //Writing/downloading the file into a .txt file
            fs.writeFileSync('./downloadedFile.txt', streamString);
            return fs.createReadStream('./downloadedFile.txt');
        } catch (error) {
            console.log(error)
        }
    }
}
