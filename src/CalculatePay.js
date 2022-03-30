/*
Required Parameters:
1) start(int) - start time
2) end(int) - end time
3) amount(int) - hourly rate
Returns total pay for the time range in int
*/
const calculatePay = (start, end, amount) => { return (end - start) * amount }
module.exports = calculatePay;