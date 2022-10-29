let allDim = false;

function dimAllLines(){
    const lines = document.querySelectorAll(".line path");
    const players = document.querySelectorAll("#player-container > div");
    for (let index = 0; index < lines.length; index++) {
        players[index].classList.remove("picked");
        lines[index].classList.remove(...lines[index].classList);
    }

    allDim = true;
}

function invisAllLines(){
    const lines = document.querySelectorAll(".line path");
    const players = document.querySelectorAll("#player-container > div");
    for (let index = 0; index < lines.length; index++) {
        players[index].classList.remove("picked");
        lines[index].classList.replace("pop", "invis");
        lines[index].classList.add("invis");
    }

    allDim = false;
}

async function staggeredPopAllLines(){
    const lines = document.querySelectorAll(".line path");
    const players = document.querySelectorAll("#player-container > div");
    for (let index = 0; index < lines.length; index++) {
        players[index].classList.add("picked");
        lines[index].classList.replace("invis", "pop");
        lines[index].classList.add("pop");
        await sleep(200);
    }
}

function popAllLines(){
    const lines = document.querySelectorAll(".line path");
    const players = document.querySelectorAll("#player-container > div");
    for (let index = 0; index < lines.length; index++) {
        players[index].classList.add("picked");
        lines[index].classList.replace("invis", "pop");
        lines[index].classList.add("pop");
    }
}

function popLines(query){
    const lines = document.querySelectorAll(query + " path");

    for (let index = 0; index < lines.length; index++) {

        lines[index].classList.replace("invis", "pop");
        lines[index].classList.add("pop");
        // if (line.classList.contains("invis")){
        //     line.classList.replace("invis", "pop");

        // }else {
        //     line.classList.add("pop");
        // }
    }
}

function dimLines(query){
    const lines = document.querySelectorAll(query + " path");

    for (const line of lines) {
        line.classList.remove(...line.classList);
    }
}

function invisLines(query){
    const lines = document.querySelectorAll(query + " path"); 

    for (const line of lines) {
        line.classList.add("invis");
        line.classList.remove("pop");
    }
}

function demonstration(){
    dimAllLines();
    setTimeout(() => {  popLines("g.Mohamed-Salah"); }, 2000);
    setTimeout(() => {  dimAllLines(); }, 4000);
    setTimeout(() => {  popLines(".line"); }, 6000);
}
 
function playerClicked(e) {
    if (e.target !== e.currentTarget) {
        let playerDiv = e.target;
        if (e.target.classList.contains('season') || e.target.classList.contains('name')){
            playerDiv = e.target.parentNode;
        }

        if (e.detail === 1){
            // console.log('single');
            if (playerDiv.classList.contains('picked')){
                playerDiv.classList.remove('picked');
                if (allDim){
                    dimLines('g.line.' + playerDiv.classList[0] + '.' + playerDiv.classList[1]);
                } else {
                    invisLines('g.line.' + playerDiv.classList[0] + '.' + playerDiv.classList[1]);
                }
            } else {
                playerDiv.classList.add('picked');
                popLines('g.line.' + playerDiv.classList[0] + '.' + playerDiv.classList[1]);
            }
        } else if (e.detail > 1){
            // console.log('double');
            const divs = document.querySelectorAll('.' + playerDiv.classList[0]);

            if (playerDiv.classList.contains('picked')){
                popLines('g.line.' + playerDiv.classList[0]);

                for (const player of divs) {
                    player.classList.add('picked'); 
                }
            } else {
                for (const player of divs) {
                    player.classList.remove('picked'); 
                }

                if (allDim){
                    dimLines('g.line.' + playerDiv.classList[0]);
                } else {
                    invisLines('g.line.' + playerDiv.classList[0]);
                }
            }
            e.preventDefault();
        }
    }
    e.stopPropagation();
}

function playerMouseOver(e) {
    if (e.target !== e.currentTarget && e.target.classList.length != 0) {
       //console.log([...e.target.classList]);
        let query;
        let list;
        if (e.target.classList.contains('season')){
            list = e.target.parentNode.classList;
        } else if (e.target.classList.contains('name')){
            list = e.target.parentNode.classList;
        } else {
            list = e.target.classList;
        }

        //console.log(list);
        listItem = document.querySelector('g.' + list[0] + '.' + list[1] + ' path');
        if (listItem){
            if(list.contains('picked')){
                if (e.type == 'mouseover'){
                    document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.add('highlight');
                } else if (e.type == 'mouseout'){
                    document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.remove('highlight');
                }      
            } else {
                if (e.type == 'mouseover'){
                    if (listItem.classList.contains('invis')){
                        document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.remove('invis');
                    } else {
                        document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.add('pop');
                    }
                } else if (e.type == 'mouseout'){
                    if (listItem.classList.contains('pop')){
                        document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.remove( 'pop');
                    } else {
                        document.querySelector('g.' + list[0] + '.' + list[1] + ' path').classList.add('invis');
                    }
                }
            } 
        }
    }
    e.stopPropagation();
}

function addLabels(){
    const axes = document.getElementById("matplotlib.axis_2").getBoundingClientRect();
    //console.log(axes);

    const xLabel = document.createElement('div');
    xLabel.innerHTML = "MATCH";
    xLabel.id = "x-axis-label";
    xLabel.classList.add("label");
    xLabel.classList.add("axis"); 

    const yLabel = document.createElement('div');
    yLabel.innerHTML = "GOALS";
    yLabel.id = "y-axis-label";
    yLabel.classList.add("label");
    yLabel.classList.add("axis");    

    const titleLabel = document.createElement('div');
    titleLabel.innerText = document.getElementsByTagName("title")[0].innerText;
    titleLabel.id = "plot-title";
    titleLabel.classList.add("label");
    titleLabel.classList.add("title");
    
    document.body.appendChild(xLabel);
    document.body.appendChild(yLabel);
    document.body.appendChild(titleLabel);

    pageReadjust();
}

function pageReadjust(){
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

    document.body.style.marginBottom = (document.body.getBoundingClientRect().height - height)/2 +'px';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start(){
    invisAllLines();
    setTimeout(() => {  staggeredPopAllLines();}, 1000);
}

function init(){
    addLabels();
    start();

    var playerContainer = document.querySelector("#player-container");
    playerContainer.addEventListener("click", playerClicked, false);
    playerContainer.onmouseover = playerContainer.onmouseout = playerMouseOver;

    document.getElementById("clear").addEventListener("click", invisAllLines, false);
    document.getElementById("dim").addEventListener("click", dimAllLines, false);
    document.getElementById("all").addEventListener("click", popAllLines, false);
    document.getElementById("reset").addEventListener("click", start, false);

    window.addEventListener('resize', pageReadjust, false);
    window.addEventListener('load', pageReadjust, false);
}

init();