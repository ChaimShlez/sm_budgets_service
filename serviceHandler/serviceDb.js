const dbConnection = require("../db/connection-wrapper");
const authQuery = require("../sql/query/authQuery");

async function createBudgets(budgets) {
    let sql;
    let parameters;

        sql = `INSERT INTO budget
               (budget ,sum_budget ,user_id)
               VALUES (?,?,?)`;
               const budgetJson = JSON.stringify(budgets.budgetUpdates);
               console.log("Budget JSON:", budgetJson);
               
        parameters = [
            budgetJson,
            budgets.sumCurrentBudgets,
           
            budgets.userId
           
        ];
    
        console.log(budgets  +  " client")
        console.log(parameters  +" param")
        console.log(sql  +" sql")

    await dbConnection.executeWithParameters(sql, parameters);
   
}




async function getSumIncomes(userId) {
console.log(userId  +" db")
    let sql = `
        SELECT SUM(price) AS total_income
        FROM user_logs
        WHERE revenue_category IS NOT NULL 
          AND user_id = ? 
          AND MONTH(date) = MONTH(CURRENT_DATE) 
          AND YEAR(date) = YEAR(CURRENT_DATE);`;
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
    createBudgets
};
