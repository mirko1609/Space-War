const navicella = document.getElementById("navicella"); // prendo elemento navicella dal DOM
const sfondo = document.getElementById("sfondo"); // prendo elemento sfondo dal DOM

let posY = 0;
let posX = 0;
const velocitàUfoX = 10;
const velocitàUfoY = 1;
const velystelle = 5;



//attendo che la pagina sia completamente caricata per posizionare i miei elementi
window.onload = function() { // quando la pagina è completamente caricata, viene eseguita questa funzione
    posX = (sfondo.offsetWidth / 2) - (navicella.offsetWidth / 2);  // prendo la posizione x della navicella rispetto al suo elemento padre, in questo caso lo sfondo, offsetLeft è la distanza tra il bordo sinistro dell'elemento e il bordo sinistro del suo elemento padre
    navicella.style.left = posX + "px"; // imposto la posizione x della navicella in base alla posizione x calcolata, in questo modo la navicella parte al centro dello sfondo
    pYufo = 2;
    
}

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
    el.direzione = direzione; // assegno la direzione all'elemento dell'ufo, in questo modo posso utilizzarla in seguito per muovere l'ufo
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
}, 50);

//movimento ufo
setInterval(() => {
    ufi.forEach((ufo, index) => {
    
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
    });
}, 70);



//creo sfondo con stelle casuali
let stelle = [];

for(let i = 0; i < 50; i++) {
    const stella = document.createElement("div"); // creo un nuovo elemento div per la stella
    stella.className = "stella"; // imposto la classe della stella per poterla stilizzare con il CSS
    stella.style.position = "absolute"; // imposto la posizione della stella a absolute per poterla posizionare in modo preciso all'interno dello sfondo
    stella.style.width = "2px"; // imposto la larghezza della stella a 2px
    stella.style.height = "2px"; // imposto l'altezza della stella a 2px
    stella.style.backgroundColor = "white"; // imposto il colore di sfondo della stella a bianco
    stella.style.left = Math.random() * sfondo.offsetWidth + "px"; // imposto la posizione x della stella in modo casuale all'interno dello sfondo, Math.random() restituisce un numero casuale tra 0 e 1, quindi moltiplicando per la larghezza dello sfondo, ottengo un numero casuale tra 0 e la larghezza dello sfondo
    stella.style.top = Math.random() * sfondo.offsetHeight + "px"; // imposto la posizione y della stella in modo casuale all'interno dello sfondo, Math.random() restituisce un numero casuale tra 0 e 1, quindi moltiplicando per l'altezza dello sfondo, ottengo un numero casuale tra 0 e l'altezza dello sfondo
    stella.style.borderRadius = "50%"; // imposto il border-radius della stella a 50% per renderla rotonda
    sfondo.appendChild(stella); // aggiungo la stella al DOM, in questo modo viene visualizzata nello sfondo
    stelle.push(stella); // aggiungo la stella all'array delle stelle, in questo modo posso tenerne traccia e modificarle in seguito se necessario
}
//movimento delle stelle
setInterval(() => {
    stelle.forEach(stella => {
        stella.style.top = (parseFloat(stella.style.top) + velystelle) + "px"; // ogni 50 millisecondi, la posizione y della stella viene aumentata di velystelle, in questo modo le stelle si muovono verso il basso
        if(parseFloat(stella.style.top) > sfondo.offsetHeight) { // se la posizione y della stella è maggiore dell'altezza dello sfondo, significa che la stella è uscita dallo schermo, quindi viene riposizionata in alto con una nuova posizione x casuale
            stella.style.top = "0px"; // imposto la posizione y della stella a 0px, in questo modo la stella parte da sopra lo sfondo
            stella.style.left = Math.random() * sfondo.offsetWidth + "px"; // imposto la posizione x della stella in modo casuale all'interno dello sfondo, Math.random() restituisce un numero casuale tra 0 e 1, quindi moltiplicando per la larghezza dello sfondo, ottengo un numero casuale tra 0 e la larghezza dello sfondo
        }
    });
}, 50);



let razzi = []; // creo un array per tenere traccia dei razzi

function creaRazzo(x, y) {
    const el = document.createElement("img"); // creo un nuovo elemento div per il razzo
    el.src = "img/razzo.png"; // imposto l'immagine del razzo
    el.className = "razzo"; // imposto la classe del razzo per poterlo stilizzare con il CSS
    el.style.position = "absolute"; // imposto la posizione del razzo a absolute per poterlo posizionare in modo preciso all'interno dello sfondo
    el.style.width = "20px"; // imposto la larghezza del razzo a 30px
    el.style.height = "auto"; // imposto l'altezza del razzo a auto per mantenere le proporzioni dell'immagine
    el.style.left = x + "px"; // imposto la posizione x del razzo in base alla posizione x passata come parametro
    el.style.top = y + "px"; // imposto la posizione y del razzo in base alla posizione y passata come parametro
    
    sfondo.appendChild(el); // aggiungo il razzo al DOM, in questo modo viene visualizzato nello sfondo
    
    return {
        x: x,
        y: y,
        vely: 40,
        el: el
    };

    
}

window.onkeydown = function(event) {
    const velocità = 40;
    

    if(event.key === "ArrowRight") {
        posX += velocità;
        
    } else if(event.key === "ArrowLeft") {
        posX -= velocità;
    } else if(event.key === " ") {
        let x = posX + navicella.offsetWidth / 2 - 10; // calcolo la posizione x del razzo in base alla posizione della navicella, in questo modo il razzo parte dalla fine della navicella
        let y = navicella.offsetTop; // imposto la posizione y del razzo alla base della navicella
        razzi.push(creaRazzo(x, y)); // creo un nuovo razzo e lo aggiungo all'array dei razzi
    }

    
    if(posX > (sfondo.offsetWidth - navicella.offsetWidth)) {  // questo controllo serve per evitare che la navicella esca fuori dallo sfondo, offsetWidth è la larghezza dell'elemento, quindi se la posizione della navicella è maggiore della larghezza dello sfondo meno la larghezza della navicella, allora la posizione della navicella viene impostata alla larghezza dello sfondo meno la larghezza della navicella, in questo modo la navicella non può uscire fuori dallo sfondo
            posX = sfondo.offsetWidth - navicella.offsetWidth;
    } else if(posX < 0) {
            posX = 0;
    } 

    navicella.style.left = posX + "px";
    
}

setInterval(() => {
    
        razzi.forEach((razzo, index) => {
            ufi.forEach((ufo, indexUfo) => {
                if(razzo.el.offsetLeft > ufo.el.offsetLeft + ufo.el.offsetWidth || razzo.el.offsetLeft + razzo.el.offsetWidth < ufo.el.offsetLeft || razzo.el.offsetTop > ufo.el.offsetTop + ufo.el.offsetHeight || razzo.el.offsetTop + razzo.el.offsetHeight < ufo.el.offsetTop) {
                    // se il razzo non colpisce l'ufo, non succede nulla
                } else {
                    // se il razzo colpisce l'ufo, viene rimosso sia il razzo che l'ufo dal DOM
                    razzo.el.remove(); // rimuovo l'elemento del razzo dal DOM
                    ufo.el.remove(); // rimuovo l'elemento dell'ufo dal DOM
                    razzi.splice(index, 1); // rimuovo il razzo dall'array dei razzi
                    ufi.splice(indexUfo, 1); // rimuovo l'ufo dall'array degli ufo
                }
            });
            razzo.y -= razzo.vely; // ogni 50 millisecondi, la posizione y del razzo viene diminuita di veloy, in questo modo il razzo si muove verso l'alto
            
            razzo.el.style.left = razzo.x + "px"; // la posizione x del razzo viene aggiornata in base alla posizione x del razzo
            razzo.el.style.top = razzo.y + "px"; // la posizione y del razzo viene aggiornata in base alla posizione y del razzo

            const rect = razzo.el.getBoundingClientRect();
            if(rect.bottom < 0) { // se la posizione y del razzo è minore di 0, significa che il razzo è uscito dallo schermo, quindi viene rimosso dall'array dei razzi
                razzo.el.remove(); // rimuovo l'elemento del razzo dal DOM
                razzi.splice(index, 1);
            }

            
        });
    }, 50);

document.addEventListener("keydown", (e) => {
    if(e.code === "Space") {
        e.preventDefault();

    }
    }); 

