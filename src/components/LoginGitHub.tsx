import { useState } from "react";
import { useRouter } from 'next/router'
import { HiArrowRight } from "react-icons/hi";
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../styles/components/LoginGitHub.module.css';

export function LoginGitHub() {
  const [username, setUsername] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [btnColor, setBtnColor] = useState('');
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
        setUsernameInvalid(true);
      })

    } else {
      setUsernameInvalid(true);
    }
  }

  function swapBtnColor(usernameValue: string) {
    if (usernameValue === '') {
      setBtnColor('');
    } else {
      setBtnColor('var(--green)');
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
          onChange={event => { setUsername(event.target.value); swapBtnColor(event.target.value) }}
          onFocus={event => event.target.placeholder = ''}
          onBlur={event => event.target.placeholder = 'Digite seu username'}
          placeholder="Digite seu username"
        />
        <button
          type="button"
          onClick={login}
          style={{ backgroundColor: btnColor }}
        >
          <HiArrowRight />
        </button>
      </div>
      { usernameInvalid && <small>Username inválido. Preencha para continuar.</small>}
    </div>
  );
}