var select = document.getElementById("breed");
var images2 = document.getElementById("images");

var card = document.querySelector(".card");

const login = {
    headers: {
        ["x-api-key"]: "7aed50b3-58a5-4382-bffc-c00829952352"
    }

}
//Obtinem lista cu rasele si o bagam in select


fetch("https://api.thecatapi.com/v1/breeds")
    .then(res => res.json())
    .then(data => generateoptions(data));

function generateoptions(cale) {
    for (i = 0; i < cale.length; i++) {
        var option = document.createElement("option");
        option.value = cale[i].id;
        option.innerHTML = cale[i].name;
        select.appendChild(option);
    }
}
//Obtinem lista cu categoriile
fetch("https://api.thecatapi.com/v1/categories")
    .then(res => res.json())
    .then(data => generateCategories(data));

    function generateCategories(categories) {
        for(let i=0;i<categories.length;i++){
            var select = document.createElement("select");
           
            select.innerHTML= categories[i].name;
            var default_option = document.createElement("option");
            default_option.innerHTML = categories[i].name;
            select.appendChild(default_option);
            select.id = categories[i].id;
            var option1 = document.createElement("option");
            option1.value= "GIF";
            option1.innerHTML = "GIF";
            option1.addEventListener("click", (ev) => {
                let endpoint = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
                fetch(endpoint, login)
                    .then(res => res.json())
                    .then(data => generateImagesByCategory(data));
            })
            var option2 = document.createElement("option");
            option2.value = "JPG"
            option2.innerHTML = "JPG"
            var option3 = document.createElement("option");
            option3.value = "PNG";
            option3.innerHTML = "PNG";
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
            select.addEventListener("click", (ev) => {
                let endpoint = " https://api.thecatapi.com/v1/images/search?limit=5&category_ids=" + ev.target.id;
                console.log(endpoint);
                fetch(endpoint, login)
                    .then(res => res.json())
                    .then(data => generateImagesByCategory(data))
            })   
            card.appendChild(select);
        }
    }
function generateImagesByCategory(categorie)
        {
            while(images2.firstChild)
            {
                images2.removeChild(images2.firstChild);
            }
            for(i=0;i<categorie.length;i++)
            {
                var img = document.createElement("img");
                img.src = categorie[i].url;
                images2.appendChild(img);
            }
        }


//Obtinem pozele 
select.addEventListener("change", (ev) => {
    let endpoint = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=' + select.value;
    fetch(endpoint, login)
        .then((res) => res.json())
        .then((data) => {
            
            generateImages(data);
        });
})

function generateImages(images) {
    while(images2.firstChild)
    {
        images2.removeChild(images2.firstChild);
    }
    for (i = 0; i < images.length; i++) {
        var img = document.createElement("img");
        img.src = images[i].url;
        images2.appendChild(img);
    }
}

//Facem autentificarea:



//cautam in functie de rase