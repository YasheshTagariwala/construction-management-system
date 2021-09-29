import React, {useState} from "react";
import {Link} from "react-router-dom";
import favicon from '../assets/images/favicon.png'
import {Collapse, NavItem, NavLink} from "reactstrap";

function SideBar(props) {
    const [isInspectionOpen, setIsInspectionOpen] = useState(false);
    return (
        <ul className="navbar-nav sidebar accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center" to="/">
                <div className="sidebar-brand-icon">
                    <img src={favicon} alt=""/>
                </div>
                <div className="sidebar-brand-text ml-2">C360 LABS</div>
            </Link>
            {/*className="active"*/}
            <NavItem>
                <NavLink href={`/${props.user?.role}/dashboard`}>
                    <i className="fas fa-fw fa-tachometer-alt"/>
                    <span>Dashboard</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={`${!isInspectionOpen ? 'collapsed' : ''}`} href="#" data-toggle="collapse"
                         data-target="#collapsePage"
                         aria-expanded="true" aria-controls="collapsePage"
                         onClick={() => setIsInspectionOpen(prevState => !prevState)}>
                    <i className="fas fa-fw fa-columns"/>
                    <span>Inspection</span>
                </NavLink>
                <Collapse isOpen={isInspectionOpen}>
                    <div className="primary-light-background  py-2 collapse-inner rounded">
                        <a className="collapse-item" href={`/${props.user?.role}/inspection`}>Inspections</a>
                        <a className="collapse-item" href={`/${props.user?.role}/inspection/add`}>Add Inspection</a>
                    </div>
                </Collapse>
            </NavItem>
        </ul>
    )
}

export default SideBar;
