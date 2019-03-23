import { Property } from '@tsed/common'
import { Description } from '@tsed/swagger'

export default class Position {
  @Property()
  @Description('Horizontal position')
  x: number = 0

  @Property()
  @Description('Vertical position')
  y: number = 0
}
