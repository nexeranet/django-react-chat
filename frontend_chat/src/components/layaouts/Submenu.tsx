import * as React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {HocProps} from '../../hoc/authHOC'

const Submenu = (props:HocProps) => {
    return (
        <div onClick={props.logout} className="sub-menu">
            <ExitToAppIcon />
        </div>
    );
};

export default Submenu;
