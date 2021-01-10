import {calculateAccumulation, formatNumber} from "./utils/utils";
import {
  bubbleFirstOffset,
  bubbleSecondOffset,
  coinStepNumber,
  DEPOSIT_PERCENT,
  inputOffset,
  INVESTMENT_PERCENT_YEAR,
  Time
} from "./utils/constants";

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
    this.coins = null;
    this.coinsCountArray = null;
  }

  moveBubble() {
    this.rangeMinValue = this.inputRange.min;
    this.rangeMaxValue = this.inputRange.max;
    this.newBubblePosition = Number(((this.inputRange.value - this.rangeMinValue) * inputOffset) / (this.rangeMaxValue - this.rangeMinValue));

    this.inputBubble.style.left = `calc(${this.newBubblePosition}% + (${bubbleFirstOffset - this.newBubblePosition * bubbleSecondOffset}px))`;
  }

  calculate() {
    this.accumulation = Time.THREE_YEARS_MONTH * this.inputRange.value;
    this.accumulationDeposit = calculateAccumulation(this.inputRange.value, DEPOSIT_PERCENT);
    this.accumulationInvestment = calculateAccumulation(this.inputRange.value, INVESTMENT_PERCENT_YEAR);
  }

  calculateCoinsCount() {
    this.maxAccumulation = this.inputRange.max * Time.THREE_YEARS_MONTH;
    this.accumulationStep = this.maxAccumulation / coinStepNumber;
    this.accumulationCoinsCount = Math.ceil(this.accumulation / this.accumulationStep);

    this.maxAccumulationDeposit = calculateAccumulation(this.inputRange.max, DEPOSIT_PERCENT);
    this.accumulationDepositStep = this.maxAccumulationDeposit / coinStepNumber;
    this.depositCoinsCount = Math.ceil(this.accumulationDeposit / this.accumulationDepositStep);

    this.maxAccumulationInvestment = calculateAccumulation(this.inputRange.max, INVESTMENT_PERCENT_YEAR);
    this.accumulationInvestmentStep = this.maxAccumulationInvestment / coinStepNumber;
    this.investmentCoinsCount = Math.ceil(this.accumulationInvestment / this.accumulationInvestmentStep);

    this.coinsCountArray.push(this.accumulationCoinsCount, this.depositCoinsCount, this.investmentCoinsCount);
  }

  renderCoins() {
    this.coins = ["", "", ""];
    this.coinsCountArray = [];
    this.calculateCoinsCount();

    Array.from(this.coinsWrapperElement).forEach((coinWrapper) => coinWrapper.innerHTML = "");

    this.coinsCountArray.map((coinsCount, index) => {
      for (let i = 0; i <= coinsCount; i++) {
        this.coins[index] = this.coins[index] + "<div class='amount-result__coin'></div>"
      }
    });

    console.log(this.coins)
    Array.from(this.coinsWrapperElement).forEach((coinWrapper, index) => {
      coinWrapper.insertAdjacentHTML("beforeend", this.coins[index]);
    });
  }

  renderInfo() {
    this.calculate();
    this.renderCoins();
    this.amountText.innerHTML = formatNumber(this.inputRange.value);
    this.accumulationElement.innerHTML = formatNumber(this.accumulation);
    this.accumulationDepositElem.innerHTML = formatNumber(this.accumulationDeposit);
    this.accumulationInvestElem.innerHTML = formatNumber(this.accumulationInvestment);
  }
}
