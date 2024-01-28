import { Router } from "express";
import passport from "passport";
import PictureService from "../services/picture.service";
import multer from "multer";
import fileType from 'file-type'

const router = Router()

const service = new PictureService();
const upload = multer()

router.post('/upload', passport.authenticate('jwt', {session: true}), upload.single('file'), async (req, res, next) => {
  try{
    if(!req.file) {
      return res.status(400).json({error: 'No file uplodaded'})
    }
    const rta = await service.save( req.file.buffer, 'users', req.file.originalname)

    res.json({
      path: `https://berufiles-jcscma6scq-rj.a.run.app/api/v1/profiles/${rta}`
    })
  }catch(error){
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const file = await service.getOne(id, 'users')
    res.type((await fileType.fromBuffer(file)).mime)
    res.send(Buffer.from(file))
  }catch(error){
    next(error)
  }
})

export default router;