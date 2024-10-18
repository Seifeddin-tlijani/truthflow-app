
# Truth Teller App

### Overview

The **Truth Teller App** is a web application built using **React** for the frontend and **Spring Boot** for the backend. It integrates with **Ollama**, an AI tool, to provide accurate responses and help users verify the truthfulness of statements.

### Features

- **React Frontend**: A modern and responsive user interface built with React.
- **Spring Boot Backend**: A robust and scalable backend for managing API requests and logic.
- **Ollama Integration**: Utilizes Ollama for AI-driven truth-telling features.
- **REST API**: Enables communication between the frontend and backend through RESTful services.

### Tech Stack

- **Frontend**: React, Vite, JavaScript,TypeScript, HTML, CSS
- **Backend**: Spring Boot, Java
- **AI Integration**: Ollama API
- **Database**: (Optional, depending on your setup) MySQL, PostgreSQL, or another database for storing data
- **Build Tools**: Maven/Gradle for Spring Boot, npm/yarn for React

### Prerequisites

- Node.js (for React)
- Java JDK 11 or higher (for Spring Boot)
- Maven or Gradle (build tool for Spring Boot)
- Ollama API key (for AI truth-telling service)

### Setup and Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/truthglow-app.git
cd truthflow-app
```

#### 2. Install Frontend Dependencies

Navigate to the `frontend` folder and install the necessary dependencies using npm or yarn.

```bash
cd TruthFlow-ui
npm install
```

#### 3. Start the React Frontend

```bash
npm run dev
```

The React app will start running at `http://localhost:5173`.

#### 4. Set up the Spring Boot Backend

Navigate to the `backend` folder.

```bash
cd ../ai-TruthPulse
```

Make sure you have the required dependencies installed via Maven or Gradle, then build and run the Spring Boot app.

```bash
./mvnw spring-boot:run
```

The Spring Boot backend will start running at `http://localhost:8085`.

#### 5. Configure Ollama (Choose one of the two options below)
Option 1: Install Ollama Locally
If you want to use Ollama locally, you need to install it on your system. You can follow the official Ollama installation guide to get started.

Once installed, make sure Ollama is running locally on your machine. The backend will communicate with Ollama via its local instance.

Option 2: Use Ollama API Key
To use the hosted version of Ollama, you need an API key.

Sign up for an API key at Ollama's website.
Add your Ollama API key to the backend configuration:

- Open `application.properties` in the backend:
  
```properties
ollama.api.key=your-ollama-api-key
```

### Usage

1. Open the app in your browser at `http://localhost:5173`.
2. Enter a statement you want to verify in the provided input field.
3. The app will send the request to the backend, which in turn uses Ollama to verify the truthfulness of the statement.
4. Receive the result of the verification directly on the UI.

### API Endpoints

- **POST /api/verify**: Verifies the truthfulness of the submitted statement using Ollama.

Example Request:

```json
{
  "statement": "The Earth is flat."
}
```

Example Response:

```json
{
  "truth": false,
  "details": "Scientific evidence supports that the Earth is round."
}
```

### Testing

For running unit tests for both the frontend and backend:

- **Frontend**: 

```bash
npm test
```

- **Backend**:

```bash
./mvnw test
```

### Future Improvements

- Add user authentication for more personalized experiences.
- Extend AI functionality to support more detailed explanations.
- Implement a history of verified statements for users.

