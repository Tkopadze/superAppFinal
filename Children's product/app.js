document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-container");
  const pagination = document.getElementById("pagination");
  const selectedTagsContainer = document.getElementById("selected-tags");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const cardsPerPage = 15;
  let currentPage = 1;
  let allCards = [];

  // Fetch cards from JSON file
  async function fetchCards() {
    try {
      const response = await fetch("./allnutrition.json"); // Adjusted path based on your file structure
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const cards = await response.json();
      allCards = cards;
      displayCards(cards, currentPage);
      setupPagination(cards);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  // Display cards for the current page
  function displayCards(cards, page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToDisplay = cards.slice(start, end);

    cardsContainer.innerHTML = ""; // Clear existing cards
    cardsToDisplay.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.title}" class="card-img">
                <button class="heart" data-id="${card.id}" data-image="${card.image}" data-name="${card.title}" data-price="${card.price}" data-quantity="1">
                    <img src="../assets/Shape.svg"/>
                </button>                
                <div class="point">
                  <img src="../assets/Star 2.svg">
                  <p>${card.rating}.0</p>
                </div>
                <div class="card-content">
                    <h2>${card.title}</h2>
                    <a href="../index.html"><p class="deskDes">${card.description}</p></a>
                    <p id="mobile-desc">${card.description}</p>
                    <p class="deskPrice">${card.price} ₾</p>
                    <div id="mobile-price">
                        <p>36.00 ₾</p>
                        <p>72.00 ₾</p>
                        <p>-50%</p>
                    </div>
                    <button id="desk-button">${card.button_text}</button>
                    <button id="mobile-button">
                        <img src="../assets/IconAdd.svg">
                        <h3>დამატება</h3>
                    </button>
                </div>
            `;
      cardsContainer.appendChild(cardElement);
    });

    setupHeartButtons(); // Re-setup heart buttons after cards are displayed
  }

  //
  // Setup heart buttons
  function setupHeartButtons() {
    document.querySelectorAll(".heart").forEach((button) => {
      button.addEventListener("click", function () {
        const cardElement = button.closest(".card");
        const title = cardElement.querySelector("h2").textContent;
        const price = cardElement.querySelector(".deskPrice").textContent;
        const imageUrl = cardElement.querySelector(".card-img").src; // Get image URL

        const product = {
          title: title,
          price: price,
          imageUrl: imageUrl, // Include image URL
          quantity: 1,
        };

        addToWishlist(product);
      });
    });
  }

  // Add product to wishlist
  function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingProduct = wishlist.find(
      (item) => item.title === product.title
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  //  end wishlist

  function setupPagination(cards) {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const pageNumbersDiv = document.querySelector(".page-numbers");
    const prevLink = document.querySelector(".prev");
    const nextLink = document.querySelector(".next");

    pageNumbersDiv.innerHTML = ""; // Clear previous page numbers

    // Previous button functionality
    prevLink.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        displayCards(cards, currentPage);
        setupPagination(cards);
      }
    };

    // Next button functionality
    nextLink.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayCards(cards, currentPage);
        setupPagination(cards);
      }
    };

    // Determine how many page numbers to show
    const maxPagesToShow = 4; // Adjust this value to show more/less pages
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if it's too close to the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Page numbers with dots
    if (startPage > 1) {
      const firstPageLink = document.createElement("a");
      firstPageLink.innerText = 1;
      firstPageLink.onclick = () => {
        currentPage = 1;
        displayCards(cards, currentPage);
        setupPagination(cards);
      };
      pageNumbersDiv.appendChild(firstPageLink);

      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.innerText = "...";
        pageNumbersDiv.appendChild(dots);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageLink = document.createElement("a");
      pageLink.innerText = i;
      if (i === currentPage) {
        pageLink.classList.add("active");
      }
      pageLink.onclick = () => {
        currentPage = i;
        displayCards(cards, currentPage);
        setupPagination(cards);
      };
      pageNumbersDiv.appendChild(pageLink);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.innerText = "...";
        pageNumbersDiv.appendChild(dots);
      }

      const lastPageLink = document.createElement("a");
      lastPageLink.innerText = totalPages;
      lastPageLink.onclick = () => {
        currentPage = totalPages;
        displayCards(cards, currentPage);
        setupPagination(cards);
      };
      pageNumbersDiv.appendChild(lastPageLink);
    }
  }

  // Function to add a tag for the selected filter or sort criterion
  function addTag(type, value) {
    // Check if the tag already exists to avoid duplicates
    if (
      document.querySelector(`.tag[data-type="${type}"][data-value="${value}"]`)
    ) {
      return; // If the tag already exists, don't add it again
    }

    // Create the tag element
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.setAttribute("data-type", type); // Set the data-type attribute (e.g., 'brand', 'age')
    tag.setAttribute("data-value", value); // Set the data-value attribute for the tag

    // Define the innerHTML of the tag, including the remove button
    tag.innerHTML = `
        <span>${value}</span>
        <button class="remove-tag-btn">
            <img src="../assets/remove-filter-tr.svg" alt="remove">
        </button>
    `;

    // Append the tag to the selectedTagsContainer
    selectedTagsContainer.appendChild(tag);

    // Attach an event listener to the remove button inside the tag
    tag.querySelector(".remove-tag-btn").addEventListener("click", () => {
      removeTag(type, value); // Call removeTag when the button is clicked
    });
  }
  // Clear all tags and filters
  clearFiltersBtn.addEventListener("click", () => {
    selectedTagsContainer.innerHTML = "";
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((cb) => (cb.checked = false));
    document
      .querySelectorAll(".dropdown-item.selected")
      .forEach((item) => item.classList.remove("selected"));
    filterAndSortCards();
  });

  // Filter and sort function
  function filterAndSortCards() {
    const selectedBrands = Array.from(
      document.querySelectorAll("input[data-brand]:checked")
    ).map((cb) => cb.getAttribute("data-brand"));
    const selectedAges = Array.from(
      document.querySelectorAll("input[data-age]:checked")
    ).map((cb) => cb.getAttribute("data-age"));
    const selectedVolumes = Array.from(
      document.querySelectorAll("input[data-volume]:checked")
    ).map((cb) => cb.getAttribute("data-volume"));
    const selectedRatings = Array.from(
      document.querySelectorAll("input[data-rating]:checked")
    ).map((cb) => cb.getAttribute("data-rating"));
    const sortValue = document
      .querySelector(".dropdown-item.selected")
      ?.getAttribute("data-value");

    let filteredCards = allCards;

    selectedTagsContainer.innerHTML = ""; // Clear previous tags

    // Filter by brand
    if (selectedBrands.length > 0) {
      selectedBrands.forEach((brand) => addTag("brand", brand));
      filteredCards = filteredCards.filter((card) =>
        selectedBrands.includes(card.title)
      );
    }

    // Filter by age
    if (selectedAges.length > 0) {
      selectedAges.forEach((age) => addTag("age", age));
      filteredCards = filteredCards.filter((card) =>
        selectedAges.includes(card.age)
      );
    }

    // Filter by volume
    if (selectedVolumes.length > 0) {
      selectedVolumes.forEach((volume) => addTag("volume", volume));
      filteredCards = filteredCards.filter((card) =>
        selectedVolumes.some((v) => card.description.includes(v))
      );
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      selectedRatings.forEach((rating) => addTag("rating", `${rating} stars`));
      filteredCards = filteredCards.filter((card) =>
        selectedRatings.includes(String(card.rating))
      );
    }

    // Sort the filtered cards
    if (sortValue) {
      addTag("sort", sortValue);
      filteredCards.sort((a, b) => {
        switch (sortValue) {
          case "brand":
            return a.title.localeCompare(b.title);
          case "age":
            return (a.age || "").localeCompare(b.age || "");
          case "volume":
            return (
              parseInt(a.description.match(/\d+/)) -
              parseInt(b.description.match(/\d+/))
            );
          case "rating":
            return b.rating - a.rating; // Sort by rating descending
          default:
            return 0;
        }
      });
    }

    displayCards(filteredCards, 1); // Display the filtered cards on the first page
    setupPagination(filteredCards); // Update pagination for filtered cards
  }

  // Event listeners for filtering and sorting
  document
    .querySelectorAll(
      "input[data-brand], input[data-age], input[data-volume], input[data-rating]"
    )
    .forEach((checkbox) => {
      checkbox.addEventListener("change", filterAndSortCards);
    });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".dropdown-item")
        .forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
      filterAndSortCards();
    });
  });

  fetchCards();
});

//mobile-filter-button
// Toggle mobile filter dropdown
document
  .getElementById("filter-button")
  .addEventListener("click", function (event) {
    var dropdown = document.getElementById("filter-dropdown");

    // Toggle display between block and none
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }

    event.stopPropagation(); // Prevent this click from bubbling to window
  });

// Close filter dropdown when 'close' button is clicked
document
  .getElementById("mobile-filter-close")
  .addEventListener("click", function () {
    document.getElementById("filter-dropdown").style.display = "none";
  });

// Close filter dropdown when clicking outside
window.addEventListener("click", function (event) {
  var dropdown = document.getElementById("filter-dropdown");

  // Check if the click happened outside the dropdown and the brand-button
  if (
    dropdown.style.display === "block" &&
    !dropdown.contains(event.target) &&
    event.target.id !== "filter-button"
  ) {
    dropdown.style.display = "none";
  }
});

//hidewith checkbox
// Function to handle all checkbox changes (brand, age, volume, rating)
function handleCheckboxChange(containerId, datasetKey) {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]`
  );

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const selectedValue = checkbox.dataset[datasetKey];

      if (checkbox.checked) {
        console.log(`Selected ${datasetKey}: ${selectedValue}`);
        hideContainer(containerId); // Hide the specific container when selected
      } else {
        console.log(`Deselected ${datasetKey}: ${selectedValue}`);
      }
    });
  });
}

// Function to hide the specific filter container (without showing the dropdown)
function hideContainer(containerId) {
  const filterContainer = document.getElementById(containerId);

  // Hide the container
  filterContainer.classList.add("hidden");
  filterContainer.style.display = "none";
}

// Initialize brand, age, volume, and rating checkboxes
handleCheckboxChange("filter-container", "brand");
handleCheckboxChange("filter-container-age", "age");
handleCheckboxChange("filter-container-volume", "volume");
handleCheckboxChange("filter-container-rating", "rating");

// Function to handle the showing of the correct filter container based on the button clicked
function handleButtonClick(buttonId, containerId) {
  const button = document.getElementById(buttonId);

  button.addEventListener("click", function () {
    // Hide all filter containers
    document.querySelectorAll(".filter-container").forEach((container) => {
      container.classList.add("hidden");
      container.style.display = "none";
    });

    // Show the specific filter container
    const filterContainer = document.getElementById(containerId);
    filterContainer.classList.remove("hidden");
    filterContainer.style.display = "block";

    // Hide the filter dropdown
    const filterDropdown = document.getElementById("filter-dropdown");
    filterDropdown.classList.add("hidden");
    filterDropdown.style.display = "none";
  });
}

// Initialize event listeners for all buttons
handleButtonClick("brand-button", "filter-container");
handleButtonClick("age-button", "filter-container-age");
handleButtonClick("volume-button", "filter-container-volume");
handleButtonClick("rating-button", "filter-container-rating");
handleButtonClick("price-button", "filter-container-price"); // Added price button initialization

document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to all close buttons within filter containers
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", () => {
      // List of IDs for all filter containers that need to be hidden
      const containerIds = [
        "filter-container",
        "filter-container-age",
        "filter-container-volume",
        "filter-container-rating",
        "filter-container-price",
      ];

      // Loop through each container ID and hide the corresponding container
      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to all back buttons within filter containers
  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", () => {
      // IDs of all filter containers that need to be hidden
      const containerIds = [
        "filter-container",
        "filter-container-age",
        "filter-container-volume",
        "filter-container-rating",
        "filter-container-price",
      ];

      // Hide each specified container
      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.style.display = "none"; // Hide the container
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to all back buttons within filter containers
  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      // Prevent the click event from propagating up to higher-level elements
      event.stopPropagation();

      const filterDropdown = document.getElementById("filter-dropdown");
      // Toggle the display of the filter dropdown
      if (
        filterDropdown.style.display === "none" ||
        filterDropdown.style.display === ""
      ) {
        filterDropdown.style.display = "block";
      } else {
        filterDropdown.style.display = "none";
      }

      // Hide the current filter container
      const container = this.closest(".filter-container");
      if (container) {
        container.style.display = "none"; // Optionally hide the container this button is part of
      }
    });
  });
});

//backgroundcolor
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const containerIds = [
    "filter-dropdown",
    "filter-container",
    "filter-container-age",
    "filter-container-volume",
    "filter-container-rating",
    "filter-container-price",
  ];

  // Function to check visibility and change body background
  function updateBodyBackground() {
    let anyVisible = false;
    containerIds.forEach((id) => {
      const container = document.getElementById(id);
      if (container && container.style.display === "block") {
        anyVisible = true;
      }
    });

    if (anyVisible) {
      body.style.backgroundColor = "#DFDFDF";
    } else {
      body.style.backgroundColor = "#FFFFFF"; // Default white background
    }
  }

  // Attach event listeners to toggle buttons for filters
  containerIds.forEach((id) => {
    const container = document.getElementById(id);
    if (container) {
      const closeButton = container.querySelector(".close-button");
      const backButton = container.querySelector(".back-button");

      // Attach event listeners to close and back buttons
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          container.style.display = "none";
          updateBodyBackground();
        });
      }

      if (backButton) {
        backButton.addEventListener("click", () => {
          container.style.display = "none";
          document.getElementById("filter-dropdown").style.display = "block";
          updateBodyBackground();
        });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const containerIds = [
    "filter-dropdown",
    "filter-container",
    "filter-container-age",
    "filter-container-volume",
    "filter-container-rating",
    "filter-container-price",
  ];

  // Function to check visibility and change body background
  function updateBodyBackground() {
    let anyVisible = false;
    containerIds.forEach((id) => {
      const container = document.getElementById(id);
      if (container && !container.classList.contains("hidden")) {
        anyVisible = true;
      }
    });

    if (anyVisible) {
      body.style.backgroundColor = "#DFDFDF";
    } else {
      body.style.backgroundColor = "#FFFFFF"; // Default white background
    }
  }

  // Attach event listeners to toggle buttons for filters
  containerIds.forEach((id) => {
    const container = document.getElementById(id);
    if (container) {
      const closeButton = container.querySelector(".close-button");
      const backButton = container.querySelector(".back-button");

      // Attach event listeners to close and back buttons
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          container.classList.add("hidden");
          updateBodyBackground();
        });
      }

      if (backButton) {
        backButton.addEventListener("click", () => {
          container.classList.add("hidden");
          document.getElementById("filter-dropdown").classList.remove("hidden");
          updateBodyBackground();
        });
      }
    }
  });

  // Toggle the filter dropdown and apply background color
  document
    .getElementById("filter-button")
    .addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click bubbling
      const dropdown = document.getElementById("filter-dropdown");

      // Toggle display using class 'hidden'
      if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
      } else {
        dropdown.classList.add("hidden");
      }

      updateBodyBackground(); // Update background when the dropdown is toggled
    });

  // Close filter dropdown when 'mobile-filter-close' is clicked
  document
    .getElementById("mobile-filter-close")
    .addEventListener("click", function () {
      document.getElementById("filter-dropdown").classList.add("hidden");
      updateBodyBackground();
    });

  // Close the filter dropdown when clicking outside
  window.addEventListener("click", function (event) {
    const dropdown = document.getElementById("filter-dropdown");
    if (
      !dropdown.classList.contains("hidden") &&
      !dropdown.contains(event.target) &&
      event.target.id !== "filter-button"
    ) {
      dropdown.classList.add("hidden");
      updateBodyBackground();
    }
  });

  // Listen for filter removal (like sort-input clearing)
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateBodyBackground(); // Ensure background is updated when filters are removed
    });
  });

  // Listen for clear filter button or similar actions
  const clearFilterButton = document.getElementById("clear-filters"); // Assuming you have a clear filters button
  if (clearFilterButton) {
    clearFilterButton.addEventListener("click", function () {
      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.classList.add("hidden"); // Hide all filter containers
        }
      });
      updateBodyBackground(); // Reset background color to white
    });
  }

  // Initial background color update
  updateBodyBackground();
});

// Function to add a tag for the selected filter or sort criterion
function addTag(type, value) {
  console.log(`Adding tag: ${type} - ${value}`); // Log for debugging

  // Check if the tag already exists to avoid duplicates
  if (
    document.querySelector(`.tag[data-type="${type}"][data-value="${value}"]`)
  ) {
    console.log("Tag already exists"); // Log to see if duplicates are avoided
    return;
  }

  // Create the outer tag element
  const tag = document.createElement("div");
  tag.classList.add("tag-container"); // This is the outer container
  tag.setAttribute("data-type", type); // Set the data-type attribute (e.g., 'brand', 'age')
  tag.setAttribute("data-value", value); // Set the data-value attribute for the outer container

  // Define the innerHTML of the tag with an inner div (as you specified)
  tag.innerHTML = `
        <div class="tag" data-type="${type}" data-value="${value}">
            <span>${value}</span>
            <button class="remove-tag-btn">Remove</button> 
        </div>
    `;

  // Append the tag to the selectedTagsContainer
  selectedTagsContainer.appendChild(tag);
}

// Function to remove the tag and associated filter
function removeTag(type, value) {
  console.log(`removeTag called with: type = ${type}, value = ${value}`); // Log for debugging

  // Find and remove the outer tag container from the DOM
  const outerTag = document.querySelector(
    `.tag-container[data-type="${type}"][data-value="${value}"]`
  );
  if (outerTag) {
    console.log(`Outer tag found and removed: ${type} - ${value}`); // Log when the outer container is found
    outerTag.remove(); // Remove the outer container element itself
  } else {
    console.log(`Outer tag not found for: ${type} - ${value}`); // Log when outer container is not found
  }

  // Uncheck the checkbox associated with this filter
  const checkbox = document.querySelector(`input[data-${type}="${value}"]`);
  if (checkbox) {
    console.log(`Checkbox unchecked: data-${type}="${value}"`); // Log when checkbox is unchecked
    checkbox.checked = false; // Uncheck the corresponding checkbox
  } else {
    console.log(`Checkbox not found: data-${type}="${value}"`); // Log when checkbox is not found
  }

  // Update the filtered results after removing the filter
}
