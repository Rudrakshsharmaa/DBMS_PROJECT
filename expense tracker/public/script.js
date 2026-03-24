// Add Expense
async function addExpense() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    // 🔴 Validation
    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (!date) {
        alert("Select a date");
        return;
    }

    await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category, date })
    });

    // Clear inputs
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    loadExpenses();
}

// Load Expenses
async function loadExpenses() {
    const res = await fetch('/get');
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    data.forEach(item => {
        total += item.amount;

        list.innerHTML += `
            <li class="${item.category}">
                ₹${item.amount} - ${capitalize(item.category)} (${formatDate(item.date)})
                <button onclick="deleteExpense(${item.id})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// Delete Expense
async function deleteExpense(id) {
    await fetch(`/delete/${id}`, { method: 'DELETE' });
    loadExpenses();
}

// Capitalize Category (food → Food)
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Format Date (2026-03-25 → 25 Mar 2026)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toDateString();
}

// Load data on page load
loadExpenses();