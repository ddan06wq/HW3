const form = document.getElementById('projectForm');
const tableBody = document.getElementById('tableBody');
const emptyRow = document.getElementById('emptyRow');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isFormValid = true;
            const fields = [
                { id: 'pName', msg: 'Name cannot be left blank.' },
                { id: 'pDesc', msg: 'Description cannot be left blank.' },
                { id: 'pUrl', msg: 'Please enter a valid URL (including https://).' },
                { id: 'pTech', msg: 'Please select a language.' },
                { id: 'pDate', msg: 'Please select a valid date.' }
            ];

            fields.forEach(field => {
                const inputElement = document.getElementById(field.id);
                const errorElement = document.getElementById(`err-${field.id}`);
                
                if (!inputElement.checkValidity()) {
                    isFormValid = false;
                    inputElement.setAttribute('aria-invalid', 'true');
                    inputElement.setAttribute('aria-describedby', `err-${field.id}`);
                    errorElement.textContent = field.msg;
                    errorElement.style.display = 'block';
                } else {
                    inputElement.removeAttribute('aria-invalid');
                    inputElement.removeAttribute('aria-describedby');
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            });

            if (isFormValid) {
                if (emptyRow) emptyRow.remove();
                const name = document.getElementById('pName').value;
                const desc = document.getElementById('pDesc').value;
                const url = document.getElementById('pUrl').value;
                const tech = document.getElementById('pTech').value;
                const date = document.getElementById('pDate').value;
                const image = document.getElementById('pImg');

                let imgHtml = `<div class="table-img-placeholder" style="margin: 0 auto;">No Img</div>`;
                if(image.files && image.files[0]) {
                    const objectURL = URL.createObjectURL(image.files[0])
                    imgHtml = `<img src="${objectURL}" alt="Thumbnail for ${name}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px; display: block; margin: 0 auto;">`;
                }
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${imgHtml}</td>
                    <th scope="row" style="color: #ffffff; font-weight: bold; border-bottom: 1px solid #2a2a2a; padding: 10px;">${name}</th>
                    <td>${desc}</td>
                    <td><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></td>
                    <td><span style="color: #b8ff34; font-weight: bold;">${tech}</span></td>
                    <td>${date}</td>
                `;

                tableBody.appendChild(newRow);
                form.reset();
            }
        });

        form.addEventListener('reset', function() {
            const errorMessages = document.querySelectorAll('.error-msg');
            errorMessages.forEach(msg => {
                msg.textContent = '';
                msg.style.display = 'none';
            });
            
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.removeAttribute('aria-invalid');
                input.removeAttribute('aria-describedby');
            });
        });