import * as React from "react";
import { connect } from "react-redux";
import ChatList from "../../components/ChatList";
import { getUserDetailChatsPromise, createChatPromise, deleteChatPromise, deleteChat } from "../../store/chat/actions";
import { compose } from "redux";
import { authHoc, HocProps } from "../../hoc/authHOC";
import SearchIcon from "@material-ui/icons/Search";
import LoadingSpiner from "../../components/LoadingSpiner";
import { searchProfile } from "../../store/auth/actions";
import Profiles from "../../components/Profiles";

interface IState {
    chats: any;
    search: string;
    isProfile: boolean;
    loading: boolean;
    profiles: any;
}

export interface IProps extends HocProps {
    chat: any;
    getChats: any;
    getDetail: any;
    searchProfile: any;
    createChat:any;
    deleteChat:any;
    delTest:any;
}

class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            chats: [],
            search: "",
            isProfile: false,
            loading: false,
            profiles: []
        };
    }
    componentDidMount = () => {
        this.props
            .getChats(this.props.auth.profile.id)
            .then((chats: any) => {
                this.setState({ chats: chats.chats });
            })
            .catch((err: any) => {
                switch (err.response.status) {
                    case 401:
                        this.props.show_alert({
                            type: "error",
                            message: err.response.data.detail
                        });
                        this.props.history.push("/login");
                        break;
                    default:
                        console.log(err.response);
                        break;
                }
            });
    };
    goToChat = (id: any) => {
        this.props.history.push(`/chat/${id}`);
    };
    deleteChat = (id: any) => {
        this.props.deleteChat(id).then((data:any) => {
            const list = [...this.state.chats];
            const chats = list.filter((item:any) => item.id !== id);
            this.setState({chats: chats});
        }).catch((err:any) => console.log(err))
    };
    onChangeSearch = (e: any) =>
        this.setState({ search: e.target.value }, () => this.filterList());
    filterList = () => {
        const chats = [...this.props.chat.list];
        const result = chats.filter(
            (item: any) =>
                item.participant.user.username.indexOf(this.state.search) >= 0
        );
        this.setState({ chats: result });
        if (result.length === 0) {
            this.searchProfile();
        } else {
            this.setState({ isProfile: false, loading: false });
        }
    };
    searchProfile = () => {
        this.setState({ isProfile: true, loading: true });
        this.props.searchProfile(this.state.search).then((data: any) => {
            console.log(data);
            if (data.length > 0) {
                this.setState({
                    isProfile: true,
                    loading: false,
                    profiles: data,
                });
            } else {
                this.props.show_alert({message: "not found", type:"info"});
                this.setState({ isProfile: false, loading: false });
            }
        });
    };
    createChat = (id:any) => {
        const participants = [id, this.props.auth.profile.id];
        this.props.createChat(participants).then((data:any) => {
            console.log(data);
            this.props.history.push(`chat/${data.chat.id}`)
        })
    };
    render() {
        const { list } = this.props.chat;
        const { chats, isProfile, profiles } = this.state;
        const render_profiles = isProfile ? (
            <Profiles
                createChat={this.createChat}
                profiles={this.state.profiles}
            />
        ) : "";
        const render_chat_list = isProfile ? null : (
            <ChatList
                chats={chats}
                goToChat={this.goToChat}
                deleteChat={this.deleteChat}
            />
        );
        return (
            <div className="main-page">
                <div className="main-page__content-box">
                    <div className="main-page__search-box">
                        <input
                            type=""
                            value={this.state.search}
                            className="main-page__search-input"
                            onChange={this.onChangeSearch}
                        />
                        <div className="main-page__search-icon">
                            <SearchIcon />
                        </div>
                    </div>
                    {render_chat_list}
                    {render_profiles}
                    <div className="loading-container">
                        <LoadingSpiner loading={this.state.loading} />
                    </div>
                </div>
            </div>
        );
    }
}

const matchDispatchToProps = (dispatch: any) => {
    return {
        getChats: (user_id: any) =>
            dispatch(getUserDetailChatsPromise(user_id)),
        searchProfile: (search: any) => dispatch(searchProfile(search)),
        createChat: (participants:any) => dispatch(createChatPromise(participants)),
        deleteChat: (chat_id:any) => dispatch(deleteChatPromise(chat_id)),
        delTest: (chat:any) => dispatch(deleteChat(chat))
    }
};
const mapStateToProps = (state: any) => {
    return {
        chat: state.chat
    };
};
export default compose(
    connect(
        mapStateToProps,
        matchDispatchToProps
    ),
    authHoc
)(Main);
