
let header = document.querySelector("header");

//URL "https://ghibliapi.herokuapp.com";
let h1 = document.createElement("h1");
h1.textContent = "Ghibli Review App";
const BASE_URL = "https://ghibliapi.herokuapp.com";

let img = document.createElement("img");
img.setAttribute("src", "./images/ghibli-logo.png");
img.setAttribute("alt", "Ghibli logo");

header.append(h1, img);

fetch(`${BASE_URL}/films`)
  .then((resp) => resp.json())
  .then((moviesData) => {
    let titles = document.querySelector("#titles");
    // loop should begin here
    for (let i = 0; i < moviesData.length; i++) {
      let option = document.createElement("option");
      option.value = moviesData[i].id;
      option.textContent = moviesData[i].title;
      titles.append(option);

      titles.addEventListener("change", (event) => {
        event.preventDefault();

        if (event.target.value === moviesData[i].id) {
          let info = document.querySelector("#display-info");
          info.innerHTML = "";

          let movieTitle = document.createElement("h3");
          movieTitle.textContent = moviesData[i].title;

          let movieReleaseYear = document.createElement("p");
          movieReleaseYear.textContent = moviesData[i].release_date;

          let movieDescription = document.createElement("p");
          movieDescription.textContent = moviesData[i].description;

          info.append(movieTitle, movieReleaseYear, movieDescription);
        }
      }); // <- titles addEventListener ends
    } 
    // <-movie details loop ends here! 
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let review = document.querySelector("#review");

      let ul = document.querySelector("ul");

      if (!titles.value) {
        alert("Please select a movie first");
      } else {
        for (movie of moviesData) {
          if (movie.id === titles.value) {
            const li = document.createElement("li");
            li.textContent = "";
            li.innerHTML = `<strong>${movie.title}:</strong> ${review.value}`;
            ul.append(li);
            form.reset();
          }
        } // <-loop ends (form)
      } // <- if/else statement ends 

      let resetReview = document.querySelector("#reset-reviews");

      resetReview.addEventListener("click", () => {
        ul.innerHTML = "";
      }); 
      // <- resets review addlistener ends
    }); 
    //<- addEventListener ends(form)

    const button = document.querySelector("#show-people");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      let ol = document.querySelector("ol");
      ol.textContent = "";

      fetch(`${BASE_URL}/people`)
        .then((resp) => resp.json())
        .then((people) => {
          for (let person of people) {
            for (let movie of person.films) {
              if (movie.includes(titles.value)) {
                const li = document.createElement("li");
                li.textContent = `${person.name}`;
                ol.append(li);
              }
            }
          }
        }) //<- fetch ends(nested)
        .catch((err) => console.log(err));
    }); //<- button addEventListener ends
  }) //<- top/first fetch ends
  .catch((err) => console.log(err));

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
    fetchInfo();
}
