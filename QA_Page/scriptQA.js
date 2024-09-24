// Accordion

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Toggle the display of the accordion content
      if (content.style.display === "block") {
        content.style.display = "none";
        this.querySelector(".icon").style.transform = "rotate(0deg)";
      } else {
        content.style.display = "block";
        this.querySelector(".icon").style.transform = "rotate(180deg)";
      }
    });
  });
});

// Page numeration

document.addEventListener("DOMContentLoaded", () => {
  const totalPages = 15;
  const visiblePageCount = 4; // Number of pages to show around the current page

  let currentPage = 1;

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const paginationNumbers = document.getElementById("paginationNumbers");

  function updatePagination() {
    paginationNumbers.innerHTML = "";

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

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  // Initial call to populate the pagination
  updatePagination();
});

// come back indexHtml

document.getElementById("backToIndex").addEventListener("click", function () {
  window.location.href = "../index.html";
});

document
  .getElementById("backToIndexClose")
  .addEventListener("click", function () {
    window.location.href = "../index.html";
  });
