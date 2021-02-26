import { useState } from "react";
import { useRouter } from 'next/router'
import { HiArrowRight } from "react-icons/hi";
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../styles/components/LoginGitHub.module.css';

export function LoginGitHub() {
  const [username, setUsername] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const router = useRouter();

  async function login() {
    if (username !== '') {
      const res = await axios.get(`https://api.github.com/users/${username}`);

      if (res.status == 200) {
        const user = res.data;
        Cookies.set('name', user.name);
        Cookies.set('avatar', user.avatar_url);
        router.push('/home');
      } else {
        setUsernameInvalid(true);
      }

    } else {
      setUsernameInvalid(true);
    }
  }

  return (
    <div className={styles.loginGitHubContainer}>
      <h1>Bem-vindo</h1>
      <div>
        <img src="/icons/github.svg" alt="GitHub" />
        <p>Entre com seu dados do GitHub para começar</p>
      </div>
      <div>
        <input
          type="text"
          name="username"
          onChange={event => setUsername(event.target.value)}
          placeholder="Digite seu username"
        />
        <button
          type="button"
          onClick={login}
        >
          <HiArrowRight />
        </button>
      </div>
      { usernameInvalid && <small>Username inválido. Preencha para continuar.</small>}
    </div>
  );
}