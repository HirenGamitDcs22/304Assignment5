const express=require("express");
const router=express.Router();

const companyModel=require("../models/company");
const productModel=require("../models/products");

router.get("/",(req,res)=>res.json({data:"Company Home!"}));

router.get("/list",(req,res)=>{
    return res.json({data:companyModel});
});

//Add new Company
router.post("/addcompany",(req,res)=>{
    const {newCompany} = req.body;
    companyModel.create(newCompany);
    return res.json({data:"Company Add successfully...!"});
});

//fetch company details based on product name
router.get("/retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const product =await productModel.find({title:pname});
    const cid=product.map((p)=>p.company_id);
    const company=await companyModel.find(
        {company_id:cid}
    );
    if(company.length===0){
        return res.json({data:"Company not found "});
    }
    return res.json({data:company});
});

//update company (add/remove products)
router.put("/updatecompany/add/:cname",async(req,res)=>{
    const cname=req.params.cname;
    const pid=req.body.pid;
    const companydata= await companyModel.findOneAndUpdate(
        {name:cname},
        {$push: {product_ids:pid}},
        {new:true}
    );
    return res.json({data:companydata});
});
router.put("/updatecompany/remove/:cname",async(req,res)=>{
    const cname=req.params.cname;
    const pid=req.body.pid;
    const companydata= await companyModel.findOneAndUpdate(
        {name:cname},
        {$pull: {product_ids:pid }},
        {new:true}
    );
    return res.json({data:companydata});
});

//delete company
router.delete("/delcompany/:id",async(req,res)=>{
    const cid=req.params.id;
    const delCompany= await companyModel.findOneAndDelete({company_id:cid});
    if(delCompany){
        return res.json({data:"Company Deleted Successfully...!"});
    }
    return res.json({data:"Company Can't Delete."});
});

module.exports=router;