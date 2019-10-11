
const screen = document.getElementById('screen');
const error = document.getElementById('error');

const printInputToScreen = input => screen.innerHTML = screen.innerHTML + input;

const deleteLatestInput = () => {
    if (screen.innerHTML.length <= 0) return;
    screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length - 1);
}

const clearAllInputs = () => screen.innerHTML = "";

const printResultToScreen = result => screen.innerHTML = result;

const printErrorToScreen = errorMessage => error.innerHTML = errorMessage;

const clearErrorFromScreen = () => error.innerHTML = "";

export {
    printInputToScreen,
    deleteLatestInput,
    clearAllInputs,
    printResultToScreen,
    printErrorToScreen,
    clearErrorFromScreen,
}