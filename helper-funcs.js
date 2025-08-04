
const today = new Date();

function dateToSerial(date) {
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

function parseDateTime(dateStr, timeStr) {
    return new Date(dateStr + " " + timeStr);
}

const d = new Date();
const s = dateToSerial(d);
const d2 = new Date(s);
//console.log("Date is: " + d2);

function getInspectorName() {
    const name = document.getElementById("inspector").value;

    if (name === "") {
        return "";
    }
    else {
        return " (" + name + ")";
    }
}

function getSpeciesName() {
    return document.getElementById("species").value;
}

function getProducerName() {
    return document.getElementById("producer").value;
}

function getKillTime() {
    const dateElem = document.getElementById("startDate");
    const timeElem = document.getElementById("startTime");
    const birdCountElem = document.getElementById("birdCount");
    const lineSpeedElem = document.getElementById("lineSpeed");

    const dateStr = dateElem.value;
    const timeStr = timeElem.value;
    const birdCountStr = birdCountElem.value;
    const lineSpeedStr = lineSpeedElem.value;

    const birdCount = parseInt(birdCountStr);
    const lineSpeed = parseFloat(lineSpeedStr);

    const mins = birdCount / (lineSpeed);
    const totalMillis = mins * 60000;

    const str = dateStr + " " + timeStr;

    const date = new Date(str);

    const utc = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );

    const finalTime = utc + totalMillis;
    const finalDate = new Date(finalTime);

    return finalDate.getHours() + ":" + finalDate.getMinutes() + ":00";
}

function calcFwrTime(dateTimeStr) {


    const today = new Date();
    const todayDateStr = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

    const killEndTimeStr = "07:20:00";

    const killEnd = Date.parse(todayDateStr + " " + killEndTimeStr);

    //console.log("DATE: " + todayDateStr)
    //console.log("TIME: " + killEndTimeStr);

    const hoursDelay = (killEnd - dateTimeStr)/(1000 * 60 * 60);

    const roundedDelay = Math.round(hoursDelay * 100)/100;

    return roundedDelay;
}

function getTimeSinceFood() {
    const lastFoodDateElem = document.getElementById("lastFoodDate");
    const lastFoodTimeElem = document.getElementById("lastFoodTime");

    const lastFoodDateTime = Date.parse(lastFoodDateElem.value + " " + lastFoodTimeElem.value);

    return calcFwrTime(lastFoodDateTime);
}

function getTimeSinceWater() {
    const lastWaterDateElem = document.getElementById("lastWaterDate");
    const lastWaterTimeElem = document.getElementById("lastWaterTime");

    const lastWaterDateTime = Date.parse(lastWaterDateElem.value + " " + lastWaterTimeElem.value);

    return calcFwrTime(lastWaterDateTime);
}

const dateTag = "#TODAY";

const dayNames = [
    "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday",
    "Sunday"
];

const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
]

function getTodaysDate() {
    const today = new Date();
    year = today.getFullYear();
    monthNum = today.getMonth()+1;
    dayNum = today.getDate();

    month = monthNum < 10 ? "0" + monthNum : monthNum;
    day = dayNum < 10 ? "0" + dayNum : dayNum;

    const dt = year + "-" + month + "-" + day;
    return dt;
}

function getYesterdaysDate() {
    const today = new Date();
    const todaySerial = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getTimezoneOffset() / 60,
        0,
        0
    )

    const yesterdaySerial = todaySerial - 86400000;

    const yestderday = new Date(yesterdaySerial);

    //console.log(today);
    //console.log(yestderday);

    const yMonth = yestderday.getMonth() + 1;
    const yDay = yestderday.getDate();

    const monthStr = yMonth < 10 ? "0" + yMonth : yMonth;
    const dayStr = yDay < 10 ? "0" + yDay : yDay;

    return yestderday.getFullYear() + "-" + monthStr + "-" + dayStr;
}

function getDate() {
    year = today.getFullYear();
    month = today.getMonth();
    monthName = monthNames[month];
    day = today.getDate();
    dayName = dayNames[today.getDay() - 1];

    // Dayname is undefined below - why?
    return dayName + " " + monthName + " " + day + ", " + year;
}

function calcWeekNum(date) {
    // Determine the year
    const month = date.getMonth() + 1;

    var year = date.getFullYear();
    
    if (month < 4) {
        year = year - 1;
    }

    // Get the april first of the aforementioned year
    const yearStart = new Date(year, 3, 1);

    // Find the first monday of that year
    var mondayDate = yearStart;

    while (mondayDate.getDay() != 1) {
        mondayDate.setTime( mondayDate.getTime() + 86400000);
    }

    // Calculate the number of weeks since that Monday
    const weekNum = Math.round((date.getTime() - mondayDate.getTime()) / 604800000) +1;

    return weekNum;
}

function getWeekNum() {
    const dateStr = document.getElementById("date").value;
    const date = new Date(dateStr);
    return calcWeekNum(date);
}

function addMinutes(time, minutes) {
    const newDate = new Date(time.getTime() + minutes * 60000);
    return newDate;
}

function getTime(offset) {
    const timeStr = document.getElementById("time").value;
    const hr = parseInt(timeStr.substring(0,2));
    const min = parseInt(timeStr.substring(3,5));

    //console.log(hr);
    //console.log(min);

    const time = new Date(today.getFullYear(), today.getMonth(), today.getDay( ),
    hr, min);

    const minNum = time.getMinutes();
    let minStr = minNum + "";
    if (minNum < 10) {
        minStr = "0" + minNum;
    }
    
    if (offset === undefined) {
        return time.getHours() + ":" + minStr;
    }
    else {
        const d = addMinutes(time, offset);
        return d.getHours() + ":" + minStr;
    }
}

function setClipboard(elem) {
    if (elem === null) return;

    elem.style.background = selectedBackground;

    setTimeout(() => {
        elem.style.background = defaultBackground;
    }, colourTimeout);

    text = elem.value;
    navigator.clipboard.writeText(text);
}