import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import {Redirect} from "react-router";
import { HumanResourceComp } from "./Human";
import CreateEditPersonComp from "./Human/CreateEditPerson/CreateEditPersonComp";


const HumanResourceRoutes: React.FC =  () => {
   const [t, i18n] = useTranslation();
   const { path, url } = useRouteMatch();
   return (
      <Switch>
         <Route exact path={path} component={HumanResourceComp}/>
         <Route path={`${path}/:personId`} component={CreateEditPersonComp}/>
      </Switch>
   );
};


const ResourceRoutes: React.FC =  () => {
  const [t, i18n] = useTranslation();
  const { path, url } = useRouteMatch();
  console.log(url);
  return (
     <Switch>
        <Route path={`${path}/human`} component={HumanResourceRoutes}/>
        <Redirect exact from={`${path}/`} to="/invalidRoute" />
     </Switch>
  );
};
export default ResourceRoutes;
