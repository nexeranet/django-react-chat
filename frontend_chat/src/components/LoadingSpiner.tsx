import * as React from "react";

interface IProps {
    loading:boolean;
}

interface IState {
}

export default class LoadingSpiner extends React.Component<IProps, IState> {
    constructor(props:IProps){
        super(props);
    }
    render() {
        return this.props.loading ? (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        ) : null;
    }
}
