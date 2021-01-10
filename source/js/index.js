import smoothscroll from "smoothscroll-polyfill";
import "../scss/style.scss";
import Calculator from "./calculator";
import {formatNumber, getStatisticsBackground, toggleDetailedDescription} from "./utils/utils";
import {accumulationType, inputProgressOffset} from "./utils/constants";

smoothscroll.polyfill();

const amountRangeElement = document.querySelector(".amount-choice__input");
const finalScreenElement = document.querySelector(".final-screen");
const amountTextElement = document.querySelector(".amount-result__text-money");
const inputBubbleElement = document.querySelector(".amount-choice__input-bubble");
const statisticScreenElement = document.querySelector(".statistics__average");
const statisticOpenButtonElement = document.querySelector(".statistics__open-button");
const amountCalculationsElement = document.querySelector(".amount-result__calculation");
const accumulationTextElement = document.querySelector(".amount-result__accumulation");
const amountResultItemElement = document.querySelector(".amount-result__calculation-item");
const accumulationDepositTextElement = document.querySelector(".amount-result__accumulation-deposit");
const accumulationInvestmentTextElement = document.querySelector(".amount-result__accumulation-investment");
const detailedDescriptionButtonsElement = document.querySelectorAll(".amount-result__detailed-description-button");
const detailedDescriptionsElement = document.querySelectorAll(".amount-result__detailed-description");
const coinsWrapperElement = document.querySelectorAll(".amount-result__coins-wrapper")

const styleElement = document.head.appendChild(document.createElement("style"));

const calculator = new Calculator(amountRangeElement, amountTextElement, inputBubbleElement, amountCalculationsElement, amountResultItemElement, accumulationTextElement, accumulationDepositTextElement, accumulationInvestmentTextElement, coinsWrapperElement);

const amountChangeHandler = () => {
  calculator.renderInfo();
  finalScreenElement.classList.add("final-screen--active");

  setTimeout(() => {
    finalScreenElement.scrollIntoView({block: "start", behavior: "smooth"});
  }, 1000);
};

const amountInputHandler = () => {
  inputBubbleElement.classList.remove("visually-hidden");
  inputBubbleElement.innerHTML = `${formatNumber(amountRangeElement.value)}&nbsp;&#8381;`;
  calculator.moveBubble();
  styleElement.innerHTML = `.amount-choice__input:before {width: ${amountRangeElement.value / inputProgressOffset}%;`;
};

amountRangeElement.addEventListener("change", amountChangeHandler);
amountRangeElement.addEventListener("input", amountInputHandler);

const statisticOpenHandler = () => {
  getStatisticsBackground();
  statisticScreenElement.classList.toggle("statistics__average--active");
  statisticOpenButtonElement.classList.toggle("statistics__open-button--active");
  setTimeout(() => {
    statisticScreenElement.scrollIntoView({block: "start", behavior: "smooth"});
  }, 200);

  statisticOpenButtonElement.innerHTML === "Свернуть" ?
    statisticOpenButtonElement.innerHTML = "А как в среднем у читателей vc.ru?" : statisticOpenButtonElement.innerHTML = "Свернуть";
};

statisticOpenButtonElement.addEventListener("click", statisticOpenHandler);

const windowClickHandler = (evt) => {
  Array.from(detailedDescriptionsElement).forEach((description) => {
    if (!evt.target.classList.contains("amount-result__detailed-description-button") && !evt.target.classList.contains("amount-result__detailed-description")) {
      description.classList.add("visually-hidden");
    }
  });
};

const detailedClickHandler = (evt) => {
  const buttonType = evt.target.dataset.type;
  const detailedDescriptionsArray = Array.from(detailedDescriptionsElement);

  switch (buttonType) {
    case accumulationType.ACCUMULATION:
      toggleDetailedDescription(accumulationType.ACCUMULATION, detailedDescriptionsArray);
      break;
    case accumulationType.DEPOSIT:
      toggleDetailedDescription(accumulationType.DEPOSIT, detailedDescriptionsArray);
      break;
    case accumulationType.INVESTMENT:
      toggleDetailedDescription(accumulationType.INVESTMENT, detailedDescriptionsArray);
      break;
    default:
      return;
  }

  window.addEventListener("click", windowClickHandler);
};

Array.from(detailedDescriptionButtonsElement).forEach(button => {
  button.addEventListener("click", detailedClickHandler);
});

