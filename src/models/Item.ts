import ItemType from './ItemType'
import { Property, JsonProperty } from '@tsed/common'
import Position from './Position'
import Size from './Size'
import { Description } from '@tsed/swagger'

export default class Item {
  @Property()
  @Description('Type of the item')
  type: ItemType = ItemType.Unknown

  @Property()
  @Description('Item\'s position')
  position: Position = new Position()

  @Property()
  @Description('Item\'s size')
  size: Size = new Size()

  @Property()
  @Description('The confidence of this item')
  confidence: number = 0
}
