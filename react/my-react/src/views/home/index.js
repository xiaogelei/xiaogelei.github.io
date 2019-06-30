import "./index.scss";
import { changeSelectTabs } from "../../actions";
import {connect} from "react-redux"
import axios from "@/utils/axios"
import {SearchBar,WingBlank,WhiteSpace,Carousel,Badge,Tabs} from "antd-mobile"


@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            chushi:(zhi)=>dispatch(changeSelectTabs(zhi))
        }
    }
)

export class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            data1:[],
            // data: ['1', '2', '3'],
        imgs:[
            require("@/assets/images/1.png"),
            require("@/assets/images/2.png"),
            require("@/assets/images/3.png"),
            require("@/assets/images/4.png")
        ],
        imgHeight: 176,
        }
    }
    componentWillMount(){
        const{chushi,history}=this.props;    
        // this.props.dispatch(changeSelectTabs("home"))
        // chushi("home")
        console.log(this.props);
        axios.get('/react/getTelevision').then(res=>{
            this.setState({data:res.data.result})
            // console.log(res.data.result);
        })
    }
    diaozhuan=(id)=>{
        this.props.history.push(`/details/${id}`)
    }

    dianji=()=>{
        this.props.history.push('/search')
    }

    render(){
        const tabs = [
            { title: <Badge className="badge">泰剧</Badge> },
            { title: <Badge className="badge">日剧</Badge> },
            { title: <Badge className="badge">韩剧</Badge> },
            { title: <Badge className="badge">欧美</Badge> },
            { title: <Badge className="badge">港台</Badge> },
        ];
        const {
            data,
            data1,
        } = this.state;
        return(
            <div>
                <div onClick={this.dianji}>
                    <WhiteSpace/>
                    <WingBlank>
                        <SearchBar placeholder="搜索内容,视频,用户" maxLength={8}/>
                    </WingBlank>
                    <WhiteSpace/>
                </div>
                <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={2000}
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.imgs.map(val => (
                        <a
                        key={val}
                        // href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={val}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' ,margin:0}}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#000"
                    tabBarInactiveTextColor="#706e6e"
                    tabBarUnderlineStyle={{border:'1px solid red',width:'8%',marginLeft:'6%'}}
                    onChange={(tab, index) => { console.log('onChange', index, tab);}}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab);}}
                    >
                    <div style={{ overflow:"hidden", backgroundColor: '#fff',marginBottom:'290px'}}>
                        <div className="div_xia">
                            {
                                data.map((shuju,i)=>{
                                    if(shuju.type=="泰剧"){
                                        return(
                                            <li key={i} className="li1" onClick={()=>this.diaozhuan(shuju._id)}>
                                                <img src={shuju.tupian} className="img2" />
                                                <span className="span3">{shuju.zbiaoti}</span>
                                            </li>
                                        )   
                                    }                                        
                                })
                            }
                        </div>
                    </div>
                    <div style={{ overflow:"hidden", backgroundColor: '#fff',marginBottom:'290px'}}>
                        <div className="div_xia">
                            {
                                data.map((shuju,i)=>{
                                    if(shuju.type=="日剧"){
                                        return(
                                            <li key={i} className="li1" onClick={()=>this.diaozhuan(shuju._id)}>
                                                <img src={shuju.tupian} className="img2" />
                                                <span className="span3">{shuju.zbiaoti}</span>
                                            </li>
                                        )   
                                    }                                        
                                })
                            }
                        </div>
                    </div>
                    <div style={{ overflow:"hidden", backgroundColor: '#fff',marginBottom:'290px'}}>
                        <div className="div_xia">
                            {
                                data.map((shuju,i)=>{
                                    if(shuju.type=="韩剧"){
                                        return(
                                            <li key={i} className="li1" onClick={()=>this.diaozhuan(shuju._id)}>
                                                <img src={shuju.tupian} className="img2" />
                                                <span className="span3">{shuju.zbiaoti}</span>
                                            </li>
                                        )   
                                    }                                        
                                })
                            }
                        </div>
                    </div>
                    <div style={{ overflow:"hidden", backgroundColor: '#fff',marginBottom:'290px'}}>
                        <div className="div_xia">
                            {
                                data.map((shuju,i)=>{
                                    if(shuju.type=="欧美"){
                                        return(
                                            <li key={i} className="li1" onClick={()=>this.diaozhuan(shuju._id)}>
                                                <img src={shuju.tupian} className="img2" />
                                                <span className="span3">{shuju.zbiaoti}</span>
                                            </li>
                                        )   
                                    }                                        
                                })
                            }
                        </div>
                    </div>
                    <div style={{ overflow:"hidden", backgroundColor: '#fff',marginBottom:'290px'}}>
                        <div className="div_xia">
                            {
                                data.map((shuju,i)=>{
                                    if(shuju.type=="香港"){
                                        return(
                                            <li key={i} className="li1" onClick={()=>this.diaozhuan(shuju._id)}>
                                                <img src={shuju.tupian} className="img2" />
                                                <span className="span3">{shuju.zbiaoti}</span>
                                            </li>
                                        )   
                                    }                                        
                                })
                            }
                        </div>
                    </div>
                    </Tabs>
            </div>
        )
    }
}