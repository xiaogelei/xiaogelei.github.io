import "./index.scss";
import {Head} from "@/components/head";
import { changeSelectTabs } from "../../actions";
import {connect} from "react-redux"

@connect(
    state=>({
        ...state
    }),
)

export class Message extends Component{
    componentWillMount(){       
        this.props.dispatch(changeSelectTabs("message"))
    }
    render(){
        return(
            <div>
                <Head title="消息"></Head>
                <h2>Message Message Message</h2>
            </div>
        )
    }
}