//const { createBudgets } = require("../../serviceHandler/serviceDb")

const createBudgets = () => {
   return `INSERT INTO budget
               (budget ,sum_budget,date ,user_id)
               VALUES (?,?,?,?)`;
}

const getSumIncome = () => {

   return `
    SELECT SUM(price) AS total_income
    FROM user_logs
    WHERE revenue_category IS NOT NULL 
      AND user_id = ? 
      AND MONTH(date) = MONTH(CURRENT_DATE) 
      AND YEAR(date) = YEAR(CURRENT_DATE);`

}

const updateBudgets = () => {
  return  `UPDATE budgat
SET sum_budget=? , budget=? 
WHERE user_id = ?`

}

const getBudgets =() => {
   return `SELECT budget ,sum_budget ,date
    from budget
     WHERE user_id = ? `

}

module.exports = {
    getSumIncome,
    updateBudgets,
    createBudgets,
    getBudgets
}