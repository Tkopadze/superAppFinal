const cards2Data = () => {
  return fetch("cards2.json")
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

// Initial data
let jsonData = [];
let newCardAdded = false;

document.addEventListener("DOMContentLoaded", () => {
  cards2Data().then((data) => {
    jsonData = data;
    generateCards2HTML(jsonData);
  });
});

// Event listener for the right button
document.getElementById("rightButton").addEventListener("click", () => {
  if (!newCardAdded) {
    addNewCard({
      imageURL: "assets/img/Image1.png",
      name: "Oslo Wooden Arm New",
      desc: "ეზოს სავარძელი",
      price: "300.00 ₾",
      startPrice: "",
      discount: "",
    });
    newCardAdded = true; // Set the flag to true once a card is added
  }
});
// Event listener for the left button
document.getElementById("leftButton").addEventListener("click", () => {
  scrollContainer(-200); // Scroll left by 200px or adjust as needed
  // let test = document.querySelector(".leftButton1");
  // test.setAttribute = ("fill", "red");
  // var imgElement = document.getElementById("leftButton");
  // imgElement.src = "assets/img/Frame 92.svg";
});
const imgElementLeft = document.getElementById("leftButton");

// Change image and start scrolling on mousedown
imgElementLeft.addEventListener("mousedown", () => {
  imgElementLeft.src = "assets/img/Buttonblue2.svg";
  // scrollContainer(-200); // Scroll left by 200px or adjust as needed
});

// Revert image on mouseup
imgElementLeft.addEventListener("mouseup", () => {
  imgElementLeft.src = "assets/img/Buttonblue2.svg";
});

// Optionally handle the case where the mouse leaves the button area while clicking
imgElementLeft.addEventListener("mouseleave", () => {
  imgElementLeft.src = "assets/img/Buttongrey.svg";
});

// Add scrollContainer function (assuming you have a scrollContainer function defined somewhere)
function scrollContainer(amount) {
  // Example implementation, replace with your actual scrolling logic
  document.querySelector("main").scrollBy(amount, 0);
}

// end

// Event listener for the right button to scroll right
document.getElementById("rightButton").addEventListener("click", () => {
  scrollContainer(200); // Scroll right by 200px or adjust as needed
  //   // var imgElement2 = document.getElementById("rightButton");
  //   // imgElement2.src = "assets/img/Buttonblue.svg";
});

const imgElement = document.getElementById("rightButton");

// Change image and start scrolling on mousedown
imgElement.addEventListener("mousedown", () => {
  imgElement.src = "assets/img/Buttonblue.svg";
  // scrollContainer(-200); // Scroll left by 200px or adjust as needed
});

// Revert image on mouseup
imgElement.addEventListener("mouseup", () => {
  imgElement.src = "assets/img/Buttonblue.svg";
});

// Optionally handle the case where the mouse leaves the button area while clicking
imgElement.addEventListener("mouseleave", () => {
  imgElement.src = "assets/img/Buttongrey2.svg";
});

// Add scrollContainer function (assuming you have a scrollContainer function defined somewhere)
function scrollContainer(amount) {
  // Example implementation, replace with your actual scrolling logic
  document.querySelector("main").scrollBy(amount, 0);
}

// end

function generateCards2HTML(data) {
  const container = document.getElementById("cards2-container");
  container.innerHTML = ""; // Clear existing cards

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card2";
    card.innerHTML = `
      <img src="assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
      <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
      <img src="assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
      <div class="card2-content">
        <h4 class="allHomeName">${item.name}</h4>
        <p class="titleDesk">${item.desc}</p>
        <span class="priceText">${item.price}</span>&nbsp;
        <span class="allHomeStartPr">${item.startPrice}</span>&nbsp;
        ${
          item.discount
            ? `<span class="allHomeDisc">${item.discount}</span>`
            : ""
        }
        <br/>
        <button type="button" class="cartButton">კალათაში დამატება</button>
        <button type="button" class="mobButton"><img src="assets/img/Icon Left Wrapper.svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button>
      </div>
    `;
    container.appendChild(card); // Append new card to the container
  });
}

function addNewCard(newCard) {
  jsonData.push(newCard); // Add new card to data array
  generateCards2HTML(jsonData); // Re-render cards with updated data
}

function scrollContainer(scrollAmount) {
  const container = document.getElementById("cards2-container");
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
