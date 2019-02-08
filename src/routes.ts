import { IRoute } from "./components/core/router-outlet/models/iroute";
import ViewDesigner from "./views/view-designer/view-designer";
import PageNotFound from "./views/error-pages/page-not-found/page-not-found";
import Login from "./views/login/login";

export default [
    {
        path: /\/(?!forms\/.+\/$)forms\/.+$/g,
        component: ViewDesigner
    }, {
        path: "/login",
        component: Login
    }, {
        path: "/404",
        component: PageNotFound
    }, {
        path: /\/(?!.*\/.+\/$).*\/.+$/g,
        component: PageNotFound
    }
] as IRoute[];