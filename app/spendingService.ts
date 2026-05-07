type SpendParams = {
  pocketId: string;
  categoryName: string;
  amount: number;
  dailyLimit: number;
  trackSpending: any;
};

export const addSpending = ({
  pocketId,
  categoryName,
  amount,
  dailyLimit,
  trackSpending,
}: SpendParams) => {
  return trackSpending(pocketId, categoryName, amount, dailyLimit);
};