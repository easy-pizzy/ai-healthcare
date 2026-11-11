import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { MemberManagement } from './pages/MemberManagement';
import { HealthInfoManagement } from './pages/HealthInfoManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'members',
        Component: MemberManagement
      },
      {
        path: 'health',
        Component: HealthInfoManagement
      }
    ]
  }
]);
