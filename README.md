# NestJS Commander application with AWS SDK S3 Client

Please execute the "npm install" command to install all dependecies.

 This is a small NestJS application that will do the follow:

 1. Executes a CLI command created with NestJS Commander package. This command will run a data migration.
 2. Download a plain text file from an AWS S3 Bucket (you have to be aware of the file's structure). To successfully download the file you will need to provide IAM role credentials to the app (look at the .env file)
 3. Load the file data into a Postgres database (you will have to provide this information too. Look at the .env file)
 4. You're all set!

To run the command you will have to execute the following:

    npm run start:prod => to simulate production deployment.

    or

    npm run build => To build out the app an then,
    node dist/main s3-file-migration -m => which ends to be the final CLI command

So, as you can see, the "s3-file-migration" is the name of the command I just create and the "-m" is the option that we add to the command to execute the migration.
Remember that you could have several options on your command!

I hope you will find this useful :D
