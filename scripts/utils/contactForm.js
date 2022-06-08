function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function initializeModal() {
    const contactMeText = document.querySelector('.modal-dialog h2');

    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.setAttribute('role', 'document');

    const modal = document.getElementById("contact_modal");
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', contactMeText.textContent);
    modal.setAttribute('tabindex', '0');
    modal.setAttribute('aria-hidden', 'true');

    const form = document.querySelector('form div');

    const namePhotographer = document.querySelector('h1').innerText;

    const jump = document.createElement('br');
    contactMeText.appendChild(jump);
    jump.after(namePhotographer);

    const closeButton = document.querySelector('.modal-dialog img');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('tabindex', '0');

    closeButton.addEventListener('click', event => {
        closeModal();
    })

    const prenomLabel = document.createElement('label');
    prenomLabel.setAttribute('for', 'firstName');
    prenomLabel.textContent = 'Prénom';
    const prenomInput = document.createElement('input');
    prenomInput.setAttribute('id', 'firstName');
    prenomInput.setAttribute('type', 'text');

    const nomLabel = document.createElement('label');
    nomLabel.setAttribute('for', 'lastName');
    nomLabel.textContent = 'Nom';
    const nomInput = document.createElement('input');
    nomInput.setAttribute('id', 'lastName');
    nomInput.setAttribute('type', 'text');

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email';
    const emailInput = document.createElement('input');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('type', 'email');

    const messageLabel = document.createElement('label');
    messageLabel.setAttribute('for', 'message');
    messageLabel.textContent = 'Votre message';
    const messageInput = document.createElement('input');
    messageInput.setAttribute('id', 'message');
    messageInput.style.height = '200px';

    const submitButton = document.createElement('input');
    submitButton.setAttribute('value', 'Envoyer');
    submitButton.setAttribute('class', 'contact_button');
    submitButton.setAttribute('type', 'submit');

    form.append(prenomLabel, prenomInput, nomLabel, nomInput, emailLabel, emailInput, messageLabel, messageInput);
    document.querySelector('form').appendChild(submitButton);
}

async function addFocus() {
    // add all the elements inside modal which you want to make focusable
    const focusableElements = 'img, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#contact_modal'); // select the modal by it's id

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    console.log(focusableContent);

    document.addEventListener('keydown', function (e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });

    firstFocusableElement.focus();
}
/* document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
        initializeModal();
    }
} */
export { displayModal, closeModal, initializeModal, addFocus }