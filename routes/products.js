const express=require("express");
const router=express.Router();

const productModel=require("../models/products");

router.get("/",(req,res)=>res.json({data:"Product Home!"}));

router.get("/list", async(req,res)=>{
    const  productList= await productModel.find();
    if(productList.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:productList});
});

router.post("/addproduct", (req,res)=>{
    //const {newProduct}=req.body;
    //const msg=productModel.create(newProduct);
    return res.json({data:req.body});
});

router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const companyid=product.map((p)=>p.company_id);
    const company=companyData.filter((c)=>c.company_id === String(companyid));
    return res.json({data:company});
});

router.put("/updateproduct/:pname", async(req,res)=>{
    const pname=req.params.pname;
    const companydata=productModel.findOneAndUpdate();
    return res.json({data:companydata});
});

router.delete("/delproduct/:id",(req,res)=>{
    const cid=req.params.id;
    const companydata=companyData.filter((c)=>c.company_id === cid)
    const index=companyData.indexof(companydata);
    return res.json({data:index});
});


module.exports=router;