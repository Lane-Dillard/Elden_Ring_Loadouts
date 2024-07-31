import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { WeaponList } from './components/Pages/Loadout/weaponList';
import { HelmList } from './components/Pages/Loadout/helmList';
import { ChestList } from './components/Pages/Loadout/chestList';
import { GauntletsList } from './components/Pages/Loadout/gauntletsList';
import { GreavesList } from './components/Pages/Loadout/greavesList';
import { LoadoutPage } from './components/Pages/Loadout/createLoadout';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Pages/Login/Login';
import { SignUp } from './components/Pages/Login/SignUp';
import MainPage from './components/Pages/Main/mainPage';
import NavBar from './components/nav/NavBar';
import UserLoadouts from './components/Pages/Loadout/UserLoadouts';
import EditLoadout from './components/Pages/Loadout/editLoadout';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/loadout" element={<LoadoutPage/>}/>
        <Route path="/user/loadouts" element={<UserLoadouts/>}/>
        <Route path="/edit/:loadoutId" element={<EditLoadout />} />


      </Routes>
    </div>
  );
};

export default App;


