const dbConnection = require("../db/connection-wrapper");
const authQuery = require("../sql/query/authQuery");

async function createBudgets(budgets) {

      let sql = `INSERT INTO budget
               (budget ,sum_budget ,user_id)
               VALUES (?,?,?)`;
               const budgetJson = JSON.stringify(budgets.budgetUpdates);
               console.log("Budget JSON:", budgetJson);
               
        let parameters = [
            budgetJson,
            budgets.sumCurrentBudgets,
           
            budgets.userId
           
        ];
    
        console.log(budgets  +  " client")
        console.log(parameters  +" param")
        console.log(sql  +" sql")

    await dbConnection.executeWithParameters(sql, parameters);
   
}


async function checkIsExsist(userId) {
    let sql=authQuery.isExsist()
    
    let param=[userId];
    let userIncomes = await dbConnection.executeWithParameters(sql, param);  
    return userIncomes.length > 0;
}
async function updateBudgets(budgets) {
    let sql=authQuery.updateBudgets;
 
    const budgetJson = JSON.stringify(budgets.budgetUpdates);
  
            
    let parameters = [
        budgetJson,
        budgets.sumCurrentBudgets,
        budgets.userId
    ];
    await dbConnection.executeWithParameters(sql, parameters);
}

async function getSumIncomes(userId) {
console.log(userId  +" db")
    let sql =arguments.getSumIncomes();
    let parameters=[userId];
    let userIncomes = await dbConnection.executeWithParameters(sql, parameters);   
    if (!userIncomes) {
        return null;
    }
    console.log(userIncomes)
    console.log(parameters)
    console.log(sql)
    return userIncomes; 
}
 
module.exports = {
   
    getSumIncomes,
    createBudgets,
    updateBudgets,
    checkIsExsist
};
