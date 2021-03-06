import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {getUserRole} from "../../actions/authActions";
import {authenticationService} from "../../services";

class SideNav extends Component {

    componentDidMount() {
        this.props.getUserRole();

        const sideBarOpen = document.querySelector(".sidebar-open");
        const sideBarClose = document.querySelector(".sidebar-close");
        const sideBar = document.querySelector(".sidebar");

        /*
        const sideNavList = Array.from(document.querySelectorAll(".sidebar li"));

        const removeActives = (list) => {
            list.forEach(item => {
                item.classList.remove("active");
            })
        }

        sideNavList.forEach(sideNavItem => {
            sideNavItem.addEventListener("click", (e) => {
                removeActives(sideNavList);
                sideNavItem.classList.add("active");
                sideBar.classList.remove("active");
            })
        })
        */

        sideBarOpen.addEventListener("click", (e) => {
            sideBar.classList.toggle("active");
        })

        sideBarClose.addEventListener("click", (e) => {
            sideBar.classList.remove("active");
        })
    }

    displayNavItems = () => {
        const {userRole} = this.props;
        const currentUser = authenticationService.currentUserValue;
        if (currentUser && userRole === "admin") {
          return (
            <>
                <li>
                    <Link to="/">
                    <i class="fas fa-chart-line"></i>
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/series">
                    <i className="fas fa-video"></i>
                        Series
                    </Link>
                </li>

                <li>
                    <Link to="/movies">
                    <i className="fas fa-film" aria-hidden="true"></i>
                        Movies
                    </Link>
                </li>

                <li>
                    <Link to="/customers">
                    <i className="fas fa-users" aria-hidden="true"></i>
                        Customers
                    </Link>
                </li>

                <li>
                    <Link to="/managers">
                    <i className="fas fa-user-cog"></i>
                    Managers
                    </Link>
                </li>

                <li>
                    <Link to="/genres">
                    <i className="fas fa-th"></i>
                    Genres
                    </Link>
                </li>

                <li>
                    <Link to="/plans">
                    <i className="fas fa-calendar" aria-hidden="true"></i>
                    Plans
                    </Link>
                </li>
                
                {/*
                    <li>
                        <Link to="/subscriptions">
                        <i className="fas fa-calendar" aria-hidden="true"></i>
                        Subscriptions
                        </Link>
                    </li>
                */}

                <li>
                    <Link to="/users/change-password">
                    <i className="fas fa-lock"></i>
                    Password
                    </Link>
                </li>
                
                <li>
                    <Link to="/logout">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                    </Link>
                </li>
            </>
          )
        } 
        else if (currentUser && userRole === "staff") {
            return (
              <>
                <li>
                    <Link to="/">
                    <i class="fas fa-chart-line"></i>
                        Dashboard
                    </Link>
                </li>

                  <li>
                      <Link to="/series">
                      <i className="fas fa-video"></i>
                          Series
                      </Link>
                  </li>
  
                  <li>
                      <Link to="/movies">
                      <i className="fas fa-film" aria-hidden="true"></i>
                          Movies
                      </Link>
                  </li>
  
                  <li>
                      <Link to="/genres">
                      <i className="fas fa-th"></i>
                      Genres
                      </Link>
                  </li>
                  
                  {/*
                      <li>
                          <Link to="/subscriptions">
                          <i className="fas fa-calendar" aria-hidden="true"></i>
                          Subscriptions
                          </Link>
                      </li>
                  */}
  
                  <li>
                      <Link to="/users/change-password">
                      <i className="fas fa-lock"></i>
                      Password
                      </Link>
                  </li>
                  
                  <li>
                      <Link to="/logout">
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                      </Link>
                  </li>
              </>
            )
          }
        else {
          return (
            <>
                <li>
                    <Link to="/login">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                    </Link>
                </li>
            </>
          )
        }
      }

    render() {
        const {displayNavItems} = this;
        const {userRole} = this.props;

        return (
            <div className="sidebar">
            <div className="sidebar-close">
                <i className="fas fa-times" aria-hidden="true"></i>
            </div>
                <h2>{userRole ? userRole : "Sidebar"}</h2>
                <ul>
                    {displayNavItems()}
                </ul> 
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserRole: () => {
            dispatch(getUserRole())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userRole: state.authReducer.userRole
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
