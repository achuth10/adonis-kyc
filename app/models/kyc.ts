import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Kyc extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => User)
  declare user: relations.HasOne<typeof User>

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column({ columnName: 'file_name' })
  declare fileName: string

  @column({ columnName: 'approved_by' })
  declare approvedBy: number
}
