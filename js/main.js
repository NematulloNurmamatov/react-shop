let load = document.querySelector("#load");
let badge = document.querySelector("#badge");
let store_list = [];
let list = document.getElementById("list");
let categories_list = document.getElementById("categories");
let store = document.getElementById("store");

async function getAllProducts() {
    let res = await fetch(
        `https://fakestoreapi.com/products`,
        {
            method: "GET",
        }
    );
    res = await res.json();
    render(res)
}

getAllProducts()

function render(product) {
    product.forEach((product) => {
        let p = document.createElement("p");
        p.textContent = product.title;
        p.classList.add("p");
        let img = document.createElement("img");
        img.src = product.image;
        img.style.width = "500px";
        img.style.height = "200px";

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




async function addToStore(params) {
    let res = await fetch(`https://fakestoreapi.com/products/${params}`);
    res = await res.json();
    store_list.push(res);
    badge.textContent = store_list.length;
    // console.log(store_list);
    console.log(res);
    

}
// addToStore()

async function getAllCategories() {
    try {
        let res = await fetch("https://fakestoreapi.com/products/categories",
            {
                method: "GET",
            }
        )
        res = await res.json()
        // console.log(res);
        renderCategories(res)

    } catch (error) {
        alert(error.message);
    }
};

getAllCategories()

function renderCategories(categories) {
    let fragment = document.createDocumentFragment();
    categories = ["All" , ...categories]
    categories?.forEach((element) => {
        let btn_category = document.createElement("button");
        btn_category.textContent = element;
        btn_category.classList.add("btnCategory");
        btn_category.setAttribute('onclick', `filterByCategory("${element}")`);
        // console.log(btn_category);

        fragment.appendChild(btn_category)

    })
    categories_list.appendChild(fragment);
}
// renderCategories()
// getAllCategories()

const filterByCategory = async (category) => {
    list.innerHTML = "";
    try {
        if (category == "All") {
            getAllProducts()
        }
        else {
            let res = await fetch(`https://fakestoreapi.com/products/category/${category}`)
            res = await res.json()
            render(res)
        }

    } catch (error) {
        alert(error.message);
    }
}

const showStore = () => {
    store.classList.remove('translate-x-[-700]')
}