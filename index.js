const express = require('express')
const app = express()
const requests = require('./handle')

app.post('/deposit',async(req,res)=>{
   try{
        var getdeposit = await new requests().DepositFn(req.body)
        res.json(getdeposit);
   }
    catch(error){
        res.send(error)
    }
})

app.post('/withdraw',async(req,res)=>{
    try{
         var getwithdraw = await new requests().WithdrawFn(req.body)
         res.json(getwithdraw);
    }
     catch(error){
         res.send(error)
     }
 })

 app.post('/transfer',async(req,res)=>{
    try{
         var gettransfer = await new requests().TransferFn(req.body)
         res.json(gettransfer);
    }
     catch(error){
         res.send(error)
     }
 })

 app.post('/balance',async(req,res)=>{
    try{
         var getbalance = await new requests().BalanceFn(req.body)
         res.json(getbalance);
    }
     catch(error){
         res.send(error)
     }
 })
module.exports = app
