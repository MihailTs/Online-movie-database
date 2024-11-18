import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MoviesLibrary } from './pages/MoviesLibrary';
import { LoginPage } from './pages/LoginPage';
import { useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { PrivateOutlet } from './outlets/PrivateOutlet';
import { AppFooter } from './components/AppFooter';
import { MoviePage } from './pages/MoviePage';
import { User, userInfoService } from './services/userInfo';
import { EntryPage } from './pages/EntryPage';
import AddMoviePage from './pages/AddMoviePage';
import SignUpPage from './pages/SignUpPage';
import { CurrentUserProvider } from './contexts/CurrentUser';
import { UserPreferencesProvider } from './contexts/UserPreferences';
import { PublicOutlet } from './outlets/PublicOutlet';

export function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <UserPreferencesProvider>
          <AppHeader/>
          <Routes>
            <Route>
              <Route path='/' element={<><PublicOutlet/><EntryPage/></>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>  
              
              <Route path='/' element={<PrivateOutlet/>}>
                <Route path='movies/library' element={<MoviesLibrary/>}/>
                <Route path='movies/movie-page'>
                  <Route path=':movieId' element={<MoviePage/>}/>
                </Route>
                <Route path='movies/add-movie' element={<AddMoviePage/>}/>
              </Route>
              <Route path='*' element={<Navigate to='/'/>}/>
            </Route>
          </Routes>
          <AppFooter/>
        </UserPreferencesProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  )
}