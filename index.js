const inpContainers = document.querySelectorAll(".inp-c");
const inpLeft = document.querySelector(".inp-left");
const inpRight = document.querySelector(".inp-right");
const inp = document.querySelectorAll(".inp");
const leftTabElements = document.querySelectorAll(".nav-left__btn");
const rightTabElements = document.querySelectorAll(".nav-right__btn");

inpLeft.value = "100";

function checkIfContainsClassLeft(){
    leftTabElements.forEach(el => {
        el.classList.remove(`nav-left__btn_active`)
    })
}

function checkIfContainsClassRight(){
    rightTabElements.forEach(el => {
        el.classList.remove(`nav-right__btn_active`)
    })
}

leftTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        checkIfContainsClassLeft()
        e.target.classList.add("nav-left__btn_active")
    })
})

rightTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        checkIfContainsClassRight()
        e.target.classList.add("nav-right__btn_active")
    })
})

let oneCurValueLeft = document.querySelector(".inp-left__curt");
let oneCurValueRight = document.querySelector(".inp-right__curt");

fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB ")
.then(res => res.json())
.then(data => {
    console.log(data)
    inpRight.value = (inpLeft.value / data.rates.RUB).toFixed(4);
    inpLeft.addEventListener("keyup", () => {
        inpLeft.value = inpLeft.value.replace(/,/, ".")
        inpRight.value = (inpLeft.value / data.rates.RUB).toFixed(4);
    });
    oneCurValueLeft.textContent = `1 RUB = ${(1 / data.rates.RUB).toFixed(4)} USD`
    oneCurValueRight.textContent = `1 USD = ${(data.rates.RUB).toFixed(4)} RUB`
})
