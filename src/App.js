import './App.css';
import { useEffect, useState } from "react";

//Author: Viraj Patel

function App() {
    let INVALID_VALUE = -1
    let MIDNIGHT = 0
    const [startTime, setStartTime] = useState("17:00");
    const [endTime, setEndTime] = useState("04:00");
    const [bedTime, setBedTime] = useState("20:00");
    const [startTimeHour, setStartTimeHour] = useState(17); //17:00
    const [endTimeHour, setEndTimeHour] = useState(4); //04:00
    const [bedTimeHour, setBedTimeHour] = useState(20); //20:00
    const [value, setValue] = useState("1")
    const [pay, setPay] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        reloadPay()
    })

    /*
    Requirements:
        - starts no earlier than 5:00PM
        - leaves no later than 4:00AM
        - gets paid $12/hour from start-time to bedtime
        - gets paid $8/hour from bedtime to midnight
        - gets paid $16/hour from midnight to end of job
        - gets paid for full hours (no fractional hours)
    Updates the total pay on ui change
    */
    const reloadPay = () => {
        let startToBed = calculatePay(startTimeHour, bedTimeHour, 12)
        let bedToMid = calculatePay(bedTimeHour, MIDNIGHT, 8)
        let midToEnd = calculatePay(MIDNIGHT, endTimeHour, 16)
        setPay(parseInt(value) * (startToBed + bedToMid + midToEnd))
    }

    /*
    Required Parameters:
    1) start(int) - start time
    2) end(int) - end time
    3) amount(int) - hourly rate
    Returns total pay for the time range in int
     */
    const calculatePay = (start, end, amount) => {
        if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(amount))
            return INVALID_VALUE
        let tempRange = end - start
        return tempRange > 0 ? tempRange * amount : INVALID_VALUE
    }

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

    return (
        <div className="App">
            <h1>Babysitter Calculator</h1>
            <h4>Viraj Patel - <a href="https://github.com/viraj325">GitHub</a></h4>
            <p>How many nights?</p>
            <input
                type="text"
                value={ value }
                placeholder="#"
                onChange={ e => {
                    setValue(e.target.value)
                    if (e.target.value.length > 0)
                        reloadPay()
                }}/>
            <p><i><u>Shift has to start by 5PM and end by 4AM</u></i></p>
            <h3>Start Time</h3>
            <input
                type="time"
                onChange={ ev => {
                    let tempHour = parseHour(ev.target.value)
                    console.log("start:" + tempHour)
                    if (17 <= tempHour && tempHour <= 23) {
                        setStartTime(ev.target.value)
                        setStartTimeHour(tempHour)
                        console.log("Selected Start Time: " + startTime)
                        reloadPay()
                        setErrorMessage("")
                    } else
                        setErrorMessage("Selected start time is out of range.")
                }}
                step="60"
                value={ startTime }/>
            <h3>End Time</h3>
            <input
                type="time"
                onChange={ ev => {
                    let tempHour = parseHour(ev.target.value)
                    console.log("end:" + tempHour)
                    if (0 <= tempHour && tempHour <= 4) {
                        setEndTime(ev.target.value)
                        setEndTimeHour(tempHour)
                        console.log("Selected End Time: " + endTime)
                        reloadPay()
                        setErrorMessage("")
                    } else
                        setErrorMessage("Selected end time is out of range.")
                }}
                step="60"
                value={ endTime }/>
            <h3>Bed Time</h3>
            <input
                type="time"
                onChange={ ev => {
                    let tempHour = parseHour(ev.target.value)
                    console.log("bed:" + tempHour)
                    console.log("bed - start = " + startTimeHour + " end = " + endTimeHour)
                    if (startTimeHour < tempHour || tempHour < endTimeHour) {
                        setBedTime(ev.target.value)
                        setBedTimeHour(parseHour(ev.target.value))
                        console.log("Selected Bed Time: " + bedTime)
                        reloadPay()
                        setErrorMessage("")
                    } else
                        setErrorMessage("Bed time has to be between start and end time.")
                }}
                step="60"
                value={ bedTime }/>
            <p>You're pay will be ${ pay } for { value } nights</p>
            {
                errorMessage.length > 0 ? <p>{errorMessage}</p> : null
            }
        </div>
    );
}

export default App;
