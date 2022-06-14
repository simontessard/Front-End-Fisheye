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
    modal.setAttribute('aria-label', 'Formulaire pour contacter un photographe');
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

    submitButton.addEventListener('click', event => {
        event.preventDefault();

        console.log('Le prénom que vous soumettez est le suivant : ' + prenomInput.value);
        console.log('Le nom que vous soumettez est le suivant : ' + nomInput.value);
        console.log('Le mail que vous soumettez est le suivant : ' + emailInput.value);
        console.log('Votre message envoyé est le suivant : ' + messageInput.value);
    })

    form.append(prenomLabel, prenomInput, nomLabel, nomInput, emailLabel, emailInput, messageLabel, messageInput);  
    document.querySelector('form').appendChild(submitButton);
}

async function addFocus(type) {
    // add all the elements inside modal which you want to make focusable
    let focusableElements = null;
    let modal = null;
    let firstFocusableElement = null;
    let focusableContent = null;

    if (type === 'contact') {
        modal = document.querySelector('#contact_modal'); // select the modal by it's id
        focusableElements = 'img, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        focusableContent = modal.querySelectorAll(focusableElements);
    }
    else {
        modal = document.querySelector('.modal-container');
        firstFocusableElement = modal.querySelectorAll('.modal-container img')[0]; // get first element to be focused inside modal
        focusableContent = modal.querySelectorAll('.modal-container img');
    }
    console.log(focusableContent);
    
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

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

export { displayModal, closeModal, initializeModal, addFocus }