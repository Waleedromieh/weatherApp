let todayName = document.getElementById("today_date_day_name");
let todayNumber = document.getElementById("today_date_day_number");
let todaymonth=document.getElementById('today_month')
let todaylocation = document.getElementById("location");
let todayDateTemp = document.getElementById("today_date_day_temp");
let todayImage = document.getElementById("todayIMg");
let todayWeather = document.getElementById("today_date_day_hala");
let todayHumidity=document.getElementById('today_date_humidity');
let windspeed=document.getElementById('today_date_windspeed');
let winddirection=document.getElementById('today_date_winddirection');
//=======================================
//================tomorow=====================================
let tomorowName = document.getElementById("tomoro_date_day_name");
let tomorowimg = document.getElementById("tomorow_heat");
let tomorowtemp_day = document.getElementById("tomoro_temp_day");
let tomorowtemp_night = document.getElementById("tomoro_temp_night");
let tomoro_hala = document.getElementById("tomoro_hala");
// ===========================================================
//=============================the day after==================
let dayAfterDateDayname = document.getElementById("day_after_date_day_name");
let dayAfterDateDayimg = document.getElementById("day_after_date_day_img");
let day_after_date_day_degree = document.getElementById("day_after_date_day_degree");
let day_after_date_day_night = document.getElementById("day_after_date_day_night");
let day_after_date_day_7ala = document.getElementById("day_after_date_day_7ala");

//=======================================================
searchInput= document.getElementById("search");
// https://api.weatherapi.com/v1/forecast.json?key=9f1606d0d1614585886215310230203&q=london&days=3//
//=======================================================
//fetch api

async  function getweatherData(cityName){
    let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9f1606d0d1614585886215310230203&q=${cityName}&days=3`);
    //
  let weatherData= await weatherResponse.json()
 
  return weatherData
}
// =================================================

function displayTodaydata(data){
  let todayDate= new Date()

  todayName.innerHTML=todayDate.toLocaleDateString('en-US',{weekday:'long'})
  todayNumber.innerHTML=todayDate.getDate()
  todaymonth.innerHTML=todayDate.toLocaleDateString('en-US',{month:'long'})
  todaylocation.innerHTML=data.location.name
  todayDateTemp.innerHTML=data.current.temp_c
  todayImage.setAttribute("src",data.current.condition.icon)
  todayWeather.innerHTML=data.current.condition.text
  todayHumidity.innerHTML=data.current.humidity+'%';
  windspeed.innerHTML=data.current.wind_kph+'Km/h';
  winddirection.innerHTML=data.current.wind_dir
}




// =====================================================
function displaytomorowdata(data){
  let nextDate= new Date(data.forecast.forecastday[1].date)
  tomorowName.innerHTML=nextDate.toLocaleDateString('en-US',{weekday:'long'})


  tomorowimg.setAttribute("src",data.forecast.forecastday[1].day.condition.icon)
  tomorowtemp_day.innerHTML=data.forecast.forecastday[1].day.maxtemp_c
  tomorowtemp_night.innerHTML=data.forecast.forecastday[1].day.mintemp_c
  tomoro_hala.innerHTML=data.forecast.forecastday[1].day.condition.text
}



// ======================================================
function displaydayafter(data){
let nextDate=new Date(data.forecast.forecastday[2].date)
dayAfterDateDayname.innerHTML=nextDate.toLocaleDateString('en-US',{weekday:'long'})


  dayAfterDateDayimg.setAttribute("src",data.forecast.forecastday[2].day.condition.icon)
  day_after_date_day_degree.innerHTML=data.forecast.forecastday[2].day.maxtemp_c
  day_after_date_day_night.innerHTML=data.forecast.forecastday[2].day.mintemp_c
  day_after_date_day_7ala.innerHTML=data.forecast.forecastday[2].day.condition.text
}





// ===============================================================
async function startApp(city='paris'){
  let weatherdata= await  getweatherData(city);
  if(!weatherdata.error){
    displayTodaydata(weatherdata)
    displaytomorowdata(weatherdata)
    displaydayafter(weatherdata)
  }
   


}
startApp()


searchInput.addEventListener('input',function(){
  startApp(searchInput.value)
})
