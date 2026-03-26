// Array to store all guest entries
let guests = [];

// DOM Elements
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveBtn = document.getElementById('saveBtn');
const guestList = document.getElementById('guestList');
const searchInput = document.getElementById('searchInput');

// Modal Logic
openModalBtn.onclick = () => modal.classList.remove('hidden');
closeModalBtn.onclick = () => modal.classList.add('hidden');

// Close modal if clicking outside the box
window.onclick = (event) => {
    if (event.target === modal) modal.classList.add('hidden');
};

// Handle Saving Data
saveBtn.onclick = () => {
    const nameInput = document.getElementById('nameInput');
    const amountInput = document.getElementById('amountInput');
    const currencyInput = document.getElementById('currencyInput');

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const currency = currencyInput.value;

    if (name !== "" && !isNaN(amount)) {
        // Add to array
        guests.push({ name, amount, currency });
        
        // Update UI
        updateUI();

        // Clear inputs and close
        nameInput.value = '';
        amountInput.value = '';
        modal.classList.add('hidden');
    } else {
        alert("សូមបញ្ចូលឈ្មោះ និងចំនួនទឹកប្រាក់ឲ្យបានត្រឹមត្រូវ!");
    }
};

// Update Display Logic
function updateUI(filter = '') {
    // Clear list
    guestList.innerHTML = '';
    
    let totalUSD = 0;
    let totalKHR = 0;

    // Filter guests based on search input
    const filtered = guests.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        guestList.innerHTML = '<p class="text-center text-gray-400 mt-10">មិនមានទិន្នន័យទេ</p>';
    }

    // Render guest items
    filtered.forEach(guest => {
        const item = document.createElement('div');
        item.className = 'guest-item shadow-sm';
        item.innerHTML = `
            <span class="font-medium text-gray-700">${guest.name}</span>
            <span class="font-bold ${guest.currency === 'USD' ? 'text-green-600' : 'text-blue-600'}">
                ${guest.currency === 'USD' ? '$' + guest.amount.toLocaleString() : guest.amount.toLocaleString() + ' ៛'}
            </span>
        `;
        guestList.appendChild(item);
    });

    // Calculate totals from the main guests array
    guests.forEach(g => {
        if (g.currency === 'USD') totalUSD += g.amount;
        else totalKHR += g.amount;
    });

    // Update stats on screen
    document.getElementById('totalUSD').innerText = `$${totalUSD.toLocaleString()}`;
    document.getElementById('totalKHR').innerText = `${totalKHR.toLocaleString()}៛`;
    document.getElementById('guestCount').innerText = guests.length;
}

// Search as you type
searchInput.oninput = (e) => updateUI(e.target.value);