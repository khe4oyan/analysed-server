// constants
import { ROLES_VALUES } from "../src/constants/userRoles.js";
import { PURCHASE_STATUS_TYPES } from "../src/constants/purchaseStatusTypes.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email", 255).notNullable().unique();
    table.string("full_name", 255).notNullable();
    table.enum("role", ROLES_VALUES).notNullable().defaultTo("staff");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("auth", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().unique();
    table.string("password_hash").nullable().defaultTo(null);
    table.text("token").nullable().defaultTo(null);
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });

  await knex.schema.createTable("purchase_requests", (table) => {
    table.increments("id").primary();
    table.string("title", 50).notNullable();
    table.integer("amount").notNullable();
    table.integer("created_by_id").unsigned().notNullable();
    table.integer("resolved_by_id").unsigned().nullable().defaultTo(null);
    table.enum("status", PURCHASE_STATUS_TYPES).defaultTo("draft");
    table.timestamps(true, true);

    table.foreign('created_by_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('resolved_by_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });

  await knex.schema.createTable("audit", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.text("details").notNullable();
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("audit");
  await knex.schema.dropTableIfExists("purchase_requests");
  await knex.schema.dropTableIfExists("auth");
  await knex.schema.dropTableIfExists("users");
}
