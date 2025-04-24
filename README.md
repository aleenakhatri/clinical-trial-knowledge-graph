# Clinical Trial Knowledge Graph

A full-stack web application to explore and analyze clinical trial data using a dynamic knowledge graph, interactive charts, and a real-time analytics dashboard. Built with Spring Boot, Neo4j, Angular, and Chart.js.

---

## Features

- Load and display clinical trial data from a Spring Boot API backed by a Neo4j database
- Filter trials by phase, condition, or keyword search
- View interactive bar and pie charts showing trial distributions
- Real-time analytics dashboard showing total trials, most common phase, and most common condition
- Dark mode with dynamic styling for charts and components
- Sample data fallback when API is unavailable
- CSV export functionality (in progress)

---

## Technologies Used

### Frontend
- Angular 17 (standalone components)
- Chart.js for visualizations
- TypeScript
- CSS (custom dark theme)

### Backend
- Spring Boot (Java)
- Neo4j Graph Database
- Spring Data Neo4j

### Development Tools
- Postman (API testing)
- VS Code

---
## How to Run the Application

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/clinical-trial-knowledge-graph.git
cd clinical-trial-knowledge-graph

### Step 2: Start the Backend (Spring Boot)
Open a terminal and navigate into the demo directory:

```bash
cd demo

Start the Spring Boot application:

```bash
./mvnw spring-boot:run
Note: Ensure your local Neo4j database is running and listening on bolt://localhost:7687

### Step 3: Start the Frontend (Angular)
In a new terminal, navigate into the frontend directory:

```bash
cd clinical-graph-ui

Install the dependencies:

```bash
npm install

Start the Angular development server:

```bash
ng serve

Once the server starts, open your browser and go to: http://localhost:4200

Sample Data
If the Neo4j database is unavailable, the app will automatically fall back to a predefined set of sample clinical trial data for testing purposes.






