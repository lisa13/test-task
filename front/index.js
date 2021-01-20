const options = {
    valueNames: [ 'name', 'born' ],
    // Since there are no elements in the list, this will be used as template.
    item: '<li><h3 class="name"></h3><p class="born"></p></li>'
};

const values = [
    {
        name: 'Jonny Strömberg',
        born: 1986
    },
    {
        name: 'Jonas Arnklint',
        born: 1985
    },
    {
        name: 'Martina Elm',
        born: 1986
    }
];

const userList = new List('users', options, values);

const element = document.getElementById('fetch-data');

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

element.addEventListener('click', async () => {
    const items = await postData('http://localhost:3000/api/main/items');
    console.log(items);
});

const switcher = document.getElementById("switcher");
const simpleFormSection = document.getElementById("simple-form-section");
const simpleChartSection = document.getElementById("simple-chart-section");
let simpleFormSectionIsActive = true;

simpleChartSection.setAttribute("style", "display: none;")

switcher.addEventListener('click', () => {
    if(simpleFormSectionIsActive) {
        simpleFormSection.setAttribute("style", "display: none;");
        simpleChartSection.setAttribute("style", "display: block;");
        simpleFormSectionIsActive = false;
    } else {
        simpleChartSection.setAttribute("style", "display: none;");
        simpleFormSection.setAttribute("style", "display: block;");
        simpleFormSectionIsActive = true;
    }
})