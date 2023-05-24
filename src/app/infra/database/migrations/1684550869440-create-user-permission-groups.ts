import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserPermissionGroups1684550869440
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_permission_groups',
        columns: [
          { name: 'user_id', type: 'uuid', isPrimary: true },
          { name: 'permission_group_id', type: 'uuid', isPrimary: true },
        ],
        foreignKeys: [
          {
            name: 'fk_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_permission_group',
            referencedTableName: 'permission_groups',
            referencedColumnNames: ['id'],
            columnNames: ['permission_group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_permission_groups');
  }
}
