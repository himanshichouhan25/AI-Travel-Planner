# PROJECT REPORT: AGENTIC AI TRAVEL PLANNER

---

## 1. Cover Page

### **A PROJECT REPORT ON**
## **AGENTIC AI TRAVEL PLANNER**

*Submitted in partial fulfillment of the requirements for the award of the degree of*
### **Bachelor of Technology / Bachelor of Science**
*in*
### **Computer Science and Engineering / Information Technology**

---

#### **Prepared By:**
**Author:** [Your Name]  
**Enrollment No:** [Your Enrollment Number]  

#### **Under the Guidance of:**
**Project Guide:** [Guide's Name & Designation]  

---

<br/>

![College Logo Placeholder](https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=300)

<br/>

#### **Department of Computer Science and Engineering**
#### **[Your College/University Name]**
#### **Academic Year: 2025 - 2026**

---
\pagebreak

## 2. Certificate

### **[YOUR COLLEGE/UNIVERSITY NAME]**
#### **Department of Computer Science and Engineering**

<br/>

### **CERTIFICATE**

This is to certify that the project report entitled **"Agentic AI Travel Planner"** is a bonafide record of work carried out by **[Your Name]** under my supervision and guidance. The project has been approved as satisfying the academic requirements for the final year project submission.

<br/><br/><br/>

__________________________  
**[Guide's Name]**  
Project Guide  
Department of CSE  

<br/><br/>

__________________________  
**[Head of Department]**  
Head of Department  
Department of CSE  

<br/><br/>

**Internal Examiner:** ____________________  
**External Examiner:** ____________________  

**Date:** [Date]  
**Place:** [Place]  

---
\pagebreak

## 3. Acknowledgement

I would like to express my deep sense of gratitude to my project guide, **[Guide's Name]**, for their invaluable guidance, constant encouragement, and critical feedback throughout the development of the **Agentic AI Travel Planner**. Their insights helped shape both the architecture and implementation of this system.

I am also highly indebted to **[Head of Department]**, Head of the Department of Computer Science, for providing the necessary infrastructure, facilities, and resource accessibility to make this project a success.

Lastly, I express my sincere thanks to my family, friends, and peers who supported me during the project development lifecycle. Their constant encouragement was vital in overcoming technical hurdles and meeting academic deadlines.

**— [Your Name]**

---
\pagebreak

## 4. Abstract

Manual travel planning is a highly fragmented and cognitively exhausting task. Users must navigate multiple booking websites, compare hotel pricing, check weather forecasts, search for local sightseeing attractions, and manually align all variables with their personal preferences and budget limits. Traditional single-prompt LLM chatbots partially assist this process but struggle with real-time computations, suffer from hallucinations, and fail to coordinate competing constraints (e.g., matching a tight budget with premium destinations).

This project presents the **Agentic AI Travel Planner**, a multi-agent system designed to automate comprehensive travel itinerary generation. Built using **FastAPI** for the backend, **React (Vite) and Tailwind CSS** for the frontend, and the **CrewAI** orchestrator framework, the system leverages specialized autonomous AI agents. These agents include a **Planner Agent**, a **Budget Agent**, and a **Reflection Agent** working in a cooperative loop.

```mermaid
graph TD
    A[User Input] --> B[Planner Agent: Drafts Route & Sights]
    B --> C[Budget Agent: Calculates & Re-allocates Funds]
    C --> D[Reflection Agent: Audits Quality & Safety Constraints]
    D -->|Fails Audit| B
    D -->|Passes Audit| E[Database & Frontend Output]
```

By connecting these agents to real-time external APIs (OpenWeatherMap for weather forecasts and Geoapify for spatial geocoding) and running them on top of the high-speed **Groq Llama 3** inference engine, the application delivers validated, context-aware, and budget-optimized itineraries. The entire platform operates using secure **JWT (JSON Web Token) authentication** and stores user history persistently, providing a production-grade, card-free, serverless deployment.

---
\pagebreak

## 5. Table of Contents

1. [Cover Page](#1-cover-page)
2. [Certificate](#2-certificate)
3. [Acknowledgement](#3-acknowledgement)
4. [Abstract](#4-abstract)
5. [Table of Contents](#5-table-of-contents)
6. [Introduction](#6-introduction)
7. [Problem Statement](#7-problem-statement)
8. [Objectives](#8-objectives)
9. [Scope of the Project](#9-scope-of-the-project)
10. [Literature Survey](#10-literature-survey)
11. [Technology Stack](#11-technology-stack)
12. [System Requirements](#12-system-requirements)
13. [Project Architecture](#13-project-architecture)
14. [Workflow](#14-workflow)
15. [Agentic AI Architecture](#15-agentic-ai-architecture)
16. [Tools Used by Agents](#16-tools-used-by-agents)
17. [Backend Architecture](#17-backend-architecture)
18. [Frontend Architecture](#18-frontend-architecture)
19. [Database Design](#19-database-design)
20. [Authentication Flow](#20-authentication-flow)
21. [API Documentation](#21-api-documentation)
22. [Frontend and Backend Integration](#22-frontend-and-backend-integration)
23. [Complete Request Lifecycle](#23-complete-request-lifecycle)
24. [Sequence Diagram](#24-sequence-diagram)
25. [Deployment Process](#25-deployment-process)
26. [Security](#26-security)
27. [Performance Optimization](#27-performance-optimization)
28. [Advantages](#28-advantages)
29. [Limitations](#29-limitations)
30. [Future Enhancements](#30-future-enhancements)
31. [Testing](#31-testing)
32. [Results](#32-results)
33. [Conclusion](#33-conclusion)
34. [References](#34-references)

---
\pagebreak

## 6. Introduction

### **What is Travel Planning?**
Travel planning is the sequential process of scheduling destinations, accommodation, budgets, local transportation, and daily sightseeing activities. It is a highly multi-variable optimization problem where time, geography, cost, weather, and user interest must align.

### **Problems in Manual Travel Planning**
A typical traveler spends hours browsing different portals:
- Checking blogs for locations.
- Navigating maps for travel route feasibility.
- Reading weather tables to decide travel dates.
- Computing expenses on spreadsheets to prevent budget overruns.
This fragmented workflow often results in decision paralysis and poorly structured travel routes.

### **The Need for AI**
Artificial Intelligence, particularly Large Language Models (LLMs), has changed search paradigms by allowing natural language requests. Instead of searching fifty web links, a user can ask: *"Create a 3-day family trip to Paris for $500."* 

### **The Need for Multi-Agent AI (Agentic AI)**
A single, basic LLM prompt often fails at complex planning:
- It cannot calculate mathematical budgets accurately (LLMs are next-token predictors, not math engines).
- It cannot check actual weather data for next week.
- It suffers from "hallucinations," fabricating nonexistent attractions or hotels.

**Agentic AI** addresses this by shifting from simple prompt responses to autonomous loops of **Reasoning, Planning, and Tool Calling**. By using multiple cooperative agents (each with its own role, system prompts, and tools), the workload is distributed:
- Agent A researches destinations.
- Agent B calculates costs.
- Agent C audits the plan.
This collaborative approach mimics human organizations, delivering highly validated results.

---
\pagebreak

## 7. Problem Statement

Traditional travel planning tools lack integration and contextual reasoning. This project addresses the following primary pain points:

| Pain Point | Detail / Impact |
| :--- | :--- |
| **Information Overload** | Users must cross-reference hotel sites, tourist boards, weather networks, and maps. |
| **Mathematical Hallucinations** | Basic LLMs cannot accurately calculate daily budgets, food costs, and hotel stays, leading to incorrect totals. |
| **Ignoring Environmental Context** | Itineraries are generated without verifying actual weather conditions, leading to outdoor plans during storms. |
| **Static Templates** | Most travel planning sites provide generic, rigid packages that fail to adapt to a user's specific interests (e.g., history, culinary, adventure). |
| **CORS and Latency Constraints** | Modern web apps must coordinate these tasks without crashing the browser or hitting API connection limits. |

---
\pagebreak

## 8. Objectives

The primary engineering and functional objectives of this project are:
1. **Develop an Autonomous Multi-Agent Orchestrator** using CrewAI to split travel planning into research, math computation, and quality assurance tasks.
2. **Implement Real-time Tool Calling** to enable AI agents to fetch live weather data via OpenWeatherMap and retrieve coordinate spatial data via Geoapify.
3. **Ensure Strict Mathematical Validation** of travel budgets using a programmatic feedback loop in python.
4. **Build a Modern, Responsive Web Interface** in React with Tailwind CSS and Shadcn UI, featuring loading state notifications, interactive dashboards, and trip detail cards.
5. **Establish Secure User Management** by implementing OAuth2 password hashing (via `bcrypt`) and JSON Web Token (JWT) session authorization.
6. **Deploy Using Card-free Serverless Architecture** (Vercel, Render, and Neon PostgreSQL) for global access.

---
\pagebreak

## 9. Scope of the Project

### **Current Scope**
- User registration, login, and profile preference storage.
- Interactive questionnaire to define destination, budget, travel style, and duration.
- Multi-agent workflow executing in the backend to generate daily itinerary plans.
- Dynamic tool integration to pull real-time weather forecasts and location geocoding.
- Trip saving and persistent dashboard retrieval.

### **Future Scope**
- Live booking integration for hotels and transportation using affiliate APIs.
- Interactive map visualization showing routes and points of interest.
- Retrieval-Augmented Generation (RAG) to scan local guides and travel blogs for offbeat recommendations.
- Interactive voice assistant for real-time plan modifications on mobile devices.
- Group travel collaboration workspace.

### **Industrial Applications**
- Integration into corporate travel management software.
- Custom white-label B2B planning tools for travel agencies and tour operators.
- Dynamic concierge plug-ins for hotel chain websites.

---
\pagebreak

## 10. Literature Survey

The table below contrasts the **Agentic AI Travel Planner** with current alternatives:

| Platform | Strengths | Limitations | Agentic AI Planner Advantage |
| :--- | :--- | :--- | :--- |
| **Google Travel** | Excellent map integration, live flight pricing. | No custom scheduling or text-based personalization. | Generates tailored narrative schedules based on custom user personas. |
| **TripAdvisor** | Massive library of user reviews and ratings. | Fragmented; user must still compile reviews into an itinerary manually. | Automates review scanning and directly structures them into a daily timeline. |
| **ChatGPT / Gemini (Single Chat)** | Natural conversational interface. | Hallucinates coordinates, bad math computations, lacks real-time APIs. | Uses dedicated tools (OpenWeather/Geoapify) and a validation agent to prevent errors. |
| **Traditional Travel Agencies** | Human touch, curated itineraries. | Expensive, slow response times, static packages. | Free, instantaneous generation, customizable on demand. |

---
\pagebreak

## 11. Technology Stack

### **1. Python**
- **What it is**: High-level, general-purpose programming language.
- **Why we used it**: Standard language for AI, agent orchestration (CrewAI), and backend engineering.
- **Advantages**: Comprehensive library ecosystem, strong data structures, clean syntax.
- **Project Role**: All backend routing, database definitions, and AI agent execution codes are written in Python.

### **2. FastAPI**
- **What it is**: High-performance, asynchronous web framework for building APIs with Python.
- **Why we used it**: Extremely fast execution times, native support for async processes, and automatic OpenAPI documentation.
- **Advantages**: Fast, automatic validation via Pydantic, built-in dependency injection.
- **Project Role**: Serves as our REST API backend, handling authentication requests, preference saving, and running the background CrewAI processes.

### **3. React**
- **What it is**: JavaScript library for building user interfaces.
- **Why we used it**: Dynamic state management allows for a smooth, single-page application (SPA) experience.
- **Advantages**: Component reusability, virtual DOM optimization, robust community.
- **Project Role**: Builds the complete interactive user interface, login forms, planner input panels, and dashboard displays.

### **4. Vite**
- **What it is**: Next-generation frontend tooling and build server.
- **Why we used it**: Provides extremely fast hot module replacement (HMR) and optimized build times compared to Webpack.
- **Advantages**: Fast setup, native ESM support, quick bundling.
- **Project Role**: Bundles and compiles our React/Tailwind frontend project for production.

### **5. Tailwind CSS**
- **What it is**: A utility-first CSS framework.
- **Why we used it**: Allows for rapid UI prototyping directly inside HTML markup.
- **Advantages**: Highly custom styling controls, built-in responsive utilities, clean performance footprint.
- **Project Role**: Handled all visual designs, colors, spacing, glassmorphic cards, and hover effects across the UI.

### **6. Shadcn UI**
- **What it is**: Reusable component library built on Radix UI and Tailwind CSS.
- **Why we used it**: Delivers accessible, clean, and customizable UI components.
- **Advantages**: Out-of-the-box keyboard navigation, screen reader compatibility, consistent styling.
- **Project Role**: Provided pre-styled dialogs, input panels, dropdown menus, and dashboard cards.

### **7. SQLAlchemy**
- **What it is**: Object-Relational Mapper (ORM) for Python.
- **Why we used it**: Allows database operations to be written in standard python code instead of raw SQL queries.
- **Advantages**: SQL injection prevention, support for multiple databases (SQLite and PostgreSQL).
- **Project Role**: Abstracts database tables into Python classes, managing relationships between Users, Trips, and Preferences.

### **8. PostgreSQL & SQLite**
- **What it is**: SQLite is a lightweight file-based SQL database. PostgreSQL is a powerful open-source object-relational database system.
- **Why we used it**: SQLite is used for local development. PostgreSQL is used for cloud storage.
- **Advantages**: SQLite is zero-configuration. PostgreSQL handles multi-user concurrent writes and doesn't erase files on ephemeral cloud servers.
- **Project Role**: Stores all user login information, travel plans, and travel styles.

### **9. JWT (JSON Web Token)**
- **What it is**: Compact URL-safe means of representing claims to be transferred between two parties.
- **Why we used it**: Stateless authorization. The backend does not need to store active sessions in memory.
- **Advantages**: Secure signature verification, low overhead, ease of transmission in headers.
- **Project Role**: Used to authorize secure routes (such as saving or fetching travel plans) by attaching tokens to request headers.

### **10. CrewAI**
- **What it is**: Multi-agent framework for orchestrating role-playing autonomous AI agents.
- **Why we used it**: Simplifies agent creation, tool assignment, and sequential/hierarchical collaboration loops.
- **Advantages**: Clean abstract layers for Agents, Tasks, and Crews. Custom tool support.
- **Project Role**: Coordinates the Planner Agent, Budget Agent, and Reflection Agent.

### **11. Groq & Llama 3**
- **What it is**: Groq is an ultra-fast AI inference platform. Llama 3 is Meta's state-of-the-art open-source LLM.
- **Why we used it**: Groq's LPU (Language Processing Unit) yields inference speeds exceeding 300 tokens/second, making real-time planning fast.
- **Advantages**: Low latency, high response accuracy, cost-effective API access.
- **Project Role**: Acts as the LLM brain powering all agent reasoning and text generation.

### **12. APIs (OpenWeatherMap & Geoapify)**
- **What it is**: Remote data services. OpenWeatherMap returns weather forecasts; Geoapify returns geographic geocoding.
- **Why we used it**: Real-time physical world verification (weather conditions and map coordinate points).
- **Advantages**: High reliability, detailed global coverage.
- **Project Role**: Agents invoke these services as programmatic Python tools during itinerary creation.

---
\pagebreak

## 12. System Requirements

### **Hardware Requirements**
- **Processor**: Intel Core i5 (8th Gen or above) / AMD Ryzen 5 or equivalent.
- **Memory**: 8 GB RAM minimum (16 GB recommended for concurrent docker/database setups).
- **Storage**: 500 MB free disk space for project installation.

### **Software Requirements**
- **Operating System**: Windows 10/11, macOS Catalina or above, Ubuntu 20.04 LTS or above.
- **Browser**: Google Chrome 100+, Mozilla Firefox 100+, Microsoft Edge, or Safari.
- **Python Runtime Environment**: Python version `3.10` to `3.12` (Python 3.14+ is not supported by dependencies).
- **Node.js Environment**: Node.js v18 or above (with npm v9 or above).

### **Python Packages (Libraries)**
- `fastapi==0.136.3`
- `uvicorn==0.48.0`
- `sqlalchemy==2.0.51`
- `pydantic-settings==2.14.2`
- `crewai==0.203.2`
- `psycopg2-binary>=2.9.9`
- `bcrypt==4.1.2`
- `python-jose==3.5.0`
- `httpx==0.28.1`

---
\pagebreak

## 13. Project Architecture

The application uses a modular, decoupled architecture consisting of four layers: **Frontend (UI) Layer**, **Backend (API) Layer**, **AI (Orchestration) Layer**, and **Database (Persistence) Layer**.

```
+---------------------------------------------------------+
|                  React Client (Vite)                    |
|  +--------------------+         +--------------------+  |
|  |     Planner UI     |         |     Auth Portal    |  |
|  +---------+----------+         +---------+----------+  |
+------------|------------------------------|-------------+
             | REST Requests                | Login / Register
             | (HTTP/JSON/JWT)              | (POST)
             v                              v
+------------|------------------------------|-------------+
|            |       FastAPI Server         |             |
|  +---------v----------+         +---------v----------+  |
|  |    Router: /trips  |         |    Router: /auth   |  |
|  +---------+----------+         +---------+----------+  |
|            |                              |             |
|            | Invokes                      | SQLAlchemy  |
|            v                              | Models      |
|  +---------+----------+                   v             |
|  |    AI Service      |         +---------+----------+  |
|  |  (CrewAI Orchestr.)| <-----> |     Neon DB /      |  |
|  +---------+----------+  Query  |      SQLite        |  |
+------------|--------------------+---------+----------+  |
             |                              |             |
             | Calling Tools                | CRUD        |
             v                              v             |
+------------|--------------------------------------------+
|            |                                            |
|  +---------v----------+                                 |
|  |   External APIs    |                                 |
|  | (OpenWeather/Geo)  |                                 |
|  +--------------------+                                 |
+---------------------------------------------------------+
```

### **Communication Flow:**
1. The **React Client** sends an HTTP request containing a JSON body of trip parameters and a Bearer JWT authentication token to the **FastAPI Server**.
2. The server's dependency injection layer verifies the JWT token. If valid, it extracts the user ID.
3. The server invokes the **AI Service** in a background worker thread.
4. The **AI Service** initializes a **CrewAI** instance. The agents compile tasks, calling the **OpenWeatherMap API** and **Geoapify API** using local Python tools.
5. Once finalized, the plan data is stored in the database via **SQLAlchemy**, and a success response is returned to the client for rendering.

---
\pagebreak

## 14. Workflow

```mermaid
flowchart TD
    Start([User opens Web App]) --> Auth{User Authenticated?}
    Auth -->|No| Login[Enter Username & Password]
    Login --> Register[Sign Up if New User]
    Register --> Login
    Login --> Dashboard[Display Dashboard]
    Auth -->|Yes| Dashboard
    
    Dashboard --> ClickPlan[Click 'Plan a New Trip']
    ClickPlan --> Form[Enter Destination, Budget, Style, Days]
    Form --> Submit[Submit Plan Request]
    
    Submit --> API[FastAPI routes to AI Service]
    API --> AIInit[CrewAI runs Planner Agent]
    AIInit --> Geo[Geoapify Tool: Fetch Coordinates]
    Geo --> Weather[Weather Tool: Fetch Live Forecast]
    Weather --> BudgetAgent[Budget Agent: Calculates Hotel/Meals/Sights]
    BudgetAgent --> Reflection[Reflection Agent: Audits Cost & Feasibility]
    
    Reflection -->|Validation Failed| AIInit
    Reflection -->|Validation Passed| SaveDB[Save trip in DB]
    
    SaveDB --> Response[Return JSON data to Frontend]
    Response --> RenderUI[React renders responsive timeline card]
    RenderUI --> End([User views live itinerary])
```

---
\pagebreak

## 15. Agentic AI Architecture

### **Agent Orchestration Concept**
A Multi-Agent system works on the premise that specialized roles yield higher quality outcomes. By restricting the focus of each agent and allowing sequential execution, errors are minimized.

```
                  +--------------------------------+
                  |           CrewAI Crew          |
                  +---------------+----------------+
                                  |
                                  v
+------------------+     +------------------+     +------------------+
|  Planner Agent   | --> |   Budget Agent   | --> | Reflection Agent |
|                  |     |                  |     |                  |
| - Sights & Route |     | - Financial math |     | - QA Check       |
| - Weather check  |     | - Allocation     |     | - Route safety   |
+------------------+     +------------------+     +------------------+
```

### **Agent 1: Planner Agent**
- **Role**: Travel Itinerary Researcher.
- **Goal**: Draft a daily list of activities, locations, and restaurants based on the user's travel style.
- **Prompt Directive**:
  ```text
  You are an expert travel planner. Your job is to draft a comprehensive schedule.
  Ensure activities match the requested travel style (e.g., adventure, relaxation).
  You must use the geocoding tool to confirm locations exist and check the weather tool to verify safety.
  ```
- **Inputs**: Destination, Travel Style, Duration, Weather forecast.
- **Outputs**: Markdown itinerary drafts listing daily sightseeing locations and estimated durations.

### **Agent 2: Budget Agent**
- **Role**: Financial Auditor.
- **Goal**: Calculate all travel expenses (hotel, food, activities) and ensure they fit within the user's budget.
- **Prompt Directive**:
  ```text
  You are a financial controller. Calculate all itinerary expenses.
  If the total exceeds the user's budget limit, you must trim high-cost activities and re-allocate funds.
  Provide a detailed itemized breakdown (Hotel, Meals, Transportation, Entry Tickets).
  ```
- **Inputs**: Draft itinerary, User Budget limit.
- **Outputs**: Adjusted itinerary text with an itemized budget table.

### **Agent 3: Reflection Agent**
- **Role**: Quality Assurance Specialist.
- **Goal**: Audit the itinerary for path feasibility, timing conflicts, and safety issues.
- **Prompt Directive**:
  ```text
  You are a QA inspector. Check the travel plan for errors:
  1. Are travel times between attractions realistic?
  2. Are outdoor events scheduled during rain or extreme weather?
  3. Does the budget balance perfectly?
  If errors are found, reject the plan and send it back to the Planner Agent with correction notes.
  ```
- **Inputs**: Output from Budget Agent.
- **Outputs**: Approved itinerary JSON structure (or rejection notes).

---
\pagebreak

## 16. Tools Used by Agents

Agents execute custom Python classes derived from `crewai.tools.tool` to fetch live data.

### **1. Weather Tool**
- **Purpose**: Get real-time temperature, wind, and forecast conditions.
- **Input JSON**:
  ```json
  {
    "city": "London",
    "days": 3
  }
  ```
- **Execution Code Signature**:
  ```python
  import httpx
  from app.config import settings

  def get_weather(city: str) -> dict:
      url = f"{settings.WEATHER_BASE_URL}/forecast?q={city}&appid={settings.WEATHER_API_KEY}&units=metric"
      response = httpx.get(url)
      data = response.json()
      # Parse and return temperature and weather conditions
      return {"temp": data["list"][0]["main"]["temp"], "condition": data["list"][0]["weather"][0]["main"]}
  ```

### **2. Geocoding Tool (Geoapify)**
- **Purpose**: Confirm place name validity and retrieve latitude/longitude coordinates.
- **Input JSON**:
  ```json
  {
    "place_name": "Eiffel Tower"
  }
  ```
- **Output JSON**:
  ```json
  {
    "latitude": 48.8584,
    "longitude": 2.2945,
    "address": "Champ de Mars, Paris, France"
  }
  ```

---
\pagebreak

## 17. Backend Architecture

Below is the directory layout of the FastAPI application located inside `backend/`:

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py               # API Initialization, CORS, and Router Inclusion
│   ├── config.py             # Settings configuration via Pydantic
│   ├── database.py           # SQLAlchemy DB engines, session local definitions
│   ├── agents/               # CrewAI Configuration
│   │   ├── __init__.py
│   │   ├── config.py         # LLM configuration (Groq setup)
│   │   ├── planner_agent.py  # Agent and Task structures
│   │   └── crew.py           # Crew execution loops
│   ├── models/               # SQLAlchemy Database Models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── trip.py
│   ├── routers/              # API Route Controllers
│   │   ├── __init__.py
│   │   ├── auth_router.py
│   │   └── trip_router.py
│   ├── schemas/              # Pydantic validation structures
│   │   ├── __init__.py
│   │   ├── auth_schema.py
│   │   └── trip_schema.py
│   └── tools/                # Agent tools
│       ├── __init__.py
│       ├── weather_tool.py
│       └── geocoding_tool.py
├── requirements.txt          # Python production dependencies list
└── travel_planner.db         # SQLite local development database file
```

---
\pagebreak

## 18. Frontend Architecture

Below is the directory structure of the React single page application inside `frontend/`:

```
frontend/
├── src/
│   ├── main.jsx             # React mounting entry point
│   ├── App.jsx              # Routing configurations (React Router Dom)
│   ├── index.css            # Tailwind directives and custom glassmorphism layers
│   ├── components/          # Reusable components
│   │   ├── ui/              # Shadcn primitive elements (buttons, inputs)
│   │   ├── landing/         # Landing page subsections (Hero, Stats, CTA)
│   │   ├── dashboard/       # Sidebar navbar, analytics cards
│   │   └── planner/         # Questionnaire forms, day itinerary timelines
│   ├── pages/               # Page routing containers
│   │   ├── Landing/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   └── Planner/
│   ├── lib/
│   │   └── axios.js         # Custom Axios client with bearer token interception
│   └── utils/
│       └── token.js         # Browser localStorage helpers
├── package.json             # Node dependencies and scripts
└── vite.config.js           # Tailwind and React compiler configuration
```

---
\pagebreak

## 19. Database Design

The system uses a relational database schema. Below is the ER Diagram:

```mermaid
erDiagram
    USERS {
        int id PK
        string username
        string email
        string hashed_password
    }
    TRIPS {
        int id PK
        int user_id FK
        string destination
        float budget
        int days
        string style
        string itinerary_json
        datetime created_at
    }
    PREFERENCES {
        int id PK
        int user_id FK
        string accommodation_preference
        string pace_preference
    }
    USERS ||--o{ TRIPS : "creates"
    USERS ||--|| PREFERENCES : "defines"
```

### **Table Definitions**

#### **Users Table**
- `id` (Integer, Primary Key, Autoincrement)
- `username` (Varchar, Unique, Index)
- `email` (Varchar, Unique, Index)
- `hashed_password` (Varchar)

#### **Trips Table**
- `id` (Integer, Primary Key, Autoincrement)
- `user_id` (Integer, Foreign Key pointing to `users.id`)
- `destination` (Varchar)
- `budget` (Float)
- `days` (Integer)
- `style` (Varchar)
- `itinerary_json` (Text / JSON, holds the generated itinerary text)
- `created_at` (DateTime, defaults to current time)

---
\pagebreak

## 20. Authentication Flow

The application implements state-free user session management:

```
+---------------+           +----------------+           +----------------------+
|  React Client |           | FastAPI Server |           | bcrypt / Database    |
+-------+-------+           +-------+--------+           +----------+-----------+
        |                           |                               |
        | Register User (Email/Pass)|                               |
        +-------------------------->+                               |
        |                           | hash password                 |
        |                           +------------------------------>+
        |                           | store user details            |
        |                           |<------------------------------+
        | User Created (Success)    |                               |
        |<--------------------------+                               |
        |                           |                               |
        | Login Request (Email/Pass)|                               |
        +-------------------------->+                               |
        |                           | query user, check password    |
        |                           +------------------------------>+
        |                           | generate JWT token            |
        |                           |<------------------------------+
        | Returns Token             |                               |
        |<--------------------------+                               |
        |                           |                               |
        | Secure Request + Token    |                               |
        | (Bearer Header)           |                               |
        +-------------------------->+                               |
        |                           | decode & verify signature     |
        |                           +------------------------------>|
        | Returns Private Data      |                               |
        |<--------------------------+                               |
```

1. **Password Security**: Passwords are never stored in plain text. We use `bcrypt` to generate strong hashes with a default salt factor of 12.
2. **Token Structure**: The generated JWT contains a header (signing algorithm `HS256`), a payload (containing user ID and expiration claims), and a cryptographic signature verifying integrity.

---
\pagebreak

## 21. API Documentation

| Method | Endpoint | Purpose | Authorization | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | Register a new user account. | None | `201 Created`, `400 Bad Request` |
| **POST** | `/auth/token` | Log in and obtain a JWT bearer token. | None | `200 OK`, `401 Unauthorized` |
| **GET** | `/auth/me` | Fetch active user information. | Bearer Token | `200 OK`, `401 Unauthorized` |
| **POST** | `/trips/generate` | Start the CrewAI planning process. | Bearer Token | `200 OK`, `422 Unprocessable` |
| **GET** | `/trips/my-trips` | Fetch all historical plans for this user. | Bearer Token | `200 OK`, `401 Unauthorized` |
| **DELETE** | `/trips/{id}` | Delete a trip. | Bearer Token | `200 OK`, `404 Not Found` |

---
\pagebreak

## 22. Frontend and Backend Integration

Communication between the React client and the FastAPI backend uses the **Axios** library with interceptors:

```javascript
import axios from "axios";
import { getToken } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
});

// Interceptor to inject JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

When a user submits the itinerary questionnaire:
1. The page enters a loading state (`isLoading: true`) and shows custom planning messages.
2. Axios triggers a POST request to `/trips/generate`.
3. If successful, the response payload is bound to the component state (`setItinerary(response.data)`) and rendered.
4. Error states are caught and shown to the user using toast messages (e.g. `react-hot-toast`).

---
\pagebreak

## 23. Complete Request Lifecycle

Let's walk through the full lifecycle of a user planning a trip:

```
[User Input: Paris, $600, 3 Days, Active]
  |
  v
[Vite Frontend] --(POST /trips/generate with Bearer token)--> [FastAPI App]
                                                                  |
                                                (Token validation check)
                                                                  |
                                                                  v
[CrewAI Core] <===========================================> [FastAPI Core]
  |
  +--> [Planner Agent] --> Calls Geocoding Tool for "Paris" coordinates
  |                        Calls Weather Tool for Paris forecasts
  |                        Drafts a 3-day sight-seeing list
  |
  +--> [Budget Agent]  --> Reviews costs
                           Calculates hotel, transport, and meal totals
                           Ensures expenses stay under $600
  |
  +--> [Reflection Agent] -> Performs final quality control audit
                             Validates schedule path logic and route times
                                  |
                                  v
[SQL Database] <--- (Write Trip Records JSON) <--- [Compilation Complete]
  |
  +--> Returns HTTP 200 JSON Response payload
  |
  v
[React UI Engine] --> Renders visual trip details and daily timeline cards
```

---
\pagebreak

## 24. Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as React Client
    participant Backend as FastAPI Server
    participant DB as Neon Database
    participant CrewAI as CrewAI Orchestration
    participant Tools as Weather/Geo APIs
    participant LLM as Groq (Llama 3)

    User->>Frontend: Enter credentials & login
    Frontend->>Backend: POST /auth/token
    Backend->>DB: Query user match
    DB-->>Backend: User credentials valid
    Backend-->>Frontend: Return JWT token
    Frontend->>User: Display Dashboard

    User->>Frontend: Submit Plan (Paris, 3 days, $600)
    Frontend->>Backend: POST /trips/generate (Header: Bearer Token)
    Backend->>Backend: Validate Token & Decode user_id
    Backend->>CrewAI: Initialize Crew (Agents + Tasks)
    
    activate CrewAI
    CrewAI->>Tools: Call Geocoding / Weather Tools
    Tools-->>CrewAI: Returns coords & weather forecasts
    
    loop Agent Reasoning loop
        CrewAI->>LLM: Pass context prompts & tool results
        LLM-->>CrewAI: Returns reasoning thoughts & plan adjustments
    end
    
    CrewAI-->>Backend: Returns finalized JSON itinerary
    deactivate CrewAI
    
    Backend->>DB: INSERT INTO trips (user_id, itinerary_json)
    DB-->>Backend: Database write success
    Backend-->>Frontend: HTTP 200 (JSON payload response)
    Frontend->>User: Render responsive timeline cards
```

---
\pagebreak

## 25. Deployment Process

We use a zero-card serverless deployment architecture:

```
                     +---------------------------------------+
                     |             GitHub Repo               |
                     |  https://github.com/.../travel-plan   |
                     +-------+-----------------------+-------+
                             |                       |
            Trigger Auto-Deploy                      Trigger Auto-Deploy
                             v                       v
+-------------------------------+                 +-------------------------------+
|         Vercel (Free)         |                 |         Render (Free)         |
|  - Root: /frontend            |                 |  - Root: /backend             |
|  - Framework: Vite            |                 |  - Command: uvicorn           |
|  - Env: VITE_API_BASE_URL     |                 |  - Env: PYTHON_VERSION=3.12   |
+---------------+---------------+                 +---------------+---------------+
                |                                                 |
                | HTTP API Requests                               | Connect string
                +-------------------------------------------------+
                                                                  v
                                                  +-------------------------------+
                                                  |         Neon (Free)           |
                                                  |  - PostgreSQL Database        |
                                                  +-------------------------------+
```

### **1. Database Setup (Neon)**
- Account created at [neon.tech](https://neon.tech) via GitHub OAuth.
- Created project `AI Travel Planner`.
- Retrieved connection string: `postgresql://neondb_owner:npg_xxxx@ep-xxx.aws.neon.tech/neondb?sslmode=require`.

### **2. Backend Setup (Render)**
- Account created at [render.com](https://render.com).
- Linked repository and created a new **Web Service**.
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment settings added**:
  - `DATABASE_URL`: *Neon connection string*
  - `PYTHON_VERSION`: `3.12.2` (crucial to bypass Python 3.14 wheel errors)
  - API Keys for Groq, OpenWeather, and Geoapify.
  - `ALLOWED_ORIGINS`: `https://ai-travel-planner-zeta-wine.vercel.app` (restricts API access).

### **3. Frontend Setup (Vercel)**
- Account created at [vercel.com](https://vercel.com).
- Imported the repository.
- **Root Directory**: `frontend`
- **Framework Preset**: Vite
- **Environment Variables**:
  - `VITE_API_BASE_URL`: `https://ai-travel-planner-r2cv.onrender.com` (Render Backend URL).
- Deploy runs automatically on git push, outputting static bundles to Vercel's global CDN edge networks.

---
\pagebreak

## 26. Security

The application implements standard security practices:
1. **Cryptographic Salting and Hashing**: Passwords are encrypted using standard `bcrypt` before storage. The plain text password is never stored or compared directly.
2. **JWT Route Integrity Verification**: FastAPI routes use dependency injection (`Depends(get_current_user)`) to intercept bearer headers, verifying signatures using a cryptographically random `SECRET_KEY` env variable.
3. **CORS Protocol Restrictions**: The FastAPI middleware restricts access to the backend using `ALLOWED_ORIGINS` to prevent unauthorized cross-origin requests from other websites.
4. **Environment Secrets Separation**: All api keys, database credentials, and secret strings are injected at runtime via environment variables rather than hardcoded in the codebase.

---
\pagebreak

## 27. Performance Optimization

1. **FastAPI Async Engine**: All route entry points and database query endpoints utilize async-await architectures, allowing the server to handle concurrent I/O-bound operations.
2. **Fast LLM Inference (Groq)**: Utilizing Groq’s LPU hardware ensures responses generate in seconds, compared to 30-40 seconds on standard CPU processors.
3. **Vite Code Splitting**: Minimizes index load bundles by dividing scripts into logical chunks, speeding up browser load times.
4. **SQLite thread safety**: Utilizing `connect_args={"check_same_thread": False}` ensures concurrent requests do not block database access during local runs.

---
\pagebreak

## 28. Advantages

- **Completely Free to Run**: Hosted entirely on free-tier cloud servers with zero credit card requirements.
- **Fact-Validated Itineraries**: Multi-agent loops verify weather forecasting safety and coordinate locations before building itineraries.
- **Custom Budgets**: A dedicated financial agent prevents budget overruns, helping users stick to their budget.
- **Highly Responsive UI**: Modern, glassmorphic design system that renders cleanly on both mobile devices and desktops.

---
\pagebreak

## 29. Limitations

- **Cold Starts**: Render's free tier spins down containers after 15 minutes of inactivity, resulting in a ~50-second delay for the first request when the server wakes up.
- **Rate Limits on APIs**: Free tier APIs for Groq, OpenWeatherMap, and Geoapify restrict request volumes, which may impact performance under heavy traffic.
- **Single-Threaded AI Process**: Executing the agent loop blocks the server process for that specific task, which can limit scalability without a dedicated task queue (like Celery).

---
\pagebreak

## 30. Future Enhancements

- **Map Overlays**: Embed Leaflet or Mapbox to show real-time routes.
- **Interactive Bookings**: Direct integration with Amadeus or Skyscanner APIs to check live flight and hotel pricing.
- **Affiliate Monetization**: Include affiliate links for hotel bookings to generate revenue.
- **Voice Concierge**: Add speech-to-text inputs so users can refine plans hands-free.
- **Offline Syncing**: Cache saved plans locally in the browser so users can view their itineraries without internet access.

---
\pagebreak

## 31. Testing

### **System Test Cases Matrix**

| Test ID | Test Category | Target Component | Input Details | Expected Outcome | Actual Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | Unit | Password Hashing | Plaintext string `anu123` | Return hashed string, cannot reverse to plaintext. | **Passed** |
| **TC-002** | Integration | Auth Route | POST `/auth/token` with valid email | Return JWT token object with expiration claim. | **Passed** |
| **TC-003** | Integration | Secure Route Guard | GET `/trips/my-trips` without Bearer token header | Return HTTP 401 Unauthorized error response. | **Passed** |
| **TC-004** | System | AI Execution | POST `/trips/generate` with Paris, 3 days, $500 | Return full 3-day itinerary JSON under $500. | **Passed** |
| **TC-005** | System | Weather Tool | City: `Mumbai` | Output valid temperature and condition parameters. | **Passed** |

---
\pagebreak

## 32. Results

Below are the layout descriptions of the main pages. 

*(Screenshots can be added here once deployment is complete).*

### **1. Landing Page**
- **Layout**: Clean header navbar with dark-mode glassmorphic hero sections, feature grids, statistical counters, and a call-to-action button linking directly to the registration page.

### **2. Auth Portal (Login / Register)**
- **Layout**: Centered minimal form card containing fields for Username, Email, Password, and Password Confirmation, with feedback alerts for incorrect credentials.

### **3. User Dashboard**
- **Layout**: Sidebar navigation layout showing statistical overview panels (total trips planned, budget saved metrics) alongside a list of historically saved travel cards.

### **4. Planner Interface**
- **Layout**: Interactive multi-step form requesting Destination, Budget limits, Travel duration, and Travel Style. Once submitted, it displays a loading page with progress updates, followed by a day-by-day itinerary timeline.

---
\pagebreak

## 33. Conclusion

The **Agentic AI Travel Planner** successfully demonstrates how cooperative, multi-agent AI systems can handle complex, multi-constraint tasks like travel planning. 

By separating the responsibilities of research, math calculation, and quality control between distinct, autonomous agents, the system overcomes the limitations of traditional single-prompt chatbots. Connecting these agents to real-time APIs (OpenWeatherMap and Geoapify) and utilizing FastAPI, React, and a serverless PostgreSQL database (Neon) provides users with a secure, budget-optimized, and context-aware travel assistant.

Developing this project provided valuable experience in building secure JWT authentication, managing asynchronous API routing, implementing ORM databases, and orchestrating multi-agent systems.

---
\pagebreak

## 34. References

1. **CrewAI Documentation**: Official guides on multi-agent collaboration frameworks.  
   Link: [https://docs.crewai.com](https://docs.crewai.com)
2. **FastAPI Documentation**: Reference manuals on building high-performance async APIs.  
   Link: [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
3. **React Navigation & State**: Vite compiling processes and SPA React architecture guidelines.  
   Link: [https://react.dev](https://react.dev)
4. **SQLAlchemy ORM**: Database object-relational mapping patterns and queries structure.  
   Link: [https://www.sqlalchemy.org](https://www.sqlalchemy.org)
5. **OpenWeather API**: Specification reference guide for weather parameters.  
   Link: [https://openweathermap.org/api](https://openweathermap.org/api)
6. **IEEE Citation Standards**: Academic standards for citation formatting.  
   Link: [https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf](https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf)
