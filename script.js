console.log(`Clase 1 - semana 5`)

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

document.getElementById("mostrarProductos").addEventListener("click", () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => pintarListaProds(products))
})

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

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => pintarListaProds(products))

document.getElementById("select").addEventListener("change", (data) => {
    Array.from(data.path[0]).map(option => {
        if (option.selected) {
            let borrarLi = document.querySelector("#listaProductos>ul")
            borrarLi.remove()
            if (option.value == 0) {
                fetch('https://fakestoreapi.com/products')
                    .then(res => res.json())
                    .then(products => pintarListaProds(products))
            } else {
                fetch(`https://fakestoreapi.com/products/category/${option.text}`)
                    .then(res => res.json())
                    .then(products => pintarListaProds(products))
            }
        }
    })
})