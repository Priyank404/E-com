const userModel = require('../models/userModel');
const userValidationSchema = require('../validators/register');


const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateTokens');
const ownerModel = require('../models/ownerModel');
module.exports.RegisterUser = async (req, res) => {

    // for validation through joi
    const {error} = userValidationSchema.validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    try {

            let user = await userModel.findOne({email: req.body.email})
            if(user) {
                return res.status(400).json('User already exists')
            }

            let {fullname, email, password} = req.body;
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) throw err;
                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })

                    let token = generateToken(createdUser);
                    res.cookie("token", token);
                    
                    res.send("user send successfully")
                    
                })
            })


    } catch (error) {

        res.status(500).json({ error: error.message || 'Server error' });


    }
}


module.exports.LoginUser = async (req, res) => {
    let {email,password} = req.body;

    let user= await ownerModel.findOne({email})
    let role='owner'

    
    if(!user) {
        user = await userModel.findOne({email})
        role = 'user';
    }

    if(!user) {
        return res.status(400).json({success: false, message: 'User not found'})
    }

    bcrypt.compare(password, user.password, async(err, result)=>{
        if(err) throw err;
        if(result){
            const token =  await generateToken(user,role);
            res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // 👈 keep false in development (localhost)
            sameSite: 'lax'     // 👈 this allows cross-site cookies (React + Express)
            });
            res.json({
                success: true,
                message: 'User logged in successfully',
                role: role  // assuming user has a `role` field like 'user' or 'owner'
            });
        }else{
            res.status(400).json({success: false, message: 'Invalid credentials'})
        }
    });

    
}