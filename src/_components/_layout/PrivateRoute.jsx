import { Navigate } from 'react-router-dom';
import { store } from '_store'
import { authActions } from '_store/auth.slice';
import { history } from '_helpers';
import { useSelector } from 'react-redux';

export { PrivateRoute };

function PrivateRoute({ children, roles}) {
    const authUser = useSelector(state => state.auth.user);
    if (!authUser) {
        store.dispatch(authActions.logout());
        return <Navigate to="/login" state={{ from: history.location }} />
    }
    if (roles && !roles.some((x) => authUser.roles.some((y) => y.name === x))) {
        return <Navigate to="/" state={{ from: history.location }} />
    }
    return children;
}