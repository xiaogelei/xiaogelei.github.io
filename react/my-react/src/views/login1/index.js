
import "./index.scss"
import img from "@/assets/images/1.gif"
import {Link} from "react-router-dom"
import {Button,Toast,InputItem,WhiteSpace} from "antd-mobile"
import axios from "@/utils/axios"
import {connect} from "react-redux"
import {userMing} from "../../actions"

export const  mobileReg = /^1(3|5|7|8|9)\d{9}$/
export const  codeReg = /^\d{4}$/
let timer = null;

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            yonghu:(ming)=>dispatch(userMing(ming))
        }
    }
)

export class Login1 extends Component{
    state = {
        toggle:true,
        mobileDis:true,
        flag:true,
        count:60,
        txt:"获取验证码"
    }
    checkMobile = (mobile)=>{
        console.log(mobile);
        if(this.state.flag){
            this.setState({
                mobileDis:!mobileReg.test(mobile)
            })
        }
    }

    startTime = ()=>{
        console.log('uuu')
        timer = setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:this.state.count+' s 后继续'
                })
                
            }else{
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt:"获取验证码",
                    mobileDis:false,
                    flag:true,
                    count:60
                })
            }
        },1000)
    }

    getCode=()=>{
        console.log("sss")

        axios.post("/react/sendCode",{
            mobile:this.refs.mobile.state.value
        }).then(res=>{
            console.log(res);
        })

        this.setState({
            mobileDis:true,
            flag:false
        })
        // ajax 
        this.startTime();
    }

    checkCode = (val)=>{
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle:!(codeReg.test(val)&&mobileReg.test(mobile))
        })
    }

    autoLogin=()=>{
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;

        axios.post("/react/testCode",{
            mobile,
            code
        }).then(res=>{
            console.log(res);
            if(!!res.data.type){
                const {yonghu}=this.props;
                yonghu(res.data.result);
                sessionStorage.id=mobile;
                this.props.history.push("/app/my");
                var userInfo =  {
                    token:res.data.token
                }
                sessionStorage.userInfo = JSON.stringify(userInfo);
                
            }else{
                delete sessionStorage['userInfo']
            }
        })
    }
    render(){
        const {
            toggle,
            mobileDis,
            txt
        } = this.state;
        return(
            <div className="top">
                <img src={img} width="100%"/>
                <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        onChange={this.checkMobile}
                        ref="mobile"
                    >手机号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入验证码"
                        clear
                        ref="code"
                        onChange={this.checkCode}
                    >验证码
                    </InputItem>
                    <Button ref="btn" type="warning" onClick={this.getCode} disabled={mobileDis} className="bnt1">{txt}</Button>
                    <Button type="primary" disabled={toggle} onClick={this.autoLogin} className="bnt1">马上登录</Button>
            </div>
        )
    }
}