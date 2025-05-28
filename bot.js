const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Ensure Puppeteer runs in headless mode
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto!');
});

const keywords = ["vaga cm","vaga go","vaga ped","vaga cg","doando","doando cm","doando cg","doando ped","doando go", "doo"]; // Adicione palavras-chave relevantes
//const keywords = ["vaga cm","vaga go","vaga ped","vaga cg"]; // Adicione palavras-chave relevantes
// message.from.endsWith('@g.us')

client.on('message', async message => {
    const targetGroupId = "120363393058822882@g.us"; // Replace with your specific group ID
    if (message.from === targetGroupId) { // Explicitly check for group messages
        console.log(`📢 Group message detected from ${message.from}`);
        console.log(`Received message: ${message.body}`);
        const normalizedMessage = message.body.toLowerCase().trim();
        if (keywords.some(keyword => normalizedMessage.includes(keyword.toLowerCase()))) {
            console.log("✅ Responding...");
            try {
                await message.reply("Pego a doação");
            } catch (error) {
                console.error("Error sending reply:", error);
            }
        }
    }
});

client.initialize();
