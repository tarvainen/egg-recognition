import { Property } from '@tsed/common'
import { Description } from '@tsed/swagger'

export default class Size {
  @Property()
  @Description('Width')
  width: number = 0

  @Property()
  @Description('Height')
  height: number = 0
}
