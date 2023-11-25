const app = {
    painting: {},
    init: () => {
        app.initJSON();
        app.addButtonRnd();
    },
    initJSON: () => {
        //get data from painting.json -> "painting": [{}]
        fetch("painting.json")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                app.painting = data.painting;
                app.initPainting();
            });
        console.log(app.painting);
    },
    initPainting: () => {
        const rand = Math.floor(Math.random() * app.painting.length);
        app.displayPainting(rand);
        app.textPainting(rand);
    },
    displayPainting: (index) => {
        //add cover image in div with tableau id
        document.getElementById("tableau-img").src = `${app.painting[index].img}`;
        //add class portrait or landscape to tableau-img
        document
            .getElementById("tableau-img")
            .classList.add(`${app.painting[index].viewport}`);

        //remove class portrait or landscape to tableau-img
        if (app.painting[index].viewport === "portrait") {
            document.getElementById("tableau-img").classList.remove("landscape");
        } else {
            document.getElementById("tableau-img").classList.remove("portrait");
        }
        //if portrait add flex-direction row to .main
        if (app.painting[index].viewport === "portrait") {
            document.getElementById("main").style.flexDirection = "row";
        } else {
            document.getElementById("main").style.flexDirection = "column";
            document.getElementById("main").style.display = "flex";
            document.getElementById("main").style.justifyContent = "center";
            document.getElementById("main").style.alignItems = "center";
        }
    },
    textPainting: (index) => {
        let tableauLegend = document.getElementById("tableau-legend");
        let tableauTitle = document.getElementById("tableau-title");

        //add name in tableau-title
        tableauTitle.textContent = `${app.painting[index].name}`;

        //create artist element in tableau-legend element
        let tableauArtist = document.createElement("p");
        tableauArtist.textContent = `Painted by ${app.painting[index].artist} in ${app.painting[index].date} after Christ.`;
        tableauTitle.appendChild(tableauArtist);

        //create description element in tableau-legend element
        let tableauDescription = document.createElement("p");
        tableauDescription.textContent = `${app.painting[index].description}`;
        tableauLegend.appendChild(tableauDescription);

        //create funfact element in tableau-legend element
        let tableauFunfact = document.createElement("p");
        tableauFunfact.textContent = `${app.painting[index].funfact}`;
        tableauLegend.appendChild(tableauFunfact);
    },
    addButtonRnd: () => {
        //create button rnd painting
        let button = document.createElement("button");
        let addbtn = document.getElementById("body");
        button.classList.add("btn");
        button.textContent = "See another painting";
        addbtn.appendChild(button);
        button.addEventListener("click", () => {
            app.removeTextPainting();
            app.initPainting();
        });
    },

    removeTextPainting: () => {
        //remove text in tableau-legend and tableau-title
        let removeTableauLegend = document.getElementById("tableau-legend");
        let removeTableauTitle = document.getElementById("tableau-title");
        let removeButton = document.getElementById("button");

        while (removeTableauLegend.firstChild) {
            removeTableauLegend.removeChild(removeTableauLegend.firstChild);
        }
        while (removeTableauTitle.firstChild) {
            removeTableauTitle.removeChild(removeTableauTitle.firstChild);
        }
    },
};

app.init();