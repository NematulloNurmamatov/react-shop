let load = document.querySelector("#load");
let badge = document.querySelector("#badge");
let store_list = [];
let list = document.getElementById("list");
let categories_list = document.getElementById("categories");
let store_box = document.getElementById("store");
let shoping = document.getElementById("shoping");

async function getAllProducts() {
    try {
        let res = await fetch(
            `https://fakestoreapi.com/products`,
            {
                method: "GET",
            }
        );
        res = await res.json();
        render(res);
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    } finally {
        // console.log("Fetch funksiyasi yakunlandi.");
        load.style.display = "none";
    }
}

getAllProducts()

function render(product) {
    product.forEach((product) => {
        let p = document.createElement("p");
        p.textContent = product.title;

        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + "...";
            }
            return text;
        }
        p.textContent = truncateText(product.title, 19);

        p.classList.add("p");
        let img = document.createElement("img");
        img.src = product.image;
        img.style.width = "1000px";
        img.style.height = "200px";

        img.alt = product.title
        let div = document.createElement("div");
        div.classList.add("div");
        let p2 = document.createElement("p");
        p2.textContent = product.category;
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

    store_list.push({ ...res, count: 1 });
    badge.textContent = store_list.length;
    renderStore(store_list);
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
    categories = ["All", ...categories]
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
    store.classList.toggle('translate-x-[1000px]')
}
// showStore()

function renderStore(store_list) {
    store_box.innerHTML = "";
    let fragment = document.createDocumentFragment();

    store_list.forEach((product) => {
        let card = document.createElement("div");
        card.classList.add("text-white", "flex", "justify-between", "items-center");

        let left_card = document.createElement("div");
        left_card.classList.add("flex", "items-center", "gap-4");

        let img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title
        img.classList.add("w-20", "h-20", "rounded-lg")

        let text_box = document.createElement("div");

        let title = document.createElement("p");
        title.textContent = product.title;

        let price = document.createElement("p");
        price.textContent = `$${product.price.toFixed(2)}`;

        text_box.appendChild(title);
        text_box.appendChild(price);

        left_card.appendChild(img)
        left_card.appendChild(text_box)

        let right_card = document.createElement("div");
        right_card.classList.add("flex", "items-center", "gap-2");

        let remove_btn = document.createElement("button");
        remove_btn.setAttribute("onclick", `removeFromStore(${product.id})`)
        remove_btn.textContent = "Remove";
        remove_btn.classList.add("text-red-600", "border", "border-red-600", "px-4", "py-2", "rounded-md", "hover:text-white", "hover:bg-red-700", "focus:outline-none");

        let minus = document.createElement("button");
        minus.setAttribute("onclick", `decrement(${product.id})`)
        minus.textContent = "-";
        minus.classList.add("text-gray-600", "border", "border-gray-600", "px-2", "py-1", "rounded-md", "hover:text-white", "hover:bg-gray-700", "focus:outline-none");


        let count = document.createElement("span");
        count.textContent = product.count;

        let plus = document.createElement("button");
        plus.setAttribute("onclick", `increment(${product.id})`)
        plus.textContent = "+";
        plus.classList.add("text-gray-600", "border", "border-gray-600", "px-2", "py-1", "rounded-md", "hover:text-white", "hover:bg-gray-700", "focus:outline-none");

        right_card.appendChild(remove_btn);
        right_card.appendChild(minus);
        right_card.appendChild(count);
        right_card.appendChild(plus);
        card.appendChild(left_card);
        card.appendChild(right_card);




        fragment.appendChild(card)
    });
    let total = document.createElement("h1");
    total.classList.add("text-2xl", "font-bold", "text-black", "bg-white", "px-2", "py-1", "rounded-md", "fixed", "bottom-4", "w-[45%]");

    let shopping = document.createElement("button");
    shopping.textContent = "Shopping Now";
    shopping.setAttribute("onclick", `shop()`)
    shopping.classList.add("text-white", "bg-blue-500", "border", "border-blue-500", "px-4", "py-[7px]", "rounded-md", "hover:text-white", "hover:bg-blue-700", "focus:outline-none", "fixed", "bottom-4", "right-4", "w-[15%]");


    fragment.appendChild(total);
    fragment.appendChild(shopping);
    store_box.appendChild(fragment)
    total.textContent = `Total: $${store_list.reduce((total, product) => total + product.price * product.count, 0).toFixed(2)}`;



}


function increment(id) {
    let find_product = store_list.find((product) => {
        return product.id == id
    });
    if (find_product.rating.count > find_product.count) {
        find_product.count++;
        renderStore(store_list);
    }
    console.log(find_product);
}

function decrement(id) {
    let find_product = store_list.find((product) => {
        return product.id == id
    });
    if (find_product.count > 1) {
        find_product.count--;
        renderStore(store_list);
    }
    console.log(find_product);
}


function removeFromStore(id) {
    let find_product = store_list.find((product) => {
        return product.id == id
    });
    if (find_product) {
        store_list = store_list.filter((product) => {
            return product.id != id
        });
        badge.textContent = store_list.length;
        renderStore(store_list);
    }
    console.log(find_product);
}


function shop() {
    shoping.style.display = 'block';
    store.classList.toggle('translate-x-[1000px]')
}

