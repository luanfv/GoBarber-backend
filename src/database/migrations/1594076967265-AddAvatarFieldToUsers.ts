import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarFieldToUsers1594076967265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn('users', new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('users', 'avatar');
    }

}
