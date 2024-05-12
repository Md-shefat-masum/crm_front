import All from "../All";
import Create from "../Create";
import Details from "../Details";
import Edit from "../Edit";
import UserLayout from "../UserLayout";


const routes = {
    path: "contact-number",
    element: <UserLayout></UserLayout>,
    children: [
        {
            path: "",
            element: <All></All>,
        },
        {
            path: "create",
            element: <Create></Create>,
        },
        {
            path: "details/:id",
            element: <Details></Details>,
        },
        {
            path: "edit/:id",
            element: <Edit></Edit>,
        }

        
    ]
}

export default routes;