import { Command, CommandRunner, Option } from 'nest-commander';
import { CommandService } from 'src/services/command/command.service';

@Command(
    {
        name: 's3-file-migration',
        options: { isDefault: true }
    }
)
export class S3FileMigrationCommand extends CommandRunner {

    constructor(private readonly commandService: CommandService) {
        super();
    }

    async run(passedParams: string[],
        options?: Record<string, any>): Promise<void> { }

    @Option({
        flags: '-m, --migrate [bucket]',
        description: 'Download a file from a S3 bucket and migrate it to a Postgres database.'
    })
    async MigrateFile(bucket: string) {
        
        console.log('Migration running, please wait...');
        await this.commandService.RunFileMigration(bucket);
        console.log('Migration ended successfully!');
        return
    }
}
