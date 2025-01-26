import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kycs'
  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('file_name').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('identifier_file')
    })
  }
}
