const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {requireAdmin} = require("./utils")
const { JWT_SECRET } = process.env;

const {
    createAdmin,
    getAdmin,
    getAdminById,
    getAdminByUsername
} = require ('../db')

