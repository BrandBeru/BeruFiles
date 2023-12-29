import { Router } from "express";
import FilesService from "../services/files.service";
import passport from "passport";
import path, { join } from "path";
import directoryTree from "directory-tree";
import validatorHandler from "../middlewares/validator.handler";
import { updateFile } from "../schemas/files.schema";

const router = Router();
const service = new FilesService();

const upload = service.create()

router.post("/upload", passport.authenticate('jwt', { session: true }), upload.array('files'), (req, res, next) => {
  try {
    if(!req.file) {
      return res.status(400).json({error: 'No file uplodaded'})
    }
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
    const tree = await service.find(userId)
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
    const path =  join(__dirname,`../../filesystem/${userId}/${id}`)
    await service.remove(path);
    res.json({message: "Deleted Successffully!"})
  }catch(err){
    next(err)
  }
})
router.get("/:id",passport.authenticate('jwt', { session: true }), (req:any, res, next) => {
  try {
    //const user = req.user.sub
    const {id} = req.params
    const userId = req.user.sub
    const path =  join(__dirname,`../../filesystem/${userId}/${id}`)
    res.download(path)
  }catch(error){
    next(error);
  }
})

export default router;