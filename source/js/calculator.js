
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

    this.maxAccumulation = null;
    this.accumulationStep = null;
    this.coinsCount = null;
    this.coinsWrapperElement = document.querySelector(".amount-result__coins-wrapper")
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

  renderCoins() {
    this.maxAccumulation = this.inputRange.max * 36;
    this.accumulationStep = this.maxAccumulation / 10;
    this.coinsCount = Math.ceil(this.accumulation / this.accumulationStep)
    console.log(this.coinsCount)
  }

  renderInfo() {
    this.calculate();
    this.amountText.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.inputRange.value);
    this.accumulationElement.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationDepositElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationDeposit);
    this.accumulationInvestElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationInvestment);
  }
}
