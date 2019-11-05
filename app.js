import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Mod } from './components/mod';
import { Readme } from './components/readme';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { Loader } from './components/loader';
import { getMods } from './logic/db';

// let mods = ['KeviTV/MekanisM', 'Anuken/ExampleMod', 'ThatOneBepis/Infinitodustry'];

// function Mods() {
//   return mods.map(e => <Mod key={e} mod={e} />);
// }

export default function App() {
  return (
    <HashRouter>
      <Route
        exact
        path='/mods'
        component={() => {
          let [mods, setMods] = useState([]);
          useEffect(() => {
            getMods(mods => setMods(mods));
          }, []);
          return mods.map(e => <Mod key={e.repo} mod={e.repo} />);
        }}
      />
      <Route
        exact
        path='/mod/:author/:name'
        component={({ match }) => (
          <React.Fragment>
            <Mod mod={match.params.author + '/' + match.params.name} showLearnMore={false} />
            <Readme mod={match.params.author + '/' + match.params.name} />
          </React.Fragment>
        )}
      />
      <Route exact path='/'>
        <Redirect to='/mods' />
      </Route>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
