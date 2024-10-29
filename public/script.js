// public/script.js
async function fetchItems(page) {
    const response = await fetch(`/api/items?page=${page}&limit=10`);
    return response.json();
}

async function renderItems(page = 1) {
    const data = await fetchItems(page);
    const itemList = document.getElementById('item-list');
    const pagination = document.getElementById('pagination');

    // Clear previous items
    itemList.innerHTML = '';
    pagination.innerHTML = '';

    // Render items
    data.items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        itemList.appendChild(div);
    });

    // Render pagination
    for (let i = 1; i <= data.totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = i;
        pageLink.className = 'page' + (i === page ? ' active' : '');
        pageLink.onclick = () => renderItems(i);
        pagination.appendChild(pageLink);
    }
}

// Initial load
renderItems();
