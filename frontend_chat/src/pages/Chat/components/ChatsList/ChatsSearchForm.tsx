import * as React from "react";
import SearchIcon from '@material-ui/icons/Search';
export interface IProps {}

export interface IState {}

export class ChatsSearchForm extends React.Component<IProps, IState> {

    render() {
        return (
            <div className="chats-search">
                <div className="chats-search__title">Your chats</div>
                <div className="chats-search__input-box">
                    <input className="chats-search__input" type="text" />
                    <span className="chats-search__search-icon"> <SearchIcon/></span>
                </div>
            </div>
        );
    }
}
