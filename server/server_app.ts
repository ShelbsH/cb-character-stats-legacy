import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

class ServerApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes = () => {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    //More routes goes here...
  };

  private config = () => {
    //=============================================
    // Standard tools to be used for the webpack
    // middleware server
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('../webpack.config.js');
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);

    //=============================================
    // Set the identifier to set the file path directory
    const filePath = path.resolve(__dirname, 'dist/');

    if (process.env.NODE_ENV === 'development') {
      this.app.use(
        webpackDevMiddleware(compiler, {
          filePath: '/',
          contentBase: filePath,
          hot: true
        })
      );

      this.app.use(require('webpack-hot-middleware')(compiler));
    }

    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    //=============================================
    // Morgan Logger
    this.app.use(morgan('combined'));

    //Sets the file path directory to load up scripts and styles from the HTML file.
    this.app.use(express.static(filePath));

    //Send the HTML file on root index GET request
    this.app.get('/', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../views/index.html'));
    });
  };
}

export default new ServerApp().app;
