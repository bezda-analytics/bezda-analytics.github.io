let allDim = false;

function dimAllLines(){
    const lines = document.querySelectorAll(".line path");
    const legendRows = document.querySelectorAll("#legend-container > div");
    for (let index = 0; index < lines.length; index++) {
        legendRows[index].classList.remove("picked");
        lines[index].classList.remove(...lines[index].classList);
    }

    allDim = true;
}

function invisAllLines(){
    const lines = document.querySelectorAll(".line path");
    const legendRows = document.querySelectorAll("#legend-container > div");
    for (let index = 0; index < lines.length; index++) {
        legendRows[index].classList.remove("picked");
        lines[index].classList.replace("pop", "invis");
        lines[index].classList.add("invis");
    }

    allDim = false;
}

async function staggeredPopAllLines(){
    const lines = document.querySelectorAll(".line path");
    const legendRows = document.querySelectorAll("#legend-container > div");
    for (let index = 0; index < lines.length; index++) {
        legendRows[index].classList.add("picked");
        lines[index].classList.replace("invis", "pop");
        lines[index].classList.add("pop");
        await sleep(200);
    }
}

function popAllLines(){
    const lines = document.querySelectorAll(".line path");
    const legendRows = document.querySelectorAll("#legend-container > div");
    for (let index = 0; index < lines.length; index++) {
        legendRows[index].classList.add("picked");
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
        line.classList.remove("highlight");
    }
}

function demonstration(){
    dimAllLines();
    setTimeout(() => {  popLines("g.Mohamed-Salah"); }, 2000);
    setTimeout(() => {  dimAllLines(); }, 4000);
    setTimeout(() => {  popLines(".line"); }, 6000);
}
 
function rowClicked(e) {
    if (e.target !== e.currentTarget) {
        let rowDiv = e.target;
        if (e.target.classList.contains('right') || e.target.classList.contains('left')){
            rowDiv = e.target.parentNode;
        }

        if (e.detail === 1){
            // console.log('single');
            if (rowDiv.classList.contains('picked')){
                rowDiv.classList.remove('picked');
                if (allDim){
                    dimLines('g.line.' + rowDiv.classList[0] + '.' + rowDiv.classList[1]);
                } else {
                    invisLines('g.line.' + rowDiv.classList[0] + '.' + rowDiv.classList[1]);
                }
            } else {
                rowDiv.classList.add('picked');
                popLines('g.line.' + rowDiv.classList[0] + '.' + rowDiv.classList[1]);
            }
        } else if (e.detail > 1){
            // console.log('double');
            const divs = document.querySelectorAll('.' + rowDiv.classList[0]);

            if (rowDiv.classList.contains('picked')){
                popLines('g.line.' + rowDiv.classList[0]);

                for (const row of divs) {
                    row.classList.add('picked'); 
                }
            } else {
                for (const row of divs) {
                    row.classList.remove('picked'); 
                }

                if (allDim){
                    dimLines('g.line.' + rowDiv.classList[0]);
                } else {
                    invisLines('g.line.' + rowDiv.classList[0]);
                }
            }
            e.preventDefault();
        }
    }
    e.stopPropagation();
}

function rowMouseOver(e) {
    if (e.target !== e.currentTarget && e.target.classList.length != 0) {
       //console.log([...e.target.classList]);
        let query;
        let list;
        if (e.target.classList.contains('right')){
            list = e.target.parentNode.classList;
        } else if (e.target.classList.contains('left')){
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
    xLabel.id = "x-axis-label";
    xLabel.classList.add("label");
    xLabel.classList.add("axis"); 

    const yLabel = document.createElement('div');
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

    var rowContainer = document.querySelector("#legend-container");
    rowContainer.addEventListener("click", rowClicked, false);
    rowContainer.onmouseover = rowContainer.onmouseout = rowMouseOver;

    document.getElementById("clear").addEventListener("click", invisAllLines, false);
    document.getElementById("dim").addEventListener("click", dimAllLines, false);
    document.getElementById("all").addEventListener("click", popAllLines, false);
    document.getElementById("reset").addEventListener("click", start, false);

    window.addEventListener('resize', pageReadjust, false);
    window.addEventListener('load', pageReadjust, false);
}

init();