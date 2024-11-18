require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model'); 
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/', (req, res) => {
    res.send('Hello from Node API Server is updated');
});
app.get('/api/products',async(req,res)=>{
    try{
        const product=await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});
app.get('/api/products/:id',async(req,res)=>{
     try{
        const {id} =req.params;
       const product= await Product.findById(id);
       res.status(200).json(product);
     }catch(error){
        res.status(500).json({message:error.message});
     }
});
app.post('/api/products', async (req, res) => { 
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
mongoose.connect("mongodb+srv://thiyunuwan567:W4fi4EyjWgza3AS0@cluster0.nijwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
.then(() => {
    console.log("Connected to database!");
})
.catch((error) => {
    console.error("Connection failed", error);
});
//update a product
app.put('/api/products/:id',async(req,res)=>{
       try{
        const{id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updateProduct=await Product.findById(id);
        res.status(200).json(updateProduct);     
       }catch(error){
        res.status(500).json({message:error.message});
       }
});
//delete a product
app.delete('/api/products/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    }catch(error){
         res.status(500).json({message:error.message});
    }
});