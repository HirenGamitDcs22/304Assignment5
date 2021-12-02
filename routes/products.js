const express=require("express");
const router=express.Router();

const productModel=require("../models/products");
const sellerModel=require("../models/seller");
const companyModel=require("../models/company");

router.get("/",(req,res)=>res.json({data:"Product Home!"}));

router.get("/list", async(req,res)=>{
    const  productList= await productModel.find();
    if(productList.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:productList});
});

//add new Product
router.post("/addproduct", (req,res)=>{
    const {newProduct}=req.body;
    productModel.create(newProduct);
    return res.json({data:"Product Add SuccessFully...!"});
});

//fetch all products of a company
router.get("/retrieve/company/:cname",async(req,res)=>{
    const cname=req.params.cname;
    const company=await companyModel.find({name:cname},{company_id:true});
    if(company.length===0){
        return res.json({data:"Company not found"})
    }
    const companyid=company.map((c)=>c.company_id);
    const  productList= await productModel.find({company_id:companyid});
    if(productList.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:productList});
});

//fetch all products of a seller
router.get("/retrieve/seller/:sname", async(req,res)=>{
    const sname=req.params.sname;
    const seller= await sellerModel.find({name:sname});
    if(seller.length===0){
        return res.json({data:"Seller not found"})
    }
    const sellerid=seller.map((s)=>s.seller_id);
    const productList=await productModel.find({seller_id:sellerid});
    if(productList.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:productList});
});

//update product (add/remove category)
router.put("/updateproduct/add/:id",async(req,res)=>{
    const id=req.params.id;
    const category=req.body.category;
    const productdata= await productModel.findOneAndUpdate(
        {product_id:id},
        {$push: {category:category}},
        {new:true}
    );
    return res.json({data:productdata});
});
router.put("/updateproduct/remove/:id",async(req,res)=>{
    const id=req.params.id;
    const category=req.body.category;
    const productdata= await productModel.findOneAndUpdate(
        {product_id:id},
        {$pull: {category:category }},
        {new:true}
    );
    return res.json({data:productdata});
});

//delete product
router.delete("/delproduct/:id",async(req,res)=>{
    const pid=req.params.id;
    const delProduct= await productModel.findOneAndDelete({product_id:pid});
    if(delProduct){
        return res.json({data:"Peoduct Deleted Successfully...!"});
    }
    return res.json({data:"Product Can't Delete."});
});


module.exports=router;