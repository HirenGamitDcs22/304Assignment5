const express=require("express");
const router=express.Router();

const sellerData=require("../data/sellerData");

router.get("/",(req,res)=>res.json({data:"Seller Home!"}));

router.get("/list",(req,res)=>{
    return res.json({data:sellerData});
})

module.exports=router;