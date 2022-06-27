const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let timerId = 0;
stopButton.disabled = true;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    body.style.background = getRandomHexColor(); 
    stopButton.disabled = false;
    
    timerId = setInterval(() => {
       body.style.background = getRandomHexColor(); 
    }, 1000);      
});

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;  
}