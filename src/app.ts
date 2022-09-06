import express from 'express';
import cors from 'cors';
import routes from './routes/index.router';
import './infra/database/mongo/index';
import 'dotenv/config';
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares ():void {
    this.express.use(express.json({}));
    this.express.use(cors());
    this.express.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
  }

  private routes ():void {
   this.express.use(...routes);
   
  }
}

export default new App().express;
