/* Global Variables */

const apiKey = "&appid=44a5097b358d269d0583be30ffc31f90&units=imperial";
const apiUrl = "http://localhost:5500/";
const zipCodeElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerate);

/** Post Data To API */
function onGenerate() {
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsElement.value,
        date: newDate
    }
    console.log(data);
    //Post Data To Api For Get Zip Code Information
    getZipCodeInfo(data.zipCode).then(zipInfo => {
        //Return Message If City Is Not Found
        if (zipInfo.cod != 200)
            return zipInfo.message
        else {
            //Now Post Data To Server For Saving And Display In Holder Section
            data.temp = zipInfo.list[0].main.temp;
            postDateToServer(data);
        }
    });
};



/** Get Zip Code Information From Api */
async function getZipCodeInfo(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}

/** Post Data To Server For Saving  */
async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            console.log(response.message);
            return;
        }
        response.json().then(data => {
            if (response.ok)
            //Update UI Now
                updateUI();
            else
                alert('Process Not Successfuly');
        })

    } catch (error) {
        console.log(error)
    }
}

/** Update UI */
async function updateUI() {
    let response = await fetch(`${apiUrl}all`);
    try {
        response.json().then(data => {
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML = `Temp Is: ${data.temp}`;
            contentElement.innerHTML = `My Feelings Is: ${data.content}`;
        })
    } catch (error) {
        console.log(error)
    }
}


