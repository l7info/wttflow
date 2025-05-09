import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFlowsAndCampaigns1683592019 implements MigrationInterface {
  name = 'CreateFlowsAndCampaigns1683592019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \"flows\" (
        \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),
        \"name\" character varying NOT NULL,
        \"description\" character varying,
        \"blocks\" jsonb NOT NULL,
        \"connections\" jsonb NOT NULL,
        \"status\" character varying NOT NULL DEFAULT 'draft',
        \"lastExecutedAt\" timestamp with time zone,
        \"executionCount\" integer NOT NULL DEFAULT 0,
        \"errorCount\" integer NOT NULL DEFAULT 0,
        \"createdAt\" timestamp with time zone NOT NULL DEFAULT now(),
        \"updatedAt\" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT \"PK_flows\" PRIMARY KEY (\"id\")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE \"campaigns\" (
        \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),
        \"name\" character varying NOT NULL,
        \"description\" character varying,
        \"flowId\" uuid NOT NULL,
        \"status\" character varying NOT NULL DEFAULT 'draft',
        \"scheduledAt\" timestamp with time zone,
        \"createdAt\" timestamp with time zone NOT NULL DEFAULT now(),
        \"updatedAt\" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT \"PK_campaigns\" PRIMARY KEY (\"id\"),
        CONSTRAINT \"FK_campaigns_flow\" FOREIGN KEY (\"flowId\") REFERENCES \"flows\"(\"id\") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE \"campaigns\"');
    await queryRunner.query('DROP TABLE \"flows\"');
  }
}
