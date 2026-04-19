let velystelle = Math.random() * 3 + 2; // genero una velocità casuale per le stelle
const sfondo = document.getElementById("sfondo"); // prendo elemento sfondo dal DOM

document.addEventListener("keydown", (e) => {
    if(e.code === "Space") {
        e.preventDefault();

    }
    }); 

let stelle = [];

for(let i = 0; i < 50; i++) {
    const stella = document.createElement("div"); 
    stella.className = "stella"; 
    stella.style.position = "absolute"; 
    stella.style.width = Math.random() * 3 + 2 + "px"; 
    stella.style.height = Math.random() * 3 + 2 + "px"; 
    stella.style.backgroundColor = "white";
    stella.style.left = Math.random() * sfondo.offsetWidth + "px"; 
    stella.style.top = Math.random() * sfondo.offsetHeight + "px"; 
    stella.style.borderRadius = "50%";
    sfondo.appendChild(stella); 
    stelle.push(stella); 
}
    //movimento delle stelle
setInterval(() => {
    stelle.forEach(stella => {
        stella.style.top = (parseFloat(stella.style.top) + velystelle) + "px"; 
        if(parseFloat(stella.style.top) > sfondo.offsetHeight) { 
            stella.style.top = 0 + "px";
            stella.style.left = Math.random() * sfondo.offsetWidth + "px"; 
            velystelle = Math.random() * 3 + 2; 
       }
            
    });
}, 50);

const log = document.getElementsByClassName("container")[0];
log.style.display = "block";
const bottone = document.getElementsByClassName("bottone")[0];
bottone.addEventListener("click", function() {
    if(document.querySelector(".nome input").value === "") {
        alert("Inserisci il tuo nome per iniziare il gioco!"); 
        return;
    }
    startGame();
    log.style.display = "none";
});


function startGame() {
    const Vite = document.getElementById("vite");
    const Punteggio = document.getElementById("punteggio");
    let vite = 3;
    let punteggio = 0;
    const Utente = document.getElementById("utente");
    const utente = document.querySelector(".nome input").value || "Sconosciuto"; // prendo il valore dell'input del nome utente, se è vuoto, viene impostato come "Sconosciuto"
    Utente.innerText = "Astronauta: " + utente;

    Vite.innerText = "Vite: " + vite;
    Punteggio.innerText = "Punteggio: " + punteggio;

    const navicella = document.getElementById("navicella"); // prendo elemento navicella dal DOM
    

    let posX = 0;
    const velocitàUfoX = 10;
    const velocitàUfoY = 10;
    

    
    posX = (sfondo.offsetWidth / 2) - (navicella.offsetWidth / 2); 
    navicella.style.left = posX + "px"; // imposto la posizione x della navicella in base alla posizione x calcolata, in questo modo la navicella parte al centro dello sfondo
    pYufo = 2;
        
    
    //creazione ufo
    let ufi = [];
    let soglia = Math.random() * 100;
    let cont = 0;

    function creaUfo() {
        const el = document.createElement("img");
        el.src = "img/ufo.png";
        el.style.position = "absolute";
        el.className = "ufo";
        let x = Math.random() * (sfondo.offsetWidth - el.offsetWidth);
        let y = -100;
        el.style.left = x + "px";
        el.style.top = y + "px";
        let direzione = Math.random() < 0.5 ? -1 : 1; // genero una direzione casuale per l'ufo, se il numero generato è minore di 0.5, la direzione sarà -1, altrimenti sarà 1
        el.direzione = direzione; 
        sfondo.appendChild(el);
        

        const oggettoUfo = {
            x: x,
            y: y,
            direzione: direzione,
            el: el
        };
        ufi.push(oggettoUfo);
        return oggettoUfo;
    }

    setInterval(() => {
        cont++;
        if(cont > soglia) {
                creaUfo() 
                cont = 0;
                soglia = Math.random() * 100;

        }
    }, 200);

    //movimento ufo
    setInterval(() => {
        ufi.forEach((ufo, index) => {
            let ufoColpito = false;
            ufo.x = ufo.x + (velocitàUfoX * (ufo.direzione));
            ufo.el.style.left = ufo.x + "px";
            
            if(ufo.x > (sfondo.offsetWidth - ufo.el.offsetWidth)) {
                ufo.direzione = -1;
            }
            else if(ufo.x < 0) {
                ufo.direzione = 1;
            }

            ufo.y = ufo.y + velocitàUfoY;
            ufo.el.style.top = ufo.y + "px";
            
            if(ufo.y > (sfondo.offsetHeight)) {
                ufo.el.remove();
                ufi.splice(index, 1);
            }
            if(ufo.el.offsetLeft > navicella.offsetLeft + navicella.offsetWidth || ufo.el.offsetLeft + ufo.el.offsetWidth < navicella.offsetLeft || ufo.el.offsetTop > navicella.offsetTop + navicella.offsetHeight || ufo.el.offsetTop + ufo.el.offsetHeight < navicella.offsetTop) {
                // se l'ufo non colpisce la navicella, non succede nulla
            } else {
                // se l'ufo colpisce la navicella, viene rimosso l'ufo dal DOM e viene decrementato il numero di vite
                ufoColpito = true;
                vite --; 
                Vite.innerText = "Vite: " + vite; 
                if(vite <= 0) {
                    alert("Game Over! Il tuo punteggio è: " + punteggio); 
                    window.location.reload(); 
                }
                
            }   
            if(ufoColpito) {
                ufo.el.remove();
                ufi.splice(index, 1);
            }
        });
    }, 70);


    //creo meteorite
    let meteoriti = [];

    function creaMeteorite() {
        const el = document.createElement("img");
        el.src = "img/meteorite.png";
        el.className = "meteorite";
        el.style.position = "absolute";
        el.style.width = 130 + "px"; 
        el.style.height = 130 + "px";
        el.style.left = Math.random() * (sfondo.offsetWidth - 130) + "px";
        el.style.top = -130 + "px";
        let velYmeteorite = Math.random() * 15 + 20; // genero una velocità casuale per il meteorite
        let x = parseFloat(el.style.left);
        let y = parseFloat(el.style.top);
        sfondo.appendChild(el);

        const oggettoMeteorite = {
            x: x,
            y: y, 
            el: el,
            velYmeteorite: velYmeteorite
        };
        meteoriti.push(oggettoMeteorite);
        return oggettoMeteorite;
    }

    function spawnMeteorite() {
        creaMeteorite();
        setTimeout(spawnMeteorite, Math.random() * 6000 + 10000); // genero un tempo casuale 
    }

    spawnMeteorite(); // avvio la generazione dei meteoriti


    //movimento meteorite
    setInterval(() => {
        meteoriti.forEach((meteorite, index) => {
            
            meteorite.y += meteorite.velYmeteorite; 
            meteorite.el.style.top = meteorite.y + "px";
            
            if(meteorite.y > sfondo.offsetHeight + (meteorite.el.offsetHeight * 2)) {
                meteorite.el.remove();
                meteoriti.splice(index, 1);
            }
            if(meteorite.el.offsetLeft > navicella.offsetLeft + navicella.offsetWidth || meteorite.el.offsetLeft + meteorite.el.offsetWidth < navicella.offsetLeft || meteorite.el.offsetTop > navicella.offsetTop + navicella.offsetHeight || meteorite.el.offsetTop + meteorite.el.offsetHeight < navicella.offsetTop) {
                // se il meteorite non colpisce la navicella, non succede nulla
            } else {
                // se il meteorite colpisce la navicella, viene rimosso il meteorite dal DOM e viene decrementato il numero di vite
                meteorite.el.remove();
                meteoriti.splice(index, 1);
                vite --; 
                Vite.innerText = "Vite: " + vite; 
                if(vite <= 0) {
                    alert("Game Over! Il tuo punteggio è: " + punteggio); 
                    window.location.reload(); 
                }
            }
            meteorite.el.velYmeteorite = Math.random() * 15 + 20; // genero una velocità casuale per il meteorite
        });
    }, 50);

    //creo sfondo con stelle casuali
    


    //creazione razzo
    let razzi = [];

    function creaRazzo(x, y) {
        const el = document.createElement("img"); 
        el.src = "img/razzo.png";   
        el.className = "razzo";
        el.style.position = "absolute";
        el.style.width = "20px";
        el.style.height = "auto"; 
        el.style.left = x + "px";
        el.style.top = y + "px"; 
        
        sfondo.appendChild(el); 
        
        return {
            x: x,
            y: y,
            vely: 40,
            el: el
        };

        
    }
    //movimento navicella e sparo razzo
    window.onkeydown = function(event) {
        const velocità = 40;
        

        if(event.key === "ArrowRight") {
            posX += velocità;
            
        } else if(event.key === "ArrowLeft") {
            posX -= velocità;
        } else if(event.key === " ") {
            let x = posX + navicella.offsetWidth / 2 - 10; 
            let y = navicella.offsetTop; 
            razzi.push(creaRazzo(x, y)); 
        }

        
        if(posX > (sfondo.offsetWidth - navicella.offsetWidth)) {  
                posX = sfondo.offsetWidth - navicella.offsetWidth;
        } else if(posX < 0) {
                posX = 0;
        } 

        navicella.style.left = posX + "px";
        
    }
    //movimento razzo e collisione con ufo
    setInterval(() => {
        
            razzi.forEach((razzo, index) => {
                let razzoRimosso = false;
                razzo.y -= razzo.vely; 
                
                ufi.forEach((ufo, indexUfo) => {
                    if(razzo.el.offsetLeft > ufo.el.offsetLeft + ufo.el.offsetWidth || razzo.el.offsetLeft + razzo.el.offsetWidth < ufo.el.offsetLeft || razzo.el.offsetTop > ufo.el.offsetTop + ufo.el.offsetHeight || razzo.el.offsetTop + razzo.el.offsetHeight < ufo.el.offsetTop) {
                        // se il razzo non colpisce l'ufo, non succede nulla
                    } else {
                        // se il razzo colpisce l'ufo, viene rimosso sia il razzo che l'ufo dal DOM
                        razzoRimosso = true;
                        ufo.el.remove(); 
                        ufi.splice(indexUfo, 1); 
                        punteggio += 10; 
                        Punteggio.innerText = "Punteggio: " + punteggio; 
                        if(punteggio >= 100) {
                            alert("Hai vinto! Il tuo punteggio è: " + punteggio); 
                            window.location.reload(); 
                        }
                    }
                

                });
                if(razzoRimosso) {
                    razzo.el.remove();
                    razzi.splice(index, 1);
                    return;
                }
                    
                razzo.el.style.left = razzo.x + "px"; // la posizione x del razzo viene aggiornata in base alla posizione x del razzo
                razzo.el.style.top = razzo.y + "px"; // la posizione y del razzo viene aggiornata in base alla posizione y del razzo

                const rect = razzo.el.getBoundingClientRect();
                if(rect.bottom < 0) { 
                    razzo.el.remove(); 
                    razzi.splice(index, 1);
                }

                
            });
        }, 50);
    }










