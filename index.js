const displayname = document.querySelector(".allcountries_name");
const inputfeild = document.querySelector(".input_field");
const continent = document.querySelector("select");
let allcard = [];
let allcountries = [];

window.addEventListener("hashchange", () => {
  console.log("changed");
});

const getcountries = async function () {
  const data = await fetch(`https://restcountries.com/v3.1/all`);
  const resolve = await data.json();

  for (let i = 0; i < resolve.length; i++) {
    allcountries.push(resolve[i]);
  }

  renderallcountries();
  allcard = document.querySelectorAll(".card");
};

const renderallcountries = function () {
  for (let i = 0; i < allcountries.length; i++) {
    const main_card = document.createElement("div");
    main_card.className = "card";
    main_card.setAttribute("data-continent", allcountries[i].continents[0]);
    const h1_name = document.createElement("h1");
    const paragraph = document.createElement("p");
    const image_div = document.createElement("div");
    image_div.classList.add("card-image");
    const image_tag = document.createElement("img");
    image_div.appendChild(image_tag);
    paragraph.innerText = allcountries[i].population;
    h1_name.innerHTML = allcountries[i].name.common;
    image_tag.setAttribute("src", allcountries[i].flags.png);

    main_card.appendChild(h1_name);
    main_card.appendChild(paragraph);
    main_card.appendChild(image_div);

    displayname.appendChild(main_card);

    main_card.addEventListener("click", () => {
      window.location.href = `https://tomakshita.github.io/allcountries/country.html?country=${allcountries[i].cca2}`;
    });

    // console.log(main_card)
  }

  console.log(allcountries);
};

inputfeild.addEventListener("input", function () {
  const data = inputfeild.value.trim().toLowerCase();
  for (let i = 0; i < allcard.length; i++) {
    if (!allcard[i].firstChild.innerText.toLowerCase().includes(data)) {
      allcard[i].classList.add("hidden");
    } else {
      allcard[i].classList.remove("hidden");
    }
  }
  console.log();
});

continent.addEventListener("input", function () {
  const data = continent.value.toLowerCase().trim();
  for (let i = 0; i < allcard.length; i++) {
    const attributedata = allcard[i]
      .getAttribute("data-continent")
      .toLowerCase()
      .trim();

    if (data == "all") {
      allcard[i].classList.remove("hidden");
    } else if (attributedata != data) {
      allcard[i].classList.add("hidden");
    } else {
      allcard[i].classList.remove("hidden");
    }
  }
});

// console.log(allcard)
getcountries();
