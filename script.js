const accounts = [
  { number: '1234', password: '1234', name: 'Juan Pérez', balance: 1000, transactions: [] },
  { number: '5678', password: '5678', name: 'Ana Gómez', balance: 2500, transactions: [] },
];

let currentAccount = null;

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const loginContainer = document.getElementById('login-container');
  const profileContainer = document.getElementById('profile-container');
  const userNameSpan = document.getElementById('user-name');
  const accountNumberDisplay = document.getElementById('account-number-display');
  const balanceSpan = document.getElementById('balance');
  const usedBar = document.getElementById('used-bar');
  const usedAmountSpan = document.getElementById('used-amount');
  const remainingAmountSpan = document.getElementById('remaining-amount');
  const actions = document.querySelector('.actions-container');
  const transactionsContainer = document.getElementById('transactions-container');
  const transactionsList = document.getElementById('transactions-list');

  const btnDeposit = document.getElementById('btn-deposit');
  const btnWithdraw = document.getElementById('btn-withdraw');
  const btnViewTransactions = document.getElementById('btn-view-transactions');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const number = document.getElementById('account-number').value;
    const password = document.getElementById('password').value;

    const account = accounts.find(acc => acc.number === number && acc.password === password);
    if (account) {
      currentAccount = account;
      loginContainer.style.display = 'none';
      profileContainer.style.display = 'block';
      userNameSpan.textContent = account.name;
      accountNumberDisplay.textContent = account.number.slice(-4);
      updateBalanceUI();
      loginError.style.display = 'none';
    } else {
      loginError.style.display = 'block';
    }
  });

  btnDeposit.addEventListener('click', () => {
    hideActions();
    document.getElementById('deposit-form').style.display = 'block';
  });

  btnWithdraw.addEventListener('click', () => {
    hideActions();
    document.getElementById('withdraw-form').style.display = 'block';
  });

  btnViewTransactions.addEventListener('click', () => {
    hideActions();
    showTransactions();
  });

  document.getElementById('back-btn')?.addEventListener('click', () => {
    currentAccount = null;
    loginContainer.style.display = 'block';
    profileContainer.style.display = 'none';
    transactionsContainer.style.display = 'none';
    document.getElementById('deposit-form').style.display = 'none';
    document.getElementById('withdraw-form').style.display = 'none';
    document.getElementById('account-number').value = '';
    document.getElementById('password').value = '';
    actions.style.display = 'block';
  });

  document.getElementById('deposit-amount').addEventListener('input', hideLoginError);
  document.getElementById('withdraw-amount').addEventListener('input', hideLoginError);

  function hideActions() {
    actions.style.display = 'none';
  }

  function showTransactions() {
    transactionsList.innerHTML = '';
    if (currentAccount.transactions.length === 0) {
      transactionsList.innerHTML = '<li>No transactions found.</li>';
    } else {
      currentAccount.transactions.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        transactionsList.appendChild(li);
      });
    }
    transactionsContainer.style.display = 'block';
  }

  window.closeTransactions = function () {
    transactionsContainer.style.display = 'none';
    actions.style.display = 'block';
  };

  window.closeForm = function () {
    document.getElementById('deposit-form').style.display = 'none';
    document.getElementById('withdraw-form').style.display = 'none';
    actions.style.display = 'block';
  };

  window.deposit = function () {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (!isNaN(amount) && amount > 0 && amount <= 10000) {
      currentAccount.balance += amount;
      currentAccount.transactions.push(`+ $${amount.toFixed(2)} (Deposit)`);
      updateBalanceUI();
      document.getElementById('deposit-form').style.display = 'none';
      actions.style.display = 'block';
      document.getElementById('deposit-amount').value = '';
    }
  };

  window.withdraw = function () {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (!isNaN(amount) && amount > 0 && amount <= currentAccount.balance) {
      currentAccount.balance -= amount;
      currentAccount.transactions.push(`- $${amount.toFixed(2)} (Withdrawal)`);
      updateBalanceUI();
      document.getElementById('withdraw-form').style.display = 'none';
      actions.style.display = 'block';
      document.getElementById('withdraw-amount').value = '';
    }
  };

  function updateBalanceUI() {
    const balance = currentAccount.balance;

    const totalWithdrawals = currentAccount.transactions
      .filter(t => t.includes('(Withdrawal)'))
      .reduce((sum, t) => {
        const amount = parseFloat(t.split('$')[1]);
        return sum + amount;
      }, 0);

    balanceSpan.textContent = balance.toFixed(2);

    const totalInitial = balance + totalWithdrawals;
    const usedPercent = totalInitial > 0 ? (totalWithdrawals / totalInitial) * 100 : 0;

    usedBar.style.width = `${usedPercent.toFixed(2)}%`;
    usedAmountSpan.textContent = totalWithdrawals.toFixed(2);
    remainingAmountSpan.textContent = balance.toFixed(2);
  }

  function hideLoginError() {
    loginError.style.display = 'none';
  }
});