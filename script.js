// Initialize variables to hold numbers, current operation, result, and the calculation string
let firstNum = '';
let secondNum = '';
let currentOp = null;
let result = null;
let calc = '';

// Select DOM elements for number buttons, operator buttons, and other controls
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('#equals');
const pointBtn = document.querySelector('#pointButton');
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

// Listen for keyboard input events and handle them
window.addEventListener('keydown', (e) => handleEvent(e.key));
window.addEventListener('keydown', handleEnter);

// Handle Enter key press event to simulate equals button press
function handleEnter(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleEvent('=');
    }
}

// Add click event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleEvent(button.textContent);
    });
});

// Add click event listeners for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleEvent(button.textContent);
    });
});

// Add click event listeners for other controls (equals, point, clear, delete)
clearBtn.addEventListener('click', () => handleEvent(clearBtn.textContent));
deleteBtn.addEventListener('click', () => handleEvent(deleteBtn.textContent));
pointBtn.addEventListener('click', () => handleEvent(pointBtn.textContent));
equalBtn.addEventListener('click', () => handleEvent(equalBtn.textContent));

// Handle all calculator events (button clicks and keyboard input)
function handleEvent(input) {
    // Handle numeric input
    if (!isNaN(parseFloat(input))) {
        if (currentOp == null && firstNum == result) {
            firstNum = '';
            firstNumAppend(input);
            clearDisplay();
        }
        else if(currentOp == null && firstNum != result)
        {
            firstNumAppend(input); 
        }
        else {
            secondNumAppend(input);
        }
    } else {
        // Handle operator and other non-numeric input
        switch(input) {
            // Handle arithmetic operators (+, -, *, /)
            case '+':
            case '-':
            case 'x':
            case '*':
            case '/':
                if (currentOp != null && firstNum != '' && secondNum != '') {
                    operate(firstNum, secondNum, currentOp);
                }
                currentOp = input;
                break;
            // Handle decimal point
            case '.':
                if (currentOp == null && !firstNum.includes('.')) {
                    if(firstNum == '') {
                        firstNum = "0";
                    }
                    firstNumAppend(input); 
                } else if (currentOp != null && !secondNum.includes('.')) {
                    if(secondNum == '') {
                        secondNum = "0";
                    }
                    secondNumAppend(input);
                }
                break;
            // Handle equals sign
            case '=':
                if(firstNum != '' && secondNum != '' && currentOp != null) {
                    operate(firstNum, secondNum, currentOp);
                    currentOp = null;
                }
                else if (firstNum == '')
                {
                    firstNum = '0';
                    updateDisplay();
                }
                break;
            // Handle clear and delete actions
            case 'c':
            case 'CLEAR':
                clear();
                clearDisplay();
                return;
            case 'Backspace':
            case 'DELETE':
                if (currentOp == null) {
                    firstNum = firstNum.slice(0, -1);
                } else if (currentOp != null) {
                    secondNum = secondNum.slice(0, -1);
                }
                break;
            default:
                break;
        }
    }
    // Update calculator display
    updateDisplay();
}

// Function to append digits to the first number
function firstNumAppend(numberPressed){
    firstNum = firstNum.concat(numberPressed);
}

// Function to append digits to the second number
function secondNumAppend(numberPressed){
    secondNum = secondNum.concat(numberPressed);
}

// Function to perform arithmetic operations
function operate(a, b, op) {
    a = Number(a);
    b = Number(b);

    switch (op) {
        case '/':
            if (b === 0) {
                clear();
                clearDisplay();
                alert("Can't divide by 0");
                return;
            }
            result = roundResult(a / b);
            clear();
            firstNum = result.toString();
            calc = `${a} ÷ ${b}`;
            break;
        case 'x':
        case '*':
            result = roundResult(a * b);
            clear();
            firstNum = result.toString();
            calc = `${a} x ${b}`;
            break;
        case '+':
            result = roundResult(a + b);
            clear();
            firstNum = result.toString();
            calc = `${a} + ${b}`;
            break;
        case '-':
            result = roundResult(a - b);
            clear();
            firstNum = result.toString();
            calc = `${a} - ${b}`;
            break;
        default:
            break;
    }
}

// Function to update calculator display
function updateDisplay() {
    if(currentOp != null)
    {
        document.querySelector('.calculus').textContent = firstNum+currentOp+secondNum;
        document.querySelector('.result').textContent = result;
    }
    else if(currentOp == null)
    {
        document.querySelector('.calculus').textContent = firstNum;
        document.querySelector('.result').textContent = result;
    }
    
}

// Function to clear calculator display
function clearDisplay(){
    document.querySelector('.calculus').textContent = '0';
    document.querySelector('.result').textContent = '';
    result = null;
}

// Function to clear all calculator variables
function clear() {
    firstNum = '';
    secondNum = '';
    currentOp = null;
}

// Function to round the result to three decimal places
function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

// Initialize calculator display
clearDisplay();
