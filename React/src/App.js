import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Private from './myComponent/Private_Route/Private';

require('./myComponent/allCss/login.css')

import Login from './myComponent/Screens/Login';
import Register from './myComponent/Screens/Register';
import privateScreen from './myComponent/Screens/privateScreen'
import Forgotpass from './myComponent/Screens/Forgotpass'
import Reset from './myComponent/Screens/Resetpass'

function App() {
  return (
 
    <BrowserRouter>
      <Switch>
        <Private exact path ='/' component = {privateScreen}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/forgotpassword' component={Forgotpass}/>
        <Route exact path = '/resetPassword/:token' component= {Reset}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
