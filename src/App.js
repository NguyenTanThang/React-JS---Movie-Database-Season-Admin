import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Role} from "./helpers";

import Dashboard from "./pages/Dashboard";
import GenrePage from "./pages/GenrePage";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Logout from "./pages/Logout";
import PlanPage from "./pages/PlanPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ManagerPage from "./pages/ManagerPage";
import CustomerPage from "./pages/CustomerPage";
import MoviePage from "./pages/MoviePage";
import SeriesPage from "./pages/SeriesPage";
import AddManagerPage from "./pages/AddManagerPage";
import AddPlanPage from "./pages/AddPlanPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddSeriesPage from "./pages/AddSeriesPage";
import AddSeasonPage from "./pages/AddSeasonPage";
import AddEpisodePage from "./pages/AddEpisodePage";
import AddSubtitlePage from "./pages/AddSubtitlePage";
import EditManagerPage from "./pages/EditManagerPage";
import EditPlanPage from "./pages/EditPlanPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import EditMoviePage from "./pages/EditMoviePage";
import EditSeriesPage from "./pages/EditSeriesPage";
import EditSeasonPage from "./pages/EditSeasonPage";
import EditEpisodePage from "./pages/EditEpisodePage";
import EditSubtitlePage from "./pages/EditSubtitlePage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import SeasonDetailsPage from "./pages/SeasonDetailsPage";
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";
import LayoutSide from "./components/partials/LayoutSide";
import PrivateRoute from "./components/partials/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <LayoutSide>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute roles={[Role.Admin]} exact path="/managers" component={ManagerPage}/>
          <PrivateRoute exact path="/movies" component={MoviePage}/>
          <PrivateRoute exact path="/series" component={SeriesPage}/>
          <PrivateRoute roles={[Role.Admin]} exact path="/customers" component={CustomerPage}/>
          <PrivateRoute roles={[Role.Admin]} exact path="/managers/add" component={AddManagerPage}/>
          <PrivateRoute roles={[Role.Admin]} exact path="/plans/add" component={AddPlanPage}/>
          <PrivateRoute roles={[Role.Admin]} exact path="/customers/add" component={AddCustomerPage}/>
          <PrivateRoute exact path="/movies/add" component={AddMoviePage}/>
          <PrivateRoute exact path="/series/add" component={AddSeriesPage}/>
          <PrivateRoute exact path="/seasons/add/:seriesID" component={AddSeasonPage}/>
          <PrivateRoute exact path="/episodes/add/:seasonID" component={AddEpisodePage}/>
          <PrivateRoute exact path="/subtitles/add/:videoID" component={AddSubtitlePage}/>
          <PrivateRoute roles={[Role.Admin]} path="/managers/edit/:managerID" component={EditManagerPage}/>
          <PrivateRoute roles={[Role.Admin]} path="/customers/edit/:customerID" component={EditCustomerPage}/>
          <PrivateRoute path="/movies/edit/:movieID" component={EditMoviePage}/>
          <PrivateRoute path="/series/edit/:seriesID" component={EditSeriesPage}/>
          <PrivateRoute exact path="/seasons/edit/:seasonID" component={EditSeasonPage}/>
          <PrivateRoute exact path="/episodes/edit/:episodeID" component={EditEpisodePage}/>
          <PrivateRoute exact path="/subtitles/edit/:subtitleID" component={EditSubtitlePage}/>
          <PrivateRoute roles={[Role.Admin]} path="/plans/edit/:planID" component={EditPlanPage}/>
          <PrivateRoute roles={[Role.Admin]} path="/customers/details/:customerID" component={CustomerDetailsPage}/>
          <PrivateRoute path="/movies/details/:movieID" component={MovieDetailsPage}/>
          <PrivateRoute path="/series/details/:seriesID" component={SeriesDetailsPage}/>
          <PrivateRoute path="/seasons/details/:seasonID" component={SeasonDetailsPage}/>
          <PrivateRoute path="/episodes/details/:episodeID" component={EpisodeDetailsPage}/>
          <PrivateRoute path="/genres" component={GenrePage}/>
          <PrivateRoute roles={[Role.Admin]} path="/plans" component={PlanPage}/>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/logout" component={Logout}/>
          <PrivateRoute path="/users/change-password" component={ChangePasswordPage}/>
        </Switch>
        </LayoutSide>
      </Router>
    </div>
  );
}

export default App;
