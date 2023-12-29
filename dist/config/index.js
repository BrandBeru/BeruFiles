"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    port: process.env.PORT,
    project: process.env.PROJECT,
    version: process.env.VERSION,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: process.env.JWT_EXPIRATION
};
exports.default = config;
