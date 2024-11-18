const express=require("express");
const Product = require("../models/product.model");
const router=express.Router();
const {getProducts}=require('../controllers/product.controller.js');
router.get('/',async(req,res)=>{
      try{
        const products=await product.find({});
        res.status(200).json(products);
      }catch(error){
        res.status(500).json({message:error.message});
      }
});
router.get('/',getProducts);
router.get("/:id",getProducts);