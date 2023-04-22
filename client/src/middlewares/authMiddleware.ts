import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { isLogin } from '@/features/authentication/services/authentication.service';
import { useRouter } from 'next/router';

export default function authMiddleware(handler: NextApiHandler) {
     return async (req: NextApiRequest, res: NextApiResponse) => {
          try {
            const response = await isLogin();
      
            if (response !== true) {
               const router = useRouter();
              // User is not authenticated, redirect to login page
              res.writeHead(302, { Location: '/auth/login' });
              res.end();
              return;
            }
      
            // User is authenticated, call the handler function
            return handler(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).end();
          }
        };
   }
   