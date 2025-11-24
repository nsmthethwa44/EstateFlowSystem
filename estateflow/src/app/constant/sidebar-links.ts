export const SidebarLinks = {
  admin: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/admin' },
    {icon: "fa-solid fa-user", label: 'Users', path: '/admin/users' },
    {icon: "fa-solid fa-house", label: 'Properties', path: '/admin/properties' },
    {icon: "fa-solid fa-chart-area", label: 'Offer Management', path: '/admin/offer-management' },
    {icon: "fa-solid  fa-bell", label: 'Notifications', path: '/admin' },
    {icon: "fa-solid fa-gear", label: 'Settings', path: '/admin' },
  ],
  agent: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/agent' },
    {icon: "fa-solid fa-house", label: 'My Properties', path: '/agent/manage-properties' },
    {icon: "fa-solid  fa-newspaper", label: 'Manage Offers', path: '/agent/manage-offers' },
     {icon: "fa-solid  fa-bell", label: 'Notifications', path: '/agent' },
    { icon: "fa-solid fa-gear",label: 'Settings', path: '/agent' },
  ],
  buyer: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/buyer' },
    {icon: "fa-solid fa-house", label: 'Browse Properties', path: '/buyer/browse' },
    {icon: "fa-solid  fa-money-check", label: 'My Offers', path: '/buyer/my-offers' },
    {icon: "fa-solid  fa-newspaper", label: 'My Profile', path: '/buyer/my-profile' },
    {icon: "fa-solid  fa-bell", label: 'Notifications', path: '/buyer' },
    {icon: "fa-solid fa-gear", label: 'Settings', path: '/buyer' },
  ]
};




