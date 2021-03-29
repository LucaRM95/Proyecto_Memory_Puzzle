const UNIQUE_CARDS = 15;

const data = new Array(UNIQUE_CARDS).fill("").map((data, index) => index);
const cuadros = shuffle([...data, ...data]);

console.log("cuadros: ", cuadros);

let pairSelected = [];

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function eliminateCard(selectedCard, previousCard){

    selectedCard.addEventListener("transitionend", () => {
        selectedCard.innerHTML = "";
        previousCard.innerHTML = "";
        finishedGame();
    });

}

function finishedGame(){
    const cards = document.getElementsByClassName("cardStuffed");

    if(cards.length === 0){
        alert("YOU WIN!!!");
    }
}

function onClick(cardId, imageId){
    console.log("cardId ", cardId);
    console.log("Image ", imageId);

    const selectedCard = document.getElementById(cardId);

    if(selectedCard.classList.contains("turn")){
        return;
    }

    selectedCard.classList.add("turn");

    if(pairSelected.length === 0){
        pairSelected[0] = {imageId, cardId};
    }
    else if(pairSelected.length === 1){
        pairSelected[1] = {imageId, cardId};

        if(pairSelected[0].imageId === pairSelected[1].imageId){
            const previousCard = document.getElementById(pairSelected[0].cardId);
            
            eliminateCard(selectedCard, previousCard);

            pairSelected = []; 
        }
    }
    else if(pairSelected.length === 2){
        const card1 = document.getElementById(pairSelected[0].cardId);
        const card2 = document.getElementById(pairSelected[1].cardId);

        card1.classList.remove("turn");
        card2.classList.remove("turn");

        pairSelected = [];
        pairSelected[0] = {imageId, cardId};
    }    
}

const html = cuadros.map( (image, index) => 
    `<div id="card-${index}" class = "card wrapper" data-tilt onclick="onClick('card-${index}', ${image})">
        <div class="flipper cardStuffed">
            <div class="front"></div>
            <div class="back">
                <div class="circle-back">
                    <img class="icon" src="./icons/${image}.svg"/>
                </div>
            </div>
        </div>
    </div>`
)
.join("");

const container_Game = document.getElementById("memory_puzzle");

container_Game.innerHTML = html;
container_Game.style.width = `${140 * Math.sqrt(UNIQUE_CARDS*2)}px`
container_Game.style.height = `${110 * Math.sqrt(UNIQUE_CARDS*2)}px`