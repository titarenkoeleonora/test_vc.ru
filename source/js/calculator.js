import {calculateDeposit} from "./utils";
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

    this.bubbleOffset = 680;
  }

  // formatNumber(number) {
  //   this.formattedAmount = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(number);
  // }

  moveBubble() {
    this.inputBubble.style.left = this.inputRange.value / this.bubbleOffset + "%";
  }

  calculate() {
    this.accumulation = 36 * this.inputRange.value;
    this.accumulationDeposit = calculateDeposit(this.inputRange.value);
    // this.accumulationInvestment = Math.floor(this.inputRange.value + (this.inputRange.value * 0,7121));
  }

  renderInfo() {
    this.calculate();
    this.amountText.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.inputRange.value);
    this.accumulationElement.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationDepositElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationDeposit);
    this.accumulationInvestElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
  }
}
