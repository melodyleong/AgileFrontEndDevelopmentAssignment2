document.addEventListener('DOMContentLoaded', function () {
    let wishlistItems = [];
    let isEditing = false;
    let currentEditingId = null;

    function updateWishlist(action, id, name, cost, urgency) {
        switch (action) {
            case 'add':
                wishlistItems.push({ id: Date.now(), name, cost, urgency });
                break;
            case 'edit':
                const itemIndex = wishlistItems.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    wishlistItems[itemIndex] = { ...wishlistItems[itemIndex], name, cost, urgency };
                }
                break;
            case 'delete':
                wishlistItems = wishlistItems.filter(item => item.id !== id);
                break;
        }
        renderWishlist();
    }

    function renderWishlist() {
        const wishlist = document.querySelector("#wishlist");
        wishlist.innerHTML = wishlistItems.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="wishlist-item-details">
                    <span class="wishlist-item-name ms-2">${item.name}</span>
                    <span class="wishlist-item-cost">${item.cost}</span>
                    <span class="badge bg-pink ms-2">${item.urgency}</span>
                </div>
                <div>
                    <button class="btn edit-btn btn-pink btn-sm ms-2" data-id="${item.id}">Edit</button>
                    <button class="btn delete-btn btn-pink btn-sm ms-2" data-id="${item.id}">Delete</button>
                </div>
            </li>
        `).join('');
    }

    // Event delegation for edit and delete buttons
    document.querySelector("#wishlist").addEventListener('click', function (event) {
        if (event.target.matches('.edit-btn')) {
            const itemId = parseInt(event.target.getAttribute('data-id'), 10);
            const item = wishlistItems.find(item => item.id === itemId);
            if (item) {
                document.querySelector("#wishlistInput").value = item.name;
                document.querySelector("#taskCost").value = item.cost;
                document.querySelector("#taskUrgency").value = item.urgency;
                isEditing = true;
                currentEditingId = item.id;
                document.querySelector("#addButton").textContent = "Update";
            }
        } else if (event.target.matches('.delete-btn')) {
            const itemId = parseInt(event.target.getAttribute('data-id'), 10);
            const confirmation = confirm("Do you want to delete this item?");
            if (confirmation) {
                updateWishlist('delete', itemId);
            }
        }
    });

    document.querySelector("#addButton").addEventListener('click', function () {
        const name = document.querySelector("#wishlistInput").value.trim();
        const cost = document.querySelector("#taskCost").value.trim();
        const urgency = document.querySelector("#taskUrgency").value;

        if (name && cost && urgency) {
            if (isEditing) {
                updateWishlist('edit', currentEditingId, name, cost, urgency);
                isEditing = false;
                currentEditingId = null;
                this.textContent = "Add to Wishlist";
            } else {
                updateWishlist('add', null, name, cost, urgency);
            }
            document.querySelector("#wishlistInput").value = '';
            document.querySelector("#taskCost").value = '';
            document.querySelector("#taskUrgency").value = '';
        }
    });

    renderWishlist();
});