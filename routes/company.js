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
router.post("/retrieve/:pname",(req,res)=>{
    const pname=req.params.pname;
    const product = productModel.find({},{title:pname});
    return res.json({data:product});
});
router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const companyid=product.map((p)=>p.company_id);
    const company=companyData.filter((c)=>c.company_id === String(companyid));
    return res.json({data:company});
});

//update company (add/remove products)
router.put("/updatecompany/:cname",(req,res)=>{
    const cname=req.params.cname;
    const companydata=companyData.filter((c)=>c.name === cname)
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