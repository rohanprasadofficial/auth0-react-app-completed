import './App.css';
import { Navbar } from './components/navbar';
import { Router, Route, Switch } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';
import { Footer } from './components/footer';
import Dashboard  from './components/dashboard';
import { useAuth0 } from "@auth0/auth0-react";
import {createBrowserHistory} from "history";
import { HeroText } from './components/hero';
import Loading from './components/Loading';
import { Profile } from './components/profile';
const history = createBrowserHistory();

function App() {

  const { isLoading, error , isAuthenticated } = useAuth0();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    if (error) {
      return <div>Oops... {error.message}</div>;
    }

    
  if (isLoading) {
    return <Loading />;
  }
  return (

    <Router history={history}>
   <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
    <Navbar/>
        <Switch>
          <Route path="/" exact component={ isAuthenticated ? Dashboard : HeroText} />
          <Route path="/profile" component={Profile}/>
          <Route path='*' component={() => { return (<div>404 , PAGE NOT FOUND</div>) }}/>
        </Switch>
        <Footer/>
        </MantineProvider>

    </ColorSchemeProvider>
    </Router>
  );
}

export default App;
