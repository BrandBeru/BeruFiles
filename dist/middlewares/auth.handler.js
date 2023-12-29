"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
const config_1 = __importDefault(require("../config"));
const boom_1 = __importDefault(require("@hapi/boom"));
function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config_1.default.api_key) {
        next();
        return;
    }
    else {
        throw boom_1.default.unauthorized();
    }
}
exports.checkApiKey = checkApiKey;
