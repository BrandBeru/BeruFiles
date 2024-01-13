import { Router } from "express";
import multer from "multer";
import passport from "passport";
import PictureService from "../services/picture.service";
import validatorHandler from "../middlewares/validator.handler";
import { updateFile } from "../schemas/files.schema";
import fileType from 'file-type'

const router = Router()
const service = new PictureService()

const upload = multer()

router.post("/upload", passport.authenticate('jwt', { session: true }), upload.single('file'), (req:any, res, next) => {
  try {
    if(!req.file) {
      return res.status(400).json({error: 'No file uplodaded'})
    }
    service.save( req.file.buffer, req.user.sub, req.file.originalname)
    res.json({
      message: 'File uploaded successfully',
      file: req.file.filename
    })
  } catch (error) {
    next(error);
  }
});
router.get("/", passport.authenticate('jwt', { session: true }), async (req:any, res, next) => {
  try{
    const userId = req.user.sub
    const tree = await service.getAll(userId)
    res.json(tree);
  }catch(err){
    next(err);
  }
})
router.put("/:id", validatorHandler(updateFile, 'body'), passport.authenticate('jwt', { session: true }), async (req:any, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const userId = req.user.sub
    await service.update(id, body, userId)
    res.json({message: 'Updated successfully!'})
  }catch(err){
    next(err)
  }
})
router.delete("/:id", passport.authenticate('jwt', { session: true }), async (req:any, res, next) => {
  try{
    const {id} = req.params
    const userId = req.user.sub
    const message = await service.remove(userId, id);
    res.json({message: message})
  }catch(err){
    next(err)
  }
})
router.get("/:id",passport.authenticate('jwt', { session: true }), async (req:any, res, next) => {
  try {
    //const user = req.user.sub
    const {id} = req.params
    const userId = req.user.sub
    const file = await service.getOne(id, userId)
    res.type((await fileType.fromBuffer(file)).mime)
    res.send(Buffer.from(file))
  }catch(error){
    next(error);
  }
})

export default router