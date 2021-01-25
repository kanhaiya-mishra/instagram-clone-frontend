import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserService from '../../services/user-service';

class PrivateRoute extends React.Component {

   render() {
      const { component: Component, ...rest } = this.props;
      const user = UserService.getUser();
      return (
         <Route
            {...rest}
            render={props => {
               if (user) {
                  return <Component {...rest} user={user} />;
               } else {
                  return <Redirect to={{ pathname: '/signin' }} />;
               }
            }}
         />
      );
   }
}

export default PrivateRoute;
