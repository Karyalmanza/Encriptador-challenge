// Guarda un historial de los mensajes originales junto con los encriptados
const encryptedMessages = [];

function generateRandomMapping() {

    const mapping = {
        a: 'ai',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat'
          };

    return mapping; // Devuelve el mapeo generado
}

// Aplica el mapeo al texto ingresado para encriptarlo
function applyMapping(text, mapping) {
    return text.split('').map(char => mapping[char] || char).join(''); // Reemplaza cada carácter según el mapeo
}

// Función para encriptar el texto ingresado por el usuario
function encryptText() {
    const input = document.getElementById('inputText').value; // Obtiene el texto ingresado por el usuario
    if (input.trim() === "") { // Verifica si el texto está vacío
        alert("Por favor, ingresa algún texto para encriptar."); // Muestra una alerta si está vacío
        return; // Sale de la función si no hay texto
    }

    const mapping = generateRandomMapping(); // Genera un mapeo aleatorio
    const encrypted = applyMapping(input, mapping); // Encripta el texto usando el mapeo generado
    encryptedMessages.push({ original: input, encrypted: encrypted, mapping: mapping }); // Guarda el mensaje original, encriptado y el mapeo en el historial
    document.getElementById('inputText').value = ''; // Limpia el campo de texto de entrada
    document.getElementById('decryptedText').innerText = ''; // Limpia el resultado desencriptado anterior
    document.getElementById('decryptInput').value = encrypted; // Muestra el texto encriptado en el área de desencriptado
    document.getElementById('decryptedText').classList.remove('warning'); // Remueve la clase de advertencia si estaba presente
    addEncryptedMessageToList(encrypted); // Añade el mensaje encriptado a la lista visual en la página
}
function decryptText() {
    let encrypted = document.getElementById('decryptInput').value;
    const mapping = {
        ai: 'a',
        enter: 'e',
        imes: 'i',
        ober: 'o',
        ufat: 'u'
    };
    let newValue = encrypted;
    for (const [key, value] of Object.entries(mapping)) 
    {
        let r = encrypted.indexOf(key);
        while(r !== -1){
            newValue = newValue.replace(key,value);
            r = newValue.indexOf(key);
        }
    }
    document.getElementById('decryptedText').innerText = newValue;
}


// Añade un mensaje encriptado a la lista visual en la página
function addEncryptedMessageToList(encrypted) {
    const list = document.getElementById('encryptedMessagesList'); // Obtiene la lista donde se mostrarán los mensajes encriptados
    const listItem = document.createElement('li'); // Crea un nuevo elemento de lista
    listItem.textContent = encrypted; // Establece el texto del elemento de lista como el mensaje encriptado

    // Añade un evento al hacer clic para mostrar el mensaje original
    listItem.onclick = () => {
        const message = encryptedMessages.find(msg => msg.encrypted === encrypted); // Busca el mensaje encriptado en el historial
        if (message) {
            alert(`Mensaje original: ${message.original}`); // Muestra el mensaje original en una alerta
        }
    };

    // Crea un botón para copiar el mensaje encriptado
    const copyButton = document.createElement('button');
    copyButton.textContent = "Copiar"; // Texto del botón
    copyButton.classList.add('copy-btn'); // Añade una clase CSS al botón
    copyButton.onclick = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el clic en el listItem
        copyToClipboard(encrypted); // Copia el mensaje encriptado al portapapeles
        alert("Texto encriptado copiado al portapapeles."); // Muestra una alerta confirmando la copia
    };

    listItem.appendChild(copyButton); // Añade el botón de copiar al elemento de lista
    list.appendChild(listItem); // Añade el elemento de lista a la lista visual
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    const textarea = document.createElement('textarea'); // Crea un elemento de texto oculto
    textarea.value = text; // Establece el valor del textarea como el texto a copiar
    document.body.appendChild(textarea); // Añade el textarea al DOM
    textarea.select(); // Selecciona el texto dentro del textarea
    document.execCommand('copy'); // Ejecuta el comando de copiar
    document.body.removeChild(textarea); // Remueve el textarea del DOM
}
