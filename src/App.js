import './App.css';
import { useEffect, useState } from "react";
const parseHour = require("./ParseHour")
const calculatePay = require("./CalculatePay")

//Author: Viraj Patel

function App() {
    let MIDNIGHT_ZERO = 0
    let MIDNIGHT_TWENTY_FOUR = 24
    const [startTime, setStartTime] = useState("17:00");
    const [endTime, setEndTime] = useState("04:00");
    const [bedTime, setBedTime] = useState("20:00");
    const [startTimeHour, setStartTimeHour] = useState(17); //17:00
    const [endTimeHour, setEndTimeHour] = useState(4); //04:00
    const [bedTimeHour, setBedTimeHour] = useState(20); //20:00
    const [value, setValue] = useState("1")
    const [pay, setPay] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    //Bottom state variables are just for extra information and aren't necessary for the program to function.
    const [startBedPay, setStartBedPay] = useState(null);
    const [bedMidPay, setBedMidPay] = useState(null);
    const [midEndPay, setMidEndPay] = useState(null);

    useEffect(() => { reloadPay() })

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
        let bedToMid = calculatePay(bedTimeHour, MIDNIGHT_TWENTY_FOUR, 8)
        let midToEnd = calculatePay(MIDNIGHT_ZERO, endTimeHour, 16)
        setStartBedPay(parseInt(value) * startToBed)
        setBedMidPay(parseInt(value) * bedToMid)
        setMidEndPay(parseInt(value) * midToEnd)
        setPay(parseInt(value) * (startToBed + bedToMid + midToEnd))
    }

    return (
        <div className="App">
            <h1>Babysitter Calculator</h1>
            <h4>Viraj Patel - <a href="https://github.com/viraj325/babysitter_kata">GitHub</a></h4>
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
            <h3><u>Pay Break-Down:</u></h3>
            <p>Start to Bedtime($12/hr) = ${ startBedPay }</p>
            <p>Bedtime to Midnight($8/hr) = ${ bedMidPay }</p>
            <p>Midnight to End($16/hr) = ${ midEndPay }</p>
            <h3><b>Your pay will be ${ pay } for { value } night(s)</b></h3>
            {
                errorMessage.length > 0 ? <p>{ errorMessage }</p> : null
            }
        </div>
    );
}

export default App;