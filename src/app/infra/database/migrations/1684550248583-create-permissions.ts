import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissions1684550248583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'action',
            type: 'enum',
            enum: ['create', 'read', 'update', 'delete', 'all'],
          },
          {
            name: 'resource',
            type: 'enum',
            enum: [
              'user',
              'permission',
              'permission_group',
              'user_permission',
              'post',
              'self',
              'all',
            ],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions');
  }
}
