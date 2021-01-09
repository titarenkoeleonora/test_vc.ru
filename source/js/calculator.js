
import {calculateDeposit, calculateInvestment} from "./utils/utils";
export default class Calculator {
  constructor(inputRange, amount, inputBubble, amountCalculations, amountResultItem, accumulationElement, accumulationDepositElem, accumulationInvestElem, coinsWrapperElement) {
    this.inputRange = inputRange;
    this.amountText = amount;
    this.inputBubble = inputBubble;
    this.amountCalculations = amountCalculations;
    this.accumulationElement = accumulationElement;
    this.accumulationDepositElem = accumulationDepositElem;
    this.accumulationInvestElem = accumulationInvestElem;
    this.amountResultItem = amountResultItem;
    this.coinsWrapperElement = coinsWrapperElement;

    this.accumulation = null;
    this.accumulationDeposit = null;
    this.accumulationInvestment = null;
    this.newBubblePoint = null;
    this.newBubblePlace = null;
    this.maxAccumulation = null;
    this.accumulationStep = null;
    this.coinsCount = null;
    this.coins = null;
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

  calculateCoinsCount() {
    this.maxAccumulation = this.inputRange.max * 36;
    this.accumulationStep = this.maxAccumulation / 10;
    this.coinsCount = Math.ceil(this.accumulation / this.accumulationStep)
  }

  renderCoins() {
    this.calculateCoinsCount();
    this.coins = "";

    Array.from(this.coinsWrapperElement).map((coinWrapper) => coinWrapper.innerHTML = "");

    for (let i = 0; i <= this.coinsCount; i++) {
      this.coins = this.coins + "<div class='amount-result__coin'></div>"
      console.log(this.coins)
    }

    Array.from(this.coinsWrapperElement).map((coinWrapper) => {
      coinWrapper.insertAdjacentHTML("beforeend", this.coins);
    });
  }

  renderInfo() {
    this.calculate();
    this.renderCoins();
    this.amountText.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.inputRange.value);
    this.accumulationElement.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationDepositElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationDeposit);
    this.accumulationInvestElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulationInvestment);
  }
}
