document.addEventListener("DOMContentLoaded", function () {
  const productListElement = document.getElementById("productList");
  const searchForm = document.getElementById("searchForm");

  fetch("https://fakestoreapi.com/products/category/electronics")
    .then((response) => response.json())
    .then((data) => {
      const electronicsProducts = data;
      addProductsToPage(electronicsProducts);

      searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value;
        const filteredProducts = filterProductsByName(
          electronicsProducts,
          searchInput
        );
        addProductsToPage(filteredProducts);
      });
    })
    .catch((error) => console.log(error));
});

function addProductsToPage(products) {
  const productListElement = document.getElementById("productList");
  productListElement.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    productElement.appendChild(imageElement);

    const titleElement = document.createElement("h2");
    titleElement.textContent = product.title;
    productElement.appendChild(titleElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = "Preço: R$" + product.price;
    productElement.appendChild(priceElement);

    const buttonElement = document.createElement("a");
    buttonElement.classList.add("button");
    buttonElement.href = "/detalhes.html?id=" + product.id;
    buttonElement.textContent = "Comprar agora";
    productElement.appendChild(buttonElement);

    productListElement.appendChild(productElement);
  });
}

function filterProductsByName(products, productName) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(productName.toLowerCase())
  );
}

/* MENU HAMBURGUER - inicio */
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});
/* MENU HAMBURGUER - fim */
