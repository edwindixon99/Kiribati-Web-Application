import { NavLink, Switch, Route } from 'react-router-dom';
import TranslationPage from './TranslationPage'
import props from 'prop-types';
import Register from './Register'
import Home from './Home'
import WordPage from './WordPage';



const Main = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/kiribati' component={() => <TranslationPage {...props} lang={'kiribati'} />} />
      <Route exact path='/english' component={() => <TranslationPage {...props} lang={'english'} />} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/:lang/:word' component={WordPage} />
      {/* <Route exact path='/register' component={Register}></Route> */}
    </Switch>
  );

export default Main;