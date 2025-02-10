import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const calculateEquals = () => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) return;

    if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  return (
    <div className="w-64 mx-auto mt-10 p-4 border rounded shadow-lg">
      <div className="text-center text-xl font-bold mb-4">Calculator</div>
      <div className="bg-gray-100 p-2 text-right text-2xl mb-4 rounded">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '-', 0, '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded text-xl"
            onClick={() => {
              switch (btn) {
                case '÷':
                  performOperation('/');
                  break;
                case '×':
                  performOperation('*');
                  break;
                case '-':
                  performOperation('-');
                  break;
                case '+':
                  performOperation('+');
                  break;
                case '=':
                  calculateEquals();
                  break;
                case '.':
                  inputDecimal();
                  break;
                default:
                  inputDigit(btn);
              }
            }}
          >
            {btn}
          </button>
        ))}
        <button 
          className="col-span-4 mt-2 bg-red-500 text-white p-2 rounded"
          onClick={clearDisplay}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;