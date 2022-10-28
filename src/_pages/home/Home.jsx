import { useSelector } from 'react-redux';

export { Home };

function Home() {
    // const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);

    return (
        <div className="row mt-4 gy-5">
        <div className="col-12">
            <h1>Home</h1>
            <p>{authUser.name}</p>
        </div>
        </div>
    );
}
