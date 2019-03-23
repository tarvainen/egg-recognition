import { Controller, Post } from '@tsed/common'
import { MultipartFile, MulterOptions } from '@tsed/multipartfiles'
import { Exception } from 'ts-httpexceptions'
import ComputerVision from '../services/ComputerVision'

@Controller('/analyze')
export class AnalyzeController {
  constructor (private cv: ComputerVision) {}

  @Post('/')
  @MulterOptions({ dest: `${process.cwd()}/.tmp` })
  private post (@MultipartFile('file') file: Express.Multer.File, response: Express.Response) {
    if (!file) {
      throw new Exception(400, 'Input file missing')
    }

    return this.cv.analyze(file.filename)
  }
}
