Clinical Trial Knowledge Graph

This full-stack application visualizes and analyzes clinical trial data. Built with Spring Boot, Neo4j, Angular, and Chart.js, it allows users to explore relationships between conditions and trial phases through a dynamic knowledge graph, charts, and an interactive dashboard.

Features:

📋 Load and display clinical trial data from a Spring Boot API backed by a Neo4j database

🔍 Filter trials by phase, condition, or keyword search

📊 View interactive bar and pie charts showing trial distributions

📈 See real-time analytics with an on-page dashboard (most common phase, condition, totals)

🌗 Dark mode support with dynamic chart color adjustment

🧪 Sample data for offline use when the API is unavailable

📤 Optional CSV export functionality (in progress)

Technologies Used:

Frontend

Angular 17 (standalone components)

Chart.js for data visualization

TypeScript

CSS (custom dark theme)

Backend

Spring Boot (Java)

Neo4j (graph database)

Spring Data Neo4j

Dev Tools

Postman (API testing)

VS Code

How to Run
1. Clone the Repo:

bash
Copy code
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Start the Backend (Spring Boot):

bash
Copy code
cd demo
./mvnw spring-boot:run
Make sure your Neo4j database is running locally (or connected remotely).

3. Start the Frontend (Angular): 

bash
Copy code
cd clinical-graph-ui
npm install
ng serve

Visit http://localhost:4200/ in your browser.

