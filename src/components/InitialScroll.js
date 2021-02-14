import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const InitialScroll = ({ children, location: { pathname } }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, [pathname]);

    return children || null;

};

export default withRouter(InitialScroll);

