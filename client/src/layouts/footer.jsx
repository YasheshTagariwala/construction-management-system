import React from "react";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="sticky-footer bg-white">
            <Container className="my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; {new Date().getFullYear()} &nbsp;
                        <b>
                            <Link to="#" target="_blank" className="text-uppercase">c360 Labs</Link>
                        </b>
                    </span>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;
