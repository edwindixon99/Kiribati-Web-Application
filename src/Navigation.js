import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav>
      <ul>
        <li><NavLink to='/kiribati'>Kiribati</NavLink></li>
        <li><NavLink to='/english'>English</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
      </ul>
    </nav>
  );

export default Navigation;