const User= require ("../Models/UserModel")
const {createSecretToken, decodSecretToken}=require("../util/SecretToken")
const bcrypt= require("bcrypt");
const nodemailer= require("nodemailer")
const cloudinary = require("../util/cloudinary");
const ejs = require('ejs');
// const mailTemplate= require("../Templates/mail.ejs")


const signUp = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        const existingUserName = await User.findOne({ username });

        if (existingUserName) {
            return res.status(400).json({ message: "User with this username already exists.", success: false });
        }

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists.", success: false });
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);

        res.status(201).json({ message: "Registration successful", token, success: true, user }).cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return;
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
};


const Login= async (req, res, next) =>{
    try{
        const {email,password}= req.body;
        console.log(email, password, "Helloo")
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required."})
        }
        const user= await User.findOne({email});
        if (!user){
            return res.status(400).json({message:"Incorrect password or email"})
        }
        const auth = await bcrypt.compare(password.toString(), user.password.toString());
        if (!auth){
            return res.status(400).json({message:"Incorrect password or email"})
        }
        const token =createSecretToken(user._id);
        res.cookie('token', token, {
            withCredentails:true,
            httpsOnly:false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res
        .status(201)
        .json({message:"Login successfully.",token:token, success:true, user})
        next();
        return;
    }catch(error){
        console.log(error)
        return;
    }
}
const UpdateProfile = async (req, res)=>{
    try{
        const {email, password, username, new_password, img} = req.body;
        const id= req.params.id
        const user= await User.findOne({email});
        // confirm the token id to the user id
        const token = req.header('Authorization');
        console.log(token, "tokne")
        if (!token) {
            return res.Status(401).json({detail:"Token not present"}); 
        }
        const user_id=decodSecretToken(token)
        if (id !== user_id){
            return res.status(403).json({detail:"Unauthorized: You can only update your own profile." })
        }
        if (!user){
            return res.status(404).json({detail:"Incorrect email"})
        }
        const auth = await bcrypt.compare(password.toString(), user.password.toString());
        if (!auth){
            return res.status(400).json({detail:"Incorrect password "})
        }
        const updatedPassword= await bcrypt.hash(new_password.toString(), 12);
        const updatedUser= await User.findOneAndUpdate({_id:id}, {$set:{
            email:email,
            password:updatedPassword,
            username:username,
            profileImage:img
        }}, {new:true})
        return res.status(200).json(updatedUser);
    }catch(error){
        console.log(error)
        return res.status(500).json({detail: error.message})
    }

}
const UpdateProfileImg = async (req, res)=>{
    try{
        const {file} = req.body;
        const id= req.params.id
        const user= await User.findOne({_id:id});
        // confirm the token id to the user id
        const token = req.header('Authorization');
        if (!token) {
            return res.Status(401).json({detail:"Token not present"}); 
        }
        const user_id=decodSecretToken(token)
        if (id !== user_id){
            return res.status(403).json({detail:"Unauthorized: You can only update your own profile." })
        }
        if (!user){
            return res.status(404).json({detail:"Incorrect emails"})
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        // const profileImagePath =  '/uploads/' + req.file.filename;
        const updatedUser= await User.findOneAndUpdate({_id:id}, {$set:{
            profileImage:result.secure_url
        }}, {new:true})
        return res.status(200).json(updatedUser);
    }catch(error){
        console.log(error)
        return res.status(500).json({detail: error.message})
    }

}
const config={
    service:"gmail",
    // host:"smtp.gmail.com",
    // port:587,
    // secure:false,
    auth:{
        user:process.env.username,
        pass:process.env.pass
    },
}

const SendMail=async (req, res, next) =>{
    const data={
        "from":"nwaforglory680@gmail.com",
        "to":"nwaforglory6@gmail.com",
        "subject":"Mail with NodeJS",
        // "text":"Hello i am testing mailing"
    }
    try {
        const template = await ejs.renderFile('./Templates/mail.ejs', { username:"glory" });

        // Set the HTML content of the email
        data.html = template;
        const transporter = nodemailer.createTransport(config);
        const info = await transporter.sendMail(data);
        console.log("Email sent: " + info.response);
        res.status(200).json(info.response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
    // Code for sending email
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.username,
    //         pass: process.env.pass
    //     }
    // });

    // const mailOptions = {
    //     from: "nwaforglory680@gmail.com",
    //     to: "nwaforglory6@gmail.com",
    //     subject: 'Sending Email From Class Monitor App',
    //     html: `Thank you for registering with Technobs Digital Solutions via the class monitor app.<br />
    //     Your student id is <span style:'font-weight:bold'></span>
    //     `,
    // };

//     transporter.sendMail(mailOptions, (error, info)=>{
//         if (error) {
//         console.log(error + "Error here");
//         } else {
//         console.log('Email sent: ' + info.response);
//         console.log(info)
//         }
//     });
//     return res.status(200).json({detail: "mail sent"});
}

module.exports={
    signUp,
    Login,
    SendMail,
    UpdateProfile,
    UpdateProfileImg,
    
}










