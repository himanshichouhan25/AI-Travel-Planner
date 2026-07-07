<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=AI%20Travel%20Planner&fontSize=48&fontColor=ffffff&animation=fadeIn&desc=Your%20Personal%20Agentic%20AI%20Trip%20Architect&descAlignY=60&descSize=18" width="100%"/>

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=24&duration=3000&pause=800&color=A855F7&center=true&vCenter=true&width=600&lines=Plan+Smarter.+Travel+Better.;Powered+by+Multi-Agent+AI+%F0%9F%A4%96;CrewAI+%2B+Groq+%2B+FastAPI+%2B+React)](https://git.io/typing-svg)

<br/>

![Visitors](https://api.visitorbadge.io/api/visitors?path=himanshichouhan25%2Fai-travel-planner&label=Visitors&countColor=%23A855F7)
![Stars](https://img.shields.io/github/stars/himanshichouhan25/ai-travel-planner?style=for-the-badge&color=A855F7)
![Forks](https://img.shields.io/github/forks/himanshichouhan25/ai-travel-planner?style=for-the-badge&color=8B5CF6)
![License](https://img.shields.io/badge/license-MIT-6D28D9?style=for-the-badge)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![CrewAI](https://img.shields.io/badge/CrewAI-6D28D9?style=for-the-badge&logo=robotframework&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## 🌍 About The Project

**AI Travel Planner** is a full-stack **Agentic AI** application that turns your trip idea into a complete, personalized itinerary — automatically.

Instead of one AI answering everything, this app uses a **team of AI agents** that talk to each other:

- 🧭 **Planner Agent** — builds your day-by-day itinerary
- 💰 **Budget Agent** — checks and optimizes your spending
- 🔍 **Reflection Agent** — reviews and improves the final plan

### Why this project?

Planning a trip usually means 10 open tabs, spreadsheets, and stress. This project solves that by giving you **one AI-powered dashboard** for the whole journey — from destination research to budget breakdown.

### Who is it for?

- 🧳 Travelers who want a fast, smart itinerary
- 👩‍💻 Developers learning **multi-agent AI systems**
- 🎓 Students exploring **CrewAI + FastAPI + React** in a real project

---

## 📸 Project Preview

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) |

| Login | Register |
|:---:|:---:|
| ![Login](./screenshots/login.png) | ![Register](./screenshots/register.png) |

| AI Planner (Input) | AI Planner (Result) |
|:---:|:---:|
| ![Planner](./screenshots/planner.png) | ![Planner Result](./screenshots/planner-result.png) |

| Day-by-Day Itinerary | Preferences |
|:---:|:---:|
| ![Itinerary](./screenshots/planner-itinerary.png) | ![Preferences](./screenshots/preferences.png) |

| Profile |
|:---:|
| ![Profile](./screenshots/profile.png) |

---

## 🎬 Demo

<div align="center">
  <img src="./demo/demo.gif" alt="Demo GIF" width="80%">
</div>

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[React Frontend] --> B[FastAPI Backend]
    B --> C[CrewAI Orchestrator]
    C --> D[Planner Agent]
    C --> E[Budget Agent]
    C --> F[Reflection Agent]
    D --> G[Groq LLM]
    E --> G
    F --> G
    G --> H[Final Itinerary Response]
    H --> A
```

---

## 🤖 Multi-Agent Workflow

```mermaid
flowchart LR
    U[User Input] --> P[Planner Agent<br/>Builds Itinerary]
    P --> B[Budget Agent<br/>Optimizes Cost]
    B --> R[Reflection Agent<br/>Reviews & Refines]
    R --> O[Final Travel Plan]
```

Each agent has one job. They pass results forward — like a relay race — so the final plan is accurate, budget-aware, and polished.

---

## 📂 Folder Structure

```
ai-travel-planner/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── planner_agent.py
│   │   │   ├── budget_agent.py
│   │   │   └── reflection_agent.py
│   │   ├── tools/
│   │   │   ├── weather_tool.py
│   │   │   └── budget_calculator.py
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── trips.py
│   │   │   ├── preferences.py
│   │   │   └── ai.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
├── demo/
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/himanshichouhan25/ai-travel-planner.git
cd ai-travel-planner
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Fill in your keys (see table below)
```

### 4. Run Backend
```bash
uvicorn app.main:app --reload
```

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Database connection string |
| `SECRET_KEY` | JWT signing secret |
| `GROQ_API_KEY` | Groq LLM API key |
| `MODEL_NAME` | Groq model name (e.g. llama-3.3-70b) |
| `WEATHER_API_KEY` | Weather API key |
| `WEATHER_BASE_URL` | Weather API base URL |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT token expiry time |

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/auth/me` | Get current user profile |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| GET | `/trips/` | Get all trips |
| POST | `/trips/` | Create a new trip |
| GET | `/trips/{id}` | Get trip details |
| DELETE | `/trips/{id}` | Delete a trip |

### Preferences
| Method | Endpoint | Description |
|---|---|---|
| GET | `/preferences/` | Get saved preferences |
| PUT | `/preferences/` | Update preferences |

### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/ai/generate-plan` | Generate AI travel itinerary |
| GET | `/ai/weather/{city}` | Get weather for destination |
| POST | `/ai/budget` | Get budget breakdown |

---

## 🛠️ Tech Stack

<table align="center">
<tr>
<td valign="top" width="25%">

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Shadcn UI
- Axios
- React Router
- React Hook Form
- Zod

</td>
<td valign="top" width="25%">

**Backend**
- FastAPI
- SQLAlchemy
- SQLite
- JWT Auth
- OAuth2
- Passlib
- Pydantic

</td>
<td valign="top" width="25%">

**AI Layer**
- CrewAI
- Groq LLM
- Multi-Agent System

</td>
<td valign="top" width="25%">

**Agents & Tools**
- Planner Agent
- Budget Agent
- Reflection Agent
- Weather Tool
- Budget Calculator

</td>
</tr>
</table>

---

## ✨ Features

| | | |
|---|---|---|
| 🧭 AI Trip Planning | 🔐 Secure JWT Login | 📊 Dashboard |
| 📜 Trip History | 💰 Budget Planning | 🌦️ Weather Info |
| ⚙️ Preference Management | 🤖 Agentic AI Workflow | ⚡ FastAPI Backend |
| 🎨 Modern React UI | 📱 Responsive Design | 🧱 Clean Architecture |
| 🧠 Memory Ready | 🔌 Extensible Multi-Agent Design | 🚀 Production Ready |

---

## 🗺️ Roadmap

- [ ] ✈️ Flight API Integration
- [ ] 🗺️ Google Maps Integration
- [ ] 🏨 Hotel Booking API
- [ ] 💬 AI Chat Assistant
- [ ] 🎙️ Voice Assistant
- [ ] 💱 Currency Conversion
- [ ] 📄 PDF Export
- [ ] 🔗 Trip Sharing
- [ ] 📧 Email Itinerary
- [ ] 🔔 Notifications
- [ ] 🌙 Dark Mode Improvements
- [ ] 🐳 Docker Deployment
- [ ] 🧵 Redis Caching
- [ ] 🐘 PostgreSQL Migration
- [ ] 🔁 CI/CD Pipeline

---

## 📈 GitHub Stats

<div align="center">

![Stats](https://github-readme-stats.vercel.app/api?username=himanshichouhan25&show_icons=true&theme=tokyonight&hide_border=true)
![Streak](https://github-readme-streak-stats.herokuapp.com/?user=himanshichouhan25&theme=tokyonight&hide_border=true)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=himanshichouhan25&layout=compact&theme=tokyonight&hide_border=true)

</div>

---

## 🤝 Contributing

Contributions make open source great! Here's how:

1. Fork the repository
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 📬 Contact

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-himanshichouhan25-181717?style=for-the-badge&logo=github)](https://github.com/himanshichouhan25)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](#)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](#)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-6D28D9?style=for-the-badge&logo=firefox)](#)

</div>

---

## ⭐ Support

If this project helped you, please consider:

- ⭐ **Starring** the repo
- 🍴 **Forking** it
- 🐛 **Reporting issues**
- 🤝 **Contributing**

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer"/>

Made  by **Himanshi Chouhan**

</div>
