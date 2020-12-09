import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";

class SideNav extends Component {
    
    componentDidMount() {
        const sideBarOpen = document.querySelector(".sidebar-open");
        const sideBarClose = document.querySelector(".sidebar-close");
        const sideBar = document.querySelector(".sidebar");
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

        sideBarOpen.addEventListener("click", (e) => {
            sideBar.classList.toggle("active");
        })

        sideBarClose.addEventListener("click", (e) => {
            sideBar.classList.remove("active");
        })
    }

    displayNavItems = () => {
        let userID = localStorage.getItem("userID");
        userID = "123";
        if (userID) {
          return (
            <>
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
                
                <li>
                    <Link to="/subscriptions">
                    <i className="fas fa-calendar" aria-hidden="true"></i>
                    Subscriptions
                    </Link>
                </li>

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
        } else {
          return (
            <>
                <li>
                    <Link to="/users/login">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                    </Link>
                </li>
                    
                    <li>
                        <Link to="/users/signup">
                        <i className="fas fa-user-plus"></i>
                        Sign Up
                        </Link>
                    </li>
            </>
          )
        }
      }

    render() {
        const {displayNavItems} = this;

        return (
            <div className="sidebar">
      <div className="sidebar-close">
        <i className="fas fa-times" aria-hidden="true"></i>
      </div>
        <h2>Sidebar</h2>
        <ul>
            {displayNavItems()}
        </ul> 
    </div>
        )
    }
}

export default SideNav;
