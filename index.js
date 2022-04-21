const inpContainers = document.querySelectorAll(".inp-c");
const inpLeft = document.querySelector(".inp-left");
const inpRight = document.querySelector(".inp-right");
const inp = document.querySelectorAll(".inp");
const leftTabElements = document.querySelectorAll(".nav-left__btn");
const rightTabElements = document.querySelectorAll(".nav-right__btn");
const oneCurValueLeft = document.querySelector(".inp-left__curt");
const oneCurValueRight = document.querySelector(".inp-right__curt");

// default situation
inpLeft.value = "100";

fetch(`https://api.exchangerate.host/latest?base=USD&symbols=RUB`)
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


// while click start


function getData(from, to){
    fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
    .then(res => res.json())
    .then(data => {
        inpRight.value = (inpLeft.value / data.rates[from]).toFixed(4);
        inpLeft.addEventListener("keyup", () => {
            inpLeft.value = inpLeft.value.replace(/,/, ".")
            inpRight.value = (inpLeft.value / data.rates[from]).toFixed(4);
        });
        oneCurValueLeft.textContent = `1 ${from} = ${(1 / data.rates[from]).toFixed(4)} ${to}`
        oneCurValueRight.textContent = `1 ${to} = ${(data.rates[from]).toFixed(4)} ${from}`
    })
}

// while click end

// tabs start

function checkIfContainsClassLeft(){
    leftTabElements.forEach(el => {
        el.classList.remove(`nav-left__btn_active`);
    })
}

function checkIfContainsClassRight(){
    rightTabElements.forEach(el => {
        el.classList.remove(`nav-right__btn_active`);
    })
}

leftTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        checkIfContainsClassLeft();
        e.target.classList.add("nav-left__btn_active");
        getData(e.target.textContent, document.querySelector(".nav-right__btn_active").textContent)
    })
})

rightTabElements.forEach(element => {
    element.addEventListener("click", (e) => {
        checkIfContainsClassRight();
        e.target.classList.add("nav-right__btn_active");
        getData(document.querySelector(".nav-left__btn_active").textContent, e.target.textContent)
    })
})

// tabs end

 