# Clinical Trial Knowledge Graph

A full-stack web application to explore and analyze clinical trial data with interactive graphs, dynamic charts, and a real-time analytics dashboard. Built using **Spring Boot**, **Neo4j**, **Angular**, and **Chart.js**.

---

## Features

- Load and visualize clinical trial data from a Spring Boot API connected to a Neo4j graph database
- Filter trials by phase, condition, or keyword search
- Interactive bar and pie charts showing trial distributions
- Real-time analytics dashboard with total trials, most common phase/condition
- Dark mode with dynamic styling
- CSV export functionality *(in progress)*

---

## Tech Stack

- **Frontend:** Angular 17 (standalone components), Chart.js, TypeScript, CSS (custom dark theme)
- **Backend:** Spring Boot (Java), Neo4j Graph Database, Spring Data Neo4j
- **Tools:** Postman, VS Code

---

## Neo4j Requirement

**Note:** This app requires a local Neo4j database to function fully.  
You must have Neo4j running at `bolt://localhost:7687` for the API to return clinical trial data.  
If Neo4j is not running, the frontend will not display data.

**Setting up Neo4j locally:**
1. Install Neo4j Desktop or use Docker
2. Start a local database at `bolt://localhost:7687`
3. Use default credentials (`neo4j` / `password`) or update `application.properties` as needed

---

## Getting Started

Follow these steps to run the application locally:

git clone https://github.com/[your-username]/clinical-trial-knowledge-graph.git
cd clinical-trial-knowledge-graph

**Start the Backend (Spring Boot)**

cd demo
./mvnw spring-boot:run

**Requires Java 17+**

**Ensure Neo4j is running locally**

**Start the Frontend (Angular)**

cd clinical-graph-ui
npm install
ng serve

**Open in your browser at http://localhost:4200**

## Screenshots

*Screenshots coming soon to showcase the dashboard, filters, and interactive charts.*

<img width="1509" height="859" alt="Screenshot 2025-07-15 at 11 23 20 AM" src="https://github.com/user-attachments/assets/8e9c857f-6763-47f1-b146-07ecac736ed8" />
<img width="1507" height="863" alt="Screenshot 2025-07-15 at 11 23 43 AM" src="https://github.com/user-attachments/assets/52e11be9-dea3-43d7-a26c-7d7d3ae8dd47" />
<img width="1512" height="857" alt="Screenshot 2025-07-15 at 11 24 06 AM" src="https://github.com/user-attachments/assets/60a89b17-cdc3-4c9d-afb7-7d3d5b9c86d3" />



## Video Demo

*A short demo video link will be available here.*


## Author

Aleena Khatri


## License

MIT

