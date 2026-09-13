function getGrade(marks) {

    if (marks >= 90) {
        return ["O", 10];
    }

    if (marks >= 80) {
        return ["A+", 9];
    }

    if (marks >= 70) {
        return ["A", 8];
    }

    if (marks >= 60) {
        return ["B+", 7];
    }

    if (marks >= 50) {
        return ["B", 6];
    }

    return ["RA", 0];
}


/* Show Grade */

function calculateGrade(input) {

    let row = input.parentElement.parentElement;

    let marks = Number(input.value);

    let grade = row.querySelector(".grade");
    let point = row.querySelector(".point");

    if (input.value === "") {
        grade.innerHTML = "-";
        point.innerHTML = "-";
        return;
    }

    if (marks < 0 || marks > 100) {
        grade.innerHTML = "Invalid";
        point.innerHTML = "-";
        return;
    }

    let result = getGrade(marks);

    grade.innerHTML = result[0];
    point.innerHTML = result[1];
}


/* Add Subject */

function addSubject() {

    let table = document.getElementById("subjectTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>
            <input type="text" placeholder="Subject">
        </td>

        <td>
            <input type="number"
                   class="marks"
                   min="0"
                   max="100"
                   oninput="calculateGrade(this)">
        </td>

        <td>
            <input type="number"
                   class="credit"
                   min="0"
                   step="0.5">
        </td>

        <td class="grade">-</td>

        <td class="point">-</td>
    `;
}


/* Calculate SGPA */

function calculateSGPA() {

    let rows =
        document.querySelectorAll("#subjectTable tr");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i < rows.length; i++) {

        let marks =
            Number(rows[i].querySelector(".marks").value);

        let credit =
            Number(rows[i].querySelector(".credit").value);

        if (
            isNaN(marks) ||
            isNaN(credit) ||
            marks < 0 ||
            marks > 100 ||
            credit <= 0
        ) {
            alert("Please enter valid marks and credits.");
            return;
        }

        let result = getGrade(marks);

        totalCredits += credit;

        totalPoints += credit * result[1];
    }

    let sgpa = totalPoints / totalCredits;

    document.getElementById("sgpaResult").innerHTML =
        "Your SGPA: " + sgpa.toFixed(2);
}


/* Add Semester */

function addSemester() {

    let table =
        document.getElementById("semesterTable");

    let semesterNumber = table.rows.length;

    let row = table.insertRow();

    row.innerHTML = `
        <td>Semester ${semesterNumber}</td>

        <td>
            <input type="number"
                   class="sgpa"
                   min="0"
                   max="10"
                   step="0.01">
        </td>

        <td>
            <input type="number"
                   class="semCredit"
                   min="0"
                   step="0.5">
        </td>
    `;
}


/* Calculate CGPA */

function calculateCGPA() {

    let sgpas =
        document.querySelectorAll(".sgpa");

    let credits =
        document.querySelectorAll(".semCredit");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < sgpas.length; i++) {

        let sgpa = Number(sgpas[i].value);
        let credit = Number(credits[i].value);

        if (
            isNaN(sgpa) ||
            isNaN(credit) ||
            sgpa < 0 ||
            sgpa > 10 ||
            credit <= 0
        ) {
            alert("Please enter valid SGPA and credits.");
            return;
        }

        totalCredits += credit;

        totalPoints += sgpa * credit;
    }

    let cgpa = totalPoints / totalCredits;

    document.getElementById("cgpaResult").innerHTML =
        "Your CGPA: " + cgpa.toFixed(2);
}