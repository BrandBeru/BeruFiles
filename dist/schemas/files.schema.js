"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFile = void 0;
const joi_1 = __importDefault(require("joi"));
const name = joi_1.default.string().min(3).max(60);
const updateFile = joi_1.default.object({
    name: name.required()
});
exports.updateFile = updateFile;
