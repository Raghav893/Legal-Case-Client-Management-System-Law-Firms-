# Legal Case & Client Management System - LexManage

A production-ready firm management system for small and mid-size law firms.

## 🚀 Features
- **Client Management**: Secure tracking of client profiles.
- **Case Management**: Detailed lifecycle tracking for legal cases.
- **Hearing Scheduler**: Dashboard view of upcoming hearings.
- **Role-Based Access**: Specialized views for Admin, Advocate, and Assistant.
- **Dashboard Analytics**: High-level overview of firm performance.

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Spring Boot 3.3, Spring Security (JWT)
- **Database**: PostgreSQL 16
- **DevOps**: Docker, Docker Compose

## 🏃 How to Run

### Prerequisites
- Docker & Docker Compose installed.

### Execution
Run the entire system using a single command:
```bash
docker-compose up --build
```
The services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api (Documentation at /swagger-ui/index.html - if configured)
- **Database**: localhost:5432 (Postgres)

### Default User Configuration
You can register new users via the API or frontend (to be implemented further). 
*Note: A seed script can be added to pre-populate roles and an admin user.*

## 📂 Project Structure
- `backend/`: Spring Boot application.
- `frontend/`: Next.js application.
- `docker-compose.yml`: Service orchestration.
- `DESIGN.md`: Detailed system architecture.

## 🔒 Security
- JWT-based authentication.
- Spring Security 6.x implementation.
- Encrypted password storage (BCrypt).
- Role-based method security (`@PreAuthorize`).
