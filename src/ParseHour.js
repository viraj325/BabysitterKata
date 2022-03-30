/*
Required Parameters:
1) time(string)
Returns the hour in int
ex. "11:00" -> 11
*/
const parseHour = (time) => {
    // the minutes don't matter since the user will be getting paid hourly
    return parseInt(time.split(":")[0])
}

module.exports = parseHour;