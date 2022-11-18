import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className='container'>
        <div className={s.inner}>Try sending an email!</div>
      </div>
    </footer>
  );
};
