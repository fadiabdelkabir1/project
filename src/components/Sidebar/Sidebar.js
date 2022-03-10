import React, { useContext, useRef, useState } from "react";
import './sidebar.css'
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLogo,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import { logoSVG } from "../../assets";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import { ThemeContext } from "./../../App";
import { useLocation } from "react-router-dom";
import { logoutHandler } from "./../../redux/actions/auth-action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const user = useSelector((state) => state.auth.user);
    const searchRef = useRef(null);
    const { setTheme, theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const dispatch=useDispatch()
    const logoutUser=()=>{
        dispatch(logoutHandler())
      }
    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };
    const tomaplist=(user.usertype==="Landlord")? linksArraylandlord:linksarrayloaner
     

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
           
                
            </>
            <SLogo style={{display:"flex",flexDirection:"row"}}>
            <img src={logoSVG} alt="logo" />                    
                    <li>
                    {sidebarOpen? <p style={theme === "dark" ? { color: "white" } : {color: "black"}}>K e r i t y</p>:<></>}
                    </li>
            </SLogo>
            <SSidebarButton isOpen={sidebarOpen} onClick={() => {setSidebarOpen((p) => !p)}}>
                    <AiOutlineLeft />
                </SSidebarButton>
            <SDivider />
            {tomaplist.map(({ icon, label, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}
                                
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            <SLinkContainer key='Settings'>
                <SLink to="/settings"  style={!sidebarOpen ? { width: `fit-content` } : {}}>
                    <SLinkIcon><AiOutlineSetting /></SLinkIcon>
                    {sidebarOpen && <SLinkLabel>Profile Settings</SLinkLabel>}
                </SLink>
            </SLinkContainer>
            <SLinkContainer key='Logout'>
                <SLink to="/"  onClick={logoutUser} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                    <SLinkIcon><MdLogout /></SLinkIcon>
                    {sidebarOpen && <SLinkLabel>Logout</SLinkLabel>}
                </SLink>
            </SLinkContainer>
            <SDivider />
            <STheme>
                {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                <SThemeToggler
                    isActive={theme === "dark"}
                    onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};



const linksArraylandlord = [
    {
        label: "Manage Offers",
        icon: <MdOutlineAnalytics />,
        to: "/"
    },
    {
        label: "Add Offers",
        icon: <AiOutlineApartment />,
        to: "/addposte"
    },
];

const linksarrayloaner=[
    {
        label: "Map Search",
        icon: <AiOutlineHome />,
        to: "/"
    },
    {
        label: "List Search",
        icon: <BsPeople />,
        to: "/Listsearch"
    },
]

export default Sidebar;
