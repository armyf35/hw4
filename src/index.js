import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import css from "./hw4.css";

const Calculator = () => {
    const [currentState, setCurrentState] = useState('init');
    const [operation, setOperation ] = useState(false);
    let [firstNumber, setFirstNumber] = useState(0);
    let [secondNumber, setSecondNumber] = useState(0);
    const [activeOperationButton, setActiveOperationButton] = useState('');
    const [numberField, setNumberField] = useState(0);

    const resetOperationButton = () => {
        setActiveOperationButton('');
    };

    const onDoubleOperationClick = (element) => {
        switch (currentState) {
            case 'calculated':
                setCurrentState('operation');
                setFirstNumber(numberField);
                setOperation(element.target.innerText);
                setActiveOperationButton(element.target.innerText);
                break;
            case 'inputNumberTwo':
                calculate();
            case 'inputNumberOne':
                setCurrentState('operation');
                setOperation(element.target.innerText);
                setActiveOperationButton(element.target.innerText);
                break;
        };
    };

    const onSingleOperationClick = (element) => {
        calculate(element, element.target.innerText);
    };

    const  onNumberClick = (element) => {
        let digit = element.target.innerText;
        switch (currentState) {
            case 'init':
                if (digit != 0) {
                    setCurrentState('inputNumberOne');
                };
                if (digit == '.') {
                    setNumberField(numberField + digit);
                } else {
                    setNumberField(digit);
                };
                break;
            case 'inputNumberOne':
            case 'inputNumberTwo':
                setNumberField(numberField + digit);
                break;
            case 'calculated':
                setCurrentState('inputNumberOne');
                setNumberField(digit);
                break;
            case 'operation':
                setCurrentState('inputNumberTwo');
                setFirstNumber(numberField);
                if (digit == '.') {
                    setNumberField(0 + digit);
                } else {
                    setNumberField(digit);
                };
                resetOperationButton();
                break;
        };
    };

    const reset = () => {
        setCurrentState('init');
        setOperation(false);
        setFirstNumber(0)
        setSecondNumber(0)
        setNumberField(0);
        resetOperationButton();
    };

    const factorial = (n) => {
        if (n > 1) {
            return n * factorial(n - 1);
        } else {
            return n;
        };
    };

    const calculate = (element, op = operation) => {
        if (currentState == 'calculated' || currentState == 'inputNumberOne') {
            setFirstNumber(numberField);
            firstNumber = numberField;
        } else {
            setSecondNumber(numberField);
            secondNumber = numberField;
        };

        switch (op) {
            case '+':
                setNumberField(parseFloat(firstNumber) + parseFloat(secondNumber));
                break;
            case 'x!':
                setNumberField(factorial(numberField.innerText));
                break;
            case '%':
                setNumberField(firstNumber / 100);
                break;
            case 'sin':
                setNumberField(Math.sin(firstNumber));
                break;
            case 'ln':
                setNumberField(Math.log(firstNumber));
                break;
            case '÷':
                setNumberField(parseFloat(firstNumber) / parseFloat(secondNumber));
                break;
            case 'cos':
                setNumberField(Math.cos(firstNumber));
                break;
            case 'log':
                setNumberField(Math.log(firstNumber) / Math.log(10));
                break;
            case '×':
                setNumberField(parseFloat(firstNumber) * parseFloat(secondNumber));
                break;
            case 'tan':
                setNumberField(Math.tan(firstNumber));
                break;
            case '√':
                setNumberField(Math.sqrt(firstNumber));
                break;
            case '-':
                setNumberField(parseFloat(firstNumber) - parseFloat(secondNumber));
                break;
            case 'EXP':
                setNumberField(Math.exp(firstNumber));
                break;
            case 'Xy':
                setNumberField(Math.pow(firstNumber, secondNumber));
                break;
        };
        setCurrentState('calculated');
        resetOperationButton();
    };

    return (
        <div>
            <div className="row bottom-buffer">
                <div id="input" className="col-12 text-end border">{numberField}</div>
            </div>
            <div className="row button-row g-1 justify-content-center">
                <div className="col-2"><button className="button btn btn-light">Deg</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>x!</button></div>
                <div className="col-2"><button className="button btn btn-light">(</button></div>
                <div className="col-2"><button className="button btn btn-light">)</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>%</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={reset}>AC</button></div>
            </div>
            <div className="row button-row g-1 justify-content-center">
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>sin</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>ln</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>7</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>8</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>9</button></div>
                <div className="col-2"><button className={"button btn " + (activeOperationButton == '÷' ? "button-active" : "btn-light")} onClick={onDoubleOperationClick}>÷</button></div>
            </div>
            <div className="row button-row g-1 justify-content-center">
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>cos</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>log</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>4</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>5</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>6</button></div>
                <div className="col-2"><button className={"button btn " + (activeOperationButton == '×' ? "button-active" : "btn-light")} onClick={onDoubleOperationClick}>×</button></div>
            </div>
            <div className="row button-row g-1 justify-content-center">
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>tan</button></div>
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>√</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>1</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>2</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>3</button></div>
                <div className="col-2"><button className={"button btn " + (activeOperationButton == '-' ? "button-active" : "btn-light")} onClick={onDoubleOperationClick}>-</button></div>
            </div>
            <div className="row button-row g-1 justify-content-center">
                <div className="col-2"><button className="button btn btn-light" onClick={onSingleOperationClick}>EXP</button></div>
                <div className="col-2"><button className={"button btn " + (activeOperationButton == 'Xy' ? "button-active" : "btn-light")} onClick={onDoubleOperationClick}>X<span className="sup">y</span></button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>0</button></div>
                <div className="col-2"><button className="button btn btn-light grey" onClick={onNumberClick}>.</button></div>
                <div className="col-2"><button className="button btn btn-primary blue" onClick={calculate}>=</button></div>
                <div className="col-2"><button className={"button btn "  + (activeOperationButton == '+' ? "button-active" : "btn-light")} onClick={onDoubleOperationClick}>+</button></div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Calculator />);
