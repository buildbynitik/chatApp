import User from '../models/userModels.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'


export const signup = async(req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.staus(400).json({ message: "All fields are required" });
        }

         if (password.length < 6) {
          return  res.status(400).json({ message: "Passowrd lenght must be at least 6 characters!!" });

        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exist !!" });
        }

        const salt = await bcrypt.genSalt(10);
        
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password:hashPassword,
        })

        if (newUser) {
            // genrate JWT TOKEN
            generateToken(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "Invalid user Data" });
        }




    } catch (error) {
        console.log("ERROR IN SIGNUP CONTROLLER ", error.message);
        res.status(500).json({ message: "Internal Server ERROR " });
    }
}

export const login =async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid creditinal" });
        }
        const isPassowrdCorrect = await bcrypt.compare(password, user.password);

        if (!isPassowrdCorrect) {
            return res.status(400).json({ message: "Invalid creditinal" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic:user.profilePic,
        })

    } catch (error) {
         console.log("ERROR IN Login CONTROLLER ", error.message);
        res.status(500).json({ message: "Internal Server ERROR " });
    }
}

export const logout = (req, res) => {
   try {
     res.cookie("jwt", "", {
        maxAge: 0,
     });
       res.status(200).json({ message: "Logout sucessfully !!"})
   } catch (error) {
     console.log("ERROR IN Logout CONTROLLER ", error.message);
        res.status(500).json({ message: "Internal Server ERROR " });
   }

    
}


// Update profile ROute

export const updateProfile =async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        
        res.status(200).json(updateUser);



    } catch (error) {
        console.log("ERROR IN Update  CONTROLLER ", error.message);
        res.status(500).json({ message: "Internal Server ERROR " });
    }
}

export const checkAuth =  (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("ERROR IN CHACKAUTH  CONTROLLER ", error.message);
        res.status(500).json({ message: "Internal Server ERROR " });
    }
}
