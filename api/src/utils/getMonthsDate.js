export const getMonthsData = () => {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startsOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  return { startOfThisMonth, startsOfLastMonth };
};
