import { Controller, Post } from '@tsed/common'
import { ImageAnalyzer } from '../services/ImageAnalyzer'
import { MultipartFile, MulterOptions } from '@tsed/multipartfiles'
import { Exception } from 'ts-httpexceptions'

@Controller('/analyze')
export class AnalyzeController {
  constructor (private analyzer: ImageAnalyzer) {}

  @Post('/')
  @MulterOptions({ dest: `${process.cwd()}/.tmp` })
  private post (@MultipartFile('file') file: Express.Multer.File, response: Express.Response) {
    if (!file) {
      throw new Exception(400, 'Input file missing')
    }

    return this.analyzer.analyze(file.filename)
  }
}
