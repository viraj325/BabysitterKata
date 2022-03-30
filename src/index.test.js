const parseHour = require("./ParseHour")
const calculatePay = require("./CalculatePay")

//Couple of test cases to make sure the functions work as inteded

test("Calculate Pay Test #1", () => {
    expect(calculatePay(17, 23, 12)).toBe(72);
});

test("Parse Hour Test #1", () => {
    expect(parseHour("11:00")).toBe(11);
});

test("Parse Hour Test #2", () => {
    expect(parseHour("08:45")).toBe(8);
});