"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const picture_1 = __importDefault(require("../routes/picture"));
const files_1 = __importDefault(require("../routes/files"));
const user_1 = __importDefault(require("../routes/user"));
const config_1 = __importDefault(require("../config"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use(`/${config_1.default.project}/${config_1.default.version}`, router);
    router.use("/pictures", picture_1.default);
    router.use("/files", files_1.default);
    router.use('/profiles', user_1.default);
}
exports.default = routerApi;
