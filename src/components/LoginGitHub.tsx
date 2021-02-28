import { useState } from "react";
import { useRouter } from 'next/router'
import { HiArrowRight } from "react-icons/hi";
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../styles/components/LoginGitHub.module.css';

export function LoginGitHub() {
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  function login() {
    if (username !== '') {

      axios.get(`https://api.github.com/users/${username}`)
      .then((response) => {
        const user = response.data;
        Cookies.set('name', user.name ?? username);
        Cookies.set('avatar', user.avatar_url);
        router.push('/home');
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          setErrorMsg('Usuário não encontrado.');
        } else {
          setErrorMsg('Ocorreu um erro ao buscar os dados.');
        }
      })

    } else {
      setErrorMsg('Preencha seu username para continuar.');
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
          onFocus={event => event.target.placeholder = ''}
          onBlur={event => event.target.placeholder = 'Digite seu username'}
          placeholder="Digite seu username"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={login}
          style={{ backgroundColor: (username !== '' ? 'var(--green)' : '') }}
        >
          <HiArrowRight />
        </button>
      </div>
      <small>{errorMsg}</small>
    </div>
  );
}