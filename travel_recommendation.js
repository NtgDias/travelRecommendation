
const home=document.getElementById('home');
const about=document.getElementById('about');
const contact=document.getElementById('contact');

function homeButton() {

    document.getElementById('home_button').style.display = 'block';
    document.getElementById('about_button').style.display = 'none';
    document.getElementById('contact_button').style.display = 'none';
    document.getElementById('bar_right').style.display = 'inline-flex';
    document.getElementById('result').style.display = 'block';
    document.getElementById("message").value = "";
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    clearResults();
}

function aboutButton() {

    document.getElementById('home_button').style.display = 'none';
    document.getElementById('about_button').style.display = 'block';
    document.getElementById('contact_button').style.display = 'none';
    document.getElementById('bar_right').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById("message").value = "";
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    clearResults();
}

function contactButton() {

    document.getElementById('home_button').style.display = 'none';
    document.getElementById('about_button').style.display = 'none';
    document.getElementById('contact_button').style.display = 'block';
    document.getElementById('bar_right').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById("message").value = "";
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    clearResults();
}

home.onclick = homeButton;
about.onclick = aboutButton;
contact.onclick = contactButton;

// Funcao filtrar locais

function filterPlaces() {
    const searchTerm = document.getElementById('inputSearch').value.toLowerCase();
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';


    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {


            function renderItems(items) {
                items.forEach((item) => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("place");

                    const options = { timeZone: `${item.timezone}`, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                    const newYorkTime = new Date().toLocaleDateString('EU', options);

                    const timeBar= document.createElement('div');
                    timeBar.classList.add('time-bar');
                    timeBar.innerText=`Current Local Time in ${item.name}: ${newYorkTime}`;

                    resultsContainer.appendChild(timeBar);

                    resultDiv.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" />
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <a href="${item.url}" target="_blank"><button>Visit</button></a>
                        <br>
                      `;

                    resultsContainer.appendChild(resultDiv);
                });
            }


            if (searchTerm === "cities" || searchTerm === "city") {
                const cities = data.countries.flatMap((country) => country.cities);
                renderItems(cities);
            } else if (searchTerm === "temples" || searchTerm === "temple") {
                renderItems(data.temples);
            } else if (searchTerm === "beaches" || searchTerm === "beach") {
                renderItems(data.beaches);
            } else {
                resultsContainer.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
            }


        })
        .catch(error => {
            console.error('Error:', error);
            resultsContainer.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', filterPlaces);

//Clear button

function clearResults() {
    const resultsContainer = document.getElementById("result");
    resultsContainer.innerHTML = "";
    document.getElementById("inputSearch").value = "";
}
btnClear.addEventListener('click', clearResults);


//Function comment sent

function comment(){

    const messageInput = document.getElementById('message').value.trim();

    if (!messageInput) {
        alert('Please enter a message.');
        return;
    }
    confirm("Thank you for you message!");

}


// Pequena animacao extra com aviao =)

function plane(){
    const airplane = document.getElementById("airplane");
    airplane.style.display = "block"; // Mostra o avião
    airplane.style.animation = "fly 2.5s linear"; // Dispara a animação

    // Esconde o avião após a animação
    airplane.addEventListener("animationend", () => {
        airplane.style.display = "none";
        airplane.style.animation = ""; // Reseta a animação para futuros cliques
    });
}
btnBook.addEventListener('click', plane);