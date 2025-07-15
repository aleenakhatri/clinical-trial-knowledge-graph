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

## 📸 Screenshots

### Dashboard
<img width="1129" height="786" alt="dashboard" src="https://github.com/user-attachments/assets/0442f100-8089-4888-8f17-4aa971c07021" />


### Charts

<img width="1123" height="787" alt="charts" src="https://github.com/user-attachments/assets/c85e17b1-4206-4f25-8945-49b108096185" />

### Trials

<img width="1124" height="785" alt="trials" src="https://github.com/user-attachments/assets/9ca6fb7d-387d-4aed-b615-05a9b1e3d8d7" />

### Trials

<img width="1123" height="779" alt="more trials" src="https://github.com/user-attachments/assets/3b17ccbb-c680-4fe4-bce8-6492bd034052" />




## Video Demo

*A short demo video link will be available here.*


## Author

Aleena Khatri


## License

MIT

