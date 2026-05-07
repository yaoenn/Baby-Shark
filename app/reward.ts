export const getReward = (streak: number) => {
  if (streak === 3) return { type: 'cashback', value: 1 };
  if (streak === 7) return { type: 'Tealive voucher 🧋', value: 5 };
  if (streak === 14) return { type: 'voucher', value: 10 };
  return null;
};