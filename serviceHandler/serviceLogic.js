const serviceDb = require("./serviceDb");

async function getSumIncome(userId) {
  console.log(userId + " logic")
  let sumIncomes = await serviceDb.getSumIncome(userId);
  console.log(sumIncomes)
  return sumIncomes;
}

async function getBudgets(userId) {
  let budgats = await serviceDb.getBudgets(userId)
  return budgats;
}
async function isExsist(date) {
  const isExist = await serviceDb.isExsist(date); 
  return isExist;  
}


async function createBudgets(budgets) {

  await serviceDb.createBudgets(budgets);
}

async function updateBudgets(budgets) {
  await serviceDb.updateBudgets(budgets)
}





module.exports = {
  getSumIncome,
  createBudgets,
  isExsist,
  updateBudgets,
  getBudgets
};