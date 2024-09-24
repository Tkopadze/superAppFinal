async function fetchCards() {
  try {
    const response = await fetch("./assets/products.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    createCards(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function createCards(data) {
  const cardContainer = document.getElementById("card-container1");

  data.cards.forEach((card) => {
    const cardHTML = `
              <div class="ProductsCard">
                  <img src="${card.imageSrc}" alt="${card.imageAlt}">
                  <p>${card.text}</p>
              </div>
              
          `;
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

fetchCards();

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".categories-container");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const itemWidth = 160; // Width of each category item

  let scrollAmount = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let currentIndex = 0;

  rightArrow.addEventListener("click", () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    scrollAmount += itemWidth;
    if (scrollAmount > maxScroll) {
      scrollAmount = 0;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
    updateArrows();
  });

  leftArrow.addEventListener("click", () => {
    scrollAmount -= itemWidth;
    if (scrollAmount < 0) {
      scrollAmount = slider.scrollWidth - slider.clientWidth;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
    updateArrows();
  });

  // Touch Events
  slider.addEventListener("touchstart", touchStart);
  slider.addEventListener("touchend", touchEnd);
  slider.addEventListener("touchmove", touchMove);

  // Mouse Events
  slider.addEventListener("mousedown", touchStart);
  slider.addEventListener("mouseup", touchEnd);
  slider.addEventListener("mouseleave", touchEnd);
  slider.addEventListener("mousemove", touchMove);

  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
    updateArrows();
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slider.children.length - 1)
      currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();

    slider.classList.remove("grabbing");
    updateArrows();
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -itemWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function updateArrows() {
    if (scrollAmount > 0) {
      leftArrow.style.display = "block";
    } else {
      leftArrow.style.display = "none";
    }

    if (scrollAmount < slider.scrollWidth - slider.clientWidth) {
      rightArrow.style.display = "block";
    }
  }

  // Initial check for arrow visibility
  updateArrows();
});
