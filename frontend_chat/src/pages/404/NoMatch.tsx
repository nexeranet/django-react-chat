import * as React from 'react';
import {authHoc, HocProps} from '../../hoc/authHOC'

interface IProps extends HocProps{
}

class NoMatch extends React.Component<IProps> {
    render() {
        return (
            <div className="404page">
                <h1>404 page</h1>
            </div>
        );
    }
}
export default authHoc(NoMatch);

