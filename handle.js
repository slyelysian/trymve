const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("mssql");
const config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'Padoru'
};
// connect to your database
const err = sql.connect(config)
if (err) console.log(err);
app.use(bodyParser.json());

class Fn{
    async DepositFn(req){
        return new Promise(async function (resolve, reject) {
            try {
                var request = new sql.Request();
                let message = ""
                var statusCode = 0
               var deposit= req.deposit
                var account = req.account
                var password = req.password
                var login = `SELECT * FROM farDB.dbo.BANK WHERE account ='${account}' AND password = '${password}'`
                var result = await request.query(login)
                console.log(result.recordset[0].balance)

                if(result.recordset[0] == undefined){
                    message = {message:"Wrong account or Password",
                            statusCode : 400 }
                }else{
                    if(deposit >= 100){
                        var setdeposit = `UPDATE farDB.dbo.BANK SET balance += '${deposit}' 
                        WHERE account = '${account}' AND password = '${password}' `
                        await request.query(setdeposit) //à¹ƒà¸ªà¹ˆà¹ƒà¸™database
                        message ={ message:"Success to deposit : Your deposit is " + deposit,
                        statusCode : 200}
                    }
                    else { message = { message: "Your money not enough to deposit",
                            statusCode : 400 }} 
                }
                resolve(message)


            } catch (err) {
            let messageError = {message: err.message || ` CREATE failed [Error] ${err}`,
                statusCode: err.statusCode || 500}
                reject(messageError)
            }
        })
    }
    async WithdrawFn(req){
        return new Promise(async function (resolve, reject) {
            try{
                
                var request = new sql.Request();
                let message = ""
                var statusCode = 0
                var withdraw = req.withdraw
                var account = req.account
                var password = req.password
                var login = `SELECT * FROM farDB.dbo.BANK WHERE account ='${account}' AND password = '${password}'`
                var result = await request.query(login)
                console.log(result.recordset[0].balance)

                if(result.recordset[0] == undefined){
                    message = {message:"Wrong account or Password",
                                 statusCode:400}
                }else{
                    if(withdraw >= 20000){
                        message = { message:"Can't withdraw more than 20000 bath",
                        statusCode:400}
                    }
                    else if(result.recordset[0].balance < withdraw){
                        message = { message:"Not enough money in the account",
                        statusCode:400}
                    }
                    else{
                        var setwithdraw = `UPDATE farDB.dbo.BANK SET balance -= '${withdraw}'`
                        await request.query(setwithdraw)
                        message = { message:"Success to deposit : Your withdraw is "+withdraw,
                        statusCode : 200}
                    }
                }
                resolve(message)
            }
            catch{
                let messageError ={message: err.message || ` CREATE failed [Error] ${err}`,
                statusCode: err.statusCode || 400}
            reject(messageError)
            }
        })

    }

    async TransferFn(req){
        return new Promise(async function (resolve, reject) {
            try{
                var request = new sql.Request();
                let message = ""
                statusCode = 0
                var transfer = req.transfer
                var account = req.account
                var other_account = req.other_account
                var password = req.password
                var login = `SELECT * FROM farDB.dbo.BANK WHERE account ='${account}' AND password = '${password}'`
                var result = await request.query(login)
                console.log(result.recordset[0].balance)
                if(result.recordset[0]== undefined){
                    message = { message:"Wrong account or Password",
                statusCode : 400}
                }else{
                    var check_account = `SELECT * FROM farDB.dbo.BANK WHERE account ='${other_account}' `
                    var check = await request.query(check_account)
                    console.log(check.recordset[0].balance)
                    if(check.recordset[0] == undefined){
                        message = { message: "Wrong account ",
                        statusCode : 400}
                    }
                     else if(transfer >= 1000000)
                       { message = { message:"Can't transfer more than 1000000 bath",
                                        statusCode : 400}
                       }
                        
                    else if(result.recordset[0].balance < transfer )
                       {message ={ message: "Not enough money in the account",
                                 statusCode : 400}
                        }
                    else{      
                        var settransfer_to = `UPDATE farDB.dbo.BANK SET balance -= '${transfer}' WHERE account ='${account}'  `
                        await request.query(settransfer_to)
                        
                      var settransfer_for = `UPDATE farDB.dbo.BANK SET balance += '${transfer}' WHERE account ='${other_account}'`
                       await request.query(settransfer_for)
                       
                   message = { message:"Success to transfer : Your transfer is " +transfer+ " to account " + other_account, 
                   statusCode : 200  }
                 }
                }
                resolve(message)
            }
            catch{
             let messageError = { message:err.message || ` CREATE failed [Error] ${err}`,
             statusCode: err.statusCode || 400}
            reject(messageError)    
            }
        })
    }
    async BalanceFn(req){
        return new Promise(async function (resolve, reject) {
            try{
                var request = new sql.Request();
                let message = ""
                var statusCode = 0
                var account = req.account
                var password = req.password
                var query = `SELECT * FROM farDB.dbo.BANK WHERE account ='${account}' AND password = '${password}'`
                var result = await request.query(query)
                if(result.recordset[0] == undefined){
                    message = { message:"Wrong account or password",
                    statusCode : 400}
                }else{
                    console.log(result.recordset[0].balance)
                    message ={ message: "Your balance is "+result.recordset[0].balance,
                    statusCode : 200}
                }
            resolve(message)
            }
            catch{
            let messageError = { message:err.message || ` CREATE failed [Error] ${err}`,
            statusCode: err.statusCode || 400}
            reject(messageError)  
            }
        })
    }
}
module.exports = Fn;
