import "./index.scss";
import {Head} from "@/components/head";
import {connect} from "react-redux"
import { Player,BigPlayButton} from 'video-react';
import {WhiteSpace} from "antd-mobile"
import { changeSelectTabs,getVideos } from "../../actions";

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            jiaobiao:(tab)=>dispatch(changeSelectTabs(tab)),
            xianshi:()=>dispatch(getVideos())
        }
    }
)

export class Message extends Component{
    componentWillMount(){   
        const{jiaobiao,xianshi}=this.props;    
        // this.props.dispatch(changeSelectTabs("message"))
        jiaobiao("message"),
        xianshi()
    }
    render(){
        const{
            shiping
        }=this.props;
        return(
            <div className="msg_div">
                <Head title="视频"></Head>
                <h2>Message Message Message</h2>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                {
                    shiping.map((num,i)=>{
                        return(
                            <div key={i} className="msDiv">
                                <h3 className="msH3">{num.biaoti}</h3>
                                <Player ref="player" videoId="video-1">
                                    <BigPlayButton position="center" width="10px"/>
                                    <source src={num.lianjie}/>
                                </Player>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}