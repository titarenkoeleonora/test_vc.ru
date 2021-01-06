const DEPOSIT_PERCENT = 0.0698;
const INVESTMENT_PERCENT_YEAR = 0.2397;
const MONTH_IN_YEAR = 12;

export const calculateDeposit = (payment) => {
  const firstYearAccumulation = payment * MONTH_IN_YEAR  + payment * MONTH_IN_YEAR * DEPOSIT_PERCENT;
  const secondYearAccumulation = (payment * MONTH_IN_YEAR + firstYearAccumulation) + (payment * MONTH_IN_YEAR + firstYearAccumulation) * DEPOSIT_PERCENT;
  const thirdYearAccumulation = Math.floor((payment * MONTH_IN_YEAR + secondYearAccumulation) + (payment * MONTH_IN_YEAR + secondYearAccumulation) * DEPOSIT_PERCENT);


  return thirdYearAccumulation;
};

export const calculateInvestment = (payment) => {
  const firstYearAccumulation = payment * MONTH_IN_YEAR + payment * MONTH_IN_YEAR * INVESTMENT_PERCENT_YEAR;
  const secondYearAccumulation = (payment * MONTH_IN_YEAR + firstYearAccumulation) + (payment * MONTH_IN_YEAR + firstYearAccumulation) * INVESTMENT_PERCENT_YEAR;
  const thirdYearAccumulation = Math.floor((payment * MONTH_IN_YEAR + secondYearAccumulation) + (payment * MONTH_IN_YEAR + secondYearAccumulation) * INVESTMENT_PERCENT_YEAR);


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


