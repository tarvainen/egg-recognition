import { Controller, Post } from '@tsed/common'
import { MultipartFile, MulterOptions } from '@tsed/multipartfiles'
import { Exception } from 'ts-httpexceptions'
import ComputerVision from '../services/ComputerVision'
import Item from '../models/Item'
import { ReturnsArray } from '@tsed/swagger'

@Controller('/analyze')
export class AnalyzeController {
  constructor (private cv: ComputerVision) {}

  @Post('/')
  @MulterOptions({ dest: `${process.cwd()}/.tmp` })
  @ReturnsArray(200, { type: Item })
  post (@MultipartFile('file') file: Express.Multer.File, response: Express.Response): Array<Item> {
    if (!file) {
      throw new Exception(400, 'Input file missing')
    }

    return this.cv.analyze(file.filename)
  }
}
