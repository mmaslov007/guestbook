document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const howWeMetSelect = document.getElementById('howWeMet');
    const otherFieldContainer = document.getElementById('other-field-container');
    const mailingListCheckbox = document.querySelector('input[name="mailingList"]');
    const emailFormatOptions = document.querySelector('.contact-row');

    otherFieldContainer.style.display = 'none';
    emailFormatOptions.style.display = 'none';

    howWeMetSelect.addEventListener('change', function () {
        if (howWeMetSelect.value === 'other') {
            otherFieldContainer.style.display = 'block';
        } else {
            otherFieldContainer.style.display = 'none';
        }
    });

    mailingListCheckbox.addEventListener('change', function () {
        if (mailingListCheckbox.checked) {
            emailFormatOptions.style.display = 'block';
        } else {
            emailFormatOptions.style.display = 'none';
        }
    });

    form.onsubmit = function (e) {
        clearErrors();

        let isValid = true;

        let firstName = document.getElementById('firstName').value.trim();
        if (firstName === "") {
            document.getElementById('fname-err').style.display = 'inline';
            isValid = false;
        }

        let lastName = document.getElementById('lastName').value.trim();
        if (lastName === "") {
            document.getElementById('lname-err').style.display = 'inline';
            isValid = false;
        }

        let email = document.getElementById('emailAddress').value.trim();
        if (email !== "" && !validateEmail(email)) {
            document.getElementById('email-err').style.display = 'inline';
            document.getElementById('email-err').innerHTML = 'Invalid email format';
            isValid = false;
        }

        if (mailingListCheckbox.checked && email === "") {
            document.getElementById('email-err').style.display = 'inline';
            document.getElementById('email-err').innerHTML = 'Email is required for the mailing list';
            isValid = false;
        }

        let linkedinUrl = document.getElementById('linkedinUrl').value.trim();
        if (linkedinUrl !== "" && !validateLinkedIn(linkedinUrl)) {
            document.getElementById('linkedin-err').style.display = 'inline';
            document.getElementById('linkedin-err').innerHTML = 'Invalid LinkedIn URL';
            isValid = false;
        }

        let howWeMet = document.getElementById('howWeMet').value;
        if (howWeMet === "") {
            document.getElementById('howWeMet-err').style.display = 'inline';
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();
            window.location.href = 'thank_you.html';
        }
    };

    function clearErrors() {
        let errors = document.getElementsByClassName('err');
        for (let i = 0; i < errors.length; i++) {
            errors[i].style.display = 'none';
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateLinkedIn(url) {
        return url.startsWith('https://linkedin.com/in/');
    }
});
