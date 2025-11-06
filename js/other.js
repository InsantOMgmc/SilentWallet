const openContactUsFormBtns = document.querySelectorAll('.openContactUsForm')
const contactUsWindow = document.getElementById('contact-us-window')
const windowWrapper = contactUsWindow.parentElement;
const closeWindowBtn = contactUsWindow.querySelector('.modal-window-close-btn')
const body = document.body

openContactUsFormBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        const openMenuBtn = document.querySelector('.btn-menu')
        const menu = document.querySelector('.menu-block')
        const burger = openMenuBtn.querySelector('.burger')
        if (openMenuBtn.classList.contains('active') && menu.classList.contains('active') && burger.classList.contains('on') && body.classList.contains("menu_expand")) {
            openMenuBtn.classList.remove('active')
            menu.classList.remove('active')
            burger.classList.remove('on')
            body.classList.remove('menu_expand')
        }

        windowWrapper.classList.add('active');
        contactUsWindow.classList.add('active');
    });
});

windowWrapper.addEventListener('click', (event) => {
    if (event.target === windowWrapper) {
        windowWrapper.classList.remove('active');
        contactUsWindow.classList.remove('active');
    }
});

closeWindowBtn.addEventListener('click', () => {
    windowWrapper.classList.remove('active')
    contactUsWindow.classList.remove('active')
})


const dropdown = document.getElementById('dropdown');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');

dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

const categoryInput = document.getElementById('categoryInput')
dropdownContent.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
        dropdownBtn.childNodes[0].nodeValue = option.textContent;
        categoryInput.value = option.textContent;
        dropdownBtn.classList.add('active')
        dropdown.classList.remove('active');
    });
});

// Закрытие при клике вне dropdown
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

const fileInput = document.getElementById('fileInput');
const fileNameSpan = document.querySelector('.file-info');

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (!file) return;

    const parts = file.name.split('.');

    // расширение (.png .pdf и тд)
    const ext = parts.pop().toLowerCase();

    // имя файла без расширения
    const baseName = parts.join('.');


    // Выбор иконки относительно расширения
    let icon;
    if (['jpg', 'jpeg', 'png',].includes(ext)) {
        icon = 'pdf-icon.svg'; // Иконка изображения

    } else if (['pdf'].includes(ext)) {
        icon = 'pdf-icon.svg'; // Иконка pdf

    } else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) {
        icon = 'pdf-icon.svg'; // Иконка документов

    } else {
        icon = ''; // Дефолтная иконка 
    }

    const removeSvg = `
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="remove-file">
      <path d="M7.43401 6.41755C7.15332 6.13686 6.69824 6.13686 6.41755 6.41755C6.13686 6.69824 6.13686 7.15332 6.41755 7.43401L10.4834 11.4999L6.4176 15.5657C6.13691 15.8464 6.13691 16.3015 6.4176 16.5822C6.69829 16.8629 7.15338 16.8629 7.43407 16.5822L11.4999 12.5164L15.5657 16.5822C15.8464 16.8629 16.3015 16.8629 16.5822 16.5822C16.8629 16.3015 16.8629 15.8464 16.5822 15.5657L12.5164 11.4999L16.5823 7.43402C16.863 7.15333 16.863 6.69824 16.5823 6.41755C16.3016 6.13686 15.8465 6.13686 15.5658 6.41755L11.4999 10.4834L7.43401 6.41755Z" fill="#FF0000" />
    </svg>
  `;

    fileNameSpan.innerHTML = `
    <img class="file-icon" src="img/dist/${icon}">
    
    <span class="file-name">${baseName}</span>

    <span class="file-remove">${removeSvg}</span>
  `;

    const removeBtn = fileNameSpan.querySelector('.remove-file');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        fileNameSpan.textContent = 'Attach file / Screenshot';
    });
});


const form = document.getElementById("contact-us-form");
const inputs = form.querySelectorAll("input[required], textarea[required]");

inputs.forEach(input => {
    input.addEventListener("blur", () => {
        const existingError = input.parentElement.querySelector(".primary-form__error-msg");
        if (existingError) existingError.remove();

        if (input.value.trim() === "") {
            const errorMsg = document.createElement("small");
            errorMsg.classList.add("primary-form__error-msg");
            errorMsg.textContent = "Please select a method*";
            input.parentElement.appendChild(errorMsg);
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });
});

form.addEventListener("submit", e => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
        const existingError = input.parentElement.querySelector(".primary-form__error-msg");
        if (existingError) existingError.remove();

        if (input.value.trim() === "") {
            const errorMsg = document.createElement("small");
            errorMsg.classList.add("primary-form__error-msg");
            errorMsg.textContent = "Please select a method*";
            input.parentElement.appendChild(errorMsg);
            input.classList.add("error");
            isValid = false;
        } else {
            input.classList.remove("error");
        }
    });

    if (isValid) {
        // Для теста вывел отправляемые данные в консоль
        const formData = new FormData(form);
        formData.forEach(element => {
            console.log(element)
        });
    }
});

