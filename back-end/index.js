const port= 4000;
const express= require("express");
const app = express();
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://ELEC-COMMERCE:User123@cluster0-shard-00-00.11hyh.mongodb.net:27017,cluster0-shard-00-01.11hyh.mongodb.net:27017,cluster0-shard-00-02.11hyh.mongodb.net:27017/ELEC-COMMERCE?ssl=true&replicaSet=atlas-ixbk91-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")

app.get("/",(req,res)=>{
    res.send("Express App is runnig")
})
 const storage=multer.diskStorage({
    destination:'./Upload/images',
    filename:(req ,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })

 const Upload=multer({storage:storage});
  
 app.use("/images",express.static('Upload/images'))
 app.post("/Upload", Upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
 })
 const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
 });
 app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        const last_product = products[products.length - 1];
        id = last_product.id + 1; 
    } else {
        id = 1; 
    }

    const product = new Product({
        id: id, 
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});
app.post('/removeproduct', (req, res) => {
    Product.findOneAndDelete({ id: req.body.id })
        .then(product => {
            if (product) {
                console.log("Removed");
                res.json({
                    success: true,
                    message: 'Product removed',
                    name: req.body.name,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Product not found',
                });
            }
        })
        .catch(error => {
            console.error("Error removing product:", error);
            res.status(500).json({
                success: false,
                message: "Error removing product",
                error: error.message,
            });
        });
});
  app.get('/listproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All products Fetched");
    res.send(products);
  })
  const User = mongoose.model("User", {
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        deafult:Date.now,
    },

  })
  app.post('/signup', async(req,res)=>{
    let check= await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"Existing Users found with the same email address"});
    }
    let cart= {};
    for(let i = 0; i < 300; i++){
        cart[i]=0;
    }
    const user =new User ({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData:cart,
    })
    await user.save();
    const data ={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token})
  })
  app.post('/login', async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passMatch= req.body.password === user.password;
        if(passMatch){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true, token});
        }else {
            res.json({success:false, errors:"Wrong Password"});
        }
    }else {
        res.json({success:false, errors:"Wrong E-mail Address"});
    }
  })
  app.get('/newcollections',async(req,res)=>{
    let products =await Product.find({});
    let newcollection= products.slice(1).slice(-8);
    console.log("Newcollection Feteched")
    res.send(newcollection);
  })
  app.get('/popularproducts',async(req,res)=>{
    let products =await Product.find({category:"men"});
    let popularproducts= products.slice(0,4);
    console.log("Popular products Feteched");
    res.send(popularproducts);
  })
  const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({Error:"please authiticate using a valid login"})
    }else{
        try{
            const data =jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }catch (error){
            res.status(401).send({Error:"please authiticate using a valid yoken"});
        }
    }
  }
  app.post('/addtocart', fetchUser, async(req,res)=>{
    console.log("Added",req.body.itemId)
    let userData = await User.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] +=1 ;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
  })
  app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.itemId)
    let userData = await User.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId] >0 )
    userData.cartData[req.body.itemId] -=1 ;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}
    );
    res.send("Removed");
  });
app.listen(port,(error)=>{ 
    if(!error){
        console.log("Server is runing on port" + port);
    }else{
        console.log("Error!" + error);
    }
})