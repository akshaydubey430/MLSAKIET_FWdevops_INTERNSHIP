const inputText = document.getElementById("input-text");
const cursor = document.getElementById("cursor");
let text = '';
let cursorPosition = 0;
let openParenthesis = 0;

function updateDisplay() {
    inputText.innerHTML = text;
}

function addCharacter(character) {
    text = text.slice(0, cursorPosition) + character + text.slice(cursorPosition);
    cursorPosition++; 
    updateDisplay();
}
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        addCharacter(e.target.innerHTML.trim());
    });
});
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operator = e.target.innerHTML.trim();
        if (operator === "=") {
            try {
                const result = eval(text);
                text = result.toString();
                cursorPosition = text.length; 
            } catch {
                text = "Error";
                cursorPosition = text.length;
            }
        } else if (operator === "AC") {
            text = "";
            cursorPosition = 0;
        } else if (operator === "DEL") {
            if (cursorPosition > 0) {
                text = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
                cursorPosition--;
            }
        } else if (operator === "√") {
            try {
                const result = Math.sqrt(eval(text));
                text = result.toString();
                cursorPosition = text.length;
            } catch {
                text = "Error";
                cursorPosition = text.length;
            }
        } else if (operator === "( )") {
            if (text.length === 0 || openParenthesis === 0 || text[cursorPosition - 1] === "(") {
                addCharacter("(");
                openParenthesis++;
            } else {
                addCharacter(")");
                openParenthesis--;
            }
        } else {
            addCharacter(operator); 
        }
        updateDisplay();
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (cursorPosition > 0) {
            cursorPosition--; 
            updateDisplay();
        }
    } else if (event.key === "ArrowRight") {
        if (cursorPosition < text.length) {
            cursorPosition++;
            updateDisplay();
        }
    }
});
updateDisplay();
