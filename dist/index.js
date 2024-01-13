"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const error_handler_1 = require("./middlewares/error.handler");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const secret = config_1.default.jwt_secret;
const days = 1000 * 60 * 60 * 24 * 15;
const sessionMiddleware = (0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: days
    }
});
app.use(express_1.default.json());
app.use(sessionMiddleware);
app.use((0, cors_1.default)());
app.get("/", (req, res, next) => {
    /*res.send(`
      <h1>PNOVA\\VIGE STUDIIOS</h1>
      <h2>Welcome to Pnova\\Vige Studiios Files server.</h2>
      <h3>If you are a client create your account and logged in, you can access your files.</h3>
      <h3>Visit the documentation here: <a href="https://pnova.brandberu.tech/docs">Pnova Docs for clients</a></h3>
    `);*/
    const options = { root: path_1.default.join(__dirname + "/views") };
    res.sendFile("index.html", options);
});
(0, routes_1.default)(app);
require('./utils/auth');
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(error_handler_1.logError);
app.use(error_handler_1.ormErrorHandler);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
const port = config_1.default.port;
app.listen(port, () => {
    console.log('📂[Files server]: listening on port ' + port + '!');
});
