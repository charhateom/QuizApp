# 🎯 RapidFireQuiz

A sleek and responsive quiz web app built using **React.js** and **Tailwind CSS**, challenging users with 15 random questions under a 30-minute timer. Developed as part of the CausalFunnel Software Engineer Intern assignment.

---

### 🌐 Live Demo

🔗 [https://rapidfirequiz.netlify.app](https://rapidfirequiz.netlify.app)  
📁 GitHub Repository: [https://github.com/charhateom/QuizApp](https://github.com/charhateom/QuizApp)

---

### 📌 Project Overview

**RapidFireQuiz** is a time-bound quiz platform that:
- Collects user email before starting
- Fetches 15 random questions from the [Open Trivia DB API](https://opentdb.com/api.php?amount=15)
- Shows a **30-minute countdown timer**
- Allows navigation between questions
- Indicates visited and attempted questions
- Auto-submits when time is up
- Generates a result report comparing user answers with correct ones

---

### 🧠 My Approach

The app is divided into logical, reusable components:
- `StartPage`: Email input and quiz start button
- `QuizPage`: Timer, questions, and navigation
- `QuestionCard`: Renders question and randomized options
- `NavigatorPanel`: Shows which questions are visited/answered
- `ResultPage`: Displays submitted answers with correctness indicators

All UI styling is handled using **Tailwind CSS** utility classes for rapid and responsive design.

---

### 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **API:** Open Trivia DB
- **Deployment:** Netlify

---

### 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/charhateom/QuizApp.git

# Navigate to project directory
cd QuizApp

# Install dependencies
npm install

# Run the development server
npm start
````

App will be available at: [http://localhost:3000](http://localhost:3000)

---

### 📌 Assumptions

* The email input is for user identification only — it is not stored or validated
* All quiz questions are multiple-choice with a single correct answer
* Special characters (like `&quot;` or `&amp;`) from the API responses are decoded before display
* No backend or data persistence is implemented (as per assignment scope)

---

### ⚔️ Challenges Faced

* **HTML Entity Handling:** The API returns encoded characters which needed decoding for clean readability
* **Timer Logic:** Ensured accurate countdown without reset during re-renders
* **Shuffling Options:** Combined `correct_answer` and `incorrect_answers`, then randomized their order efficiently
* **Answer & Visit Tracking:** Built a robust mechanism to track question state (visited/answered) for dynamic navigation UI

---

### 🚀 Future Enhancements

* Add category and difficulty filters to personalize the quiz
* Include animations and transitions using Tailwind's animation utilities
* Improve accessibility (keyboard navigation, screen reader support)
* Persist results using localStorage or a backend
* Track quiz history and performance trends
* Add leaderboard or scoring system

---

### 🧑‍💻 Built with ❤️ by [Om Charhate](https://github.com/charhateom)


