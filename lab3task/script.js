const display = document.getElementById("display");
const keys = document.getElementById("keys");

let firstNumber = 0;
let operator = "";
let newNumber = true;

function calculate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;
        case "−":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            return a / b;
    }
}

keys.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") {
        return;
    }

    const value = e.target.textContent;

    if (value === "AC") {
        display.textContent = "0";
        firstNumber = 0;
        operator = "";
        newNumber = true;
    } else if (value === "+" || value === "−" || value === "×" || value === "÷") {
        firstNumber = Number(display.textContent);
        operator = value;
        newNumber = true;
    } else if (value === "=") {
        if (operator !== "") {
            const secondNumber = Number(display.textContent);
            display.textContent = calculate(firstNumber, secondNumber, operator);
            operator = "";
            newNumber = true;
        }
    } else if (value === "%") {
        display.textContent = Number(display.textContent) / 100;
    } else if (newNumber) {
        display.textContent = value;
        newNumber = false;
    } else {
        display.textContent = display.textContent + value;
    }
});
