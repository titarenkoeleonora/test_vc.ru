import {Time} from "./constants";

export const calculateAccumulation = (payment, accumulationType) => {
  const firstYearAccumulation = payment * Time.MONTH_IN_YEAR  + payment * Time.MONTH_IN_YEAR * accumulationType;
  const secondYearAccumulation = (payment * Time.MONTH_IN_YEAR + firstYearAccumulation) + (payment * Time.MONTH_IN_YEAR + firstYearAccumulation) * accumulationType;
  const thirdYearAccumulation = Math.floor((payment * Time.MONTH_IN_YEAR + secondYearAccumulation) + (payment * Time.MONTH_IN_YEAR + secondYearAccumulation) * accumulationType);

  return thirdYearAccumulation;
};

export const getStatisticsBackground = () => {
  const statisticsValueWrapper = document.querySelector(".statistics__average-value")
  const statisticsValueElement = document.querySelector(".statistics__value");

  const statisticsValue = statisticsValueElement.innerHTML.replace(/(\b)(?= \d) /g, '');

  switch (true) {
    case statisticsValue <= 10999:
      statisticsValueWrapper.style.backgroundImage = "url('../images/money1.png')";
      break;
    case statisticsValue >= 11000 && statisticsValue <= 20999:
      statisticsValueWrapper.style.backgroundImage = "url('../images/money2.png')";
      break;
    case statisticsValue >= 21000 && statisticsValue <= 30999:
      statisticsValueWrapper.style.backgroundImage = "url('../images/money3.png')";
      break;
    case statisticsValue >= 31000 && statisticsValue <= 40999:
      statisticsValueWrapper.style.backgroundImage = "url('../images/money4.png')";
      break;
    case statisticsValue >= 41000 && statisticsValue <= 50000:
      statisticsValueWrapper.style.backgroundImage = "url('../images/money5.png')";
      break;
    default:
      return;
  }
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('ru-RU',{useGrouping: true}).format(number);
};

export const toggleDetailedDescription = (type, detailedDescriptionsArray) => {
  detailedDescriptionsArray.forEach((detailedDescription) => {
    detailedDescription.dataset.type === type ? detailedDescription.classList.toggle("visually-hidden") : "";
    detailedDescription.dataset.type !== type && !detailedDescription.classList.contains("visually-hidden") ? detailedDescription.classList.add("visually-hidden") : "";
  });
}
