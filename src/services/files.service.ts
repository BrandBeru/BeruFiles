import directoryTree from 'directory-tree';
import multer from 'multer'
import fs from 'node:fs/promises'
import path from 'node:path';

import { join } from 'path';
class FilesService{
  create(){
    const storage = multer.diskStorage({
      destination: async (req:any, file, cb) => {
        const user = req.user.sub;
        const path = join(__dirname, '../../filesystem',user)
        await fs.mkdir(path, {recursive:true})
        cb(null, path)
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
      }
    })
    return multer({storage})
  }
  async find(userId: string){
    return directoryTree(path.join(__dirname,`../../filesystem/${userId}`))
  }
  async update(oldName: string, body: any, userId: string){
    const newName = body.name
    const oldPath =  join(__dirname,`../../filesystem/${userId}/${oldName}`)
    const newPath =  join(__dirname,`../../filesystem/${userId}/${newName}`)
    await fs.rename(oldPath, newPath)
  }
  async remove(path: string){
    await fs.rm(path)
  }
}
export default FilesService