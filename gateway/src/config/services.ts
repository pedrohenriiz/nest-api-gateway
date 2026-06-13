import 'dotenv/config';

export const SERVICES = {
  users: process.env.USER_SERVICE_URL,
  auth: process.env.AUTH_SERVICE_URL,
};
