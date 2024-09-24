let selectedRating = 0;

// Event listener for star clicks
document.querySelectorAll(".stars img").forEach((star) => {
  star.addEventListener("click", function () {
    const value = parseInt(this.getAttribute("data-value"));
    selectedRating = value; // Set selected rating to the clicked star value
    updateStarDisplay(); // Update the star display
  });
});

// Update star display based on selected rating
function updateStarDisplay() {
  document.querySelectorAll(".stars img").forEach((star) => {
    const value = parseInt(star.getAttribute("data-value"));
    if (value <= selectedRating) {
      star.src = "ProductImg/Star 8.svg"; // Selected star
    } else {
      star.src = "ProductImg/Star 7.svg"; // Default star
    }
  });
}

// Handle review submission
function submitReview() {
  const reviewText = document.getElementById("reviewText").value;
  if (selectedRating === 0 || reviewText.trim() === "") {
    alert("Please provide a rating and a review.");
    return;
  }

  const reviewsContainer = document.getElementById("reviews");

  const reviewDiv = document.createElement("div");
  reviewDiv.className = "reviewsBox1";

  // Add separator line
  const hr = document.createElement("hr");
  hr.className = "customerLine";
  reviewDiv.appendChild(hr);

  // Append the new review to the reviews container
  reviewsContainer.appendChild(reviewDiv);

  // Add date
  const dateDiv = document.createElement("div");
  dateDiv.className = "dateAndStart";
  const dateSpan = document.createElement("span");
  dateSpan.textContent = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dateDiv.appendChild(dateSpan);

  // Add stars
  const starsDiv = document.createElement("div");
  starsDiv.className = "stars2";
  for (let i = 1; i <= 5; i++) {
    const starImg = document.createElement("img");
    starImg.alt = "star";
    starImg.src =
      i <= selectedRating ? "ProductImg/Star 8.svg" : "ProductImg/Star 9.svg";
    starsDiv.appendChild(starImg);
  }
  dateDiv.appendChild(starsDiv);

  reviewDiv.appendChild(dateDiv);

  // Add review text
  const reviewTextP = document.createElement("p");
  reviewTextP.textContent = reviewText;
  reviewDiv.appendChild(reviewTextP);

  // Add customer info
  const customerDiv = document.createElement("div");
  customerDiv.className = "customer";
  const customerImg = document.createElement("img");
  customerImg.src = "ProductImg/Avatar.svg"; // Use a generic or default image
  customerImg.alt = "customerImg";
  customerDiv.appendChild(customerImg);
  customerDiv.innerHTML += "&nbsp;&nbsp;<p>Your Name</p>"; // Replace "Your Name" with dynamic user input if available
  reviewDiv.appendChild(customerDiv);

  // Clear the form
  document.getElementById("reviewText").value = "";
  selectedRating = 0;
  updateStarDisplay(); // Reset the star display
}

//cards

const cardsData = () => {
  return fetch("cards.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  cardsData().then((jsonData) => {
    generateCardsHTML(jsonData);
  });
});

function generateCardsHTML(data) {
  let html = "";
  const container = document.getElementById("cards-container");

  data.forEach((item) => {
    html += `
          <div class="card">
              <img src="ProductImg/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
      <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
      <img src="ProductImg/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
      <div class="card-content">
        <h4 class="allHomeName">${item.name}</h4>
        <p class="titleDesk">${item.desc}</p>
        <span class="priceText">${item.price}</span>&nbsp;
      
        <br/>
        <button type="button" class="cartButton">კალათაში დამატება</button>
        <button type="button" class="mobButton"><img src="ProductImg/Icon Left (1).svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button>

              </div>
          </div>
      `;
  });

  container.innerHTML = html;
}

// Footer Accordion for mobile

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Toggle the display of the accordion content
      if (content.style.display === "block") {
        content.style.display = "none";
        // this.querySelector('.footerIconMob').style.transform = 'rotate(0deg)';
      } else {
        content.style.display = "block";
        // this.querySelector('.footerIconMob').style.transform = 'rotate(180deg)';
      }
    });
  });
});

// count
document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");

  // Function to update the quantity
  function updateQuantity(value) {
    let currentValue = parseInt(quantityInput.value, 10);
    if (!isNaN(currentValue)) {
      currentValue += value;
      quantityInput.value = Math.max(1, currentValue); //  Ensure value is at least 1
    }
  }

  // Increase quantity on button click
  increaseBtn.addEventListener("click", () => {
    updateQuantity(1);
  });

  // Decrease quantity on button click
  decreaseBtn.addEventListener("click", () => {
    updateQuantity(-1);
  });

  // Ensure the quantity does not go below 1 when manually edited
  // quantityInput.addEventListener("input", () => {
  //   const value = parseInt(quantityInput.value, 10);
  //   if (isNaN(value) || value < 1) {
  //     quantityInput.value = 1;
  //   }
  // });
});

// Read More, Read Less - წაიკითხე მეტი, დახურვა

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-btn");
  const moreText = document.getElementById("more-text");
  const dots = document.getElementById("dots");
  const text = document.getElementById("text");

  // Initially show all the text
  //   text.style.whiteSpace = "nowrap";
  //   text.style.whiteSpace = "normal";
  //   moreText.style.display = "inline";
  moreText.style.display = "none";
  //   dots.style.display = "none";
  dots.style.display = "inline";

  toggleBtn.addEventListener("click", function () {
    if (moreText.style.display === "none") {
      moreText.style.display = "inline";
      dots.style.display = "none";
      text.style.whiteSpace = "normal"; // Ensure full text wraps
      toggleBtn.textContent = "დახურვა";
    } else {
      moreText.style.display = "none";
      dots.style.display = "inline";
      text.style.whiteSpace = "normal"; //Keep text in one line
      toggleBtn.textContent = "წაიკითხე მეტი";
    }
  });
});
