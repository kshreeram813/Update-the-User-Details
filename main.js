function addItem(event) {
  event.preventDefault();

  //get input value
  var newName = document.getElementById("name").value;
  var newEmail = document.getElementById("email").value;
  var newPhone = document.getElementById("phone").value;

  let infoObj = {
    newName,
    newEmail,
    newPhone,
  };

  axios
    .post(
      "https://crudcrud.com/api/2f775bf63f344462bc6d95d3b5ad0670/appointmentData",
      infoObj
    )
    //
    .then((response) => {
      showOnScreen(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// let infoObj_serialized = JSON.stringify(infoObj);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/2f775bf63f344462bc6d95d3b5ad0670/appointmentData"
    )

    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showOnScreen(response.data[i]);
        // console.log(response[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showOnScreen(infoObj) {
  let users = document.getElementById("list of users");
  var data = document.createElement("li");

  data.textContent = ` ${infoObj.newName}  ${infoObj.newEmail} ${infoObj.newPhone}`;

  // Add class

  data.className = "list-group-item";

  //Create a delete button
  var deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "delete";

  //add classes to delete button
  deleteBtn.className = "btn-delete";

  //Append Text node to delete
  deleteBtn.appendChild(document.createTextNode("X"));

  deleteBtn.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/2f775bf63f344462bc6d95d3b5ad0670/appointmentData/${infoObj._id}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    users.removeChild(data);
  };

  //Create a edit button
  var editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "edit";

  //add classes to edit button
  editBtn.className = "btn-edit";

  //Append Text node to edit
  deleteBtn.appendChild(document.createTextNode("edit"));

  editBtn.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/2f775bf63f344462bc6d95d3b5ad0670/appointmentData/${infoObj._id}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    users.removeChild(data);
    document.getElementById("name").value = infoObj.newName;
    document.getElementById("email").value = infoObj.newEmail;
    document.getElementById("phone").value = infoObj.newPhone;
  };
  //append child
  data.appendChild(editBtn);
  data.appendChild(deleteBtn);
  users.appendChild(data);
}
