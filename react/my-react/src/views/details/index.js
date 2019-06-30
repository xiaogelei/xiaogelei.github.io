import "./index.scss";
import {Head} from "@/components/head";
import {connect} from "react-redux"
import {getDianshi,changeSelectTabs} from "../../actions"

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            xiangqing:(dsId)=>dispatch(getDianshi(dsId))
        }
    }
)

export class Details extends Component{
    componentWillMount(){ 
        const{xiangqing}=this.props;      
        // this.props.dispatch(changeSelectTabs("detail"))
        xiangqing(this.props.match.params.id)
        // console.log(this.props.match.params.id)
    }
    render(){
        const{dianshiXQ}=this.props;
        return(
            <div>
                <Head title="详情" show={true}></Head>
                {/* <h2>detail detail detail</h2>
                <h2>{dianshiXQ.zbiaoti}</h2> */}
                <div className="dts_div1">
                    <div className="dts_div1_top">
                        <div className="dts_div1_left">
                            <img src={dianshiXQ.tupian} className="dts_img"/>
                        </div>
                        <div className="dts_div1_right">
                            <h2 className="dts_h2">{dianshiXQ.zbiaoti}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">主演:</span>{dianshiXQ.zhuyan}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">语言:</span>{dianshiXQ.yuyan}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">日期:</span>{dianshiXQ.riqi}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">集数:</span>{dianshiXQ.note}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">上映:</span>{dianshiXQ.nianfen}</h2>
                            <h2 className="dts_h1"><span className="dts_Sp">类型:</span>{dianshiXQ.type}</h2>
                        </div>
                    </div>
                    <div className="dts_div1_top2">
                        <h2><span className="dts_Sp">简介:</span>{dianshiXQ.juqing}</h2>
                    </div>
                </div>
            </div>
        )
    }
}