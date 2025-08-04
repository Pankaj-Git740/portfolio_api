const UserModel = require("../Models/User/UserModel");
const jsonwebtoken = require("jsonwebtoken");

const create = async(req, res) =>{
    try {
        const{email, password, id} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Email Or Password is required"})
        }
        const isExist = await UserModel.findOne({email})
        if(isExist){
            return res.status(409).json({error:"User already exists with this email"})
        }
        const newUser = await new UserModel({email, password, profileImage:id}).save();
        const payload = {
            id : newUser.id,
            email : newUser,email
        };
        const token= jsonwebtoken.sign(payload, "dksjafkjdshfkbdscajsbd34r3748cb34783b", {expiresIn :"2d"})
        return res.status(201).json({data:newUser, token})
    } catch (error) {
        console.error("internal server error", error);
        
    }
}  


const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"email or password required"})
        }
        const isExist = await UserModel.findOne({email})
        if(isExist){
            if(isExist.password  !== password)
            return res.status(401).json({error:"invalid email or password"})
        }
        const payload = {
                id:isExist.id,
                email: isExist.email
        };
        const token = jasonwebtoken.sign(payload, "ashdgfhdasgfhsd65656a5dfsas6d56s", {expiresIn:"2d"});
        return res.status(201).json({message:"user login successfully", data:isExist, token})
        
    } catch (error) {
        console.error("internal server error", error);

    }
}

const findMany = async(req, res) =>{
    const users =  await UserModel.find().populate("profileImage")
    if(!users) return res.status(404).json({error:"User not found"})
    return res.status(200).json({data:users})
}

module.exports = {
    findMany, create, login
}