import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissionGroupPermissions1684551455192
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permission_group_permissions',
        columns: [
          { name: 'permission_group_id', type: 'uuid', isPrimary: true },
          { name: 'permission_id', type: 'uuid', isPrimary: true },
        ],
        foreignKeys: [
          {
            name: 'fk_permission_group',
            referencedTableName: 'permission_groups',
            referencedColumnNames: ['id'],
            columnNames: ['permission_group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_permission',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permission_group_permissions');
  }
}
