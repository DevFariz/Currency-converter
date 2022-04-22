const inpContainers = document.querySelectorAll(".inp-c");
const inpLeft = document.querySelector(".inp-left");
const inpRight = document.querySelector(".inp-right");
const inp = document.querySelectorAll(".inp");
const leftTabElements = document.querySelectorAll(".nav-left__btn");
const rightTabElements = document.querySelectorAll(".nav-right__btn");
const oneCurValueLeft = document.querySelector(".inp-left__curt");
const oneCurValueRight = document.querySelector(".inp-right__curt");



// convert value from left input to right one
function getDataFromLeft(from, to, inp1, inp2){
    inp1.value = inp1.value.replace(/,/, ".")
    if(isNaN(inp1.value)){
        inp2.value = "Invalid data"
        return;
    }

    if(from != to){
        fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
        .then(res => res.json())
        .then(data => {
            inp2.value = (inp1.value / data.rates[from]).toFixed(4);
            oneCurValueLeft.textContent = `1 ${from} = ${(1 / data.rates[from]).toFixed(4)} ${to}`
            oneCurValueRight.textContent = `1 ${to} = ${(data.rates[from]).toFixed(4)} ${from}`
        })
        .catch(err => alert("Error: " + err))
    }else{
        inp2.value = inp1.value;            
        oneCurValueLeft.textContent = `1 ${from} = 1 ${to}`;
        oneCurValueRight.textContent = `1 ${to} = 1 ${from}`;
    }
}

//default
inpLeft.value = "100";
getDataFromLeft('RUB', 'USD', inpLeft, inpRight)

// tabs start
function deleteActiveClassLeft(){
    leftTabElements.forEach(el => {
        el.classList.remove(`nav-left__btn_active`);
    })
}

function deleteActiveClassRight(){
    rightTabElements.forEach(el => {
        el.classList.remove(`nav-right__btn_active`);
    })
}

leftTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        deleteActiveClassLeft();
        e.target.classList.add("nav-left__btn_active");
        getDataFromLeft(e.target.textContent, document.querySelector(".nav-right__btn_active").textContent, inpLeft, inpRight)
    })
})

rightTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        deleteActiveClassRight();
        e.target.classList.add("nav-right__btn_active");
        getDataFromLeft(document.querySelector(".nav-left__btn_active").textContent, e.target.textContent, inpRight, inpLeft)        
    })
})

 inpLeft.addEventListener("keyup", () => {
     getDataFromLeft(document.querySelector(".nav-left__btn_active").textContent, document.querySelector(".nav-right__btn_active").textContent, inpLeft, inpRight)
 })

 inpRight.addEventListener("keyup", () => {
    getDataFromLeft(document.querySelector(".nav-right__btn_active").textContent, document.querySelector(".nav-left__btn_active").textContent, inpRight, inpLeft)
})