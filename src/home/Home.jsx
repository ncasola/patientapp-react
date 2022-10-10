import { useSelector } from 'react-redux';

export { Home };

function Home() {
    // const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);

    return (
        <div>
            <h1>Hi {authUser?.email}!</h1>
        </div>
    );
}
