import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute({ children, roles}) {
    const authUser = useSelector((x) => x.auth.user);
    
    if (!authUser ) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }
    // authUser.roles format [{ id: 1, name: "admin" }]
    // roles format ["admin", "user"]
    if (roles && !roles.some((x) => authUser.roles.some((y) => y.name === x))) {
        // role not authorised so redirect to home page
        return <Navigate to="/" state={{ from: history.location }} />
    }
    // authorized so return child components
    return children;
}