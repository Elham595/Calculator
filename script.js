"use strict";
class Calculator{
    constructor(previousOperandElement,currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
       }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    /********APPENDING NUMBERS TO THE SCREEN AND MAKE SURE THAT ONE . ONLY DISPLAY PER THE OPERATION*******/
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    /*********CHANGE THE PLACE OF PREVIOUS AND CURRENT AFTER CLICKING OPERATION AND GO TO COMPUTE
           IF CLICKING OPERATION AGAIN BEFOR CLICKING EQUALS**********/
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    /////////////////////MAKE CALCULATIONS///////////////////
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
              computation = prev + curr
              console.log(computation)
              break
            case '-':
              computation = prev - curr
              break
            case '*':
              computation = prev * curr
              break
            case '/':
              computation = prev / curr
              break
            default:
              return
        }
        this.currentOperand = computation
        console.log(computation)
        this.operation = undefined  
        this.previousOperand = ''
    }
    ////////////////TURN THE NUMBER INTO INTGERS AND DECIMALS BEFOR UPDATING/////////////////
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)){
            intDisplay = ''
        }else{
            intDisplay = intDigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`
        }else{
            return intDisplay
        }

    }
    /**************DISPLAYING**************/
    updateDisplay(){
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
           this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandElement.innerText = ''
        }
    }
}
/****************GET CALCULATOR BUTTONS*********************/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')
const deleteElement = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const clearAll = document.querySelector('[data-clear-all')
/************************MAKE AN INSTANCE OF THE CLASS**********************/
const calculator = new Calculator(previousOperandElement,currentOperandElement);
/***********CALLING APPENDNUMBER()****************/
numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
/************CALLING CHOOSEOPERATION()************/
operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
/****************CALLING COMPUTE****************/
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
/*************DELETING PART***********/
deleteElement.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
/*************CLEARING ALL************/
clearAll.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})