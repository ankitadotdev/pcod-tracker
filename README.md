# 🌸 PCOD Period Tracker

A simple **web-based PCOD Period Tracker** built using **HTML, CSS, and JavaScript**.  
This app helps users estimate their **next expected period window**, track **stress levels**, and visualize the predicted period window on a **calendar**.

> ⚠️ This project is for **educational and awareness purposes only** and is **not a medical diagnosis tool**.

---

## ✨ Features

- 📅 **Period Window Prediction**  
  Calculates expected period window based on last period date and cycle length.

- 🗓 **Calendar Highlighting**  
  Automatically highlights predicted period days on a monthly calendar.

- 📊 **Stress Level Tracking**  
  Users can log their stress level using a slider.

- 📋 **Instant Results**  
  Displays predicted window immediately after tracking.

- 🎨 **Clean UI**  
  Simple and mobile‑friendly design.

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling  
- **JavaScript (Vanilla JS)** – Application logic  

No external libraries or frameworks are used.

---

## 📂 Project Structure

```
pcod-period-tracker/
│
├── index.html      # Main UI of the app
├── style.css       # Styling and layout
├── script.js       # App logic and calculations
└── README.md       # Project documentation
```

---

## ⚙️ How It Works

1. User enters:
   - Last period start date
   - Average cycle length

2. The app calculates the predicted window:

```
Start Date = Last Period Date + (Cycle Length - 4)
End Date   = Last Period Date + (Cycle Length + 4)
```

3. The predicted window is:

- Displayed in the result section
- Highlighted on the calendar

---

## 🚀 How to Run the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/pcod-period-tracker.git
```

### 2️⃣ Open the project folder

```
cd pcod-period-tracker
```

### 3️⃣ Run the app

Simply open:

```
index.html
```

in your browser.

No installation or server required.

---

## 📸 Usage

1. Enter **Last Period Date**
2. Enter **Cycle Length**
3. Adjust **Stress Level**
4. Click **Track Cycle**
5. View:
   - Predicted period window
   - Highlighted calendar days

---

## 🔮 Future Improvements

Possible upgrades for this project:

- 📊 Cycle history tracking
- 🌼 Ovulation prediction
- 📱 Improved mobile UI
- 💾 Data storage with LocalStorage
- 🌐 Deploy as a live web app
- 🧠 Health insights and tips

---

## ⚠️ Disclaimer

This application is designed for **educational and awareness purposes only**.  
It should **not replace professional medical advice**.

---

## 👩‍💻 Author
**Ankita**

---

⭐ If you found this project helpful, consider **starring the repository**.