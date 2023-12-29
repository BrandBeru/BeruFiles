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
const multer_1 = __importDefault(require("multer"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const path_1 = require("path");
class FilesService {
    create() {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => __awaiter(this, void 0, void 0, function* () {
                const user = req.user.sub;
                const path = (0, path_1.join)(__dirname, '../../filesystem', user);
                yield promises_1.default.mkdir(path, { recursive: true });
                cb(null, path);
            }),
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        return (0, multer_1.default)({ storage });
    }
    find(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, directory_tree_1.default)(node_path_1.default.join(__dirname, `../../filesystem/${userId}`));
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
