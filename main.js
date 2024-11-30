function getAllProducts() {
    fetch("https://api.escuelajs.co/api/v1/products?limit=50&offset=0", {
        method: "GET",
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            render(res);

        })
        .catch((err) => {
            console.log(err);
        });
}
getAllProducts()

let list = document.getElementById("list");

function render(product) {
    product.forEach((product) => {
        let p = document.createElement("p");
        p.textContent = product.title;
        p.style.color = "white";
        let img = document.createElement("img");
        img.src = product.images[0];
        img.style.width = "auto";
        img.alt = product.title
        let div = document.createElement("div");
        div.classList.add("div");
        div.appendChild(img);
        div.appendChild(p);
        list.appendChild(div);
    });
}



