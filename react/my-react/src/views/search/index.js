import "./index.scss";
import {Head} from "@/components/head";
import {connect} from "react-redux"
import {SearchBar,WingBlank,WhiteSpace} from "antd-mobile"
import { changeSelectTabs,selDianshi } from "../../actions";

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            getSearch:(num)=>dispatch(selDianshi(num))
        }
    }
)

export class Search extends Component{
    componentWillMount(){      
        // this.props.dispatch(changeSelectTabs("message"))
        // console.log(this.refs.btn);
    }
    fanhui=()=>{
        this.props.history.push("/app/push")
    }
    render(){
        const{
            getSearch,
            sou
        }=this.props;
        console.log(sou)
        return(
            <div style={{backgroundColor:'#fff',height:'100%'}}>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <i style={{position:'absolute',top:'4%'}} onClick={this.fanhui} className="iconfont icon-fanhui"></i>
                    <SearchBar placeholder="搜索内容,视频,用户" maxLength={8} ref="btn" onBlur={()=>getSearch(this.refs.btn.state.value)}
                    style={{border:"1px solid #333"}}
                    />
                </WingBlank>
                <WhiteSpace/>
                <div className="sh_div1">
                    {
                        sou&&sou.map((abc,i)=>{
                            return(
                                <div className="sh_div2" key={i}>
                                    <img src={abc.tupian} className="sh_img"/>
                                    <h3 className="sh_h3">{abc.zbiaoti}</h3>
                                    <p className="sh_p">{abc.juqing}</p>
                                    <button className="sh_right">立即观看</button>
                                </div>
                            )
                        })
                    }
                </div> 
            </div>
        )
    }
}