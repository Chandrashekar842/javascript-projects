function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if(address == "") {
        alert("Address is required");
        return false;
    }

    if(name == "") {
        alert("Name is required");
        return false;
    }

    if(age == "" || age < 0) {
        alert("Enter valid age");
        return false;
    }

    if(email == "" || !email.includes("@")) {
        alert("Enter valid email");
        return false;
    }

    return true;
}

function showData() {
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.address + "</td>";
        html += '<td><button class="btn btn-danger" onclick="deleteData('+ index +')">DELETE</button><button class="btn btn-warning m-3" onclick="updateData('+ index +')">EDIT</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
    if(validateForm() == true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            email: email,
            address: address
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
    }
}

function deleteData(index) {
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("address").value = peopleList[index].address;

    document.getElementById("update").onclick = function() {
        if(validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].email  = document.getElementById("email").value;
            peopleList[index].address = document.getElementById("address").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("email").value = "";
            document.getElementById("address").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}