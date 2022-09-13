const about = document.querySelector("#about");

const fname = document.querySelector("#fName");
const lname = document.querySelector("#lName");
const email = document.querySelector("#email");

const myTable = document.querySelector("#myTable");

let today = new Date().toISOString().slice(0, 10);
let time = new Date().toISOString().slice(11, 19);

if (!localStorage.script) {
    localStorage.script = JSON.stringify(
        [
            {
                "firstName": "First Name",
                "lastName": "Last Name",
                "email": "Email",
                "created": "Created At"
            },
            {
                "firstName": "Joe",
                "lastName": "Montana",
                "email": "joe@email.com",
                "created": `${today} ${time}`,
            }
        ]
    )
}

let persons = JSON.parse(localStorage.script);
generateTable(myTable, persons);

function addRowListeners() {
    const trs = document.querySelectorAll("#myTable tr");

    trs.forEach(item => item.addEventListener('mouseover', function () {
        about.innerHTML = `User: ${this.cells[0].innerHTML} ${this.cells[1].innerHTML}\n\n` +
            `Email: ${this.cells[2].innerHTML}` +
            `\n\nCreated at: ${this.cells[3].innerHTML} `;
    }));
    
    trs.forEach(item => item.addEventListener('click', function () {
        window.open(`mailto:${this.cells[2].innerHTML}`);
    }));
}
function submitter() {
    persons.push({ "firstName": fname.value, "lastName": lname.value, "email": email.value, "created": `${today} ${time}` });
    localStorage.script = JSON.stringify(persons);
    generateTable(myTable, persons);
}

function generateTable(table, data) {
    table.innerHTML = "";
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
    addRowListeners();
}