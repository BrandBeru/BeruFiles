"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = require("path");
const files_service_1 = __importDefault(require("./files.service"));
const tinify_1 = __importDefault(require("tinify"));
const config_1 = __importDefault(require("../config"));
const files = new files_service_1.default();
class PictureService {
    createFolder(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = (0, path_1.join)(__dirname, '../../filesystem', user, '/pictures');
            yield promises_1.default.mkdir(path, { recursive: true });
            return path;
        });
    }
    getOne(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield files.decrypt(name, userId, this.createFolder(userId));
        });
    }
    save(buffer, user, name) {
        return __awaiter(this, void 0, void 0, function* () {
            tinify_1.default.key = config_1.default.tinify_key;
            const source = tinify_1.default.fromBuffer(buffer);
            const optimizedBuffer = yield source.toBuffer();
            const path = yield files.save(Buffer.from(optimizedBuffer), user, name, this.createFolder(user));
            return path;
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield files.find(userId, this.createFolder(userId));
        });
    }
    update(oldName, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield files.update(oldName, body, userId);
        });
    }
    remove(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield promises_1.default.open(`${yield this.createFolder(userId)}/${name}`)))
                return 'File does not exist';
            yield promises_1.default.rm(`${yield this.createFolder(userId)}/${name}`);
            return 'File deleted succesffully';
        });
    }
}
exports.default = PictureService;
