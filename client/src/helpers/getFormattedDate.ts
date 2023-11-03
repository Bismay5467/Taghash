const getFormattedDate = () => {
  const maxDate = new Date();
  const formattedMaxDate = maxDate.toISOString().split("T")[0];
  const minDate = new Date(maxDate);
  minDate.setFullYear(minDate.getFullYear() - 100);
  minDate.setMonth(0);
  minDate.setDate(1);
  const formattedMinDate = minDate.toISOString().split("T")[0];

  return {
    formattedMaxDate,
    formattedMinDate,
  };
};

export default getFormattedDate;
