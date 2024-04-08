import { useEffect, Fragment } from "react";
import RouterConfiguration from "./components/common/router/RouterConfiguration";
import { useAppDispatch, useAppSelector } from "./context-store";
import { checkAuthentication } from "./context-store/contex-initializer";
import AppLoading from "./landing-pages/AppLoading";
import routes from "./router-config";
import ToastContainer from './components/common/toast/ToastContainer';
import ModalContainer from "./components/common/modal/ModalContainer";


function App() {
  const userLoaded = useAppSelector((state) => state.authState.userLoaded);  
  const menuLoaded = useAppSelector(state => state.menuState.menuGroupLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);
  if (userLoaded && menuLoaded) {
    return (
      <Fragment>
        <ToastContainer />
        <ModalContainer />
        <RouterConfiguration routes={routes} includeNestedRoutes={true} />
      </Fragment>
    );
  }
  return <AppLoading />;
}
export default App;