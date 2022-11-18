import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className='page'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
