document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('priorApprovalForm');
    const costPoundsInputs = document.querySelectorAll('.cost-pounds');
    const costPenceInputs = document.querySelectorAll('.cost-pence');
    const totalPoundsInput = document.getElementById('totalPounds');
    const totalPenceInput = document.getElementById('totalPence');
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    function convertToPence(pounds, pence) {
        return Math.round(pounds * 100) + (parseInt(pence) || 0);
    }

    function convertFromPence(totalPence) {
        const pounds = Math.floor(totalPence / 100);
        const pence = totalPence % 100;
        return { pounds, pence };
    }

    function calculateTotal() {
        let totalPence = 0;
        
        costPoundsInputs.forEach((poundsInput, index) => {
            const pounds = parseFloat(poundsInput.value) || 0;
            const penceInput = costPenceInputs[index];
            const pence = parseInt(penceInput.value) || 0;
            totalPence += convertToPence(pounds, pence);
        });

        const total = convertFromPence(totalPence);
        totalPoundsInput.value = total.pounds;
        totalPenceInput.value = total.pence.toString().padStart(2, '0');
    }

    costPoundsInputs.forEach((input, index) => {
        input.addEventListener('input', calculateTotal);
        input.addEventListener('blur', function() {
            if (this.value < 0) {
                this.value = 0;
                calculateTotal();
            }
        });
    });

    costPenceInputs.forEach((input) => {
        input.addEventListener('input', function() {
            if (this.value > 99) {
                this.value = 99;
            }
            if (this.value < 0) {
                this.value = 0;
            }
            calculateTotal();
        });
    });

    fromDateInput.addEventListener('change', function() {
        const fromDate = new Date(this.value);
        const minToDate = new Date(fromDate);
        minToDate.setDate(minToDate.getDate() + 1);
        toDateInput.min = minToDate.toISOString().split('T')[0];
        
        if (toDateInput.value && new Date(toDateInput.value) <= fromDate) {
            toDateInput.value = '';
            toDateInput.setCustomValidity('End date must be after start date');
        } else {
            toDateInput.setCustomValidity('');
        }
    });

    toDateInput.addEventListener('change', function() {
        const fromDate = new Date(fromDateInput.value);
        const toDate = new Date(this.value);
        
        if (toDate <= fromDate) {
            this.setCustomValidity('End date must be after start date');
        } else {
            this.setCustomValidity('');
        }
    });

    const today = new Date().toISOString().split('T')[0];
    fromDateInput.min = today;
    toDateInput.min = today;

    const subsistenceInput = document.getElementById('subsistence');
    const accommodationInput = document.getElementById('accommodation');
    const fromDateField = document.getElementById('fromDate');
    const toDateField = document.getElementById('toDate');

    function validateSubsistence() {
        if (fromDateField.value && toDateField.value && subsistenceInput.value) {
            const fromDate = new Date(fromDateField.value);
            const toDate = new Date(toDateField.value);
            const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
            const maxSubsistence = days * 25;
            const enteredSubsistence = parseFloat(subsistenceInput.value) || 0;
            
            if (enteredSubsistence > maxSubsistence) {
                subsistenceInput.setCustomValidity(`Subsistence exceeds maximum of £25.00 per day. Maximum for ${days} day(s) is £${maxSubsistence.toFixed(2)}`);
            } else {
                subsistenceInput.setCustomValidity('');
            }
        }
    }

    function validateAccommodation() {
        if (fromDateField.value && toDateField.value && accommodationInput.value) {
            const fromDate = new Date(fromDateField.value);
            const toDate = new Date(toDateField.value);
            const nights = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
            const maxAccommodation = nights * 120;
            const enteredAccommodation = parseFloat(accommodationInput.value) || 0;
            
            if (enteredAccommodation > maxAccommodation) {
                accommodationInput.setCustomValidity(`Accommodation exceeds maximum of £120 per night. Maximum for ${nights} night(s) is £${maxAccommodation.toFixed(2)}`);
            } else {
                accommodationInput.setCustomValidity('');
            }
        }
    }

    subsistenceInput.addEventListener('input', validateSubsistence);
    accommodationInput.addEventListener('input', validateAccommodation);
    fromDateField.addEventListener('change', function() {
        validateSubsistence();
        validateAccommodation();
    });
    toDateField.addEventListener('change', function() {
        validateSubsistence();
        validateAccommodation();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            const firstInvalidField = form.querySelector(':invalid');
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalidField.focus();
            }
        } else {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Form Data:', data);
            
            form.classList.add('d-none');
            const successMessage = document.getElementById('successMessage');
            const referenceNumber = document.getElementById('referenceNumber');
            referenceNumber.textContent = 'PA-' + Date.now().toString().slice(-8);
            successMessage.classList.remove('d-none');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        form.classList.add('was-validated');
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });

    document.getElementById('saveDraft').addEventListener('click', function() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        localStorage.setItem('priorApprovalDraft', JSON.stringify(data));
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-info alert-dismissible fade show';
        alert.innerHTML = '<strong>Draft Saved!</strong> Your form has been saved locally. You can continue later.';
        alert.innerHTML += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
        form.insertBefore(alert, form.firstChild);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    });

    const savedDraft = localStorage.getItem('priorApprovalDraft');
    if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        Object.keys(draftData).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = draftData[key] === 'on';
                } else {
                    input.value = draftData[key];
                }
            }
        });
        calculateTotal();
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-info alert-dismissible fade show';
        alert.innerHTML = '<strong>Draft Loaded!</strong> Your previously saved draft has been loaded.';
        alert.innerHTML += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
        form.insertBefore(alert, form.firstChild);
    }

    document.querySelector('button[type="reset"]').addEventListener('click', function(event) {
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            localStorage.removeItem('priorApprovalDraft');
            form.classList.remove('was-validated');
            const validatedInputs = form.querySelectorAll('.is-valid, .is-invalid');
            validatedInputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
            calculateTotal();
        } else {
            event.preventDefault();
        }
    });

    function updateProgress() {
        const requiredFields = form.querySelectorAll('[required]');
        const filledFields = Array.from(requiredFields).filter(field => {
            if (field.type === 'checkbox') {
                return field.checked;
            }
            return field.value.trim() !== '';
        });
        const progress = (filledFields.length / requiredFields.length) * 100;
        
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'progress-indicator';
            progressIndicator.innerHTML = '<div class="progress-bar" style="width: 0%"></div>';
            document.body.insertBefore(progressIndicator, document.body.firstChild);
            progressBar = document.querySelector('.progress-bar');
        }
        progressBar.style.width = progress + '%';
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
    });
    
    updateProgress();
    calculateTotal();
});
