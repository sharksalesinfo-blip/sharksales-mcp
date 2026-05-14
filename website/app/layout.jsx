import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getBrands } from '../lib/data';

export const metadata = {
  title: 'Asia Yacht Services — Yacht professionals Asia-Pacific',
  description:
    'Yacht professionals since 2004. Exclusive dealer for premium yacht brands across the Asia-Pacific region.',
};

export default async function RootLayout({ children }) {
  const brands = await getBrands();
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer brands={brands} />
      </body>
    </html>
  );
}
