require("dotenv").config();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=5000;

mongoose.connect(process.env.MONGOURL)
.then(console.log("MongoDB Connected...!"));

const sellerRouter=require("./routes/seller");
const companyRouter=require("./routes/company");
const productRouter=require("./routes/products");

app.use("/seller",sellerRouter);

app.use("/company",companyRouter);

app.use("/products",productRouter);

app.get("/",(req,res)=> console.log("Hello world!"));

app.listen(port, () => console.log(`Server running on port ${port}`));





/* POST REQUESTS:


<------ ADD ------>
add new company
add new seller
add new product


<------ RETRIEVE ------>
fetch company details based on product name
fetch seller details based on product name
fetch all products of a company
fetch all products of a seller


<------ UPDATE ------>
update company (add/remove products)
update seller (add/remove products)
update product (add/remove category)


<------ DELETE ------>
delete company
delete seller
delete product
 */