import {
    evaluate as solve
} from "mathjs";

const getResult = () => {
    const screen = document.getElementById('screen');
    const problem = screen.innerHTML;

    if (!problem) return;

    try {
        return [solver(problem), null];
    } catch (_error) {
        const errorMessage = "Invalid input"
        return [null, errorMessage];
    }

}

// In order to % (percentage work) use this function
// https://github.com/josdejong/mathjs/issues/304#issuecomment-440091394
// http://jsfiddle.net/rkmctvz6/2/
function solver(input) {
    var pcntOfRegC = /[0-9]*\.?[0-9]%[ ]*of[ ]*/g,
        pcntOfReg = /%[ ]*of[ ]*/g,
        pcntReg = /[0-9]*\.?[0-9]%/g,
        modReg = /[0-9]*\.?[0-9]%[0-9]*\.?[0-9]/g,
        numReg = /[0-9]*\.?[0-9]/g;

    if (input.match(pcntOfRegC)) {
        input = input.replace(pcntOfReg, "/100*");
    }

    if (input.match(modReg)) {
        var modVals = input.match(modReg);
        modVals.forEach(function (modVal) {
            input = input.replace(modVal, String(solve(modVal)));
        });
    }

    while (input.match(pcntReg) && !input.match(modReg)) {
        var right = input.match(pcntReg)[0],
            left = input.split(right)[0],
            leftTrim = left.trim(),
            leftVal = leftTrim.slice(0, -1);

        leftVal = String(solve(leftVal));

        var pcntVal = right.match(numReg)[0],
            newval = leftVal + "*" + pcntVal + "/100";

        newval = String(solve(newval));
        input = input.replace(left + right, String(solve(left + newval)));
    }

    return solve(input);
}

export {
    getResult,
}