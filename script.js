console.log(`Clase 1 - semana 5`)

let productsDisplay = []
let botonOrdenar = document.getElementById("ordenar")

let cargaInicio = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            productsDisplay = products
            pintarListaProds(productsDisplay)
        })
}

let crearSelect = () => {
    let selectElement = document.createElement("select")
    selectElement.setAttribute("id", "select")
    document.getElementById("selectCat").appendChild(selectElement)
    let optAll = document.createElement("option")
    optAll.setAttribute("value", "0")
    let allCat = document.createTextNode("Todas las categorias")
    optAll.appendChild(allCat)
    document.querySelector("#selectCat>select").appendChild(optAll)

    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categorias => categorias.map((categoria, i) => {
            let opt = document.createElement("option")
            let cat = document.createTextNode(categoria)
            opt.setAttribute("value", i + 1)
            opt.appendChild(cat)
            document.querySelector("#selectCat>select").appendChild(opt)
        }))
}

let pintarListaProds = (lista) => {
    let ulElement = document.createElement("ul");
    document.getElementById("listaProductos").appendChild(ulElement);
    lista.map(product => {
        let liElement = document.createElement("li")
        document.querySelector("#listaProductos>ul").appendChild(liElement);

        let imagen = document.createElement("img")
        imagen.setAttribute("src", product.image)
        liElement.appendChild(imagen)

        let h2Element = document.createElement("h2")
        let titulo = document.createTextNode(product.title)
        h2Element.appendChild(titulo)
        liElement.appendChild(h2Element)

        let pElement = document.createElement("p")
        let precio = document.createTextNode(`Precio: ${product.price}`)
        pElement.appendChild(precio)
        liElement.appendChild(pElement)
    })
}

let refresh = () => {
    let borrarLi = document.querySelector("#listaProductos>ul")
    borrarLi.remove()
}

let ordenar = (products) => {
    if (botonOrdenar.innerHTML === "Ordenar por precio descendente") {
        products.sort((a, b) => {
            if (a.price > b.price) {
                return 1
            } else if (a.price < b.price) {
                return -1
            } else {
                return 0
            }
        })
    } else if (botonOrdenar.innerHTML === "Ordenar por precio ascendente") {
        products.sort((a, b) => {
            if (a.price > b.price) {
                return -1
            } else if (a.price < b.price) {
                return 1
            } else {
                return 0
            }
        })
    }
    return products
}

cargaInicio()
crearSelect()

document.getElementById("mostrarProductos").addEventListener("click", () => {
    refresh()
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            productsDisplay = products
            pintarListaProds(productsDisplay)
        })
})

botonOrdenar.addEventListener("click", () => {
    refresh()
    if (botonOrdenar.innerHTML === "Ordenar por precio ascendente") {
        botonOrdenar.innerHTML = "Ordenar por precio descendente";
    } else {
        botonOrdenar.innerHTML = "Ordenar por precio ascendente";
    }
    ordenar(productsDisplay)
    pintarListaProds(productsDisplay)
})

document.getElementById("select").addEventListener("change", (data) => {
    Array.from(data.path[0]).map(option => {
        if (option.selected) {
            refresh()
            if (option.value == 0) {
                fetch('https://fakestoreapi.com/products')
                    .then(res => res.json())
                    .then(products => {
                        productsDisplay = products
                        pintarListaProds(productsDisplay)
                    })
            } else {
                fetch(`https://fakestoreapi.com/products/category/${option.text}`)
                    .then(res => res.json())
                    .then(products => {
                        productsDisplay = products
                        pintarListaProds(productsDisplay)
                    })
            }
        }
    })
})