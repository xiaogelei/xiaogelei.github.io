import "./index.scss";
import {connect} from "react-redux"
import { changeSelectTabs } from "../../actions";

@connect(
    state=>({
        ...state
    }),
)

export class My extends Component{
    componentWillMount(){       
        this.props.dispatch(changeSelectTabs("my"))
    }
    render(){
        return(
            <div>
                <h2>My My My</h2>
            </div>
        )
    }
}