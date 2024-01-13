import directoryTree from 'directory-tree';
import { createCipheriv, createDecipheriv, scryptSync } from 'node:crypto';
import fs from 'node:fs/promises'
import path from 'node:path';

import { join } from 'path';
import FilesService from './files.service';
import tinify from 'tinify'
import config from '../config';

const files = new FilesService()

class PictureService{
  async createFolder(user: string){
    const path = join(__dirname, '../../filesystem',user, '/pictures')
    await fs.mkdir(path, {recursive:true})
    return path
  }
  async getOne(name: string, userId: string){
    return await files.decrypt(name, userId, this.createFolder(userId))
  }
  async save(buffer: Buffer, user: string, name: string){
    tinify.key = config.tinify_key
    const source = tinify.fromBuffer(buffer)
    const optimizedBuffer = await source.toBuffer()
    await files.save(Buffer.from(optimizedBuffer), user, name, this.createFolder(user))
  }
  async getAll(userId: string){
    return await files.find(userId, this.createFolder(userId))
  }
  async update(oldName: string, body: any, userId: string){
    await files.update(oldName, body, userId)
  }
  async remove(userId: string, name: string){
    if(!await fs.open(`${await this.createFolder(userId)}/${name}`)) return 'File does not exist'
    await fs.rm(`${await this.createFolder(userId)}/${name}`)
    return 'File deleted succesffully'
  }
}
export default PictureService