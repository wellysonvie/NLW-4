import { FiHome, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import styles from '../styles/components/SideBar.module.css';

export function SideBar() {
  const router = useRouter();

  function logout() {
    Cookies.remove('name');
    Cookies.remove('avatar');
    Cookies.remove('level');
    Cookies.remove('currentExperience');
    Cookies.remove('challengesCompleted');

    router.push('/');
  }

  return (
    <div className={styles.containerSideBar}>
      <img src="/simbol-blue.svg" alt="move.it"/>
      <FiHome className="iconNavigation"/>
      <FiLogOut onClick={logout}/>
    </div>
  );
}