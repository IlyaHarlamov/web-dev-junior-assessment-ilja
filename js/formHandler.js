document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setMainWelcomeMessageInnerHtml(data["full-name"]);
    setSecondaryWelcomeMessageInnerHTML(data["email"]);
    hideTicketFormContainer();
    displayTicket();
  });
});

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

function getTicketFormContainer() {
  return document.getElementById("ticket-form-container");
}

function hideTicketFormContainer() {
    getTicketFormContainer().style.display = "none";
}

function displayTicket() {
    fetch("html/ticket-component.html")
    .then((response) => response.text())
    .then((html) => {
        document.getElementById('ticket-placeholder').innerHTML = html;
    });
}