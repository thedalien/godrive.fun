import { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile && menuOpen) {
            setMenuOpen(false);
        }
    }, [isMobile, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const navLinkClickHandler = (path) => {
        if (path === "logo") {
            navigate("/");
            return;
        }
        menuToggleHandler();
        navigate(path);
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <div className={classes.header__content__logo}>
                    <img onClick={() => navLinkClickHandler('logo')} src='/carRentalLogo.png' alt="logo" />
                </div>
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && isMobile ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <button onClick={() => navLinkClickHandler("/")} className="link">
                                Home
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navLinkClickHandler("/")} className="link">
                                Cars
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navLinkClickHandler("/")} className="link">
                                Contact
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navLinkClickHandler("/login")} className="login-btn">
                                Login
                            </button>
                        </li>

                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
