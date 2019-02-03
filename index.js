var select = document.getElementById("breed");
var images2 = document.getElementById("images");
var selectByMimeTypes = document.getElementById("MimeType");
var card = document.querySelector(".card1");
var imagesByMimeTypes = document.querySelector(".card-img-top");
var option1 = document.getElementById("gif");
var option2 = document.getElementById("gif,jpg");
var option3 = document.getElementById("gif,jpg,png");
var search = document.getElementById("search");
var breeds = [];
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
        breeds[i] = cale[i].name;
        var option = document.createElement("option");
        option.value = cale[i].id;
        option.innerHTML = cale[i].name;
        select.appendChild(option);
    }
}
console.log(breeds);   
var searchbreeds = breeds.filter(item => item.name.indexOf(search.value)!==-1).map(item => fetch('https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=' + item.name, login));
console.log(searchbreeds); 

Promise.all(searchbreeds)
    .then(breeds => {
    console.log(breeds);
})
//Obtinem lista cu categoriile
fetch("https://api.thecatapi.com/v1/categories")
    .then(res => res.json())
    .then(data => generateCategories(data));

    function generateCategories(categories) {
        for(let i=0;i<categories.length;i++){
            var button = document.createElement("button");
           
            button.innerHTML= categories[i].name;
            var default_option = document.createElement("option");
            default_option.innerHTML = categories[i].name;
            
            button.id = categories[i].id;
            
            button.addEventListener("click", (ev) => {
                let endpoint = " https://api.thecatapi.com/v1/images/search?limit=5&category_ids=" + ev.target.id;
                console.log(endpoint);
                fetch(endpoint, login)
                    .then(res => res.json())
                    .then(data => generateImagesByCategory(data))
            })   
            card.appendChild(button);
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

selectByMimeTypes.addEventListener("change", (ev) =>
            {
                
                if(ev.target.value === "GIF")
                 endpoint = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
                if(ev.target.value === "GIF,JPG")
                 endpoint = "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png";
                if(ev.target.value === "GIF,JPG,PNG")
                 endpoint = "https://api.thecatapi.com/v1/images/search?mime_types=gif,jpg,png";
                fetch(endpoint, login)
                    .then(res => res.json())
                    .then(data => generateImagesByMimeTypes(data));
            })
            function generateImagesByMimeTypes(mime_types)
            {
                for(i=0;i<mime_types.length;i++)
                {
                    
                    imagesByMimeTypes.src = mime_types[i].url;
                   
                }
                
            }