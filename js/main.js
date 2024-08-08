// Today

let todayName = document.getElementById("todayname")
let todayDate = document.getElementById("todaydate")
let todayMonth = document.getElementById("todaymonth")
let todayLocation = document.getElementById("todaylocation")
let todayImg = document.getElementById("todayImg")
let todayText = document.getElementById("todayText")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDir = document.getElementById("windDir")
let todayTemp = document.getElementById("todaytemp")



// Tomorrow
let TomorrowDay = document.getElementsByClassName("TomorrowDay")
let TomorrowImg = document.getElementsByClassName("TomorrowImg")
let TomorrowTempMax = document.getElementsByClassName("TomorrowTempMax")
let TomorrowTempMin = document.getElementsByClassName("TomorrowTempMin")
let TomorrowText = document.getElementsByClassName("TomorrowText")




// Search

let search = document.getElementById("search")

let date=new Date 




// fetch API data

async function getWeatherData(cityname) {
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityname}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

getWeatherData()



// Display Today
function DisplayTodayData(Data) {

    let todayData=new Date

    todayName.innerHTML=todayData.toLocaleDateString("en-us",{weekday:"long"})
    todayDate.innerHTML=todayData.getDate()
    todayMonth.innerHTML=todayData.toLocaleDateString("en-us",{month:"long"})
    todayLocation.innerHTML = Data.location.name
    todayTemp.innerHTML = Data.current.temp_c
    todayText.innerHTML = Data.current.condition.text
    todayImg.setAttribute("src",Data.current.condition.icon)
    humidity.innerHTML = Data.current.humidity + "%"
    wind.innerHTML = Data.current.wind_kph + "km/h"
    windDir.innerHTML = Data.current.wind_dir


}

// Display Tomorrow
function displayTomorrow(Data) {
    let forecastData = Data.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let nextDate=new Date(forecastData[i+1].date)
        TomorrowDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        TomorrowTempMax[i].innerHTML = forecastData[i+1].day.maxtemp_c
        TomorrowTempMin[i].innerHTML = forecastData[i+1].day.mintemp_c
        TomorrowImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
        TomorrowText[i].innerHTML = forecastData[i+1].day.condition.text
    }
    
    // TomorrowTempMax.innerHTML = foreday.day.maxtemp_c

}

// Start
async function start(city="cairo") {
    let weatherData = await getWeatherData(city)
    DisplayTodayData(weatherData)
    displayTomorrow(weatherData)
}

start()

search.addEventListener("input",function(){
    start(search.value)
})


