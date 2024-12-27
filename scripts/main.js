'use strict'

const lowercaseSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const uppercaseSet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const numbersSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const symbolsSet = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '?', '/', '`', '~']

// Вспомогательные функции
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Элементы
const passLength = document.querySelector('.password-length__range')
const passDetail = document.querySelector('.password-length__detail span')
const passInput = document.querySelector('.input-box__input')
const generateButton = document.querySelector('.generate-password-button')
const copyButton = document.querySelector('.input-box__copy-icon')

// Обработчики
passLength.oninput = () => {
    passDetail.textContent = +passLength.value
    passInput.value = ''
    copyButton.textContent = ''
}
generateButton.onclick = () => {
    passInput.value = generatePassword()
    copyButton.textContent = 'copy_all'
}
copyButton.onclick = () => {
    navigator.clipboard.writeText(passInput.value)
    copyButton.textContent = 'check'


    setTimeout(() => {
        copyButton.textContent = 'copy_all'
    }, 1000)
}

// Функции
function generatePassword() {
    savePasswordOptions()

    const length = +passLength.value
    let randomPassword = ''
    let passwordSet = [...lowercaseSet]

    if (uppercase.checked) {
        passwordSet = passwordSet.concat(uppercaseSet)
    }
    if (numbers.checked) {
        passwordSet = passwordSet.concat(numbersSet)
    }
    if (symbols.checked) {
        passwordSet = passwordSet.concat(symbolsSet)
    }

    for (let i = 0; i < length; i++) {
        randomPassword += shuffleArray(passwordSet)[getRandomNumber(passwordSet.length)]
    }
    return randomPassword
}
function savePasswordOptions()  {
    const passwordOptions = {}
    passwordOptions['length'] = +passLength.value
    passwordOptions['uppercase'] = uppercase.checked
    passwordOptions['numbers'] = numbers.checked
    passwordOptions['symbols'] = symbols.checked
    localStorage.setItem('passwordOptions', JSON.stringify(passwordOptions))
}
function restorePasswordOptions() {
    if (localStorage.getItem('passwordOptions') !== null) {
        const passwordOptions = JSON.parse(localStorage.getItem('passwordOptions'))
        uppercase.checked = passwordOptions['uppercase']
        numbers.checked = passwordOptions['numbers']
        symbols.checked = passwordOptions['symbols']
        passLength.value = passwordOptions['length']
        passDetail.textContent = passLength.value
    }
}

// Старт


restorePasswordOptions()
passInput.value = generatePassword()



/*function generatePassword2() {
    savePasswordOptions()

    const length = 20
    let randomPassword = ''
    let passwordSet = [].concat(lowercaseSet).concat(uppercaseSet)

    for (let i = 0; i < 20; i++) {
        if (i === 6 || i === 13) {
            randomPassword += '-'
        } else {
            randomPassword += shuffleArray(passwordSet)[getRandomNumber(passwordSet.length)]
        }

    }

    return randomPassword
}*/








