import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home/index'
import LandingPage from './components/landingPage/index'
import CreateFood from './components/create/index'
import Details from './components/details/index'



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/detail/:id' component={Details}/>
        <Route exact path='/createFood' component={CreateFood}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
