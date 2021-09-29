import React from "react";
import {Link} from "react-router-dom";
import favicon from '../assets/images/favicon.png'
import {NavItem, NavLink} from "reactstrap";

function SideBar(props) {
    return (
        <ul className="navbar-nav sidebar accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center" to="/">
                <div className="sidebar-brand-icon">
                    <img src={favicon} alt=""/>
                </div>
                <div className="sidebar-brand-text ml-2">C360 LABS</div>
            </Link>
            <NavItem className="active">
                <NavLink href={`/${props.user?.role}/dashboard`}>
                    <i className="fas fa-fw fa-tachometer-alt"/>
                    <span>Dashboard</span>
                </NavLink>
            </NavItem>
            {/*TODO: FIX OPEN CLOSE*/}
            <NavItem>
                <NavLink className="collapsed" href="#" data-toggle="collapse" data-target="#collapsePage"
                         aria-expanded="true" aria-controls="collapsePage">
                    <i className="fas fa-fw fa-columns"/>
                    <span>Inspection</span>
                </NavLink>
                <div id="collapsePage" className="collapse" aria-labelledby="headingPage"
                     data-parent="#accordionSidebar">
                    <div className="primary-light-background  py-2 collapse-inner rounded">
                        <a className="collapse-item" href={`/${props.user?.role}/inspection/add`}>Add Inspection</a>
                        {/*<a className="collapse-item" href="inspectionDetail.php">Inspection Detail</a>*/}
                    </div>
                </div>
            </NavItem>
        </ul>
    )
}

export default SideBar;
