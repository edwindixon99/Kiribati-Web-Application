import { NavLink, Switch, Route } from 'react-router-dom';
import TranslationPage from './TranslationPage'
import props from 'prop-types';


const Main = () => (
    <Switch>
      <Route exact path='/kiribati' component={() => <TranslationPage {...props} lang={'kiribati'} />} />
      <Route exact path='/english' component={() => <TranslationPage {...props} lang={'english'} />} />
      {/* <Route exact path='/register' component={Register}></Route> */}
    </Switch>
  );

export default Main;