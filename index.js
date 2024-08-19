const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transaction')) || [];


function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transactions));

}

function addTransaction(e) {
    e.preventDefault();


    const transaction = {

        id: generateID(),
        text: text.value,
        amount: +amount.value

    };




    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';

}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {

    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `

${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
<button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>

`;


    list.appendChild(item);

}


function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);


    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expenseTotal = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `+$${incomeTotal}`;
    expense.innerText = `-$${expenseTotal}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);