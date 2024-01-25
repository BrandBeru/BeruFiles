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
const picture_service_1 = __importDefault(require("../services/picture.service"));
const multer_1 = __importDefault(require("multer"));
const file_type_1 = __importDefault(require("file-type"));
const router = (0, express_1.Router)();
const service = new picture_service_1.default();
const upload = (0, multer_1.default)();
router.post('/upload', passport_1.default.authenticate('jwt', { session: true }), upload.single('file'), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uplodaded' });
        }
        service.save(req.file.buffer, 'users', req.file.originalname);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const file = yield service.getOne(id, 'users');
        res.type((yield file_type_1.default.fromBuffer(file)).mime);
        res.send(Buffer.from(file));
    }
    catch (error) {
    }
}));
exports.default = router;
