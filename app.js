let src = document.querySelector(".srh-btn");
var inp = document.querySelector(".input");
inp.addEventListener("keyup", handleChange);
src.addEventListener("click", handleIp);
let lat = 37.40599;
let lng =  -122.078514;
let userInput ="";
let ipAddress = "";
function handleChange(e){
    userInput = e.target.value; 
    //console.log(userInput);
}

function ValidateIPaddress(val) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val))
  {
      //console.log("yes");
    ipAddress = userInput;
    return true;
  }
  //console.log("yes");
return false;
}

async function handleIp(e){
    e.preventDefault();
    if(ValidateIPaddress(userInput)){
        document.querySelector("main").style.display = "none";
        document.querySelector(".load-box").style.display = "block";
        let res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_VmIe7hWBPwf4TDdQYZbk0U6QAg0lW&ipAddress=${ipAddress}`)
        let data = await res.json();
        console.log(data);
        document.querySelector(".rslt-box").style.display = "flex";
        document.querySelector(".load-box").style.display = "none";
        document.querySelector("#ip").innerHTML = data.ip;
        document.querySelector("#location").innerHTML = (data.location.city ? data.location.city +", " : "") + (data.location.region ? data.location.region +", " : "") + data.location.country;
        document.querySelector("#utc").innerHTML = data.location.timezone ? "UTC " + data.location.timezone : "";
        document.querySelector("#isp").innerHTML = data.isp;
        lat = data.location.lat;
        lng = data.location.lng;
        userInput ="";
        inp.value = "";
        //var mymap = L.map('mapid').setView([lat, lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmFqYmluZGVyMDEiLCJhIjoiY2t1Y2lpOXVtMTB1aTJvbG1iemJjaWUxYSJ9.5uXxQ2oC0-SPlABx-lNPMg'
        }).addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);
        marker.bindPopup("IP Address<br><b>Located</b>").openPopup();
    }
    else{
        alert("You have entered an invalid IP address!");
        userInput ="";
        inp.value = "";
    }
    
}

var mymap = L.map('mapid').setView([lat, lng], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFqYmluZGVyMDEiLCJhIjoiY2t1Y2lpOXVtMTB1aTJvbG1iemJjaWUxYSJ9.5uXxQ2oC0-SPlABx-lNPMg'
}).addTo(mymap);
var marker = L.marker([lat, lng]).addTo(mymap);
marker.bindPopup("IP Address<br><b>Located</b>").openPopup();