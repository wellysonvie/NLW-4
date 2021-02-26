import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { LoginGitHub } from '../components/LoginGitHub';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bem-vindo | move.it</title>
      </Head>

      <section>
        <div>
          <img src="/simbol.svg" alt="move.it"/>
        </div>
        <div>
          <img src="/logo-white.svg" alt="move.it"/>
          <LoginGitHub />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { name, avatar } = ctx.req.cookies;

  if (name && avatar) {
    ctx.res.setHeader("location", "/home");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  return {
    props: {}
  }
}