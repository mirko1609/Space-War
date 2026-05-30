const nome_gioco = "Space War";

let cambioLivello = false;
let posX = 0
const loser = document.getElementsByClassName("perdita")[0];
const winner = document.getElementsByClassName("vittoria")[0];
const riavvia = document.getElementsByClassName("ricomincia");
loser.style.display = "none";
winner.style.display = "none";
let velystelle = 1;
const sfondo = document.getElementById("sfondo"); // prendo elemento sfondo dal DOM

document.addEventListener("keydown", (e) => {
    if(e.code === "Space") {
        e.preventDefault();

    }
    }); 
const btnPausa = document.getElementById("btnPausa");
const btnComandi = document.getElementById("btnComandi");
const pannelloComandi = document.getElementById("pannelloComandi");
const schermataPausa = document.getElementById("schermataPausa");

let inPausa = false;

btnPausa.addEventListener("click", () => {
    togglePausa();
});

document.addEventListener("keydown", (e) => {
    if(e.code === "Escape") togglePausa();
});

function togglePausa() {
    if(!inputAttivo && !inPausa) return;
    
    inPausa = !inPausa;
    
    if(inPausa) {
        schermataPausa.style.display = "flex";
        btnPausa.innerText = "▶ RIPRENDI";
    } else {
        schermataPausa.style.display = "none";
        btnPausa.innerText = "⏸ PAUSA";
    }
}

btnComandi.addEventListener("click", () => {
    if(pannelloComandi.style.display === "flex") {
        pannelloComandi.style.display = "none";
    } else {
        pannelloComandi.style.display = "flex";
    }
});

let inputAttivo = true;
const navicella = document.getElementById("navicella"); // prendo elemento navicella dal DOM
const schermataTransizione = document.getElementsByClassName("container2")[0];
const LIVELLO = document.getElementById("level");
const Pianeta = document.getElementById("PIANETA")
const didascalia = document.getElementById("messaggio");
schermataTransizione.style.display = "none";

//----CREAZIONE SFONDO 
let stelle = [];
let nebulose = [];
function creoSfondo(){
    for(let i = 0; i < 50; i++) {
        const stella = document.createElement("div"); 
        stella.className = "stella"; 
        stella.style.position = "absolute"; 
        const dimensione = Math.random() * 3 + 2 + "px"; 
        stella.style.width = dimensione;
        stella.dimensioneOriginale = dimensione;
        stella.style.height = stella.style.width; 
        stella.style.backgroundColor = "white";
        stella.style.left = Math.random() * sfondo.offsetWidth + "px"; 
        stella.style.top = Math.random() * sfondo.offsetHeight + "px"; 
        stella.style.borderRadius = "50%";
        sfondo.appendChild(stella); 
        stelle.push(stella); 
    }

    function aggiungiNebulose() {
    const coloriNeb = ["neb-viola", "neb-blu"];
    for(let i = 0; i < 4; i++) {
        const neb = document.createElement("div");
        neb.className = `nebulosa ${coloriNeb[i]}`;
        neb.style.left = Math.random() * 70 + "%";
        neb.style.top = (Math.random() * -100) + "%"; // Partono sopra il bordo del gioco
        sfondo.appendChild(neb);
        nebulose.push(neb);
    }
}
    aggiungiNebulose();

        //movimento delle stelle
    setInterval(() => {
        stelle.forEach(stella => {
            const distanza = 2;
            if(parseFloat(stella.dimensioneOriginale) > 3) {
                stella.style.top = (parseFloat(stella.style.top) + (velystelle + distanza)) + "px";
            } else {
                stella.style.top = (parseFloat(stella.style.top) + velystelle) + "px";
            } 
            if(parseFloat(stella.style.top) > sfondo.offsetHeight) { 
                stella.style.top = 0 + "px";
                stella.style.left = Math.random() * sfondo.offsetWidth + "px"; 
                
        }

        
        });

        nebulose.forEach(neb => {
            let topVal = parseFloat(neb.style.top) || 0;
            // Si muove al 10% della velocità delle stelle per l'effetto parallasse
            neb.style.top = (topVal + (velystelle * 0.1)) + "px";

            // Se esce dal basso, ricompare in alto
            if (topVal > sfondo.offsetHeight) {
                neb.style.top = "-500px";
                neb.style.left = Math.random() * 70 + "%";
            }
        });
    }, 50);

}
creoSfondo();
//---BOOST ALLE STELLE
function boost(){
    inputAttivo = false;
    intervalli.forEach(intervallo => clearInterval(intervallo));
    intervalli = [];
    document.querySelectorAll(".ufo, .meteorite, .razzo, .razzoUfo").forEach(el => el.remove());

    stelle.forEach(stella => {
        velystelle = 10;
        stella.style.height = parseFloat(stella.style.height) + parseFloat(stella.style.width) + 7 + "px";
        stella.style.width = 2 + "px";
    });

    navicella.style.left = (sfondo.offsetWidth / 2) - (navicella.offsetWidth / 2) + "px";
    navicella.style.top = (sfondo.offsetHeight / 2) + (navicella.offsetHeight / 2) - 50  +"px" ;
}
//---reset
function resetStelle(){
    stelle.forEach(stella => {
        stella.style.width = stella.dimensioneOriginale;
        stella.style.height = stella.dimensioneOriginale;
        
    });
    //navicella.style.top = "85%";
     // adatta in base alla risoluzione
    if(window.innerWidth <= 768) {
        navicella.style.top = "85%";   // mobile portrait
    } else if(window.innerWidth <= 1280) {
        navicella.style.top = "70%";
    } else if(window.innerWidth <= 1440) {
        navicella.style.top = "78%";
    } else {
        navicella.style.top = "85%";
    }
}
//----SCHERMATA INIZIALE LOG E AVVIO
const log = document.getElementsByClassName("container")[0];
log.style.display = "block";
const bottone = document.getElementsByClassName("bottone")[0];

function avviaGioco() {
    //if(document.querySelector(".nome input").value === "") {
        //alert("Inserisci il tuo nome per iniziare il gioco!"); 
        //return;
    //}

    const errore = document.querySelector(".errore");
    if(document.querySelector(".nome input").value === "") {
        errore.style.display = "block"; // mostra errore
        return;
    }
    
    errore.style.display = "none"; // nascondi errore se ok
    transazione();
    log.style.display = "none";
    document.removeEventListener("keydown", avviaGiocoEnter)
}
function avviaGiocoEnter (e){
    if(e.code === "Enter") avviaGioco();
}
bottone.addEventListener("click", avviaGioco);

document.addEventListener("keydown", avviaGiocoEnter);



//--- IN CASO DI PERDITA
function fineGioco(){
    inputAttivo = false;
    intervalli.forEach(intervallo => clearInterval(intervallo));
    intervalli = []; 
    document.querySelectorAll(".ufo, .meteorite, .razzo, .razzoUfo").forEach(el => el.remove());

    // BUG 1 FIX: svuoto gli array globali, non quelli locali di startGame
    ufi = [];
    meteoriti = [];
    razzi = [];
    razziUfo = [];

    dati(); // invio dati al server

    loser.style.display = "block";

    // BUG 4 FIX: uso una funzione nominata così posso rimuoverla dopo il primo click/tasto
    function riavviaHandler() {
        loser.style.display = "none";
        window.location.reload();
    }
    riavvia[0].addEventListener("click", riavviaHandler);

    function riavviaKeyHandler(e) {
        if(e.code === "Enter") {
            document.removeEventListener("keydown", riavviaKeyHandler);
            loser.style.display = "none";
            window.location.reload();
        }
    }
    document.addEventListener("keydown", riavviaKeyHandler);

    const topScore = localStorage.getItem("topScore") || 0;
    if(punteggio > topScore) {
        localStorage.setItem("topScore", punteggio);
    }
    document.getElementById("topScore").innerText = localStorage.getItem("topScore");
}
//---IN CASO DI VITTORIA
function vittoriaGioco(){
    inputAttivo = false;
    intervalli.forEach(intervallo => clearInterval(intervallo));
    intervalli = [];
    document.querySelectorAll(".ufo, .meteorite, .razzo, .razzoUfo").forEach(el => el.remove());

    // BUG 1 FIX: svuoto gli array globali, non quelli locali di startGame
    ufi = [];
    meteoriti = [];
    razzi = [];
    razziUfo = [];

    dati(); // invio dati al server

    winner.style.display = "block";

    // BUG 4 FIX: uso una funzione nominata così posso rimuoverla dopo il primo click/tasto
    function riavviaHandler() {
        winner.style.display = "none";
        window.location.reload();
    }
    // BUG 8 FIX: uso riavvia[1] per la schermata vittoria, riavvia[0] per la perdita
    riavvia[1].addEventListener("click", riavviaHandler);

    function riavviaKeyHandler(e) {
        if(e.code === "Enter") {
            document.removeEventListener("keydown", riavviaKeyHandler);
            window.location.reload();
            winner.style.display = "none";
        }
    }
    document.addEventListener("keydown", riavviaKeyHandler);

    const topScore = localStorage.getItem("topScore") || 0;
    if(punteggio > topScore) {
        localStorage.setItem("topScore", punteggio);
    }
    document.getElementById("topScore").innerText = localStorage.getItem("topScore");
}


//razzi ufo
function creaRazzoUfo(x, y) {
    const el = document.createElement("img");
    el.className = "razzoUfo";
    el.src = "img/razzo3.png";
    el.style.position = "absolute";
    el.style.width = "30px";
    el.style.height = "60px";
    el.style.transform = "rotate(180deg)";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.transition = "all 0.5s linear";
    sfondo.appendChild(el);

    return {
        x: x,
        y: y,
        el: el
    };
}



const livelli = [
    {
        livelloCorrente: 1,
        nome: "Mercurio",
        punteggioVincita: 80,
        velocitàUfoX: 8,
        velocitàUfoY: 3,
        ufoSpawn: 80, // più basso, più frequente
        meteoriteSpawn: [8000, 14000],
        pianetaImg: "img/mercurio.png",
        ufoSpara: true,
        velRazzoUfo: 10,
        descrizione: "Il pianeta più vicino al sole. Veloce ed insidioso"
    },
    {
        livelloCorrente: 2,
        nome: "Venere",
        punteggioVincita: 160,
        velocitàUfoX: 9,
        velocitàUfoY: 5,
        ufoSpawn: 75,
        meteoriteSpawn: [7000, 12000],
        pianetaImg: "img/venere.png",
        ufoSpara: true,
        velRazzoUfo: 12,
        descrizione: "Gli ufo armati ti aspettano!!"
    },
    {
        livelloCorrente: 3,
        nome:           "Marte",
        punteggioVincita: 240,
        velocitàUfoX:   10,
        velocitàUfoY:   6,
        ufoSpawn:       70,
        meteoriteSpawn: [6000, 10000],
        pianetaImg:     "img/marte.png",
        ufoSpara:       true,
        velRazzoUfo:    15,
        descrizione:    "Il pianeta rosso è pieno di ostacoli!"
    },
    {
        livelloCorrente: 4,
        nome:           "Giove",
        punteggioVincita: 290,
        velocitàUfoX:   11,
        velocitàUfoY:   8,
        ufoSpawn:       62,
        meteoriteSpawn: [5000, 9000],
        pianetaImg:     "img/giove.png",
        ufoSpara:       true,
        velRazzoUfo:    17,
        descrizione:    "Il gigante del sistema solare! Sopravvivi se puoi."
    },
    {
        livelloCorrente: 5,
        nome:           "Saturno",
        punteggioVincita: 350,
        velocitàUfoX:   13,
        velocitàUfoY:   9,
        ufoSpawn:       45,
        meteoriteSpawn: [4500, 8000],
        pianetaImg:     "img/saturno.png",
        ufoSpara:       true,
        velRazzoUfo:    18,
        descrizione:    "Gli anelli di Saturno nascondono trappole mortali!"
    },
    {
        livelloCorrente: 6,
        nome:           "Urano",
        punteggioVincita: 410,
        velocitàUfoX:   15,
        velocitàUfoY:   10,
        ufoSpawn:       40,
        meteoriteSpawn: [4000, 7000],
        pianetaImg:     "img/urano.png",
        ufoSpara:       true,
        velRazzoUfo:    20,
        descrizione:    "Il pianeta ghiacciato ti congelerà i riflessi!"
    },
    {
        livelloCorrente: 7,
        nome:           "Nettuno",
        punteggioVincita: 500,
        velocitàUfoX:   16,
        velocitàUfoY:   11,
        ufoSpawn:       35,
        meteoriteSpawn: [3500, 6000],
        pianetaImg:     "img/nettuno.png",
        ufoSpara:       true,
        velRazzoUfo:    22,
        descrizione:    "L'ultimo segreto del sistema solare. Nessuno è tornato!"
    }

]
//gestiamo il livello corrente
let livelloCorrente = 0

// BUG 1 FIX: dichiaro ufi, meteoriti, razzi a livello globale così fineGioco/vittoriaGioco li raggiungono
let ufi = [];
let meteoriti = [];
let razzi = [];
let razziUfo = [];

let pianeta;
let intervalloPianeta;
function creoPianeti(){
    const config = livelli[livelloCorrente];
    if(pianeta) pianeta.remove();
    pianeta = document.createElement("img");
    pianeta.className = "pianeti";
    pianeta.src = config.pianetaImg;
    pianeta.style.position = "absolute";
    pianeta.style.top = "-150px";
    pianeta.style.width = "115px";
    pianeta.style.height = pianeta.style.width;
    pianeta.style.right = "20%";

    
    document.body.appendChild(pianeta)

}

function muovoPianeti(pianeta){
    const config = livelli[livelloCorrente];
    let posizione = -150;
    clearInterval(intervalloPianeta);
    intervalloPianeta = setInterval(() => {
        posizione += 6;
        pianeta.style.top = posizione + "px";
        if(posizione >= 50){
            posizione = 50;
        }
    }, 50);
}

//---UNA SCHERMATA DI TRANSIZIONE TRA UN LIVELLO E UN ALTRO.
function transazione(){
    const config = livelli[livelloCorrente];
    boost();
    schermataTransizione.style.display = "flex";
    LIVELLO.innerText = "LIVELLO: " + config.livelloCorrente;
    Pianeta.innerText = config.nome;
    didascalia.innerText = config.descrizione;

    // fase 1: il vecchio pianeta esce dal basso
    if(pianeta) {
        clearInterval(intervalloPianeta);
        let posizioneUscita = parseFloat(pianeta.style.top) || 50;
        const intervalloUscita = setInterval(() => {
            posizioneUscita += 8;
            pianeta.style.top = posizioneUscita + "px";
            if(posizioneUscita >= window.innerHeight + 150) {
                clearInterval(intervalloUscita);
                pianeta.remove();
                pianeta = null;

                // fase 2: il nuovo pianeta entra dall'alto
                creoPianeti();
                muovoPianeti(pianeta);
            }
        }, 50);
    } else {
        // primo avvio, nessun vecchio pianeta
        creoPianeti();
        muovoPianeti(pianeta);
    }

    function avanzaTransazione(event){
        if(event.key === "c"){
            window.removeEventListener("keydown", avanzaTransazione);
            schermataTransizione.style.display = "none";
            startGame();
        }
    }
    window.addEventListener("keydown", avanzaTransazione);
}


    function creaRazzo(x, y) {
        const el = document.createElement("img"); 
        el.src = "img/razzo3.png";   
        el.className = "razzo";
        el.style.position = "absolute";
        
        
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

    function creaMeteorite() {
        const el = document.createElement("img");
        el.src = "img/meteorite2.png";
        el.className = "meteorite";
        el.style.position = "absolute";
        el.style.width = 110 + "px"; 
        el.style.height = 110 + "px";
        el.style.left = Math.random() * (sfondo.offsetWidth - 110) + "px";
        el.style.top = -110 + "px";
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

let sparando = false;
function gestisciTastiera(event) {
        
        const velocità = 40;
        
        if (inputAttivo){
            if(event.key === "ArrowRight") {
                posX += velocità;
                
            } else if(event.key === "ArrowLeft") {
                posX -= velocità;
            } else if(event.key === " " && !sparando) {
                sparando = true;
                let x = posX + navicella.offsetWidth / 2 - 13; 
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
        
        
    }
window.addEventListener("keyup", (e) => {
    if(e.key === " ") sparando = false;
});

let vite = 3;
let punteggio = 0;
let intervalli = [];
//----- LOGICA GIOCO
function startGame() {
    cambioLivello = false;
    document.getElementById("topScore").innerText = localStorage.getItem("topScore") || 0;
    const config = livelli[livelloCorrente];
    inputAttivo = true;
    velystelle = 1;
    resetStelle();
    if(livelloCorrente === 0) punteggio = 0;
    const Vite = document.getElementById("vite");
    const Punteggio = document.getElementById("punteggio");
    if(livelloCorrente === 0) vite = 3;
    const Utente = document.getElementById("utente");
    let livelloSfondo = document.getElementById("livelloStat");
    const utente = document.querySelector(".nome input").value || "Sconosciuto"; // prendo il valore dell'input del nome utente, se è vuoto, viene impostato come "Sconosciuto"
    Utente.innerText = "Astronauta: " + utente;
    let livello = document.getElementById("level");
    Vite.innerText = "❤️ VITE: " + vite;
    Punteggio.innerText = "⭐ PUNTEGGIO: " + punteggio;
    if(livello) livello.innerText = "LIVELLO: " + config.nome;
    if(livelloSfondo) livelloSfondo.innerText = "🌎 " + config.nome
    
    //telefono
    const hudV = document.getElementById("hudVite");
    const hudP = document.getElementById("hudPunteggio");
    const hudL = document.getElementById("hudLivello");
    if(hudV) hudV.innerText = "❤️ VITE: " + vite;
    if(hudP) hudP.innerText = "⭐ PT: " + punteggio;
    if(hudL) hudL.innerText = config.nome;
    
    
    posX = (sfondo.offsetWidth / 2) - (navicella.offsetWidth / 2); 
    navicella.style.left = posX + "px"; // imposto la posizione x della navicella in base alla posizione x calcolata, in questo modo la navicella parte al centro dello sfondo
    pYufo = 2;  
    
    //creazione ufo
    ufi = [];
    let soglia = Math.random() * 100;
    let cont = 0;

    function creaUfo() {
        const el = document.createElement("img");
        el.src = "img/ufo2.png";
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

    intervalli.push(setInterval(() => {
        if(inPausa) return;
        cont++;
        if(cont > soglia) {
                creaUfo() 
                cont = 0;
                soglia = Math.random() * 100;

        }
    }, 100));

    //movimento ufo
    intervalli.push(setInterval(() => {
        if(inPausa) return;
        ufi.forEach((ufo, index) => {
            let ufoColpito = false;
            ufo.x = ufo.x + (config.velocitàUfoX * (ufo.direzione));
            ufo.el.style.left = ufo.x + "px";
            
            if(ufo.x > (sfondo.offsetWidth - ufo.el.offsetWidth)) {
                ufo.direzione = -1;
            }
            else if(ufo.x < 0) {
                ufo.direzione = 1;
            }

            ufo.y = ufo.y + config.velocitàUfoY;
            ufo.el.style.top = ufo.y + "px";
            
            if(ufo.y > (sfondo.offsetHeight + 100)) {
                ufo.el.remove();
                ufi.splice(index, 1);
            }
            if(ufo.el.offsetLeft > navicella.offsetLeft + navicella.offsetWidth || ufo.el.offsetLeft + ufo.el.offsetWidth < navicella.offsetLeft || ufo.el.offsetTop > navicella.offsetTop + navicella.offsetHeight || ufo.el.offsetTop + ufo.el.offsetHeight < navicella.offsetTop) {
                // se l'ufo non colpisce la navicella, non succede nulla
            } else {
                // se l'ufo colpisce la navicella, viene rimosso l'ufo dal DOM e viene decrementato il numero di vite
                ufoColpito = true;
                vite --; 
                navicella.classList.add("danno");
                setTimeout(() => {
                    navicella.classList.remove("danno");
                }, 500);
                Vite.innerText = "❤️ VITE: " + vite; 
                if(hudV) hudV.innerText = "❤️ VITE: " + vite;
                if(vite <= 0) {
					livelloCorrente = 0;
                    fineGioco();
                }
                
            }   
            if(ufoColpito) {
                ufo.el.remove();
                ufi.splice(index, 1);
            }
        });
    }, 70));

    // sparo ufo
    razziUfo = [];

if(config.ufoSpara) {
    // ogni tot, un ufo casuale spara
    let ultimoSparo = 0;
const cooldownSparo = 3000; // millisecondi tra un colpo e l'altro

intervalli.push(setInterval(() => {
    if(inPausa) return;
    if(ufi.length === 0) return;

    const ora = Date.now();
    if(ora - ultimoSparo < cooldownSparo) return; // troppo presto
    ultimoSparo = ora;

    // solo 1 ufo casuale spara
    const ufoSparante = ufi[Math.floor(Math.random() * ufi.length)];
    const rx = ufoSparante.x + ufoSparante.el.offsetWidth / 2 - 13;
    const ry = ufoSparante.y + ufoSparante.el.offsetHeight;
    razziUfo.push(creaRazzoUfo(rx, ry));

}, 1200 + (7 - livelloCorrente) * 200)); // controlla ogni 3 secondi

    // movimento razzi ufo e collisione con navicella
    intervalli.push(setInterval(() => {
        if(inPausa) return;

        razziUfo.forEach((razzo, index) => {
        razzo.y += config.velRazzoUfo;
        razzo.el.style.top = razzo.y + "px";   // ← aggiorna top
        razzo.el.style.left = razzo.x + "px";  // ← aggiorna left

        // esce dal basso → rimosso
        if(razzo.y > sfondo.offsetHeight + 50) {
            razzo.el.remove();
            razziUfo.splice(index, 1);
            return;
        }
// collisione con navicella - usa coordinate dirette
const navX = posX;
const navY = navicella.offsetTop;
const navW = navicella.offsetWidth;
const navH = navicella.offsetHeight;

const colpisce = !(
    razzo.x > navX + navW ||
    razzo.x + 30 < navX ||
    razzo.y > navY + navH ||
    razzo.y + 60 < navY
);
            if(colpisce) {
                razzo.el.remove();
                razziUfo.splice(index, 1);
                vite--;
                navicella.classList.add("danno");
                setTimeout(() => navicella.classList.remove("danno"), 500);
                Vite.innerText = "❤️ VITE: " + vite;
                const hudV = document.getElementById("hudVite");
                if(hudV) hudV.innerText = "❤️ VITE: " + vite;
                if(vite <= 0) {
                    livelloCorrente = 0;
                    fineGioco();
                }
            }
        });
    }, 50));
}

    //creo meteorite
    // BUG 1 FIX: uso l'array globale meteoriti invece di dichiararne uno locale
    meteoriti = [];

    
    // BUG 2 e 3 FIX: spawnMeteorite rispetta la pausa senza accumulare ritardo,
    // e usa i valori meteoriteSpawn dalla config del livello corrente
    function spawnMeteorite() {
        if(!inputAttivo) return; // ferma la ricorsione se il gioco è finito
        if(!inPausa) creaMeteorite();
        
        const cfg = livelli[livelloCorrente];
        const min = cfg.meteoriteSpawn[0];
        const max = cfg.meteoriteSpawn[1];
        setTimeout(spawnMeteorite, Math.random() * (max - min) + min);
    }

    spawnMeteorite(); // avvio la generazione dei meteoriti

    //movimento meteorite
    intervalli.push(setInterval(() => {
        if(inPausa) return;
        meteoriti.forEach((meteorite, index) => {
            
            meteorite.y += meteorite.velYmeteorite; 
            meteorite.el.style.top = meteorite.y + "px";
            
            if(meteorite.y > sfondo.offsetHeight +150 + (meteorite.el.offsetHeight * 2)) {
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
                navicella.classList.add("danno");
                setTimeout(() => {
                    navicella.classList.remove("danno");
                }, 500);
                Vite.innerText = "❤️ VITE: " + vite; 
                if(hudV) hudV.innerText = "❤️ VITE: " + vite;
                if(vite <= 0) {
					livelloCorrente = 0;
                    fineGioco();
                     
                }
            }
            // BUG 6 FIX: rimossa la riga che assegnava velYmeteorite sull'elemento DOM invece che sull'oggetto
        });
    }, 50));

    //creazione razzo
    // BUG 1 FIX: uso l'array globale razzi invece di dichiararne uno locale
    razzi = [];

    
    //movimento navicella e sparo razzo
    // BUG 7 FIX: uso addEventListener con funzione nominata invece di window.onkeydown,
    // così non sovrascrive altri listener e può essere rimosso correttamente
    
    window.addEventListener("keydown", gestisciTastiera);

    //movimento razzo e collisione con ufo
    intervalli.push(setInterval(() => {
            if(inPausa) return;
            let livelloFinito = false;
            razzi.forEach((razzo, index) => {
                if(livelloFinito) return;
                let razzoRimosso = false;
                razzo.y -= razzo.vely; 
                
                ufi.forEach((ufo, indexUfo) => {
                    if(livelloFinito) return;
                    if(razzo.el.offsetLeft > ufo.el.offsetLeft + ufo.el.offsetWidth || razzo.el.offsetLeft + razzo.el.offsetWidth < ufo.el.offsetLeft || razzo.el.offsetTop > ufo.el.offsetTop + ufo.el.offsetHeight || razzo.el.offsetTop + razzo.el.offsetHeight < ufo.el.offsetTop) {
                        // se il razzo non colpisce l'ufo, non succede nulla
                    } else {
                        // se il razzo colpisce l'ufo, viene rimosso sia il razzo che l'ufo dal DOM
                        razzoRimosso = true;
                        ufo.el.remove(); 
                        ufi.splice(indexUfo, 1); 
                        punteggio += 10; 
                        Punteggio.innerText = "⭐ PUNTEGGIO: " + punteggio; 
                        if(hudP) hudP.innerText = "⭐ PT: " + punteggio; 
                        controllaAchievement();
                        if(punteggio >= config.punteggioVincita) {
                            livelloFinito = true;
                            cambioLivello = true;
                            inputAttivo = false;
                            intervalli.forEach(intervallo => clearInterval(intervallo))
                            intervalli = []
                            livelloCorrente++;
                            if(livelloCorrente >= livelli.length){
                                livelloCorrente = 0;
                                sessionStorage.setItem("livello", "0");
                                vittoriaGioco();
                                
                                }else{
                            transazione();
                                }
                                return
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
        }, 50));

        

    }

function controllaAchievement() {
    if (punteggio >= 100){
            const cacciatore = document.getElementsByClassName("achievement")[0];
            cacciatore.innerText = "🏆 UFO HUNTER ✔️";
            cacciatore.style.fontSize = "0.6rem";
            cacciatore.style.color = "lime";
        }
        
}

    // controlli touch mobile
const btnSinistra = document.getElementById("btnSinistra");
const btnDestraEl = document.getElementById("btnDestra");
const btnSparoEl = document.getElementById("btnSparo");

if(btnSinistra) {
    // sinistra
    btnSinistra.addEventListener("touchstart", (e) => {
        e.preventDefault();
        posX -= 40;
        if(posX < 0) posX = 0;
        navicella.style.left = posX + "px";
    });

    // destra
    btnDestraEl.addEventListener("touchstart", (e) => {
        e.preventDefault();
        posX += 40;
        if(posX > sfondo.offsetWidth - navicella.offsetWidth) {
            posX = sfondo.offsetWidth - navicella.offsetWidth;
        }
        navicella.style.left = posX + "px";
    });

    // sparo
    btnSparoEl.addEventListener("touchstart", (e) => {
    e.preventDefault();

    // se la schermata di transizione è visibile, si comporta come il tasto C
    if(schermataTransizione.style.display === "flex") {
        schermataTransizione.style.display = "none";
        startGame();
        return;
    }

    // altrimenti spara normalmente
    if(!inputAttivo) return;
    let x = posX + navicella.offsetWidth / 2 - 13;
    let y = navicella.offsetTop;
    razzi.push(creaRazzo(x, y));
});
}

function dati() {
    const parametri = {
        nomeGioco: nome_gioco,
        nomeSquadra: document.querySelector(".nome input").value || "Sconosciuto",
        punteggio: punteggio

    };

    const url = new URL("https://arcade3d.vercel.app/api/assegna-punti");
    url.search = new URLSearchParams(parametri).toString();

    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Errore HTTP nel server: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("risposta ricevuta da Vercel API: ", data);
            if(data.success) {
                console.log("Dati ricevuti correttamente.");
            }else {
                console.error("Errore nei dati ricevuti: ", data.error);
            }   
        })
        .catch(error => {
            console.error("Errore:", error);
        });
}