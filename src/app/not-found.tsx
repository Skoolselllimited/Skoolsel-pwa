import { Metadata } from 'next';
import Page404 from '@/components/Error/404';

export const metadata: Metadata = {
  title: 'Page Not Found - Skoolsel',
  description: "Sorry, we couldn't find this page.",
};

export default function NotFound() {
  return <Page404 />;
}
