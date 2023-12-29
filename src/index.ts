import express from 'express';
import config from './config';
import { boomErrorHandler, errorHandler, logError, ormErrorHandler } from './middlewares/error.handler';
import session from 'express-session';
import passport from 'passport';
import routerApi from './routes';
import path from 'path';
import cors from 'cors'

const app = express();
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

const secret: any = config.jwt_secret;
const days = 1000*60*60*24*15
const sessionMiddleware = session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: days
  }
})
app.use(express.json())
app.use(sessionMiddleware);
app.use(cors())

app.get("/", (req, res, next) => {
  /*res.send(`
    <h1>PNOVA\\VIGE STUDIIOS</h1>
    <h2>Welcome to Pnova\\Vige Studiios Files server.</h2>
    <h3>If you are a client create your account and logged in, you can access your files.</h3>
    <h3>Visit the documentation here: <a href="https://pnova.brandberu.tech/docs">Pnova Docs for clients</a></h3>
  `);*/
  const options = {root: path.join(__dirname+"/views")}
  res.sendFile("index.html",options)
})

routerApi(app);
require('./utils/auth');
app.use(passport.initialize());
app.use(passport.session());

const port = config.port;
app.listen(port, () => {
  console.log('📂[Files server]: listening on port ' + port + '!');
});