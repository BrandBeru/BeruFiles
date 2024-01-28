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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const files_schema_1 = require("../schemas/files.schema");
const multer_1 = __importDefault(require("multer"));
const file_type_1 = __importDefault(require("file-type"));
const picture_service_1 = __importDefault(require("../services/picture.service"));
const router = (0, express_1.Router)();
const service = new picture_service_1.default();
const upload = (0, multer_1.default)();
router.post("/upload", passport_1.default.authenticate('jwt', { session: true }), upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uplodaded' });
        }
        const rta = yield service.save(req.file.buffer, req.user.sub, req.file.originalname);
        res.json({
            message: 'File uploaded successfully',
            path: rta
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/", passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.sub;
        const tree = yield service.getAll(userId);
        res.json(tree);
    }
    catch (err) {
        next(err);
    }
}));
router.put("/:id", (0, validator_handler_1.default)(files_schema_1.updateFile, 'body'), passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const userId = req.user.sub;
        yield service.update(id, body, userId);
        res.json({ message: 'Updated successfully!' });
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.sub;
        yield service.remove(userId, id);
        res.json({ message: "Deleted Successfully!" });
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:id", passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const user = req.user.sub
        const { id } = req.params;
        const userId = req.user.sub;
        const file = yield service.getOne(id, userId);
        res.type((yield file_type_1.default.fromBuffer(file)).mime);
        res.send(Buffer.from(file));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
