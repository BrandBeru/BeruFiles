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
const directory_tree_1 = __importDefault(require("directory-tree"));
const node_crypto_1 = require("node:crypto");
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = require("path");
const config_1 = __importDefault(require("../config"));
const node_fs_1 = require("node:fs");
class FilesService {
    encrypt(buffer) {
        const iv = Buffer.alloc(16, 0);
        const key = (0, node_crypto_1.scryptSync)(config_1.default.encode_password, 'salt', 24);
        const cipher = (0, node_crypto_1.createCipheriv)(config_1.default.encode_algorithm, key, iv);
        return Buffer.concat([cipher.update(buffer), cipher.final()]);
    }
    read(path) {
        const file = (0, node_fs_1.readFileSync)(path);
        return file;
    }
    decrypt(name, user, cf) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = Buffer.alloc(16, 0);
            const key = (0, node_crypto_1.scryptSync)(config_1.default.encode_password, 'salt', 24);
            const decipher = (0, node_crypto_1.createDecipheriv)(config_1.default.encode_algorithm, key, iv);
            const buffer = this.read(`${yield cf}/${name}`);
            return Buffer.concat([decipher.update(buffer), decipher.final()]);
        });
    }
    save(buffer, user, name, cf) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, node_fs_1.writeFileSync)(`${yield cf}/${new Date().getTime()}-${name}`, this.encrypt(buffer));
        });
    }
    find(userId, cf) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, directory_tree_1.default)(cf);
        });
    }
    update(oldName, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newName = body.name;
            const oldPath = (0, path_1.join)(__dirname, `../../filesystem/${userId}/${oldName}`);
            const newPath = (0, path_1.join)(__dirname, `../../filesystem/${userId}/${newName}`);
            yield promises_1.default.rename(oldPath, newPath);
        });
    }
    remove(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield promises_1.default.rm(path);
        });
    }
}
exports.default = FilesService;
