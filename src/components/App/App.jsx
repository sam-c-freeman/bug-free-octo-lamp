import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SavedRecipesList from '../SavedRecipes/SavedRecipes';
import Cupboard from '../Cupboard/Cupboard';
import Navigation from '../Navigation/Navigation';
import AddDrinkForm from '../AddDrinkForm/AddDrinkForm';
import Explore from '../Explore/Explore';
import DrinkDetails from '../DrinkDetails/DrinkDetails';
import SavedDrinkDetails from '../SavedDrinkDetails/SavedDrinkDetails';
import EditDrinkForm from '../EditDrinkForm/EditDrinkForm';
import Upload from '../Upload/Upload';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="background">
        <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <ProtectedRoute
              // logged in shows Saved Recipes else shows LoginPage
              exact
              path="/savedrecipes"
            >
              <SavedRecipesList />
            </ProtectedRoute>  

            <ProtectedRoute
              // logged in shows Saved Drink details page else shows LoginPage
              exact
              path="/savedrecipes/:id"
            >
              <SavedDrinkDetails />
            </ProtectedRoute>  

            <ProtectedRoute
              // logged in shows Edit Form page else shows LoginPage
              exact
              path="/savedrecipes/:id/edit"
            >
              <EditDrinkForm />
            </ProtectedRoute>  
{/* 
            <ProtectedRoute
           
              exact
              path="/upload"
            >
              <Upload />
            </ProtectedRoute>   */}



            <ProtectedRoute
              // logged in shows addDrinkForm else shows LoginPage
              exact
              path="/addDrink"
            >
              <AddDrinkForm />
            </ProtectedRoute>
            
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/cupboard"
            >
              <Cupboard />
            </ProtectedRoute>  

            <ProtectedRoute
              // logged in shows ExplorePage else shows LoginPage
              exact
              path="/explore"
            >
              <Explore />
            </ProtectedRoute> 
            <ProtectedRoute
              // logged in shows Drink Details page else shows LoginPage
              exact
              path="/recipes/:id"
            >
              <DrinkDetails />
            </ProtectedRoute>



            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LoginPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          {/* <Footer /> */}
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
