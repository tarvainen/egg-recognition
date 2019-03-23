import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from '@tsed/common'
import Path = require('path')
import bodyParser = require('body-parser')
import GlobalErrorHandlerMiddleware from './middleware/GlobalErrorHandlerMiddleware'
import '@tsed/ajv'
import '@tsed/swagger'
import '@tsed/multipartfiles'

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  acceptMimes: ['application/json', 'multipart/form-data'],

  ajv: {
    errorFormat: (error: any) => `${error.modelName}${error.dataPath} ${error.message}`,
    options: { verbose: true }
  },
  swagger: [
    {
      path: '/api/doc'
    }
  ]
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares (): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(bodyParser.json())
  }

  public $onReady () {
    console.log('Server started...')
  }

  public $afterRoutesInit () {
    this.use(GlobalErrorHandlerMiddleware)
  }

  public $onServerInitError (err: string) {
    console.error(err)
  }
}

new Server().start()
  .catch((reason: any) => {
    console.error(reason)
  })
