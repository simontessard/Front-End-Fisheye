function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayInputs() {
    const form = document.querySelector('form div');

    const namePhotographer = document.querySelector('h1').innerText;

    const contactMeText = document.querySelector('.modal h2');
    const jump = document.createElement('br');
    contactMeText.appendChild(jump);

    jump.after(namePhotographer);

    const closeButton = document.querySelector('.modal img');
    closeButton.addEventListener('click', event => {
        closeModal();
    })

    const nomLabel = document.createElement('label');
    nomLabel.textContent='Nom';
    const nomInput = document.createElement('input');

    const emailLabel = document.createElement('label');
    emailLabel.textContent='Email';
    const emailInput = document.createElement('input');

    const messageLabel = document.createElement('label');
    messageLabel.textContent='Votre message';
    const messageInput = document.createElement('input');
    messageInput.style.height = '200px';

    form.append(nomLabel, nomInput, emailLabel, emailInput, messageLabel, messageInput);
}

/* document.onreadystatechange = function () {
	if (document.readyState === 'interactive') {
		displayInputs();
	}
} */

export { displayModal, closeModal, displayInputs }