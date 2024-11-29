var nameSite = document.getElementById("nameSite");
var urlInput = document.getElementById("urlInput");
var sweetAlert = document.getElementById("sweetAlert");
var urlBelow = document.getElementById("urlBelow");
var sweetAlertWindow = document.getElementById("sweetAlertWindow");

var siteList;

if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  display();
} else {
  siteList = [];
}

function addSite() {
  if (formRegex() && validateForm()) {
    var site = {
      nameSite: nameSite.value,
      urlSite: urlInput.value,
    };

    siteList.push(site);
    validInputs();
    display();
    clearForm();
    setToLocalstorge();
  } else {
    roleBelow();
  }
}

function display() {
  var cartona = "";
  if (siteList.length === 0) {
    cartona = ``;
  } else {
    for (var i = 0; i < siteList.length; i++) {
      cartona += `
        <div class="col-lg-3 col-md-6  d-flex flex-column justify-content-center align-items-center">
          ${i + 1} 
        </div> 
        <div class="col-lg-3 col-md-6  d-flex flex-column justify-content-center align-items-center">
          ${siteList[i].nameSite}
        </div>
        <div class="col-lg-3 col-md-6  d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-info fw-bold">
            <i class="fa-solid fa-eye pe-2 text-white"></i>
            <a class="text-decoration-none text-white" target="_blank" href="${
              siteList[i].urlSite
            }">Visit</a>
          </button>
        </div>
        <div class="col-lg-3 col-md-6  d-flex flex-column justify-content-center align-items-center">
          <button onclick="deleteSite(${i})" class="btn btn-danger fw-bold">
            <i class="fa-solid fa-trash-can"></i>Delete
          </button>
        </div>`;
    }
  }
  document.getElementById("newRow").innerHTML = cartona;
}

function setToLocalstorge() {
  localStorage.setItem("sites", JSON.stringify(siteList));
}

function deleteSite(index) {
  siteList.splice(index, 1);
  setToLocalstorge();
  display();
}

function nameSiteRegex() {
  var namePattern = /^[a-z][a-zA-Z0-9-]{2,}$/;
  return namePattern.test(nameSite.value.trim());
}

function formRegex() {
  var urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
  return urlPattern.test(urlInput.value.trim());
}

function validateForm() {
  return nameSite.value.trim() !== "" && urlInput.value.trim() !== "";
}

function roleBelow() {
  sweetAlert.classList.replace("d-none", "d-block");
  urlBelow.classList.replace("d-none", "d-block");
  sweetAlertWindow.classList.replace("d-none", "d-block");
  nameSite.classList.add("is-invalid");
  nameSite.classList.remove("is-valid");
  urlInput.classList.add("is-invalid");
  urlInput.classList.remove("is-valid");
}

function validInputs() {
  nameSite.classList.remove("is-invalid");
  nameSite.classList.add("is-valid");
  urlInput.classList.remove("is-invalid");
  urlInput.classList.add("is-valid");
  sweetAlert.classList.replace("d-block", "d-none");
  urlBelow.classList.replace("d-block", "d-none");
}

function closeAlert() {
  sweetAlertWindow.classList.replace("d-block", "d-none");
}

function clearForm() {
  nameSite.value = "";
  urlInput.value = "";
}
