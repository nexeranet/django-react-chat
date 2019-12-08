import * as React from "react";

export interface IProps {
    valueCom: string;
    maxHeight: number | boolean;
    minHeight: number;
    name: string;
    id: string;
    placeholder: string;
    className: string;
    eventChange: (value: string) => void;
    onKeyUp:any;
}

export interface IState {
    value: string;
    height: number;
}

export class ResizeTextArea extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "",
            height: this.props.minHeight
        };
    }

    static defaultProps = {
        name: "default-name",
        maxHeight: false,
        minHeight: 50
    };

    handleChange = (event: any) => {
        const text = event.target.value;
        this.setState({
            value: text,
            height: event.target.scrollHeight
        });
        this.props.eventChange(text);
    };

    render() {
        const {
            id,
            valueCom,
            name,
            placeholder,
            className,
            minHeight,
            maxHeight,
            onKeyUp,
        } = this.props;

        const { height } = this.state;
        const style = {
            maxHeight: maxHeight !== false ? maxHeight + "px" : 'initial',
            minHeight: minHeight + "px",
            height: height + "px"
        };
        return (
            <div>
                <textarea
                    onKeyUp={onKeyUp}
                    style={style}
                    id={id}
                    name={name}
                    value={valueCom}
                    className={className}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                ></textarea>
            </div>
        );
    }
}
