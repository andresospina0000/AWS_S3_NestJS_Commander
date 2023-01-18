import { Injectable } from '@nestjs/common';
import { PGClient } from './../../Infrastructure/DataSource';
import { Client } from 'pg';

@Injectable()
export class DataBaseService {

    private pgClient: Client;

    constructor(private readonly migrationDS: PGClient) {
        this.pgClient = migrationDS.migrationDS()
    }


    migrate = async (row: any) => {

        const exist = await this.getByDomain(row);

        if (exist > 0) {
            return await this.update(row)
        }

        return await this.create(row)
    }

    private create = async (row: { domain: any; count: any; }) => {

        let created = false;

        try {

            await this.pgClient.query(
                `INSERT INTO public."TableA"(field1, "field2")VALUES ($1, $2);`,
                [row.domain, row.count]
            ).then((data) => created = data.rowCount > 1

            );
        } catch (error) {
            console.log(`Error: ${error}`)
        }

        return created
    };

    private getByDomain = async (row: { domain: any; }) => {
        let record = 0;
        try {

            await this.pgClient.query(
                `SELECT * FROM public."TableA" WHERE field1=$1;`,
                [row.domain]
            ).then((data) => record = data.rowCount);
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        return record
    };

    private update = async (row: { domain: any; count: any; }) => {

        let updated = false;

        try {

            await this.pgClient.query(
                `UPDATE public."TableA" SET "field2"=$2 WHERE field1=$1;`,
                [row.domain, row.count]
            ).then(
                (data) => updated = data.rowCount > 1
            );
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        return updated
    };

}
