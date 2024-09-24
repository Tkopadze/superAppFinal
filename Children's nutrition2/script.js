const cards2Data = () => {
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
  cards2Data().then((jsonData) => {
    generateCards2HTML(jsonData);
  });
});

function generateCards2HTML(data) {
  let html = "";
  const container = document.getElementById("cards2-container");

  data.forEach((item) => {
    html += `
            <div class="card2">
                <img src="../assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
                <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
                <img src="../assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
                <div class="card2-content">
                    <h4 class="allHomeName">${item.name}</h4>
                    <p class="titleDesk">${item.desc}</p>
                    <div class="priceAndDisc">
                      <span class="priceText priceText2">${
                        item.price
                      }</span>&nbsp;
                      <span class="allHomeStartPr">${
                        item.startPrice
                      }</span>&nbsp;
                    ${
                      item.discount
                        ? `<span class="allHomeDisc">${item.discount}</span>`
                        : ""
                    }
                    </div>
                    <button type="button"  class="cartButton">კალათაში დამატება</button">
                    <button type="button"  class="mobButton"><img src="productPageImg/Icon Left (3).svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button">
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}

// second

const cards3Data = () => {
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

document.addEventListener("DOMContentLoaded", () => {
  cards3Data().then((jsonData) => {
    generateCards3HTML(jsonData);
  });
});

function generateCards3HTML(data) {
  let html = "";
  const container = document.getElementById("cards3-container");

  data.forEach((item) => {
    html += `
          <div class="card3">
              <img src="../assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
              <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
              <img src="../assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
              <div class="card2-content">
                  <h4 class="allHomeName">${item.name}</h4>
                  <p class="titleDesk2">${item.desc}</p>
                  <span class="priceText">${item.price}</span>&nbsp;
                 
                  <button type="button"  class="cartButton">კალათაში დამატება</button">
                  <button type="button"  class="mobButton"><img src="../assets/img/Icon Left Wrapper.svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button">
              </div>
          </div>
      `;
  });

  container.innerHTML = html;
}

// third

const cards4Data = () => {
  return fetch("cards3.json")
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
  cards4Data().then((jsonData) => {
    generateCards4HTML(jsonData);
  });
});

function generateCards4HTML(data) {
  let html = "";
  const container = document.getElementById("cards4-container");

  data.forEach((item) => {
    html += `
          <div class="card4">
              <img src="../assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
              <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
              <img src="../assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
              <div class="card2-content">
                  <h4 class="allHomeName">${item.name}</h4>
                  <p class="titleDesk">${item.desc}</p>
                  <span class="priceText">${item.price}</span>&nbsp;
                 
                  <button type="button"  class="cartButton">კალათაში დამატება</button">
                  <button type="button"  class="mobButton"><img src="../assets/img/Icon Left Wrapper.svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button">
              </div>
          </div>
      `;
  });

  container.innerHTML = html;
}
