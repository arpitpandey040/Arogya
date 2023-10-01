//import statements 
const crypto = require('crypto');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mailgen= require('mailgen');
const nodemailer = require('nodemailer');


var pn=1;

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


/******************************************************************************************************************************************************************************/


mongoose.connect(
    'mongodb+srv://arogya702:sweetyakansha@cluster0.afzoaox.mongodb.net/rogya_predictor',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    }
)
.then(() => console.log('DB Connection Successfull'))
.catch((err) => {
    console.error(err);
});


/*******************************************************************************************************************************************************************************/

// define schema.....

const details_schema = {
  cid:Number,
  name_of_store: String,
  address: String,
  img:String,
  contact_detail: String,
  city:String,
  pin:Number,
  state:String
};

const userSchema = new mongoose.Schema({
  uid:Number,
  name: String,
  email: String,
  password: String,
});


//create tables.
const details = mongoose.model("details", details_schema);
const User = mongoose.model('User', userSchema);

/*########################################################################################################################################################################################################################### */


// render front page of the website 

app.get("/",function(req,res){
  res.render("front",{user:"Register"});
})


// render near by store page in website 

app.get("/near_by_store",function(req,res){
    async function saveItem() {
        try {
          const results = await details.find({});
          const cnt = await details.countDocuments({});
          res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
        } catch (error) {
          console.log(error);
        }
      }
      saveItem();
    
});

// render page where user can update data 

app.get("/detail_page",async (req,res)=>{
  const email=(req.query.name);
  var nm,pass;
  User.findOne({ email: email })
  .select('name password') // Select only the name and password fields
  .exec((err, user) => {
    if (err) {
      console.error('Error retrieving user:', err);
      // Handle the error if needed
    } else if (user) {
      const { name, password } = user;
      console.log('User found:');
      const storedPassword = password;

      
      var str2 = storedPassword.split("&#128");
    
      let flag=1;
      let i=-1;
      str2.forEach(element => {
         if(i!=-1&&password[i]!=String.fromCharCode(element))flag=0;
         i++;
       });

      
      res.render("details",{name:name,password:"",email:email,msg:""});
     
      
    } else {
      console.log('User not found');
      res.render("details",{name:"",password:"",email:"",msg:""});
     
    }

  });
  
});

// rendering login and signup page 

app.get("/login_page",(req,res)=>{
  res.render("login",{message:""});
})

// rendering doctor consulting page

app.get("/talk",(req,res)=>{
res.render("talk",{message:""});
 
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/next",function(req,res){
    pn++;
    async function nextelement() {

      try {
        const results = await details.find({});
        const cnt = await details.countDocuments({});
      res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
      }
      catch{
        console.log("error");
      }
    }
  nextelement();
})



app.post("/searchbycity",function(req,res){
   pn=1;
  const city=req.body.city;
  async function nextelement() {
    try {
      const results = await details.find({city:city});
      const cnt = await details.countDocuments({});
    res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
    }
    catch{
      console.log("error");
    }
  }
nextelement();
})




/******************************************************start update************************************************************ */
app.post('/update',async(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  let password=req.body.password;
  const user = await User.findOne({ email:email });

if (user) {
  // Update the desired fields
  user.name = name;
 
  let clutter="";
  let str = password.split("")
  str.forEach(element => {
      clutter += `&#128${(element.charCodeAt())} `
  
  });
  password=clutter;
  // Save the updated document
  user.password = password;
  await user.save();
  res.render("details",{name:name,password:password,email:email,msg:"User data updated successfully"});
     
  console.log('User data updated successfully');
} else {
  res.render("details",{name:name,password:password,email:email,msg:"User not found"});
     
  console.log('User not found');
}
})
/*********************************************************end update************************************************************* */

app.post('/register', async (req, res) => {
  

    //const { name, email, password } = req.body;
    const name=req.body.name;
    const email=req.body.email;
    let password=req.body.password;
    //encrypted
    let clutter="";
     let str = password.split("")
     str.forEach(element => {
         clutter += `&#128${(element.charCodeAt())} `
         
     });
     password=clutter;

   // email sending
     let config ={
      service: 'gmail',
      auth :{
        user:'arogya702@gmail.com',
      pass:'zlentpmhusgtblww'
      }
     }
    let transporter= nodemailer.createTransport(config);
    let mailgenerator= new mailgen({
       theme: "default",
       product:{
         name: "Arogya",
         link:"https://mailgen.js/"
       }
    })
    let response ={
      body:{
        intro:name,
        table:{
           data:{
            description:{ f:"Welcome to rogys predictor! We're thrilled to have you on board and would like to extend our warmest greetings.",
             s:"Congratulations on successfully logging into your account. You now have access to a world of exciting features and services designed to enhance your experience Should you have any questions, concerns, or need any assistance, our support team is always here to help.",
             t:"Feel free to reach out to us . Thank you once again for joining Unikon. We look forward to serving you and ensuring a seamless and enjoyable experience. " }
           }
        },
        outro:"stay healthy!!"
      }
    }
     let mail=mailgenerator.generate(response);
     let message={
      from:"arogya702@gmail.com",
      to:email,
      subject:"you login successfully",
      html:mail

     }
     transporter.sendMail(message).then(()=>{
      console.log("send succesfully !!");
     }).catch(error=>{
      console.log("error!!");
     });
     const item1 = new User({
     
      email: email,
      password: password,
      name: name
    });
    async function saveItem() {

      try {
        await item1.save();
        console.log("Item saved successfully!");
        res.render("login",{message:"signin succesfully kindly login !!"});
       
      } catch (error) {
        console.log(error);
        res.render("login",{message:"error try again!!"});
      }
    }
    saveItem();
});


//sending patient detail to doctor 

app.post('/datacollection', async (req, res) => {
  
  
  const phone=req.body.phone;
  const email=req.body.email;
  const age=req.body.age;
  const gender=req.body.gender;
  const symptom=req.body.symptom;
  
  

 // email sending
   let config ={
    service: 'gmail',
    auth :{
      user:'arogya702@gmail.com',
      pass:'zlentpmhusgtblww'
    }
   }
  let transporter= nodemailer.createTransport(config);
  let mailgenerator= new mailgen({
     theme: "default",
     product:{
       name: "Arogya",
       link:"https://mailgen.js/"
     }
  })
  let response ={
    body:{
      intro:"Dear ,",
      table:{
         data:{
          description:{ f:"I hope this message finds you well. I wanted to personally thank you for taking the time to share your symptoms, age, and gender with us. Your health and well-being are of paramount importance to us, and we are committed to providing you with the best possible care. ",
           s:"Your symptoms have been duly noted, and I am pleased to inform you that a qualified medical professional will be reaching out to you shortly. Our team of experienced doctors will carefully review the information you've provided and will be in touch via the phone number you've given us.",
           t:"Please rest assured that your privacy and confidentiality are our top priorities. The information you've shared will only be used for the purpose of facilitating your consultation with the doctor." }
         }
      },
      outro:"stay healthy!!"
    }
  }
   let mail=mailgenerator.generate(response);
   let message={
    from:"arogya702@gmail.com",
    to:email,
    subject:"you login successfully",
    html:mail

   }
   transporter.sendMail(message).then(()=>{
    console.log("send succesfully !!");
   }).catch(error=>{
    console.log("error!!");
   });
   
      
      res.render("talk",{message:"This is to confirm that we have received your symptom details. Our medical team will review them shortly. Please keep an eye on your email for further communication."});
   
});



// Handle user sign-in

app.post("/login", function (req, res) {
  const username = req.body.name1;
  const password = req.body.pass1;

 User
    .findOne({ email: username })
    .then(async (data) => {
      if (data) {
        const storedPassword = data.password;

      
        var str2 = storedPassword.split("&#128");
      
        let flag=1;
        let i=-1;
        str2.forEach(element => {
           if(i!=-1&&password[i]!=String.fromCharCode(element))flag=0;
           i++;
         });

        
      
        if (flag==1) {
          res.cookie('user_name', username, {
            httpOnly: true
          });
       
          res.render("front", { user:username });
        } else {
          res.render("front", { user: "Please enter a valid username or password!" });
        }
      } else {
        res.render("front", { user: "Please enter a valid username or password!" });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});


///////////////////////////////////////////////////////////listen///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(3000,function(){
  console.log("server started at port 3000");
})











/*#############################################################################  THE END ########################################################################################################################## */