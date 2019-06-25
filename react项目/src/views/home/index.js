import "./index.scss";
import { changeSelectTabs } from "../../actions";
import {connect} from "react-redux"
import {SearchBar,WingBlank,WhiteSpace} from "antd-mobile"

@connect(
    state=>({
        ...state
    }),
)

export class Home extends Component{
    componentWillMount(){       
        this.props.dispatch(changeSelectTabs("home"))
        console.log(this.props)
    }
    render(){
        return(
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <SearchBar placeholder="搜索内容,视频,用户" maxLength={8} />
                </WingBlank>
                <WhiteSpace/>
                <h2>Home Home Home</h2>
            </div>
        )
    }
}