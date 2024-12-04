let load = document.querySelector("#load");
let badge = document.querySelector("#badge");

function getAllProducts() {
    fetch("https://api.escuelajs.co/api/v1/products?limit=48&offset=0", {
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
        })
        .finally(() => {
            load.style.display = "none";
        })
}
getAllProducts()

let list = document.getElementById("list");

function render(product) {
    product.forEach((product) => {
        let p = document.createElement("p");
        p.textContent = product.title;
        p.classList.add("p");
        let img = document.createElement("img");
        img.src = product.images[0];
        img.style.width = "auto";
        img.alt = product.title
        let div = document.createElement("div");
        div.classList.add("div");
        let p2 = document.createElement("p");
        p2.textContent = product.category.name;
        p2.classList.add("p2");
        let p3 = document.createElement("p");
        p3.textContent = "Price"
        p3.classList.add("p3");
        let p4 = document.createElement("p");
        p4.textContent = `$${product.price.toFixed(2)}`;
        p4.classList.add("p4")
        let btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.classList.add("btn");
        btn.setAttribute("onclick", `addToStore(${product.id})`);

        let div1 = document.createElement("div");
        div1.classList.add("div1");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");

        div2.appendChild(p3);
        div2.appendChild(p4);
        div3.appendChild(btn);

        div1.appendChild(div2);
        div1.appendChild(div3);

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(div1);
        list.appendChild(div);
    });
}

let store_list = [];

async function addToStore(params) {
    let res = await fetch(`https://api.escuelajs.co/api/v1/products/${params}`);
    res = await res.json();
    store_list.push(res);
    badge.textContent = store_list.length;
    console.log(store_list);
    
}

// addToStore()