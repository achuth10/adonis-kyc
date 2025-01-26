import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.integer('kyc_id').unsigned().references('id').inTable('kycs')
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('kyc_id')
    })
  }
}
