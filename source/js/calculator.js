
import {calculateDeposit, calculateInvestment} from "./utils";
export default class Calculator {
  constructor(inputRange, amount, inputBubble, amountCalculations, accumulationElement, accumulationDepositElem, accumulationInvestElem) {
    this.inputRange = inputRange;
    this.amountText = amount;
    this.inputBubble = inputBubble;
    this.amountCalculations = amountCalculations;
    this.accumulationElement = accumulationElement;
    this.accumulationDepositElem = accumulationDepositElem;
    this.accumulationInvestElem = accumulationInvestElem;
    this.accumulation = null;
    this.accumulationDeposit = null;
    this.accumulationInvestment = null;

    this.newBubblePoint = null;
    this.newBubblePlace = null;
  }

  moveBubble() {
    this.rangeMinValue = this.inputRange.min;
    this.rangeMaxValue = this.inputRange.max;
    this.newBubblePosition = Number(((this.inputRange.value - this.rangeMinValue) * 100) / (this.rangeMaxValue - this.rangeMinValue));

    this.inputBubble.style.left = `calc(${this.newBubblePosition}% + (${10 - this.newBubblePosition * 0.25}px))`;
  }

  calculate() {
    this.accumulation = 36 * this.inputRange.value;
    this.accumulationDeposit = calculateDeposit(this.inputRange.value);
    this.accumulationInvestment = calculateInvestment(this.inputRange.value);
  }

  renderInfo() {
    this.calculate();
    this.amountText.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.inputRange.value);
    this.accumulationElement.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationDepositElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationDeposit);
    this.accumulationInvestElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationInvestment);
  }
}
