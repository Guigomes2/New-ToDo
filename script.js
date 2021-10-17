newItem = (valor) => {
    let text

    let ul = document.getElementById("ulList");
    let li = document.createElement("li");

    if (valor) {// Se veio do local Storage
        text = valor.texto

        li.id = text
        li.className = "list-group-item list-group-item-action"
        
        checkbox = document.createElement("input");
        checkbox.id = "checkbox"
        checkbox.type = "checkbox"
        checkbox.className ="form-check-input me-1"
        checkbox.addEventListener("click", function () {
            handleCheckbox(text)
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(text))
        ul.appendChild(li)

        deletecheckbox = document.createElement("SPAN");
        deletecheckbox.id = "delete"
        deletecheckbox.appendChild(document.createTextNode("❌"))
        deletecheckbox.addEventListener("click", function () {
            handleDeleteCheckbox(text)
        });
        li.appendChild(deletecheckbox);

        if (valor.checked === true) { // Local Storage Tiver Checked
            li.style.textDecoration = "line-through"
        }

    }
    else {
        text = document.querySelector("#text").value

        if (text.length > 1) {
            li.id = text
            li.className = "list-group-item list-group-item-action"
        
            checkbox = document.createElement("input");
            checkbox.id = "checkbox"
            checkbox.type = "checkbox"
            checkbox.className ="form-check-input me-1"
            checkbox.addEventListener("click", function () {
                handleCheckbox(text)
            });
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(text))
            ul.appendChild(li)
    

            deletecheckbox = document.createElement("SPAN");
            deletecheckbox.id = "delete"
            deletecheckbox.appendChild(document.createTextNode("❌"))
            deletecheckbox.addEventListener("click", function () {
                handleDeleteCheckbox(text)
            });
            li.appendChild(deletecheckbox);


            handleSaveLocalStorage(text, { texto: text, checked: false }) //o check ele vai ser sempre Falso


            document.getElementById("text").value = " ";
        }

    }
}

    handleCheckbox = (id) => {
        let li = document.getElementById(id);

        if (li.style.textDecoration === "line-through") {
            let text = JSON.parse(localStorage.getItem(id))
            localStorage.setItem(id, JSON.stringify({ texto: text.texto, checked: false }))
            li.style.textDecoration = "none"
        }
        else {
            let text = JSON.parse(localStorage.getItem(id))
            localStorage.setItem(id, JSON.stringify({ texto: text.texto, checked: true }))
            li.style.textDecoration = "line-through"
        }

    }

    handleDeleteCheckbox = (id) => {
        localStorage.removeItem(id)
        location.reload() // Recarrega Pagina
    }

    handleSaveLocalStorage = (id, valor) => {
        localStorage.setItem(id, JSON.stringify(valor))
    }

    handleGetLocalStorage = () => {
        keys = Object.keys(localStorage)

        for (let valor of keys) {
            let valor_localstorage = localStorage.getItem(valor)
            newItem(JSON.parse(valor_localstorage))
        }
    }


    handleGetLocalStorage()