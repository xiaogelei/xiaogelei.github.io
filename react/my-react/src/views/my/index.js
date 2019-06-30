import "./index.scss";
import img from "@/assets/images/1.png"
import img1 from "@/assets/images/photo.png"
import {connect} from "react-redux"
import { changeSelectTabs,setYonghu,insertXinx} from "../../actions";
import {Button,Badge,Tabs,InputItem} from "antd-mobile"

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            aa:(tab)=>dispatch(changeSelectTabs(tab)),
            chushi:(id)=>dispatch(setYonghu(id)),
            qqxinxx:(shuju)=>dispatch(insertXinx(shuju))
        }
    }
)

export class My extends Component{
    componentWillMount(){
        // this.props.dispatch(changeSelectTabs("my"));
        const{aa,chushi,qqxinxx}=this.props; 
        aa("my");
        chushi(sessionStorage.getItem("id"));
        qqxinxx(sessionStorage.getItem("qqxinxi"));
        console.log(this.props.user);
    }

    render(){
        const tabs = [
            { title: <Badge className="badge">资料</Badge> },
            { title: <Badge className="badge">动态</Badge> },
            { title: <Badge className="badge">收藏</Badge> },
            { title: <Badge className="badge">留言</Badge> }
        ];
        const {
            user
        }=this.props;
        console.log(sessionStorage.getItem("id"));
        console.log(sessionStorage.getItem("qqxinxi"));
        return(
            <div className="my1">
                {/* <h2>My My My</h2> */}
                <img src={img} width="100%" style={{margin:0,padding:0,opacity:0.5}}/>
                <div className="myDiv">
                {/* <img src={img1} className="myI"/> */}
                    <img src={user.userImg=="img1"?img1:user.userImg} className="myI"/>
                    <span className="mySpan">{user.username!=""?user.username:user.mobile}</span>
                    <span className="xgSapn">编辑头像</span>

                    <ul className="myUl">
                        <li>
                            <span>9</span><br/><br/>
                            <span>关注</span>
                        </li>
                        <li>
                            <span>15</span><br/><br/>
                            <span>粉丝</span>
                        </li>
                        <li>
                            <span>0</span><br/><br/>
                            <span>后援</span>
                        </li>
                        <li>
                            <span>10</span><br/><br/>
                            <span>访客</span>
                        </li>
                    </ul>
                    <div className="div_xia">
                        <p className="myP1">
                            <span className="myS1">DD号:</span><span className="myS1">74755710</span>
                        </p>
                        <p className="myP1">
                            <span className="myS1">性别:</span><span className="myS1">男</span>
                        </p>
                        <p className="myP1">
                            <span className="myS1">性别:</span><span className="myS1">{user.usersex}</span>
                        </p>
                        <p className="myP1">
                            <span className="myS1">年龄:</span><span className="myS1">18</span>
                        </p>
                        <p className="myP1">
                            <span className="myS1">生日:</span><span className="myS1">1995-01-01</span>
                        </p>
                        <p className="myP1">
                            <span className="myS1">位置:</span><span className="myS1">未知次元</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}