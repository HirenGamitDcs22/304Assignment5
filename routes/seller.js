const express=require("express");
const router=express.Router();

const sellerModel=require("../models/seller");

router.get("/",(req,res)=>res.json({data:"Seller Home!"}));

router.get("/list",(req,res)=>{
    return res.json({data:sellerModel});
})

//add new Seller
router.post("/addseller", (req,res)=>{
    const {newSeller}=req.body;
    sellerModel.create(newSeller);
    return res.json({data:"Seller Add SuccessFully...!"});
});

//fetch seller details based on product name

//update seller (add/remove products)

//delete seller
router.delete("/delseller/:id",async(req,res)=>{
    const sid=req.params.id;
    const delSeller= await sellerModel.findOneAndDelete({seller_id:sid});
    if(delSeller){
        return res.json({data:"Seller Deleted Successfully...!"});
    }
    return res.json({data:"Seller Can't Delete."});
});

module.exports=router;