const serviceDb = require("./serviceDb");

  async function  getSumIncomes(userId) {
    console.log(userId +  " logic")
    let sumIncomes = await serviceDb.getSumIncomes(userId);
       console.log(sumIncomes)
    return sumIncomes;
  }
  async function checkIsExsist(userId) {
    console.log(userId +  " logic")
    let isExsist = await serviceDb.checkIsExsist(userId);
       console.log(isExsist)
    return isExsist ;
  }
  


  async function createBudgets(budgets) {
    
    await serviceDb.createBudgets(budgets);
  }

  async function updateBudgets(budgets) {
      await serviceDb.updateBudgets(budgets)
  }


  
  
  
  module.exports = {
    getSumIncomes,
    createBudgets,
    checkIsExsist,
    updateBudgets
  };