document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromURL();
  fetch("https://fakestoreapi.com/products/" + productId)
    .then((response) => response.json())
    .then((product) => {
      renderProductDetails(product);
    })
    .catch((error) => console.log(error));
});

function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function renderProductDetails(product) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image-div");
  productContainer.appendChild(imageDiv);

  const imageElement = document.createElement("img");
  imageElement.src = product.image;
  imageDiv.appendChild(imageElement);

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-div");
  productContainer.appendChild(titleDiv);

  const titleElement = document.createElement("h2");
  titleElement.textContent = product.title;
  titleDiv.appendChild(titleElement);

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("price-div");
  productContainer.appendChild(priceDiv);

  const priceElement = document.createElement("p");
  priceElement.textContent = "Preço: R$" + product.price + ",00";
  priceDiv.appendChild(priceElement);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("description-div");
  productContainer.appendChild(descriptionDiv);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = product.description;
  descriptionDiv.appendChild(descriptionElement);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const productName = document.getElementById("searchInput").value;
    if (productName) {
      searchProductByName(productName)
        .then((products) => {
          if (products.length > 0) {
            renderProductDetails(products[0]);
          } else {
            console.log("Nenhum produto encontrado.");
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Por favor, insira um nome de produto válido.");
    }
  });
});

function searchProductByName(productName) {
  return fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      const matchingProducts = products.filter((product) =>
        product.title.toLowerCase().includes(productName.toLowerCase())
      );
      return matchingProducts;
    })
    .catch((error) => {
      throw new Error("Erro ao pesquisar o produto: " + error);
    });
}

/* MENU HAMBURGUER - inicio */
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});
/* MENU HAMBURGUER - fim */
