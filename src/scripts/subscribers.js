import {
    inputObservable
} from "./observables";
import {
    printInputToScreen,
    deleteLatestInput,
    clearAllInputs,
    printResultToScreen,
    printErrorToScreen,
    clearErrorFromScreen,
} from "./dom";
import {
    getResult
} from "./operations";

// This is the subscriber to the inputObservable
// that handles interaction between user input 
// and the result that is printed in the screen
inputObservable.subscribe(input => {
    switch (input) {
        case '=': // Show the result
            const [result, error] = getResult();
            if (result) {
                clearErrorFromScreen();
                return printResultToScreen(result);
            } else if (error) {
                return printErrorToScreen(error);
            }
            break;
        case 'X': // Delete
            return deleteLatestInput();
        case 'AC': // Clear All
            return clearAllInputs();
        default: // Print to screen
            return printInputToScreen(input);
    }

});