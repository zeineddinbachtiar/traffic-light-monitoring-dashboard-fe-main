// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { navItems as allNavItems } from '@/constants/data';
// import DashboardNav from './dashboard-nav';
// import type { NavItem } from '@/types';
// import { auth } from '@/api/auth';

export default function Sidebar() {
  // const { checkRole } = auth();
  // const [role, setRole] = useState(null);
  // const [navItems, setNavItems] = useState<Array<NavItem>>([]);

  // useEffect(() => {
  //   const getRole = async () => {
  //     const role = await checkRole();
  //     setRole(role);
  //   };

  //   getRole();
  // }, []);

  // useEffect(() => {
  //   const filteredNavItems = allNavItems.filter((item) => {
  //     if (item.title === 'Administrator' && role !== 'superadmin') {
  //       return false;
  //     }
  //     if (role === 'technician' && item.title !== 'My Device') return false;
  //     return true;
  //   });
  //   setNavItems(filteredNavItems);
  // }, [role]);

  // return (
  //   <aside className="hidden h-screen w-64 flex-col overflow-y-auto overflow-x-hidden rounded-tr-[90px] border-r bg-primary py-8 pl-5 dark:bg-background lg:flex">
  //     <Link to="/" className="text-3xl font-bold text-white">
  //       Logo
  //     </Link>
  //     <div className="mt-6 flex flex-1 flex-col justify-between">
  //       <DashboardNav items={navItems} />
  //     </div>
  //   </aside>
  // );
}