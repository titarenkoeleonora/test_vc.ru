import "../scss/style.scss";
import {calculateDeposit} from "./utils";

class Calculator {
  constructor(inputRange, amount, amountCalculations, accumulationElement, accumulationDepositElem, accumulationInvestElem) {
    this.inputRange = inputRange;
    this.amountText = amount;
    this.amountCalculations = amountCalculations;
    this.accumulationElement = accumulationElement;
    this.accumulationDepositElem = accumulationDepositElem;
    this.accumulationInvestElem = accumulationInvestElem;
    this.accumulation = null;
    this.accumulationDeposit = null;
    this.accumulationInvestment = null;
  }

  // formatNumber(number) {
  //   this.formattedAmount = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(number);
  // }

  calculate() {
    this.accumulation = 36 * this.inputRange.value;
    // this.accumulationDeposit = calculateDeposit(this.inputRange.value);
    // this.accumulationInvestment = Math.floor(this.inputRange.value + (this.inputRange.value * 0,7121));
  }

  renderInfo() {
    this.calculate();
    this.amountText.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.inputRange.value);
    this.accumulationElement.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationDepositElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    this.accumulationInvestElem.innerHTML = new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation);
    console.log(this.accumulationElement, this.accumulationDepositElem, this.accumulationInvestElem);
    console.log(new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(this.accumulation))
  }
}

const amountRange = document.querySelector(".amount-choice__input");
const finalScreen = document.querySelector(".final-screen");
const amountText = document.querySelector(".amount-result__text-money");

const statisticScreen = document.querySelector(".statistics__average");
const statisticOpenButton = document.querySelector(".statistics__open-button");

const amountCalculations = document.querySelectorAll(".amount-result__calculation");
const accumulationText = document.querySelectorAll(".amount-result__accumulation");
const accumulationDepositText = document.querySelectorAll(".amount-result__accumulation-deposit");
const accumulationInvestmentText = document.querySelectorAll(".amount-result__accumulation-investment");

const calculator = new Calculator(amountRange, amountText, amountCalculations, accumulationText, accumulationDepositText, accumulationInvestmentText);

const amountChangeHandler = () => {
  calculator.renderInfo();
  finalScreen.classList.add("final-screen--active");
};

amountRange.addEventListener("change", amountChangeHandler);

const statisticOpenHandler = () => {
  statisticScreen.classList.toggle("statistics__average--active");
};

statisticOpenButton.addEventListener("click", statisticOpenHandler);
