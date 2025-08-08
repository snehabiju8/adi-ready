const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get random mosquito quote
app.get('/api/quote', (req, res) => {
  const quotes = [
    "Stop using Odomos, it hurts my feelings! 😢",
    "Kothamangalam blood is the sweetest, machane! 🩸",
    "Kaapi kittumo? I need energy for flying! ☕",
    "Your AC is too cold, I'm getting pneumonia! 🥶",
    "Myr, why you slapping so hard? 👋",
    "I just wanted to give you a small kiss, ketto! 💋",
    "Your blood group is O+? Premium quality! 🍷",
    "Stop moving, I'm trying to have dinner here! 🍽️",
    "Coconut oil makes you taste weird, chetta! 🥥",
    "I studied in engineering college too, respect me! 🎓",
    "Your grandma's blood was much tastier! 👵",
    "I'm just trying to make you immune to malaria! 💉",
    "Ente ponnu, just one small bite please! 🥺",
    "I have a family to feed, understand my struggle! 👨‍👩‍👧‍👦",
    "Your WiFi password? I want to order food online! 📱",
    "Paavam, I'm just a small mosquito with big dreams! ✨",
    "I graduated from IIT (Insect Institute of Technology)! 🏫",
    "Auto driver blood tastes like petrol, avoid! ⛽",
    "IT employees have coding errors in their blood! 💻",
    "Fish curry smell is confusing my GPS! 🐟",
    "Monsoon season is our Onam celebration time! 🌧️",
    "I'm doing PhD in Human Irritation Studies! 📚",
    "Your fan speed is too high, I'm getting dizzy! 🌪️",
    "Ayyo, this repellent cream is like acid bath! 🧴",
    "I charge only 1 microliter, very reasonable rate! 💰",
    "Your typing sound is disturbing my meditation! ⌨️",
    "I'm not just mosquito, I'm aerospace engineer! ✈️",
    "Climate change is affecting our flight patterns! 🌍",
    "Your mobile radiation is giving me headache! 📡",
    "Beef fry smell makes me vegetarian instantly! 🥩"
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

app.listen(PORT, () => {
  console.log(`🦟 Adi Ready app running on port ${PORT}`);
});