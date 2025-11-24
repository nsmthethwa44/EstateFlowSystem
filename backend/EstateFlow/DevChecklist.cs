using EstateFlow.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.Win32;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Threading;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EstateFlow
{
    public class DevChecklist
    {
        //        ✅ PROJECT CHECKLIST: Real Estate Marketplace(Admin + Seller + Buyer)
        //PHASE 1 – Setup & Auth

        // Create ASP.NET Core Web API project

        // Add folders: Data, Entities, Interfaces, Repositories, Services, Controllers

        // Configure EF Core, Identity, JWT authentication

        // Create DbContext and initial entities(User, Role)

        // Seed Admin user + default roles(Admin, Seller, Buyer)

        // Add AuthController:

        // POST /register

        // POST /login

        // GET /profile

        // Protect routes with[Authorize(Roles = ...)]

        //PHASE 2 – Angular Setup

        // Create Angular project

        // Add routing + lazy modules: /auth, /admin, /seller, /buyer, /shared

        // Build AuthService(login/register + JWT handling)

        // Create guards for role-based routing

        //PHASE 3 – Core Models & APIs

        // Create entities:

        // Property(Id, Title, Description, Address, Price, Status, SellerId, Images)

        // Offer(Id, PropertyId, BuyerId, Amount, Status)

        // Notification(Id, UserId, Message, IsRead)

        // Deal(optional)

        // Create repository + service interfaces for each entity

        // Implement CRUD repositories and services

        // Create controllers:

        // PropertiesController

        // OffersController

        // NotificationsController

        // UsersController

        // ReportsController

        //PHASE 4 – Admin Module

        //Backend

        // /api/admin/dashboard → metrics: total listings, pending, deals, profit, flip volume

        // /api/admin/properties → list pending, approve/reject

        // /api/admin/users → manage users(activate/deactivate/delete)

        // /api/admin/reports → sales + profit visual data

        //Frontend

        // /admin/dashboard → summary cards + charts

        // /admin/properties → property table + Approve/Reject

        // /admin/users → user list + actions

        // /admin/reports → charts and data view

        //PHASE 5 – Seller Module

        //Backend

        // /api/seller/properties → add/edit/delete property

        // /api/seller/properties/{id
        //    }/offers → view received offers

        // /api/seller/properties/{id
        //}/ status → update property status

        // /api/notifications → seller notifications

        //Frontend

        // /seller/dashboard → overview metrics

        // /seller/add-property → form + image upload

        // /seller/properties → all listings by status

        // /seller/offers → view & respond to offers

        // /seller/deals → track completed deals

        // /seller/notifications → approval/offer updates

        //PHASE 6 – Buyer Module

        //Backend

        // /api/buyer/properties → get approved listings

        // /api/buyer/offers → make or update offer

        // /api/buyer/deals → completed purchases

        //Frontend

        // /buyer/dashboard → active offers + deals

        // /buyer/browse → list + filter approved properties

        // /buyer/property/:id → detail view + make offer

        // /buyer/offers → offers with status (Pending/Accepted/Rejected)

        // /buyer/deals → purchased properties

        // /buyer/notifications → offer/deal updates

        //PHASE 7 – Notifications System

        // Implement Notification entity + DB updates

        // Option 1: Polling with /api/notifications

        // Option 2: Real - time with SignalR hub

        // Trigger notifications:

        // Seller → when property approved/rejected

        // Admin → when new property submitted

        // Buyer → when offer accepted/rejected

        // Frontend: notification bell + dropdown

        //PHASE 8 – Analytics & Reporting

        // Build LINQ queries for:

        // Flip volume by state

        // Sales by quarter

        // Profit margin visualization

        // /api/admin/reports returns chart data

        // Angular charts with Chart.js or ngx-charts

        // Add “Export CSV/PDF” endpoint (optional)

        //PHASE 9 – Testing & Deployment

        // Test all Auth + Role routes with Postman

        // Validate all property + offer workflows

        // Verify notifications and role access rules

        // Configure PostgreSQL for production

        // Run EF migrations

        // Deploy API (Azure / Render / Railway)

        // Deploy Angular app (Netlify / Vercel)
    }
}
