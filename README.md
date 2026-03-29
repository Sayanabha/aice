# I crave ice cream.

So I built Aice. An AI-powered ice cream shop where a penguin named Pengu reads
your mood and tells you what to eat. As one does.

Live at https://aice-pied-three.vercel.app

---

## What it does

- Pengu, the mood-based AI recommender, asks how you feel and picks your scoop
- Full menu with filters, search, and flavor detail sheets
- Cart, checkout, and order history that actually works
- Razorpay payment integration in test mode
- Dark mode, because some cravings hit at 2am

---

## Tech stack

- React + Vite
- Groq API running LLaMA 3.3 70B (fast, free, does not judge your ice cream choices)
- Razorpay (test mode)
- Plain CSS with variables, no UI library, no regrets

---

## Getting started

Clone it:

    git clone https://github.com/YOUR_USERNAME/aice.git
    cd aice

Install things:

    npm install

Create a .env file in the root:

    VITE_GROQ_API_KEY=your_groq_key_here
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_here

Run it:

    npm run dev

Open http://localhost:5173 and let Pengu judge your emotional state.

---

## Test payment

Razorpay is in test mode. Use this card and nothing bad will happen:

    Card number  : 4111 1111 1111 1111
    Expiry       : Any future date
    CVV          : Any 3 digits
    OTP          : 1234

---

## Project structure

    src/
    +-- api/           Groq API call
    +-- components/    Header, BottomNav, Toast, ItemDetailSheet
    +-- data/          Flavor and mood data
    +-- pages/         HomePage, MenuPage, MoodPage, Cart, Checkout, Orders
    +-- styles/        global.css with light and dark mode variables

---

## Notes

This is a hobby project. Pengu is not a licensed nutritionist.
The ice cream is fictional. The cravings are very real.