import React, {useState} from "react";
import avatar from "../assets/images/avatar.png"
import {logoutUser} from "../redux/auth/actions";
import {connect} from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    NavLink
} from "reactstrap";
import {DropdownDivider, DropdownHeader} from "semantic-ui-react";

function Header(props) {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    window.addEventListener('resize', (function () {
        window.width < 768 && document.querySelector(".sidebar .collapse").classList.toggle("hide")
    }))

    document.addEventListener("scroll", (function () {
        let element = document.querySelector(".scroll-to-top");
        if (element) {
            if (document.documentElement.scrollTop > 100) {
                element.classList.remove('d-none');
                element.classList.add('d-block');
            } else {
                element.classList.remove('d-block');
                element.classList.add('d-none');
            }
        }
    }))
    const toggleSidebar = () => {
        document.body.classList.toggle("sidebar-toggled");
        document.querySelector(".sidebar").classList.toggle("toggled")
        document.querySelector(".sidebar").classList.contains("toggled") && document.querySelector(".sidebar .collapse").classList.toggle("hide");
    }

    const scrollToUp = (e) => {
        document.querySelector("html, body").scrollTo({
            top: 0,
            behavior: 'smooth',
            left: 0
        });
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <Navbar expand light className="topbar mb-4 static-top">
                <button id="sidebarToggleTop" onClick={() => toggleSidebar()}
                        className="btn btn-link rounded-circle ml-3">
                    <i className="fa fa-bars primary-color"/>
                </button>
                <ul className="navbar-nav ml-auto">
                    <Dropdown isOpen={notificationToggle} toggle={() => setNotificationToggle(prevState => !prevState)}
                              tag="li" className="no-arrow mr-2 nav-item cursor-pointer">
                        <DropdownToggle tag="a" className="nav-link dropdown-toggle" id="alertsDropdown">
                            <i className="fas fa-bell fa-fw primary-color"/>
                            <span className="badge badge-danger badge-counter">3+</span>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-list shadow animated--grow-in">
                            <DropdownHeader tag="h6" className="dropdown-header">Alerts Center</DropdownHeader>
                            <DropdownItem className="d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle primary-background">
                                        <i className="fas fa-file-alt text-white"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span
                                        className="font-weight-normal">A new monthly report is ready to download!</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem className="d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle primary-background">
                                        <i className="fas fa-file-alt text-white"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span
                                        className="font-weight-normal">A new monthly report is ready to download!</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem className="d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle primary-background">
                                        <i className="fas fa-file-alt text-white"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span
                                        className="font-weight-normal">A new monthly report is ready to download!</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem className="text-center small text-gray-800 bg-gray-200" href="#">
                                Show All Alerts
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown tag="li" className="no-arrow nav-item" isOpen={profileToggle}
                              toggle={() => setProfileToggle(prevState => !prevState)}>
                        <DropdownToggle tag="a" className="nav-link dropdown-toggle" role="button"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                        id="userDropdown" href="#">
                            <img alt="." className="img-profile rounded-circle" src={avatar} style={{
                                maxWidth: '60px'
                            }}/>
                        </DropdownToggle>
                        <DropdownMenu right className="shadow animated--grow-in" aria-labelledby="userDropdown">
                            <div className="px-4 py-2">
                                <h6 className="m-0 primary-color">Erica Jordon</h6>
                                <p className="m-0 text-gray-600">Admin</p>
                            </div>
                            <DropdownDivider className="dropdown-divider"/>
                            <DropdownItem className="px-4 py-2" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-600"/>
                                Profile
                            </DropdownItem>
                            <DropdownItem className="px-4 py-2" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-600"/>
                                Settings
                            </DropdownItem>
                            <DropdownItem className="px-4 py-2" href="#"
                                          onClick={() => props.logoutUser(props.history)}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-600"/>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ul>
            </Navbar>
            <div className="scroll-to-top rounded" onClick={(e) => scrollToUp(e)}>
                <i className="fas fa-angle-up"/>
            </div>
        </React.Fragment>
    )
}

const mapActionsToProps = {logoutUser}

export default connect(
    null,
    mapActionsToProps
)(Header)
