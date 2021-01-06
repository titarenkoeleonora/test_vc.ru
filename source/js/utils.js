const DEPOSIT_PERCENT = 0.0698;
const MONTH_IN_YEAR = 12;

export const calculateDeposit = (payment) => {
  const firstYearAccumulation = payment * MONTH_IN_YEAR  + payment * MONTH_IN_YEAR * DEPOSIT_PERCENT;
  const secondYearAccumulation = (payment * MONTH_IN_YEAR + firstYearAccumulation) + (payment * MONTH_IN_YEAR + firstYearAccumulation) * DEPOSIT_PERCENT;
  const thirdYearAccumulation = Math.floor((payment * MONTH_IN_YEAR + secondYearAccumulation) + (payment * MONTH_IN_YEAR + secondYearAccumulation) * DEPOSIT_PERCENT);


  return thirdYearAccumulation;
};
