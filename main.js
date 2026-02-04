const digits = document.querySelectorAll('.calc__digit');
const clear = document.querySelector('.calc__clear');
const division = document.querySelector('.calc__division');
const multiply = document.querySelector('.calc__multiply');
const minus = document.querySelector('.calc__minus');
const decimal = document.querySelector('.calc__decimal');
const addition = document.querySelector('.calc__addition');
const equal = document.querySelector('.calc__equal');
const display = document.querySelector('.calc__output');

let result = '';
let operation = '';
let previousOperand = ''; 

const appendDigit = (digit) => {
   if (digit === '.' && result.includes('.')) return;

   let totalLength = operation ? `${previousOperand} ${operation} ${result}${digit}`.length : `${result}${digit}`.length;
   
   if (totalLength > 10) {
    alert('Reached max 10 character limit');
    return;
   }
   
   result += digit;
   updateDisplay();
}

const updateDisplay = () => {
   let displayText;

   if (operation) {
      displayText = `${previousOperand} ${operation} ${result}`;
   } else {
      displayText = result;
   }

   if (displayText.length > 10) {
      displayText = displayText.slice(0, 10);
   }

   display.textContent = displayText;
}


const selectOperator = (operatorValue) => {
   if (result === '') return;

   if (operation !== '' && previousOperand !== '') {
      calculateResult();
   }

   operation = operatorValue;
   previousOperand = result;
   result = '';
   updateDisplay();
}

const calculateResult = () => {
   const previous = Number(previousOperand);
   const current = Number(result);

   if (operation === '/' && current === 0) {
      result = 'Error';
      operation = '';
      previousOperand = '';
      updateDisplay();
      return;
   }

   let finalResult;

   if (isNaN(previous) || isNaN(current)) return;

   switch (operation) {
      case '/':
         finalResult = previous / current;
         break;
      case 'x':
         finalResult = previous * current;
         break;
      case '-':
         finalResult = previous - current;
         break;
      case '+':
         finalResult = previous + current;
         break;
      default:
         return;
   }

   result = String(finalResult);
   operation = '';
   previousOperand = '';
   updateDisplay();
}

digits.forEach(btn => {
   btn.addEventListener('click', () => {
         appendDigit(btn.textContent);
   });
});

decimal.addEventListener('click', () => appendDigit('.'));
division.addEventListener('click', () => selectOperator('/'));
multiply.addEventListener('click', () => selectOperator('x'));
minus.addEventListener('click', () => selectOperator('-'));
addition.addEventListener('click', () => selectOperator('+'));

equal.addEventListener('click', () => {
   if (result === '' && previousOperand === '') return;
   calculateResult();
});

clear.addEventListener('click', () => {
   result = '';
   operation = '';
   previousOperand = '';
   updateDisplay();
});