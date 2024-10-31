const actual_url = window.location.href;

let url = new URL(actual_url);
let params = new URLSearchParams(url.search);

const countryname = params.get("country");

// code

fetch(`https://restcountries.com/v3.1/alpha/${countryname}`)
  .then(function (jsondata) {
    return jsondata.json();
  })
  .then(function (data) {
    console.log(data);

    const maincard = document.createElement("div");
    maincard.className = 'card'
    const firstChild = document.createElement("div");
    const firstChildimage = document.createElement("img");
    firstChildimage.classList.add("card-image");
    firstChildimage.setAttribute("src", data[0].flags.png);
    firstChild.appendChild(firstChildimage);

    const secondchild = document.createElement("div");

    if (data[0].borders) {
      for (let i = 0; i < data[0].borders.length; i++) {
        const secondchildpara = document.createElement("p");
        secondchildpara.innerText = data[0].borders[i];
        secondchild.appendChild(secondchildpara);

        secondchildpara.addEventListener("click", () => {
          window.location.href = `https://tomakshita.github.io/allcountries/country.html?country=${data[0].borders[i]}`;
        });
      }
    }

    console.log(secondchild)

    const thirdchild = document.createElement("h1");
    thirdchild.textContent = data[0].name.common;

    maincard.appendChild(firstChild);
    maincard.appendChild(secondchild);
    maincard.appendChild(thirdchild);
    document.querySelector("body").appendChild(maincard);
  });