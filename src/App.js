import React, { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout/Layout";
import Routes from "./Routes";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getAuthUser } from "./redux/actions/auth-action";
import Thepage from "./components/firstpage/thepage";
import "leaflet/dist/leaflet.css"
import { getAllPostes } from "./redux/actions/poste-action";



export const ThemeContext = React.createContext(null);

const App = () => {
    const [theme, setTheme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getAuthUser())
    dispatch(getAllPostes())
    ;
  }, []);


    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <ThemeProvider theme={themeStyle}>
                
                <GlobalStyle />
                <Helmet>
                    <title>Sidebar - Code Focus</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <>
                {isAuth? (<Layout>
                        <Routes />
                    </Layout>):<Thepage/> }
                    
                </>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default App;
