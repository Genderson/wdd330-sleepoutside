// References used for help with working with retrieving JSON:
// https://byui-cse.github.io/wdd230-course/lesson09/aa-json.html
// https://byui-cse.github.io/wdd230-course/lesson09/fetch.html

const pathForAlertsJsonFile = "public/json/alerts.json";

getAlerts();

async function getAlerts() {
    const response = await fetch(pathForAlertsJsonFile);
    const alertsData = await response.json();
    // console.log(alertsData);
    displayAlerts(alertsData);
}

const main = document.querySelector("main");

const displayAlerts = (alertsData) => {
    let section = document.createElement("section");

    // Reference on how to add a class in DOM: https://www.w3schools.com/howto/howto_js_add_class.asp
    section.classList.add("alert-list");

    alertsData.forEach((alert) => {
        let p = document.createElement("p");
        p.textContent = alert.message;
        p.style.background = alert.background;       
        p.style.color = alert.color;

        const deleteButton = document.createElement('button');    
        deleteButton.textContent = '❌';
        p.append(deleteButton);
        deleteButton.addEventListener('click', function() {
            section.removeChild(p);
        });        

        section.append(p);
    });

    // Reference on how to prepend to main element: https://javascript.info/modifying-document
    main.prepend(section);
}