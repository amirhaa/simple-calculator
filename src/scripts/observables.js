import {
    fromEvent,
    merge
} from "rxjs";
import {
    pluck,
    map,
    filter
} from "rxjs/operators";


const validKeyboardStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '9', 'AC', '%', 'X', '/', '*', '-', '+', '=', '.', '(', ')', ' '];

// Only catch click keys on the calculator
const keysObservable = fromEvent(document.querySelectorAll(".key"), 'click')
    .pipe(
        pluck('target'),
        pluck('innerHTML'),
    );

// Only catch user keyboards valid inputs
const keyboardObservable = fromEvent(window, 'keydown')
    .pipe(
        map(val => {
            const {
                key,
                ctrlKey
            } = val;
            
            if (key === 'c' && ctrlKey) {
                return 'AC';
            } else if (key === 'Backspace') {
                return 'X';
            } else if (key === 'Enter') {
                return '=';
            }
            return key;
        }),
        filter(val => validKeyboardStrings.indexOf(val) > -1),
    );

// Merge keysObservable & keyboardObservable    
const inputObservable = merge(keysObservable, keyboardObservable);

export {
    inputObservable
}