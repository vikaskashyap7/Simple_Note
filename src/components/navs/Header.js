import { Edit, Tag } from "react-feather";
import { Link } from "react-router-dom";
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
} from "reactstrap";

const Header = ({ appName, homePage, logoutLink }) => {
    return (
        <>
            <Navbar color="dark" expand="md" dark>
                <NavbarBrand href="/">Simple Notes</NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() {}} />
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link to={"/notes/add"} className="nav-link">
                                <Edit size={16} className="feather" />
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={"/tags"} className="nav-link">
                                <Tag size={16} className="feather" />
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Header;
