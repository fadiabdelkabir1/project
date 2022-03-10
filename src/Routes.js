import React from "react";
import { Route, Switch } from "react-router-dom";
import Settings from "./pages/settings";
import Addposte from "./pages/addposte.js"
import Myoffers from "./pages/Myoffers";
import Offerpage from "./components/Offerpreview.js/offerpage";
import ListSearch from "./pages/ListSearch";
import OfferpageLoaner from "./components/listofoffers/offerpageLoaner";
import { useSelector } from "react-redux";
import Globalmap from "./components/mapscompo/globalmap";
const Routes = () => {
    const user = useSelector((state)=>state.auth.user)
    return (
        <Switch>
            {(user.usertype==="Landlord")? <Route exact path="/">
                <Myoffers/>
            </Route>:<Route exact path="/">
            <Globalmap/>
        </Route>}
            <Route exact path="/Listsearch">
                <ListSearch/>
            </Route>
            <Route exact path="/addposte">
                <Addposte/>
            </Route>
            <Route exact path="/settings">
                <Settings/>
            </Route>
            <Route exact path="/offernumber/:id">
                <Offerpage/>
            </Route>
            <Route exact path="/offerpage/:id">
                <OfferpageLoaner/>
            </Route>
        </Switch>
    );
};

export default Routes;
