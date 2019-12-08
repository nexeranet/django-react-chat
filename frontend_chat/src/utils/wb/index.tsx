import { HOST } from "../../settings";

class WebSocketService {
    static instance: any = null;
    callbacks: any = {};
    socketRef: any = null;

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {}

    connect(chatUrl: any) {
        const path = `ws://${HOST}/ws/chat/${chatUrl}/`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
        };
        this.socketRef.onmessage = (e: any) => {
            this.socketNewMessage(e.data);
        };
        this.socketRef.onerror = (e: any) => {
            this.callbacks['errors'](e.message)
        };
        this.socketRef.onclose = () => {
            if (this.socketRef.readyState !== 3){
                this.connect(chatUrl);
            }
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    socketNewMessage(data: any) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "messages") {
            this.callbacks[command](parsedData.messages);
        }
        if (command === "new_message") {
            this.callbacks[command](parsedData.message);
        }
    }

    get(username: any, chatId: any) {
        this.sendMessage({
            command: "fetch_messages",
            username: username,
            chatId: chatId
        });
    }

    send(message: any) {
        this.sendMessage({
            command: "new_message",
            sender_id: message.sender_id,
            message: message.content,
            chat_id: message.chat_id
        });
    }

    setCallbacks(messagesCallback: any, newMessageCallback: any, errroCallbacks:any) {
        this.callbacks["messages"] = messagesCallback;
        this.callbacks["new_message"] = newMessageCallback;
        this.callbacks["errors"] = errroCallbacks;
    }

    sendMessage(data: any) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
            console.log(err.message)
        }
    }

    state() {
        return this.socketRef.readyState;
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
