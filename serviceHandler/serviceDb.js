const dbConnection = require("../db/connection-wrapper");
const authQuery = require("../sql/query/authQuery");

async function createBudgets(budgets) {

      let sql = authQuery.createBudgets();
      const budgetJson = JSON.stringify(budgets.budgetUpdates);
               //const year =date().now
      console.log("Budget JSON:", budgetJson);     
        let parameters = [
            budgetJson,
            budgets.sumCurrentBudgets,
            budgets.date,
            budgets.userId
        ];
    await dbConnection.executeWithParameters(sql, parameters);
}

async function updateBudgets(budgets) {
    let sql=authQuery.updateBudgets();
 
    const budgetJson = JSON.stringify(budgets.budgetUpdates);
  
            
    let parameters = [
        budgetJson,
        budgets.sumCurrentBudgets,
        budgets.userId
    ];
    await dbConnection.executeWithParameters(sql, parameters);
}
async function getBudgets(userId) {
    let sql = authQuery.getBudgets();
    let parameter = [userId];
    let budgets = await dbConnection.executeWithParameters(sql, parameter);

    if (!budgets) {
        return null;
    }
      console.log(budgets)
    
      
    return budgets;
}


async function isExsist(data) {
    let sql = `
    SELECT EXISTS (
        SELECT 1
        FROM budget
        WHERE YEAR(date) = ?
          AND MONTH(date) = ?
    ) AS isExist;
    `;
    console.log(data)
    let parameters = [new Date(data).getFullYear(), new Date(data).getMonth()];
    
    let [rows] = await dbConnection.executeWithParameters(sql, parameters);
    console.log([rows])
    return rows;  
    
}

async function getSumIncome(userId) {
console.log(userId  +" db")
    let sql =authQuery.getSumIncome();
    let parameters=[userId];
    let userIncomes = await dbConnection.executeWithParameters(sql, parameters);   
    if (!userIncomes) {
        return null;
    }
    
    return userIncomes; 
}
 
module.exports = {
   
    getSumIncome,
    createBudgets,
    updateBudgets,
    getBudgets,
    isExsist
};
