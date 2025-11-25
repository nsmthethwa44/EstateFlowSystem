# EstateFlow System

EstateFlow is a comprehensive real estate management platform that allows **admins**, **sellers**, and **buyers/investors** to manage properties, offers, and deals efficiently.  

---

## **Table of Contents**

- [Project Overview](#project-overview)  
- [User Flows](#user-flows)  
  - [Admin](#admin)  
  - [Seller](#seller)  
  - [Buyer](#buyer)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Deployment](#setup--deployment)  
- [License](#license)  

---

## **Project Overview**

EstateFlow provides a streamlined workflow for real estate transactions:

- Admins can manage users, approve listings, and monitor analytics.  
- Sellers can list properties, track offers, and manage deals.  
- Buyers can browse profitable listings, make offers, and track completed deals.  

---

## **User Flows**

### **Admin**
1. **Login:** `/login` → redirects to `/admin/dashboard`.  
2. **Dashboard:** View total listings, pending approvals, sales metrics, and graphs.  
3. **Property Approval:** Approve or reject submitted listings, triggering notifications.  
4. **User Management:** Deactivate, promote, or delete users.  
5. **Analytics & Reports:** Track sales, flip volume, and profit margins.  

### **Seller**
1. **Login/Register:** Complete profile and access `/seller/dashboard`.  
2. **Add Property:** Submit listings; pending approval by Admin.  
3. **Manage Listings:** Edit or remove properties before approval; track approved listings.  
4. **Offers Received:** Accept, reject, or counter offers.  
5. **Track Deals:** Monitor ongoing and completed deals.  

### **Buyer**
1. **Login/Register:** Access `/buyer/dashboard`.  
2. **Browse Listings:** Filter by location, price, profit margin, and availability.  
3. **Property Details:** View property stats, images, and seller info.  
4. **Make Offer:** Submit offers; track status (pending, accepted, rejected).  
5. **Completed Deals:** Review purchase summaries of accepted offers.  

---

## **Features**

- User authentication & role-based dashboards  
- Property listing management  
- Real-time offer tracking  
- Analytics & reporting dashboards  
- Email/notification triggers  
- SPA routing support with Angular  

---

## **Tech Stack**

- **Frontend:** Angular 20  
- **Backend/API:** ASP.NET Core Web API  
- **Database:** SQL Server / Azure SQL  
- **Hosting:** Azure App Service  
- **CI/CD:** GitHub Actions  

---

## **Setup & Deployment**

### **Frontend**

```bash
cd estateflow
npm install --legacy-peer-deps
ng build --configuration production
