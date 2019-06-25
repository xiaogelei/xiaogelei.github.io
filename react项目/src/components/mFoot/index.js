
import "./index.scss";

import {TabBar} from 'antd-mobile';
import history from "@/utils/history"
import {connect} from "react-redux"

import { changeSelectTabs } from "../../actions";
import url from "url";

@connect(
    state=>({
        ...state.data,
        ...state
    }),
    dispatch=>{
        return{
            changeSelectTabs:(name)=>dispatch(changeSelectTabs(name))
        }
    }
)
export class MFoot extends Component{
    // state={
    //     selectedTab:"my"
    // }
    componentWillMount(){
        // var pathname = url.parse(location.href).hash.split("#/app/");
        // var name = pathname[1];
        // console.log(name);
        // this.props.dispatch(changeSelectTabs(name))
    }
    render(){
        console.log(this.props);
        const {
            selectedTab,
            foots,
            changeSelectTabs
        } = this.props;
        return(
            <div className="footer">
            <TabBar
                unselectedTintColor="#949494"
                tintColor="red"
                barTintColor="white"
                className="foot1"
            >
                {
                    foots.map((foot,i)=>{
                        return(
                            <TabBar.Item
                                title={foot.txt}
                                key={i}
                                icon={<i
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                    width: '22px',
                                    height: '22px',
                                    display:"block"}}
                                />}
                                selectedIcon={<i 
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        display:"block",
                                        
                                    }}
                                    />
                                    }
                                    selected={selectedTab ===foot.name}
                                    // badge={i==2&&carNum}
                                    onPress={() => {
                                        console.log(foot.name);
                                        // this.props.dispatch(changeSelectTabs(foot.name))
                                        changeSelectTabs(foot.name)
                                        history.push(foot.path);
                                    }}
                                    data-seed="logId"
                            >

                            </TabBar.Item>
                        )
                    })
                }
            </TabBar>
            </div>
        )
    }
}
import PropTypes from "prop-types"
MFoot.contextTypes={
    props:PropTypes.object
}