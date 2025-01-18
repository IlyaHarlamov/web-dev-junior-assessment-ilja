document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const fullname = data['full-name'];
    const email = data['email'];
    const githubUsername = data['github-username'];
    const avatarURL = URL.createObjectURL(data['avatar']);
    setMainWelcomeMessageInnerHtml(fullname);
    setSecondaryWelcomeMessageInnerHTML(email);
    hideTicketFormContainer();
    await displayTicket(fullname, githubUsername, avatarURL);
  });
});

/* Welcome Section */
function setMainWelcomeMessageInnerHtml(fullName) {
  getMainWelcomeMessage().innerHTML = `Congrats, <span id="welcome-message-fullname">${fullName}</span>!
    <br>Your ticket is ready.`;
}

function setSecondaryWelcomeMessageInnerHTML(email) {
  const el = getSecondaryWelcomeMessage();
  el.innerHTML = `We've emailed your ticket to 
    <span id="secondary-welcome-message-email">${email}</span>
     and will send updates in the run up to the event.`;
  el.style.maxWidth = '460px';
}

function getWelcomeSection() {
  return document.getElementById("welcome-section");
}

function getMainWelcomeMessage() {
  return getWelcomeSection().querySelector("h1");
}

function getSecondaryWelcomeMessage() {
  return getWelcomeSection().querySelector("p");
}

/* Ticket */
function getTicketFormContainer() {
  return document.getElementById("ticket-form-container");
}

function hideTicketFormContainer() {
    getTicketFormContainer().style.display = "none";
}

async function displayTicket(fullname, githubUsername, avatarURL) {
    const response = await fetch("html/ticket-component.html");
    const html = await response.text();
    document.getElementById('ticket-placeholder').innerHTML = html;
    const elFullname = document.getElementById('ticket-fullname');
    const elGithubUsername = document.getElementById('ticket-github-username');
    const elAvatar = document.getElementById('ticket-avatar');
    elFullname.textContent = fullname;
    elGithubUsername.textContent = githubUsername;
    elAvatar.src = avatarURL;
}

/* File Upload */
function getPreviewContainer() {
  return document.getElementById('preview-container');
}

function getAvatarInput() {
  return document.getElementById('avatar');
}

function getPreviewImage() {
  return document.getElementById('preview-image');
}

function getUploadLabel() {
  return document.getElementById('ticket-form-file-upload');
}

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    // Once the file is read, display it
    reader.onload = function (e) {
      getPreviewImage().src = e.target.result;
      getUploadLabel().style.display = 'none';
      getPreviewContainer().style.display = 'flex';
    };

    reader.readAsDataURL(file);
  }
}

function removeImage() {
  // Reset file input and hide preview
  getAvatarInput().value = '';
  getPreviewImage().src = '';
  getPreviewContainer().style.display = 'none';
  getUploadLabel().style.display = 'flex'; // Show the upload label again
}

function reuploadImage() {
  // Simulate a click on the file input
  getAvatarInput().click();
}