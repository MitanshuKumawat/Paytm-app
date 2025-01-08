const express = require('express');
const authMiddleware = require('./middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();


// ------get balance---------
router.get('/balance', authMiddleware, async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    });
});

// -------transfer money--------
// {
// 	to: string,
// 	amount: number
// }
router.post('/transfer', authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to, amount} = req.body;

    const account = await Account.findOne({userId:req.userId}).session(session);       // session(session) is used to bind a Mongoose operation to a specific transaction session

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.json({
            message:'Insufficient balance in your account'
        });
    }

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        session.abortTransaction();
        return res.json({
            message: 'Invalid account'
        });
    }

    // Perform Transactions
    await Account.updateOne({userId:req.userId}, {$inc:{balance: -amount}}).session(session);
    await Account.updateOne({userId:to}, {$inc:{balance: amount}}).session(session);

    // commit the transacition
    await session.commitTransaction();
    res.json({
        message: 'Transaction Successful'
    });

});

module.exports = router;