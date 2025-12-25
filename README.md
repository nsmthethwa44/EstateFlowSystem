EstateFlow – Real Estate Transaction Management System - (Angular, ASP.NET Core Web API, SQL Server)

EstateFlow is a full-stack, role-based real estate transaction management platform that enables admins, sellers, and buyers/investors to manage property listings, offers, and deal lifecycles in a structured, transparent way.

Project Overview:
- EstateFlow models the entire real-world real estate deal flow, not just property listings.
- The platform focuses on approval workflows, offer negotiation, deal tracking, and analytics-driven oversight to reflect how real transactions operate in production systems.

The goal was to build a production-grade system with clear responsibilities, strong data visibility, and maintainable architecture.

User Roles & Flows:
- Admin: 
	- Oversees the entire system
	- Approves or rejects property listings
	- Manages user lifecycle and roles
	- Monitors KPIs, deal performance, and reports

- Seller:
	- Submits and manages property listings
	- Reviews, accepts, rejects, or counters offers
	- Tracks deal progress and completion

- Buyer / Investor:
	- Browses approved property listings
	- Filters by location, price, availability, and profit margin
	- Submits offers and tracks deal outcomes

Features:
- Role-based authentication and authorization
- Approval-based property listing workflow
- Offer lifecycle management (submit, counter, accept, reject)
- Deal tracking with status transitions
- Analytics dashboards with KPIs and charts
- Notification triggers for approvals and offer updates
- SPA routing with guarded routes

Tech Stack:
- Frontend:
	- Angular 20
	- SCSS (modular structure)
	- ngx-charts
	- RxJS

- Backend:
	- ASP.NET Core Web API
	- Entity Framework Core
	- LINQ

- Database:
	- SQL Server / Azure SQL
	- Architecture & Security
	- JWT authentication
	- Role-Based Access Control (RBAC)
	- Service / Repository pattern

- SOLID principles and clean code practices:
	- Architecture & Design
	- The system follows a clean layered architecture with strict separation of concerns:
	- Controllers handle HTTP and routing logic
	- Services contain business rules and workflows
	- Repositories handle data access
	- DTO-based API contracts enforce frontend–backend boundaries

This structure keeps the system maintainable, testable, and easy to extend.

Project Structure:
- /backend   → ASP.NET Core Web API
- /frontend  → Angular application
- /db        → Database scripts / migrations

Setup & Deployment:
- Frontend Setup:
	- cd estateflow
	- npm install --legacy-peer-deps
	- ng serve

Production Build:
- ng build --configuration production

Links:
- Live Demo: https://estateflowsystem.netlify.app/
- GitHub Repository: This Repository
