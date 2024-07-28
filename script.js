// Opção
const optionStopwatch = document.getElementById('option-stopwatch');
const optionCountdown = document.getElementById('option-countdown');
const countdown = document.getElementById('countdown');
const stopwatch = document.getElementById('stopwatch');

optionStopwatch.addEventListener('click', function(){
    optionStopwatch.style.border = "1px solid #fff";
    optionCountdown.style.border = "none";
    stopwatch.style.display = "flex";
    stopwatch.style.flexDirection = "column";
    countdown.style.display = "none";
});

optionCountdown.addEventListener('click', function(){
    optionCountdown.style.border = "1px solid #fff";
    optionStopwatch.style.border = "none";
    countdown.style.display = "flex";
    stopwatch.style.display = "none";
});


// Crônometro
const startButtonsStopwatch = document.getElementById('stopwatch-buttons-start');
const pauseButtonsStopwatch = document.getElementById('stopwatch-buttons-pause');
const resetButtonsStopwatch = document.getElementById('stopwatch-buttons-reset');

let startTimeStopwatch;
let updatedTimeStopwatch;
let differenceTimeStopwatch;
let intervalTimeStopwatch;
let runningStopwatch;
let pausedStopwatch;
let savedTimeStopwatch;

runningStopwatch = false;
pausedStopwatch = false;
savedTimeStopwatch = 0;

startButtonsStopwatch.addEventListener('click', function() {
    
    if (!runningStopwatch) {
        if (pausedStopwatch) {
            startTimeStopwatch = new Date().getTime() - savedTimeStopwatch;
            pausedStopwatch = false;
        } else {
            startTimeStopwatch = new Date().getTime();
        }
        intervalTimeStopwatch = setInterval(updateTimeStopwatch, 10);
        runningStopwatch = true;
    }
})

pauseButtonsStopwatch.addEventListener('click', function() {
    if (runningStopwatch) {
        clearInterval(intervalTimeStopwatch);
        savedTimeStopwatch = differenceTimeStopwatch;
        runningStopwatch = false;
        pausedStopwatch = true;
    }
})

resetButtonsStopwatch.addEventListener('click', function() {
    clearInterval(intervalTimeStopwatch);
    runningStopwatch = false;
    pausedStopwatch = false;
    savedTimeStopwatch = 0;
    document.getElementById('stopwatch-display').innerHTML = '00:00:00.00';
})

function updateTimeStopwatch() {
    updatedTimeStopwatch = new Date().getTime(); 
    differenceTimeStopwatch = updatedTimeStopwatch - startTimeStopwatch;

    let hours = Math.floor((differenceTimeStopwatch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((differenceTimeStopwatch % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((differenceTimeStopwatch % (1000 * 60)) / 1000);
    let centiseconds = Math.floor((differenceTimeStopwatch % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    centiseconds = (centiseconds < 10) ? "0" + centiseconds : centiseconds;

    document.getElementById('stopwatch-display').innerHTML = hours + ':' + minutes + ':' + seconds + '.' + centiseconds;
}

// Timer
const startButtonsCountdown = document.getElementById('countdown-buttons-start');
const pauseButtonsCountdown = document.getElementById('countdown-buttons-pause');
const resetButtonsCountdown = document.getElementById('countdown-buttons-reset');

const inputHoursCountdown = document.getElementById('countdown-display-time-hours');
const inputMinutesCountdown = document.getElementById('countdown-display-time-minutes');
const inputSecondsCountdown = document.getElementById('countdown-display-time-seconds');
const textHundredthCountdown = document.getElementById('countdown-display-hundredth')

let startTimeCountdown;
let updatedTimeCountdown;
let differenceTimeCountdown;
let intervalTimeCountdown;
let runningCountdown;
let pausedCountdown;
let savedTimeCountdown;
let hundredthCountdown;

runningCountdown = false;
pausedCountdown = false;
hundredthCountdown = 0;

let hoursCountdown;
let minutesCountdown;
let secondsCountdown;

startButtonsCountdown.addEventListener('click', function(){
    hoursCountdown = parseInt(inputHoursCountdown.value) || 0;
    minutesCountdown = parseInt(inputMinutesCountdown.value) || 0;
    secondsCountdown = parseInt(inputSecondsCountdown.value) || 0;
    if(!runningCountdown){
        if(!pausedCountdown){
            hundredthCountdown = 0;
        }
        runningCountdown = true;
        intervalTimeCountdown = setInterval(updateTimeCountdown, 10);
        console.log("test");
    }
});

pauseButtonsCountdown.addEventListener('click', function(){
    if (runningCountdown) {
        clearInterval(intervalTimeCountdown);
        runningCountdown = false;
        pausedCountdown = true;
    }
});

resetButtonsCountdown.addEventListener('click', function() {
    clearInterval(intervalTimeCountdown);
    runningCountdown = false;
    pausedCountdown = false;
    savedTimeCountdown = 0;
    inputHoursCountdown.value = '00';
    inputMinutesCountdown.value = '00';
    inputSecondsCountdown.value = '00';
    textHundredthCountdown.innerHTML = '00';
});

function updateTimeCountdown() {
    if (hundredthCountdown > 0) {
        hundredthCountdown--;
    } else {
        hundredthCountdown = 99;
        if (secondsCountdown > 0) {
            secondsCountdown--;
        } else {
            if (minutesCountdown > 0) {
                minutesCountdown--;
                secondsCountdown = 59;
            } else {
                if (hoursCountdown > 0) {
                    hoursCountdown--;
                    minutesCountdown = 59;
                    secondsCountdown = 59;
                } else {
                    clearInterval(intervalTimeCountdown);
                    alert("Timer finalizado");
                    runningCountdown = false;
                    return;
                }
            }
        }
    }

    inputHoursCountdown.value = hoursCountdown.toString().padStart(2, '0');
    inputMinutesCountdown.value = minutesCountdown.toString().padStart(2, '0');
    inputSecondsCountdown.value = secondsCountdown.toString().padStart(2, '0');
    textHundredthCountdown.innerHTML = hundredthCountdown.toString().padStart(2, '0');
}

function increment(input){
    let inputCountdown = document.getElementById(input);
    if(inputCountdown.value == '59'){
        inputCountdown.value = '00';
    }else{
        let x = parseInt(inputCountdown.value);
        x++;
        if(x<10){
            inputCountdown.value = "0" + x;
        }else{
            inputCountdown.value = x.toString();
        }
    }
}

function decrement(input){
    let inputCountdown = document.getElementById(input);
    if(inputCountdown.value == '00'){
        inputCountdown.value = '59';
    }else{
        let x = parseInt(inputCountdown.value);
        x--;
        if(x<10){
            inputCountdown.value = "0" + x;
        }else{
            inputCountdown.value = x.toString();
        }
    }
}

inputHoursCountdown.addEventListener('input', function(){
    inputHoursCountdown.value = inputHoursCountdown.value.replace(/[^0-9]/g, '');
});
inputMinutesCountdown.addEventListener('input', function(){
    inputMinutesCountdown.value = inputMinutesCountdown.value.replace(/[^0-9]/g, '');
});
inputSecondsCountdown.addEventListener('input', function(){
    inputSecondsCountdown.value = inputSecondsCountdown.value.replace(/[^0-9]/g, '');
});

inputHoursCountdown.addEventListener('blur', function(){
    if((parseInt(inputHoursCountdown.value)<10) && (inputHoursCountdown.value.length == 1)){
        inputHoursCountdown.value = "0" + inputHoursCountdown.value;
    }
});
inputMinutesCountdown.addEventListener('blur', function(){
    if(parseInt(inputMinutesCountdown.value) > 59){
        inputMinutesCountdown.value = "59";
    }else if((parseInt(inputMinutesCountdown.value)<10) && (inputMinutesCountdown.value.length == 1)){
        inputMinutesCountdown.value = "0" + inputMinutesCountdown.value;
    }
});
inputSecondsCountdown.addEventListener('blur', function(){
    if(parseInt(inputSecondsCountdown.value) > 59){
        inputSecondsCountdown.value = "59";
    }else if((parseInt(inputSecondsCountdown.value)<10) && (inputSecondsCountdown.value.length == 1)){
        inputSecondsCountdown.value = "0" + inputSecondsCountdown.value;
    }
});

