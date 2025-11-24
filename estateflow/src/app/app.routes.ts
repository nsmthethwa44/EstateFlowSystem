import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboards/admin/admin-dashboard-component/admin-dashboard-component';
import { AdminOverviewComponent } from './dashboards/admin/admin-overview-component/admin-overview-component';
import { AgentDashboardComponent } from './dashboards/agent/agent-dashboard-component/agent-dashboard-component';
import { AgentOverviewComponent } from './dashboards/agent/agent-overview-component/agent-overview-component';
import { BuyerDashboardComponent } from './dashboards/buyer/buyer-dashboard-component/buyer-dashboard-component';
import { BuyerOverviewDashboard } from './dashboards/buyer/buyer-overview-dashboard/buyer-overview-dashboard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { AuthGuard } from './auth/guards/auth-guard';
import { AgentPropertiesComponent } from './dashboards/agent/agent-properties-component/agent-properties-component';
import { AdminUsersComponent } from './dashboards/admin/admin-users-component/admin-users-component';
import { AdminPropertiesComponent } from './dashboards/admin/admin-properties-component/admin-properties-component';
import { BuyerBrowsePropertiesComponent } from './dashboards/buyer/buyer-browse-properties-component/buyer-browse-properties-component';
import { BuyerOffersComponent } from './dashboards/buyer/buyer-offers-component/buyer-offers-component';
import { AgentOffersComponent } from './dashboards/agent/agent-offers-component/agent-offers-component';
import { AdminOffersComponent } from './dashboards/admin/admin-offers-component/admin-offers-component';
import { ProfileDetails } from './component/profile-details/profile-details';
import { Home } from './pages/home/home';
import { MainOutLet } from './pages/main-out-let/main-out-let';
import { Properties } from './pages/properties/properties';
import { Blog } from './pages/blog/blog';

export const routes: Routes = [
    {
        path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
        children: [
            {path: "", component: AdminOverviewComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
            {path: "users", component: AdminUsersComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
            {path: "properties", component: AdminPropertiesComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
            {path: "offer-management", component: AdminOffersComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        ]
    },
        {
        path: "agent", component: AgentDashboardComponent, canActivate: [AuthGuard], data: { role: 'Agent' },
        children: [
            {path: "", component: AgentOverviewComponent, canActivate: [AuthGuard], data: { role: 'Agent' },},
            {path: "manage-properties", component: AgentPropertiesComponent, canActivate: [AuthGuard], data: { role: 'Agent' },},
            {path: "manage-offers", component: AgentOffersComponent, canActivate: [AuthGuard], data: { role: 'Agent' },},
        ]
    },
        {
        path: "buyer", component: BuyerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Buyer' },
        children: [
            {path: "", component: BuyerOverviewDashboard, canActivate: [AuthGuard], data: { role: 'Buyer' },},
            {path: "browse", component: BuyerBrowsePropertiesComponent, canActivate: [AuthGuard], data: { role: 'Buyer' },},
            {path: "my-offers", component: BuyerOffersComponent, canActivate: [AuthGuard], data: { role: 'Buyer' },},
            {path: "my-profile", component: ProfileDetails, canActivate: [AuthGuard], data: { role: 'Buyer' },},
        ]
    },
    {path:"", component: MainOutLet, children:[
        {path: "", component: Home},
        {path: "houses", component: Properties},
        {path: "blog", component: Blog},
    ]},
    {path: "login", component: Login},
    {path: "register", component: Register},
    {path: "**", redirectTo: ""},
];
