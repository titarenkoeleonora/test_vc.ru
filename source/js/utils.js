const DEPOSIT_PERCENT = 0.0698;
const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 365;

export const calculateDeposit = (payment) => {
  let calculation = 0;

  for(let i = 1; i <= 36; i++) {
    calculation = payment * 36 + ((payment * i) * DEPOSIT_PERCENT * (DAYS_IN_MONTH * i)) / DAYS_IN_YEAR;
    console.log(DAYS_IN_MONTH * i)
  }

  return calculation;
};
