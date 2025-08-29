const { Telegraf } = require('telegraf');

// Replace this with your real bot token
const bot = new Telegraf(process.env.bot_token);

// Start command
bot.start((ctx) => {
  ctx.reply("👋 Welcome to Technogeek Mobile & Accessories Shop!\n\nI am your assistant bot 🤖\n\nYou can type /products to see our items or /services to check repair options.");
});

// Product list
bot.command('products', (ctx) => {
  ctx.reply(`🛍 Our Products:\n
1️⃣ Back Case Cover (₹100 – ₹150)
2️⃣ Charger (₹200 – ₹500)
3️⃣ Speakers (₹250 – ₹1000)
4️⃣ Headphones (₹100 – ₹200)
5️⃣ Charger Cable (₹100 – ₹250)`);
});

// Services
bot.command('services', (ctx) => {
  ctx.reply(`🛠 Our Services:\n
📱 Display Replacement
   - Duplicate: ₹1000
   - Original: ₹1500

🛡 Tempered Glass:
   - Clear: ₹100
   - Matt Finish: ₹150
   - Privacy: ₹150

🔋 Battery Replacement:
   - Vivo: ₹800
   - Poco: ₹800
   - Redmi: ₹900
   - Nothing: ₹900`);
});

// Echo (if user just types something)
bot.on('text', (ctx) => {
  ctx.reply(`📩 You said: ${ctx.message.text}\n\n👉 Try /products or /services`);
});

// Launch bot
bot.launch();
console.log("🤖 Technogeek Bot is running...");