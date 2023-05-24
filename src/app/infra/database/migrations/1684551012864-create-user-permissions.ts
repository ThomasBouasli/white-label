import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserPermissions1684551012864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_permissions',
        columns: [
          { name: 'user_id', type: 'uuid', isPrimary: true },
          { name: 'permission_id', type: 'uuid', isPrimary: true },
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
    await queryRunner.dropTable('user_permissions');
  }
}
