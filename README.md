# **Next.js Dashboard with Django API Backend**

This project features a simple dashboard built using **Next.js** on the frontend and a **Django** backend that serves data to populate various charts (Candlestick, Line Chart, Bar Chart, and Pie Chart). The data for these charts is retrieved from hardcoded API endpoints defined in the Django API.

## **Features**

- **Frontend**: Built with **Next.js**, includes charts such as Candlestick, Line, Bar, and Pie charts using **Chart.js** and **react-financial-charts** for candlestick visualization.
- **Backend**: A simple **Django REST Framework** API that provides hardcoded JSON data to be used by the frontend for populating the charts.
- **Docker**: The project is containerized using **Docker** and can be easily set up for both the frontend and backend environments.
- **Testing**:
  - **Django**: Unit tests for each API endpoint using `APITestCase`.
  - **Next.js**: Unit tests for the React components using **Jest** and **React Testing Library**.

## **Technologies Used**

- **Frontend**: 
  - Next.js (React Framework)
  - TypeScript
  - Chart.js and React Chart.js 2
  - Tailwind CSS for styling
- **Backend**: 
  - Django
  - Django REST Framework
- **Docker**: For easy deployment and setup
- **Testing**: 
  - Jest and React Testing Library (for frontend)
  - Django's built-in Test framework (for backend)

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: v14 or higher
- **Python**: v3.8 or higher

### **1. Clone the Repository**

```bash
git clone https://github.com/your-repo/nextjs-django-dashboard.git
cd nextjs-django-dashboard
```

### **2. Setup with Docker**

The project is fully containerized using Docker. To get everything running, you just need to run:

```bash
docker-compose up --build
```

This will:

- Set up the Django backend and Next.js frontend containers.
- Install dependencies and start the server.

After the build is complete, the services will be running:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)

### **3. Running Without Docker**

#### **Backend (Django)**

1. Navigate to the `backend/` folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:

   ```bash
   python manage.py runserver
   ```

The Django API will be running at [http://localhost:8000](http://localhost:8000).

#### **Frontend (Next.js)**

1. Navigate to the `frontend/` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the Next.js development server:

   ```bash
   npm run dev
   ```

The Next.js app will be running at [http://localhost:3000](http://localhost:3000).

## **Testing**

### **Running Backend Tests (Django)**

To run unit tests for the Django API:

1. Navigate to the `backend/` folder:

   ```bash
   cd backend
   ```

2. Run tests:

   ```bash
   python manage.py test
   ```

This will run all the unit tests in the `charts` app, ensuring all API endpoints return correct data and status codes.

### **Running Frontend Tests (Next.js)**

To run unit tests for the Next.js components using Jest:

1. Navigate to the `frontend/` folder:

   ```bash
   cd frontend
   ```

2. Run tests:

   ```bash
   npm run test
   ```

This will run Jest tests and display the results in the terminal.

## **Project Structure**

Here’s an overview of the key directories and files in the project:

```
├── backend                # Django API Backend
│   ├── charts             # App with API views and tests
│   ├── chart_backend      # Main Django project folder
│   ├── manage.py          # Django management file
│   └── requirements.txt   # Backend dependencies
├── frontend               # Next.js Frontend
│   ├── app                # Next.js pages and components
│   ├── node_modules       # Node.js modules
│   ├── public             # Static files like favicon
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Docker Compose setup
└── README.md              # Project documentation
```

## **Endpoints**

The Django API provides the following endpoints for chart data:

- `/api/candlestick-data/`: Returns data for Candlestick chart.
- `/api/line-chart-data/`: Returns data for Line chart.
- `/api/bar-chart-data/`: Returns data for Bar chart.
- `/api/pie-chart-data/`: Returns data for Pie chart.

Each endpoint returns hardcoded JSON data for testing purposes.

## **Bonus Features**

- **TypeScript**: The frontend is written in TypeScript for better type checking and maintainability.
- **Docker**: The entire project is containerized, making it easy to set up and run with a single command.
- **Testing**: Both the backend and frontend have unit tests in place to ensure the components and API function correctly.



