import "../scss/style.scss";
import Calculator from "./calculator";
import {getStatisticsBackground} from "./utils";

const amountRange = document.querySelector(".amount-choice__input");
const finalScreen = document.querySelector(".final-screen");
const amountText = document.querySelector(".amount-result__text-money");
const inputBubble = document.querySelector(".amount-choice__input-bubble");

const statisticScreen = document.querySelector(".statistics__average");
const statisticOpenButton = document.querySelector(".statistics__open-button");

const amountCalculations = document.querySelector(".amount-result__calculation");
const accumulationText = document.querySelector(".amount-result__accumulation");
const accumulationDepositText = document.querySelector(".amount-result__accumulation-deposit");
const accumulationInvestmentText = document.querySelector(".amount-result__accumulation-investment");

const detailedDescriptionButtons = document.querySelectorAll(".amount-result__detailed-description-button");
const detailedDescriptions = document.querySelectorAll(".amount-result__detailed-description");

const styleElem = document.head.appendChild(document.createElement("style"));

const calculator = new Calculator(amountRange, amountText, inputBubble, amountCalculations, accumulationText, accumulationDepositText, accumulationInvestmentText);

const amountChangeHandler = () => {
  calculator.renderInfo();
  finalScreen.classList.add("final-screen--active");
  calculator.renderCoins();

  setTimeout(() => {
    finalScreen.scrollIntoView({block: "start", behavior: "smooth"});
  }, 1000);
};

const amountInputHandler = () => {
  const inputProgressOffset = 501;
  inputBubble.classList.remove("visually-hidden");
  inputBubble.innerHTML = `${new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(amountRange.value)}&nbsp;&#8381;`;
  calculator.moveBubble();
  styleElem.innerHTML = `.amount-choice__input:before {width: ${amountRange.value / inputProgressOffset}%;`;
};

amountRange.addEventListener("change", amountChangeHandler);
amountRange.addEventListener("input", amountInputHandler);

const statisticOpenHandler = () => {
  getStatisticsBackground();
  statisticScreen.classList.toggle("statistics__average--active");
  statisticOpenButton.classList.toggle("statistics__open-button--active");
  setTimeout(() => {
    statisticScreen.scrollIntoView({block: "start", behavior: "smooth"});
  }, 200);

  statisticOpenButton.innerHTML === "Свернуть" ?
    statisticOpenButton.innerHTML = "А как в среднем у читателей vc.ru?" : statisticOpenButton.innerHTML = "Свернуть";
};
statisticOpenButton.addEventListener("click", statisticOpenHandler);

const windowClickHandler = (evt) => {
  Array.from(detailedDescriptions).forEach((description) => {
    if (!evt.target.classList.contains("amount-result__detailed-description-button") && !evt.target.classList.contains("amount-result__detailed-description")) {
      console.log(evt.target)
      description.classList.add("visually-hidden");
    }
  });
};

const detailedClickHandler = (evt) => {
  const buttonType = evt.target.dataset.type;
  const detailedDescriptionsArray = Array.from(detailedDescriptions);

  switch (buttonType) {
    case "accumulation":
      detailedDescriptionsArray.map((detailedDescription) => {
        detailedDescription.dataset.type === "accumulation" ? detailedDescription.classList.toggle("visually-hidden") : "";
        detailedDescription.dataset.type !== "accumulation" && !detailedDescription.classList.contains("visually-hidden") ? detailedDescription.classList.toggle("visually-hidden") : "";
      });
      break;
    case "deposit":
      detailedDescriptionsArray.map((detailedDescription) => {
        detailedDescription.dataset.type === "deposit" ? detailedDescription.classList.toggle("visually-hidden") : "";
        detailedDescription.dataset.type !== "deposit" && !detailedDescription.classList.contains("visually-hidden") ? detailedDescription.classList.add("visually-hidden") : "";
      });
      break;
    case "investment":
      detailedDescriptionsArray.map((detailedDescription) => {
        detailedDescription.dataset.type === "investment" ? detailedDescription.classList.toggle("visually-hidden") : "";
        detailedDescription.dataset.type !== "investment" && !detailedDescription.classList.contains("visually-hidden") ? detailedDescription.classList.add("visually-hidden") : "";
      });
      break;
    default:
      return;
  }

  window.addEventListener("click", windowClickHandler);
};

Array.from(detailedDescriptionButtons).map((button) => {
  button.addEventListener("click", detailedClickHandler);
});

