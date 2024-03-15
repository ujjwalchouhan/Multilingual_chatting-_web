import React from 'react'
import Send from './Send'
import Recev from './Recev'
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";
import './styles.css';
function Side() {
    const { authUser } = useAuthContext();
    return (
        <div>
            <div>
                <div className="btn-group" >
                    <button className="menu " type="button" data-bs-toggle="dropdown" aria-expanded="false"
                        style={{
                            background: 'linear-gradient(177.9deg, rgb(62 61 67) 50%, rgb(26 30 40) 50%)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            margin: "10px", color: "white", borderRadius: "10px"
                        }}
                    >
                        Menu
                    </button >
                    <h3 className="name">welcome {authUser.fullName}</h3>
                    <ul className="dropdown-menu list" aria-labelledby="navbarDropdown"
                        style={{
                            background: 'linear-gradient(177.9deg, rgb(62 61 67) 3.6%, rgb(26 30 40) 50.8%)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', color: "black"
                        }}
                    >
                        <li> <div className="dropdown-item  list"><Send /></div></li>
                        <li> <div className="dropdown-item  list"><Recev /></div></li>
                        <li><hr className="dropdown-divider text-white" /></li>
                        < li > <div className="dropdown-item  list"><LogoutButton /></div></li>
                    </ul>
                </div>
            </div>

        </div >
    )

};

export default Side;
