// Get references to all buttons
const myOrdersBtn = document.getElementById("my-orders");
const myCardsBtn = document.getElementById("my-cards");
const myMessagesBtn = document.getElementById("my-messages");
const myAddressesBtn = document.getElementById("my-address");
const mySettingsBtn = document.getElementById("my-settings");
const mainContent = document.getElementById("main-content");

// Function to clear the content in the main area
function clearMainContent() {
  mainContent.innerHTML = "";
}

function setActiveButton(activeButton) {
  const allButtons = [
    myOrdersBtn,
    myCardsBtn,
    myMessagesBtn,
    myAddressesBtn,
    mySettingsBtn,
  ];
  allButtons.forEach((button) => {
    button.style.fontWeight = "normal";
  });
  activeButton.style.fontWeight = "bold";
}

myOrdersBtn.addEventListener("click", () => {
  setActiveButton(myOrdersBtn);
  clearMainContent();

  const orderInfo = `
        <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
        <div class="card-container">
            <!-- Placeholder for dynamic cards -->
        </div>
          <div class="pages">
            <img src="../assets/img/_.svg"  alt="left-arrow">
             <p class="clicked">1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>...</p>
            <p>15</p>
             <img src="../assets/img/_ (1).svg"  alt="right-arrow">
        </div>
    
    `;
  mainContent.innerHTML = orderInfo;
});

// Event Listener for 'ჩემი ბარათები'
myCardsBtn.addEventListener("click", () => {
  setActiveButton(myCardsBtn);
  clearMainContent();

  // Create the wrapper for cards
  const cardsWrapper = `
  <div class="cardsWrapper">
      <button class="add-card-btn">+ ბარათის დამატება</button>
      <div class="cardsContainer">
          <div class="cards">
              <div class="cards-wrap" id="card-1">
                  <img src="./lines black.svg" alt="Card 1">
                  <div class="tag-icon">
                      <img src="./_Radio Base.svg" alt="Card 1">
                      <img src="./icon-more-horizontal.svg" alt="Card 1" class="more-icon">
                      <button class="delete-btn" style="display: none;">Delete</button>
                  </div>
              </div>
              <div class="cards-wrap" id="card-2">
                  <img src="./lines greenish.svg" alt="Card 2">
                  <div class="tag-icon">
                      <img src="./_Radio Base.svg" alt="Card 2">
                      <img src="./icon-more-horizontal.svg" alt="Card 2" class="more-icon">
                      <button class="delete-btn" style="display: none;">Delete</button>
                  </div>
              </div>
              <div class="cards-wrap" id="card-3">
                  <img src="./shapes.svg" alt="Card 3">
                  <div class="tag-icon">
                      <img src="./_Radio Base.svg" alt="Card 3">
                      <img src="./icon-more-horizontal.svg" alt="Card 3" class="more-icon">
                      <button class="delete-btn" style="display: none;">Delete</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
`;

  mainContent.innerHTML = cardsWrapper;
});

// Event Listener for 'შეტყობინებები'
myMessagesBtn.addEventListener("click", () => {
  setActiveButton(myMessagesBtn);
  clearMainContent();

  const noMessages = `<p>შეტყობინებები არ არის</p>`;
  mainContent.innerHTML = noMessages;
});

// Event Listener for 'პარამეტრები'
mySettingsBtn.addEventListener("click", () => {
  setActiveButton(mySettingsBtn);
  clearMainContent();

  const settingsForm = `
        <div class="settings-form">
            <label>Upload Photo:</label>
            <input type="file" id="upload-photo"><br>
            <label>Email:</label>
            <input type="email" id="email-input"><br>
            <label>Name:</label>
            <input type="text" id="name-input"><br>
            <label>Last Name:</label>
            <input type="text" id="lastname-input"><br>
            <label>Mobile Phone:</label>
            <input type="tel" id="mobile-phone-input"><br>
            <button class="save-btn">Save</button>
        </div>
    `;
  mainContent.innerHTML = settingsForm;
});

// Event Listener for 'მისამართები'
myAddressesBtn.addEventListener("click", () => {
  setActiveButton(myAddressesBtn);
  clearMainContent();

  const addAddressButton = `<button class="add-address-btn">Add Address</button>`;
  const addressForm = `
        <div class="address-form">
            <input type="text" id="address-input" placeholder="Enter address">
            <button class="save-address-btn">Save</button>
        </div>
        <div class="address-list">
            <!-- Placeholder for dynamic addresses -->
        </div>
    `;
  mainContent.innerHTML = addAddressButton + addressForm;
});

// Event listener for 'more horizontal' icons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("more-icon")) {
    // Show the delete button associated with the clicked icon
    const deleteButton = event.target.nextElementSibling; // Gets the button after the icon
    deleteButton.style.display = "block"; // Show the delete button
  }

  if (event.target.classList.contains("delete-btn")) {
    // Find the card to delete
    const cardWrap = event.target.closest(".cards-wrap"); // Get the closest card wrapper
    if (cardWrap) {
      cardWrap.remove(); // Remove the card from the DOM

      // Check if there are any cards left
      const cardsContainer = document.querySelector(".cardsContainer");

      if (cardsContainer && cardsContainer.children.length === 0) {
        // If no cards left, show the empty message
        cardsContainer.innerHTML = emptyMessage;
      }
    }
  }
});

const emptyMessage = `
    <div class="empty-message">
        <img src="./Wallet 02.svg" alt="empty bag" />
        <h3>ბარათი ჯერ არ გაქვს დამატებული</h3>
    </div>
`;
