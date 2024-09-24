document.addEventListener("DOMContentLoaded", () => {
  const wishlistBox = document.querySelector(".wishlistBox");

  function loadWishlist() {
    // Retrieve wishlist from local storage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
      // If wishlist is empty, show empty message
      wishlistBox.innerHTML = `
            <img src="img/Frame 420.svg" alt="wishlistImg" />
            <h1>ფავორიტები ცარიელია</h1>
            <p>თქვენი სურვილების სია ჯერჯერობით ცარიელია, დაამატე პროდუქტები თქვენს ფავორიტებს.</p>
            <a href="../index.html">
              <button type="button" class="wishlistBtn">მთავარ გვერდზე დაბრუნება</button>
            </a>
          `;
    } else {
      // If wishlist has items, display them
      const itemsHtml = wishlist
        .map(
          (item, index) => `
              <div class="wishlistItem">
                <div class="imgBox">
                  <img src="img/Icon Button (3).svg" class="imgBoxHeart"/>
                  <img src="img/Image Placeholder (16).png" class="imgBoxMainIMG"/>
                  <img src="img/Frame 264.svg" class="imgBoxStar"/>
                </div>
                <div>
                  <div class="titleBox">
                    <div>
                      <h2>${item.title}</h2>
                      <div class="priceBox">
                        <span> 36.00 ₾</span> &nbsp;
                        <span>${item.price}.00 ₾</span>&nbsp;
                        <span class="priceBoxDisc">-50%</span>
                      </div>
                    </div>
                    <div>
                      <img class="delete-btn webDeleteBtn" data-index="${index}" src="img/icon-trash-2.svg"/>    
                    </div>
                  </div>
                  <div class="wishlistItemBox3">
                    <div class="quantity">
                      <div class="quantityBox">
                        <span class="decrease" data-index="${index}">-</span>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                        <span class="increase" data-index="${index}">+</span>
                        
                      </div>
                      <img class="delete-btn mobileDeleteBtn" data-index="${index}" src="img/Shape.svg"/>    
  
                    </div>
                    <button>კალათაში დამატება</button>
                  </div>
                </div>
              </div><br/>
            `
        )
        .join("");

      wishlistBox.innerHTML = `
            ${itemsHtml}
            <div class="pagination-container">
              <span class="pagination-button" id="prev"><</span>
              <div class="pagination-numbers" id="paginationNumbers"></div>
              <span class="pagination-button" id="next">></span>
            </div>
          `;

      // Add event listeners for delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          removeFromWishlist(index);
        });
      });

      // Add event listeners for quantity buttons
      document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          const quantityInput = document.querySelector(
            `.quantity-input[data-index="${index}"]`
          );
          updateQuantity(quantityInput, 1);
        });
      });

      document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          const quantityInput = document.querySelector(
            `.quantity-input[data-index="${index}"]`
          );
          updateQuantity(quantityInput, -1);
        });
      });
    }
  }

  function updateQuantity(input, value) {
    let currentValue = parseInt(input.value, 10);
    if (!isNaN(currentValue)) {
      currentValue += value;
      input.value = Math.max(1, currentValue); // Ensure value is at least 1
    }
  }

  function removeFromWishlist(index) {
    // Retrieve wishlist from local storage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Remove item by index
    wishlist.splice(index, 1);

    // Update local storage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Reload the wishlist
    loadWishlist();
  }

  loadWishlist();

  // Page numeration

  const totalPages = 15;
  const visiblePageCount = 4; // Number of pages to show around the current page

  let currentPage = 1;

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const paginationNumbers = document.getElementById("paginationNumbers");

  function updatePagination() {
    if (paginationNumbers) {
      paginationNumbers.innerHTML = ""; // Clear existing content
    } else {
      console.error("paginationNumbers element not found");
      return; // Exit if the element is not found
    }

    // Update buttons state
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Calculate start and end page numbers
    let startPage, endPage;

    if (currentPage <= visiblePageCount) {
      startPage = 1;
      endPage = Math.min(totalPages, visiblePageCount);
    } else if (currentPage >= totalPages - visiblePageCount + 1) {
      startPage = Math.max(1, totalPages - visiblePageCount + 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(visiblePageCount / 2);
      endPage = currentPage + Math.floor(visiblePageCount / 2);
    }

    // Adjust endPage if it's less than startPage
    endPage = Math.min(totalPages, endPage);

    // Show "first" page and ellipses if necessary
    if (startPage > 1) {
      paginationNumbers.innerHTML += `<div class="pagination-number" data-page="1">1</div>`;
      if (startPage > 2) {
        paginationNumbers.innerHTML += `<div class="pagination-number">...</div>`;
      }
    }
    // Display page numbers
    for (let i = startPage; i <= endPage; i++) {
      const pageNumber = document.createElement("div");
      pageNumber.classList.add("pagination-number");
      pageNumber.textContent = i;

      if (i === currentPage) {
        pageNumber.classList.add("active");
      }

      pageNumber.addEventListener("click", () => {
        currentPage = i;
        updatePagination();
      });

      paginationNumbers.appendChild(pageNumber);
    }

    // Show ellipses and "last" page if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationNumbers.innerHTML += `<div class="pagination-number">...</div>`;
      }
      paginationNumbers.innerHTML += `<div class="pagination-number" data-page="${totalPages}">${totalPages}</div>`;
    }
  }
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });
  }

  // Initial call to populate the pagination
  updatePagination();

  // Back to index.html
  const backToIndexButton = document.getElementById("backToIndex");
  const backToIndexCloseButton = document.getElementById("backToIndexClose");

  if (backToIndexButton) {
    backToIndexButton.addEventListener("click", function () {
      window.location.href = "../index.html";
    });
  }

  if (backToIndexCloseButton) {
    backToIndexCloseButton.addEventListener("click", function () {
      window.location.href = "../index.html";
    });
  }
});
