# Legal Case Client Management System (Law Firms)

A full-stack legal operations platform for law firms to manage clients, cases, documents, billing, and team workflows.

This repository is structured as a monorepo with:

- Frontend: Next.js + Tailwind CSS
- Backend: Java Spring Boot

## Vision

Build a modern, fast, and practical system where legal teams can:

- onboard clients quickly,
- track case progress clearly,
- manage legal documents safely,
- coordinate tasks across advocates and staff,
- and monitor billing and payments in one place.

## Tech Stack

### Frontend (fe)

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Axios or Fetch for API calls
- Optional: React Query for server-state caching

### Backend (be)

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security + JWT
- Validation (Jakarta Validation)
- Database: PostgreSQL (recommended)

## Planned Project Structure

```
.
|- fe/   # Next.js + Tailwind frontend
|- be/   # Spring Boot backend
`- README.md
```

## Core Modules

1. Authentication and Roles

- Login and secure session (JWT)
- Roles: Admin, Lawyer, Paralegal, Reception

2. Client Management

- Create and edit client profiles
- Track contact details and case links

3. Case Management

- Create case files
- Assign lawyers
- Track status, deadlines, and hearing dates

4. Document Management

- Upload and organize case documents
- Tag by case and type

5. Task and Activity Tracking

- Assign internal tasks
- Timeline/activity feed per case

6. Billing and Invoices

- Time entries
- Invoice generation
- Payment tracking

## API Direction (High-Level)

Suggested backend route groups:

- /api/auth
- /api/clients
- /api/cases
- /api/cases/{id}/documents
- /api/tasks
- /api/invoices

## Frontend Pages (Suggested)

- /login
- /dashboard
- /clients
- /clients/[id]
- /cases
- /cases/[id]
- /tasks
- /billing
- /settings

## Local Development Plan

Since this repository is in initial setup state, this is the recommended order:

1. Initialize frontend in fe with Next.js + Tailwind + TypeScript
2. Initialize backend in be with Spring Boot starter project
3. Define database schema for clients, cases, documents, tasks, invoices
4. Implement auth and role-based access
5. Connect frontend pages to backend APIs

## Frontend Vibe-Coding Feature Backlog

Start with these features first for fast visible progress:

1. Dashboard with live cards

- Open Cases
- Upcoming Hearings
- Unpaid Invoices
- Tasks Due Today

2. Case Kanban Board

- Status columns: Intake, In Progress, Filed, Hearing, Closed
- Drag and drop case cards

3. Case Timeline

- Vertical event feed for hearings, filings, notes, calls

4. Smart Global Search

- Search clients, case numbers, and phone numbers from one input

5. Client 360 View

- Profile, linked cases, documents, invoices, communication notes in tabs

6. Task Center

- Priority tags, due dates, assignee filters, quick complete action

7. Document Drawer

- Right-side slide panel to preview key files while working on a case

8. Billing Snapshot Widget

- Monthly billed vs collected chart

## Suggested MVP Scope (2-Week Build)

Ship this first:

- Auth
- Dashboard
- Clients CRUD
- Cases CRUD
- Task list
- Basic billing entries

Then iterate with:

- Document upload
- Notifications
- Analytics charts

## Contribution Workflow

1. Create feature branch from main
2. Commit clear, small changes
3. Open PR with screenshots (frontend) and test notes (backend)

## Status

Project currently in bootstrap phase.

Next step: initialize fe and be codebases, then implement auth + dashboard as first milestone.
