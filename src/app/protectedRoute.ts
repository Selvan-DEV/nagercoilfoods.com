import { getAdminToken, getUserToken } from '@/shared/SharedService/StorageService';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: { isAdmin: boolean };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      let userToken = '';
      if (isAdmin) {
        userToken = getAdminToken();
      } else {
        userToken = getUserToken();
      }

      if (!userToken && !isAdmin) {
        router.push('/');
        return;
      } else if (!userToken && isAdmin) {
        router.push('/shop-dashboard-login');
        return;
      }
    };

    checkSession();
  }, [isAdmin, pathName, router]);

  return children;
};

export default ProtectedRoute;
