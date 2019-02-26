import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

class ServerApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private connectMongo = async (url: string) => {
    try {
      await mongoose.connect(
        url,
        {
          useNewUrlParser: true
        }
      );
      mongoose.set('useCreateIndex', true);
      console.log('MongoDB is connected');
    } catch (error) {
      console.error(`MongoDB connection error:${error}`);
    }
  };

  private config = () => {
    dotenv.config();

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

    this.app.use(cors());

    if (process.env.NODE_ENV !== 'test') {
      //=============================================
      // Apply WebpackDevMiddleware
      this.app.use(
        webpackDevMiddleware(compiler, {
          filePath: '/',
          contentBase: filePath,
          hot: true
        })
      );

      this.app.use(require('webpack-hot-middleware')(compiler));

      //=============================================
      // Connect to MongoDB
      this.connectMongo(<string>process.env.MONGODB_CONNECT);
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

    //Send the HTML file on root index GET request for client-side-rendering
    this.app.get('/', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../views/index.html'));
    });
  };
}

export default new ServerApp().app;
