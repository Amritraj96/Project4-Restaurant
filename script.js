/* ---------------------------------------------------------
   Restaurant Flow Logic
   --------------------------------------------------------- */

// 1. getMenu(): Fetches food items from the URL and displays them
async function getMenu() {
    console.log("Fetching menu from API...");
    try {
        const response = await fetch('https://storage.googleapis.com/acciojob-open-file-collections/appsmith-uploads/bb3807e9b0bc49958d39563eb1759406.json');
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Menu Data Loaded:", data);

        const menuContainer = document.querySelector('.food-grid');
        menuContainer.innerHTML = ""; // Clear any existing content

        // Loop through the fetched data and create HTML cards
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('food-card');
            
            // Note: Using the imgSrc from JSON, or a fallback if broken
            card.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" class="card-image" onerror="this.src='https://source.unsplash.com/random/200x200/?food'">
                <div class="card-details">
                    <div class="card-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price}/-</p>
                    </div>
                    <button class="add-btn"><i class="fas fa-plus"></i></button>
                </div>
            `;
            menuContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching menu:", error);
        alert("Failed to load menu. See console for details.");
    }
}

// 2. TakeOrder(): Returns a promise, resolves after 2500ms
function TakeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Taking order...");
            
            // Randomly choose 3 burgers
            const burgers = ["Cheeseburger", "Chicken Burger", "Veggie Burger", "Bacon Burger", "Fish Burger"];
            const selectedBurgers = [];
            
            // Pick 3 random ones
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }

            const orderObject = {
                items: selectedBurgers,
                order_status: "Order Received"
            };
            
            resolve(orderObject);
        }, 2500);
    });
}

// 3. orderPrep(): Returns a promise, resolves after 1500ms
function orderPrep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Chef is preparing food...");
            const status = { order_status: true, paid: false };
            resolve(status);
        }, 1500);
    });
}

// 4. payOrder(): Returns a promise, resolves after 1000ms
function payOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Processing payment...");
            const status = { order_status: true, paid: true };
            resolve(status);
        }, 1000);
    });
}

// 5. thankyouFnc(): The final step
function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

/* ---------------------------------------------------------
   Master Controller
   --------------------------------------------------------- */
async function restaurantController() {
    // Step 1: Load Menu
    await getMenu();

    try {
        
        // Step 2: Take Order (2500ms)
        const order = await TakeOrder();
        console.log("Order taken:", order);

        // Step 3: Prep Order (1500ms)
        const prepStatus = await orderPrep();
        console.log("Order Prep Status:", prepStatus);

        // Step 4: Pay Order (1000ms)
        const payStatus = await payOrder();
        console.log("Payment Status:", payStatus);

        // Step 5: Thank You
        if (payStatus.paid) {
            thankyouFnc();
        }

    } catch (error) {
        console.error("Something went wrong in the order process:", error);
    }
}

// Start the entire flow when window loads
window.onload = restaurantController;
