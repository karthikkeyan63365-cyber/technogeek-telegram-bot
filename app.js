
require('dotenv').config();


const { Telegraf, Markup } = require('telegraf');

// Use your real bot token here
const bot = new Telegraf(process.env.bot_token);

// Product list
const products = {
  "Back Case Cover": "₹100 – ₹150",
  "Charger": "₹200 – ₹500",
  "Speakers": "₹250 – ₹1000",
  "Headphones": "₹100 – ₹200",
  "Charger Cable": "₹100 – ₹250"
};

// Services with ranges
const services = {
  "Tempered Glass Change": "₹100–₹450",
  "Battery Change": "₹500–₹1000",
  "Display Change": "₹1000–₹1800",
  "Display Glass Change": "₹500–₹1000",
  "Camera Change": "₹300–₹500"
};

// Phone models (same for all services)
const phoneModels = [
  "Vivo", "Oppo", "Redmi", "Realme", "OnePlus", "iPhone", "Google Pixel"
];

// Main menu
function showMainMenu(ctx) {
  ctx.reply(
    `👋 Welcome to Technogeek Mobile & Accessories Shop!\n\nPlease choose an option:`,
    Markup.inlineKeyboard([
      Markup.button.callback('🛍 Products', 'show_products'),
      Markup.button.callback('🛠 Services', 'show_services')
    ])
  );
}

// Start & greeting
bot.start((ctx) => showMainMenu(ctx));
bot.on('text', (ctx) => showMainMenu(ctx));

// Products button click
bot.action('show_products', (ctx) => {
  const productButtons = Object.keys(products).map(name =>
    Markup.button.callback(name, `product_${name}`)
  );

  ctx.editMessageText('🛍 Please select a product:', Markup.inlineKeyboard(productButtons, { columns: 1 }));
});

// Product selected
bot.action(/product_(.+)/, async (ctx) => {
  const productName = ctx.match[1];
  const price = products[productName];

  await ctx.answerCbQuery();
  await ctx.reply(`💰 *${productName}* is available for *${price}*`, { parse_mode: 'Markdown' });
  await ctx.reply(`🙏 Thank you for your time. The *${productName}* is available now. Please come and visit our store!`, { parse_mode: 'Markdown' });
});

// Services button click
bot.action('show_services', (ctx) => {
  const serviceButtons = Object.keys(services).map(name =>
    Markup.button.callback(name, `service_${name.replace(/\s+/g, '_')}`)
  );

  ctx.editMessageText('🛠 Please select a service:', Markup.inlineKeyboard(serviceButtons, { columns: 1 }));
});

// Service selected → Show phone models
bot.action(/service_(.+)/, async (ctx) => {
  const serviceNameRaw = ctx.match[1].replace(/_/g, ' ');
  const modelButtons = phoneModels.map(model =>
    Markup.button.callback(`${model}`, `model_${serviceNameRaw}_${model}`)
  );

  await ctx.editMessageText(
    `📱 You selected *${serviceNameRaw}*.\n\nNow choose your phone model:`,
    {
      ...Markup.inlineKeyboard(modelButtons, { columns: 2 }),
      parse_mode: 'Markdown'
    }
  );
});

// Phone model selected → Show final price + thank-you
bot.action(/model_(.+)_(.+)/, async (ctx) => {
  const serviceName = ctx.match[1];
  const model = ctx.match[2];
  const priceRange = services[serviceName];

  await ctx.answerCbQuery();

  await ctx.reply(`💰 *${serviceName}* for *${model}* is estimated at *${priceRange}*`, { parse_mode: 'Markdown' });

  await ctx.reply(`🙏 Thank you for your time. *${serviceName}* for *${model}* is available now. Please come and visit our store!`, { parse_mode: 'Markdown' });
});

// Launch bot
bot.launch();
console.log("🤖 Technogeek Bot with full service menu is running...");

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));