# Legal Case & Client Management System - System Design

## 1. Overview
A specialized CRM and case management platform for law firms, built with a focus on security, role-based access, and client-case tracking.

## 2. Technology Stack
- **Frontend**: Next.js 14, Tailwind CSS, Shadcn UI, Lucide React
- **Backend**: Spring Boot 3.3, Java 17, Spring Security (JWT)
- **Database**: PostgreSQL 16
- **DevOps**: Docker, Docker Compose, GitHub Actions (optional)

## 3. Database Schema (ERD)

### Entities:
- **`User`**: Admin, Advocate, Assistant
  - `id` (PK)
  - `username` (unique)
  - `password` (hashed)
  - `role` (ENUM: ROLE_ADMIN, ROLE_ADVOCATE, ROLE_ASSISTANT)
  - `name`, `email`

- **`Client`**: People/Entities managed by the firm
  - `id` (PK)
  - `name`, `email`, `phone`, `address`
  - `created_at`, `updated_at`

- **`LegalCase`**: Main case entity
  - `id` (PK)
  - `client_id` (FK -> Client)
  - `title`, `description`
  - `case_number` (unique)
  - `court_name`, `judge_name`
  - `status` (ENUM: OPEN, CLOSED, IN_PROGRESS, ARCHIVED)
  - `priority` (ENUM: LOW, MEDIUM, HIGH)
  - `advocate_id` (FK -> User)
  - `created_at`, `updated_at`

- **`Hearing`**: Schedule for case hearings
  - `id` (PK)
  - `case_id` (FK -> LegalCase)
  - `hearing_date` (DateTime)
  - `remarks`, `next_date` (optional)
  - `status` (ENUM: SCHEDULED, COMPLETED, POSTPONED)

- **`Document`**: Files linked to a case
  - `id` (PK)
  - `case_id` (FK -> LegalCase)
  - `file_name`, `file_type`, `file_size`
  - `s3_key` or `file_path`
  - `uploaded_at`, `uploaded_by` (FK -> User)

## 4. API Design (Summary)
- `/api/auth`: `POST /login`, `POST /register`
- `/api/clients`: `GET`, `POST`, `PUT`, `DELETE` (RBAC)
- `/api/cases`: `GET`, `POST`, `PUT`, `DELETE` (RBAC)
- `/api/hearings`: `GET`, `POST`, `PUT`, `DELETE`
- `/api/documents`: `GET`, `POST`, `DELETE`

## 5. Directory Structure
```
root/
  backend/ (Spring Boot)
  frontend/ (Next.js)
  docker/
  docker-compose.yml
```
