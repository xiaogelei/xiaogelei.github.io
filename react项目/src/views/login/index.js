
import "./index.scss"
import img from "@/assets/images/1.gif"
import {Link} from "react-router-dom"
import {Button,ActionSheet,Toast} from "antd-mobile"
import {authLogin,ceshi} from "./handle.js"

export class Login extends Component{
    constructor() {
        super();
        this.state = {
            clicked: 'none',
        };
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
            // also support Promise
            // return new Promise((resolve) => {
            // Toast.info('closed after 1000ms');
            // setTimeout(resolve, 1000);
            // });
            // const { history }=this.props;
            // console.log(this.dataList[buttonIndex].title);
            if(this.dataList[buttonIndex].title=="手机号登录"){
                const { history }=this.props;
                history.push("/login1");
            }
        });
    }
    ceshi=()=>{
        console.log(this.props);
        const { history }=this.props;
        history.push("/login1");
    }
    render(){
        return(
            <div className="top">
                <img src={img} width="100%"/>
                <Button inline className="wx" onClick={()=>authLogin("weixin")}>微信注册/登录</Button><br/>
                <Button inline className="qq" onClick={()=>authLogin("qq")}>QQ注册/登录</Button><br/>
                <Button inline className="gd" onClick={this.showShareActionSheet}>更多</Button>
                <p className="p">已有账户?<Link to="">密码登录</Link></p>
            </div>
        )
    }
}