const serviceDb = require("./serviceDb");

  async function  getSumIncomes(userId) {
    console.log(userId +  " logic")
    let sumIncomes = await serviceDb.getSumIncomes(userId);
       console.log(sumIncomes)
    return sumIncomes;
  }
  


  async function createBudgets(Budgets) {
    
    await serviceDb.createBudgets(Budgets);
  }


  
  
  
  module.exports = {
    getSumIncomes,
    createBudgets
  };