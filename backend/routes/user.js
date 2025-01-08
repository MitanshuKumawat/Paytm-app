const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const JWT_SECRET = require('./config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');

const app = express();

const router = express.Router();


// SignUp
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
router.post('/signup', async (req,res)=>{
    const body = req.body;   //req aa rhi he
    const {success} = signupSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: 'Invalid details..'
        });
    }

    const user = await User.findOne({
        username: body.username,
    });

    if(user){
        return res.status(411).json({
            message: 'User already exists..'
        })
    }

    const newUser = await User.create(body);

    // --------CREATE USER ACCOUNT-------
    await Account.create({
        userId: newUser._id,
        balance: 1 + Math.random()*1000
    });
    // ----------

    const token = jwt.sign({
        userId: newUser._id
    }, JWT_SECRET);

    res.json({
        message:'User created successfully',
        token: token
    });

});


// SignIn
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async(req,res)=>{
    const {success} = signinSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Wrong credentials.."
        })
    }

    const user = User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            message: 'Signed In successfully..',
            token: token
        });
    }

    return res.json({
        message: "Wrong credentials.."
    })
});


// Update User Information

const updatedBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});
router.put('/', authMiddleware, async (req,res)=>{
    const {success} = updatedBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message: 'Error while updating the information'
        })
    }

    await User.updateOne({
        _id: req.userId,
    },req.body);

    res.json({
        message: 'Updated Successfully..'
    })
})


// filtering

router.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [{
            firstName:{
                '$regex': filter,    // this will search a substring in the names (not only the whole string)
                '$options': 'i'      // case insensitive
            }
        },{
            lastName:{
                '$regex':filter,
                '$options': 'i'
            }
        }]
    });

    res.json({
        user: users.map(user=>{     // this is becoz we don't wnat to return the password of the users
            return {
            username:user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
            }
        })
    })
})

module.exports = router;