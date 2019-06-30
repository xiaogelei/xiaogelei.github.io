
import "./index.scss"
import img from "@/assets/images/1.gif"
import {Link} from "react-router-dom"
import {Button,ActionSheet,Toast} from "antd-mobile"
import {authLogin} from "./handle.js"

export class Login extends Component{
    constructor() {
        super();
        this.state = {
            clicked: 'none',
        };
    } 
    ceshi=()=>{
        console.log(this.props);
        const { history }=this.props;
        history.push("/login1");
    }   
    dataList = [
            { url: 'OpHiXAcYzmPQHcdlLFrc', title: '手机号登录' },
            { url: 'wvEzCMiDZjthhAOcwTOu', title: '微博登录' },
        ].map(obj => ({
        icon: <img src={img} alt={obj.title} style={{ width: 36 }} onClick={this.ceshi}/>,
        title: obj.title,
    }));
    showShareActionSheet = () => {
        console.log("123");
        ActionSheet.showShareActionSheetWithOptions({
            options: this.dataList,
            // title: 'title',
            // message: 'I am description, description, description',
        },
        (buttonIndex) => {
            this.setState({ clicked: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
            // if(this.dataList[buttonIndex].title=="手机号登录"){
            //     const { history }=this.props;
            //     history.push("/login1");
            // }
            return new Promise((resolve) => {
                // Toast.info('closed after 1000ms');
                setTimeout(resolve, 200);
            });
        });
    }
    render(){
        console.log(this.props)
        return(
            <div className="login_top">
                <img src={img} width="100%"/>
                <Button inline className="wx" onClick={()=>authLogin("weixin")}>微信注册/登录</Button><br/>
                <Button inline className="qq" onClick={()=>authLogin("qq")}>QQ注册/登录</Button><br/>
                <Button inline className="gd" onClick={this.showShareActionSheet}>更多</Button>
                <p className="p">已有账户?<Link to="">密码登录</Link></p>
            </div>
        )
    }
}