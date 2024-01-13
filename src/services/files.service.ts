import directoryTree from 'directory-tree';
import { createCipheriv, createDecipheriv, scryptSync } from 'node:crypto';
import fs from 'node:fs/promises'
import path from 'node:path';

import { join } from 'path';
import config from '../config';
import {readFileSync, writeFileSync } from 'node:fs';
class FilesService{
  encrypt(buffer: Buffer){
    const iv = Buffer.alloc(16,0)
    const key = scryptSync(config.encode_password, 'salt', 24)
    const cipher = createCipheriv(config.encode_algorithm, key, iv)
    return Buffer.concat([cipher.update(buffer), cipher.final()])
  }
  read(path: string){
    const file = readFileSync(path)
    return file
  }
  async decrypt(name: string, user: string, cf:any){
    const iv = Buffer.alloc(16,0)
    const key = scryptSync(config.encode_password, 'salt', 24)
    const decipher = createDecipheriv(config.encode_algorithm, key, iv)
    const buffer = this.read(`${await cf}/${name}`)
    return Buffer.concat([decipher.update(buffer), decipher.final()])
  }
  async save(buffer: Buffer, user: string, name: string, cf:any){
    writeFileSync(`${await cf}/${new Date().getTime()}-${name}`, this.encrypt(buffer))
  }
  async find(userId: string, cf:any){
    return directoryTree(cf)
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