# PatientAPP-Front

## File Structure for Build

```
├───patientapp-react
│───build-repo
```

Build path is located in the build-repo folder

## Build instrucions (LOCAL)

```sh
cd ./patientapp-react
git add .
git commit -m "Message"
npm run build // npm run winBuild
```

## Deploy instrucions (LOCAL)

```sh
cd ../build-repo
git add .
git commit -m "Build ${version}"
git push patientapp master
```
> Note: Replace `${version}` with the version of the build


## Build instrucions (SERVER)

```sh
cd ./patientapp-react
docker-compose up -d --build
```

## References

- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [React Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)
- [Git deployment with remote server](https://hackernoon.com/deploy-website-to-remote-server-using-git-da6048805637)