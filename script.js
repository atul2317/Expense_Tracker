const balance = document.getElementById("balance");
const money_pls = document.getElementById("money-pls");
const money_min = document.getElementById("money-min");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/*const dummyTransaction = [
   {id: 1, text:"flower", amount: -30},
   {id: 2, text:"Salary", amount: 30000},
   {id: 3, text:"Books", amount: -430},
   {id: 4, text:"Ticket", amount: -590}
];*/



const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Add transaction

function addTransaction(e){
   e.preventDefault();
   if(
      text.value.trim() === '' || amount.value.trim() === ''
   ){
      alert("Please Enter text and amount");
   }
   else{
      const transaction = {
         id:generateID(),
         text:text.value,
         amount:+amount.value
      }
      transactions.push(transaction);
      addTransactionDOM(transaction);
      updateValues();
      updLocalStorage();
      text.value = '';
      amount.value = '';
   }
}

function generateID(){
   return Math.floor(Math.random*100000000);
}


function addTransactionDOM(transaction){
  //  console.log(transaction);
   const sign = transaction.amount < 0 ? "-" : "+";
   const item = document.createElement("li");
   item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
   );
   item.innerHTML = `
   ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span>
   <button class="del-btn" onclick="removeTransaction(${transaction.id})"> x </button>
   `;

   list.appendChild(item);
   
}

//update value funct

function updateValues(){
   const amounts = transactions.map((transaction) => transaction.amount);
   const total = amounts
   .reduce((acc,item) => (acc += item),0)
   .toFixed(2);
   const income = amounts
   .filter(item => item > 0)
   .reduce((acc,item) => (acc += item),0)
   .toFixed(2);
   const expense = (
      amounts
      .filter(item => item < 0)
      .reduce((acc,item) => (acc +=item),0)* 
      -1).toFixed(2);

   balance.innerText = `$${total}`;
   money_pls.innerText = `$${income}`;
   money_min.innerText = `$${expense}`;
}

function removeTransaction(id){
   transactions = transactions.filter(transaction => transaction.id !== id);
   updLocalStorage();
   Init();
}


//update local storage

function updLocalStorage(){
   localStorage.setItem(
      'transactions',JSON.stringify(transactions)
   );
}

//Init App
function Init(){
   list.innerHTML = "";
   transactions.forEach(addTransactionDOM);
   updateValues();
}
//addTransactionDOM(Transactions);

Init();

form.addEventListener('submit', addTransaction);