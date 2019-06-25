import "./index.scss";
import {Head} from "@/components/head";
import { changeSelectTabs } from "../../actions";
import {connect} from "react-redux";
import axios from "@/utils/axios"
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

@connect(
    state=>({
        ...state
    }),
)

export class Boadrs extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            data1:[]
        }
    }
    componentWillMount(){       
        this.props.dispatch(changeSelectTabs("boadrs"));
        axios.get("/react/getBoadrs").then(res => {
           this.setState({data:res.data.result})
           console.log(res.data.result);
        })
        axios.get('/react/getBoadrsCount').then(res=>{
            this.setState({data1:res.data.result})
        })
    }
    render(){
        const tabs = [
            { title: <Badge className="badge">我的</Badge> },
            { title: <Badge className="badge">热区</Badge> },
        ];
        const tabs_top = [
            { title: <Badge>热门</Badge> },
            { title: <Badge>次元</Badge> },
            { title: <Badge>日常</Badge> },
            { title: <Badge>影音</Badge> },
            { title: <Badge>游戏</Badge> },
        ];
        const {
            data,
            data1
        } = this.state;
        return(
            <div>
                <Head title="版区"></Head>
                {/* <h2>Boadrs Boadrs Boadrs</h2> */}
                <div className="top2">
                    <Tabs tabs={tabs}
                    initialPage={1}
                    tabBarActiveTextColor="#000"
                    tabBarInactiveTextColor="#706e6e"
                    onChange={(tab, index) => { console.log('onChange', index, tab);}}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab);}}
                    >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff'}}>
                        <h6>加入的版区</h6>
                            <i className="iconfont icon-jingyingyichang"></i>
                        {/* <h6>推荐的版区</h6> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', overflow:"hidden", backgroundColor: '#fff',marginBottom:"30px"}}>
                        {/* <div> */}
                            <Tabs tabs={tabs_top}
                            initialPage={0}
                            tabBarActiveTextColor="#000"
                            tabBarInactiveTextColor="#706e6e"
                            onChange={(tab, index) => { console.log('onChange', index, tab);}}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab);}}
                            className="top2"
                            >
                            <div style={{ backgroundColor: '#fff', paddingBottom:'150px'}}>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">手机游戏</span></p>  
                                    {
                                        data1.map((shuju,i)=>{     
                                            return(
                                                <li key={i} className="li1">
                                                    <img src={shuju.imgs} className="img1" />
                                                    <span className="span1">{shuju.title}</span>
                                                </li>
                                            )         
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', marginBottom:'90px'}}>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">动漫</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="动漫"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">阅读</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="阅读"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">装扮</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="装扮"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">同人</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="同人"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">热番</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="热番"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">经典</span></p>                                  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="次元"){
                                                if(shuju.typeB=="经典"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )   
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{backgroundColor: '#fff', marginBottom:'90px'}}>
                                <div className="div_xia">
                                <p className="p1"><i className="i1"></i><span className="span2">传统文化</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="日常"){
                                                if(shuju.typeB=="传统文化"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                <p className="p1"><i className="i1"></i><span className="span2">热门活动</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="日常"){
                                                if(shuju.typeB=="热门活动"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                <p className="p1"><i className="i1"></i><span className="span2">交友聊天</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="日常"){
                                                if(shuju.typeB=="交友聊天"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                <p className="p1"><i className="i1"></i><span className="span2">日常娱乐</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="日常"){
                                                if(shuju.typeB=="日常娱乐"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{backgroundColor: '#fff',marginBottom:'90px'}}>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">次元之声</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="影音"){
                                                if(shuju.typeB=="次元之声"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">视频</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="影音"){
                                                if(shuju.typeB=="视频"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">影视</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="影音"){
                                                if(shuju.typeB=="影视"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff',marginBottom:'90px'}}>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">手机游戏</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="游戏"){
                                                if(shuju.typeB=="手机游戏"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">游戏中心</span></p>  
                                    {
                                        data.map((shuju,i)=>{
                                            if(shuju.typeA=="游戏"){
                                                if(shuju.typeB=="游戏中心"){
                                                    return(
                                                        <li key={i} className="li1">
                                                            <img src={shuju.imgs} className="img1" />
                                                            <span className="span1">{shuju.title}</span>
                                                        </li>
                                                    )       
                                                }
                                            }                                        
                                        })
                                    }
                                </div>
                            </div>
                            </Tabs>
                        </div>
                    {/* </div> */}
                    </Tabs>
                </div>
            </div>
        )
    }
}