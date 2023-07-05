import { useTypedSelector } from '@/hook/useTypedSelector';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { userInfo } = useTypedSelector((store) => store.auth);

  const router = useRouter();

  if (!userInfo) {

    router.push('/auth/login');

    return null;
  }

  return <>{children}</>;
};

export default PrivateRoutes;