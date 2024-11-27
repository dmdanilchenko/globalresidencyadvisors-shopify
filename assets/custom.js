window.addEventListener('load', function () {
    formValidation(document.getElementById('create_customer'));
    formValidation(document.getElementById('contact_form'));
    formValidation(document.getElementById('address_form_new'));

    function formValidation(form) {
        if (form) {
            form.addEventListener('submit', function (event) {
                let errors = false;
                // get all required inputs
                form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
                    errors = validateInput(input, window.Theme.requiredFieldErrorMessage, errors);
                });

                form.querySelectorAll('[name="address[country]"]').forEach(function (select) {
                    errors = validateCountrySelect(select, window.Theme.selectCountryErrorMessage, errors);
                });

                if (errors) {
                    event.preventDefault();
                }
            });
        }
    }

    function validateInput(input, message, errors) {
        if (!input.value) {
            // add aria-invalid="true"
            input.setAttribute('aria-invalid', 'true');
            errors = true;
            showErrorMessage(input, message, true)
        } else {
            input.setAttribute('aria-invalid', 'false');
            showErrorMessage(select, message, false);
        }

        return errors;
    }

    function validateCountrySelect(select, message, errors) {
        if (!select.value || select.value === '---') {
            // add aria-invalid="true"
            errors = true;
            showErrorMessage(select, message, true);
        } else {
            showErrorMessage(select, message, false);
        }

        return errors;
    }

    function showErrorMessage(input, message, showError) {
        if (input.parentNode.querySelector('.error')) {
            input.parentNode.querySelector('.error').remove();
        }
        if (showError) {
            var error = document.createElement('span');
            error.className = 'error';
            error.textContent = message;
            //insert to parent
            input.parentNode.append(error);
        }
    }

    let seePassword = document.querySelector('.form-action--see-password'),
        passwordInput = document.querySelector('[name="customer[password]"]');

    if (seePassword) {
        seePassword.addEventListener('click', function (event) {
            seePassword.classList.toggle('active');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }

    let triggerMyAccountDropdown = document.querySelector('button[data-action="toggle-my-account-linklist"]'),
        dropdown = document.getElementById('my-account-linklist');
    if (triggerMyAccountDropdown && dropdown) {
        triggerMyAccountDropdown.addEventListener('click', function (event) {
            triggerMyAccountDropdown.setAttribute('aria-expanded', triggerMyAccountDropdown.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            dropdown.setAttribute('aria-hidden', dropdown.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
        });
    }
});
