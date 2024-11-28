const getOne = () => {
    return `
        SELECT u.id , u.password , c.name 
        FROM user u 
        JOIN client_users c  ON c.id = u.client_user_id
        WHERE u.email = ? `
}
const isExsist= ()=> {
    ` SELECT 1 
    FROM budget
    WHERE user_id = ?`
}

const getSumIncomes = ()=>{
    `
    SELECT SUM(price) AS total_income
    FROM user_logs
    WHERE revenue_category IS NOT NULL 
      AND user_id = ? 
      AND MONTH(date) = MONTH(CURRENT_DATE) 
      AND YEAR(date) = YEAR(CURRENT_DATE);`
    
}


const updateBudgets =()=>{
    `UPDATE budgat
SET sum_budget=? , budget=? 
WHERE user_id = ?`
 
}

module.exports = {
    getOne,
    isExsist,
    getSumIncomes,
    updateBudgets
}