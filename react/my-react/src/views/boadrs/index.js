import "./index.scss";
import {Head} from "@/components/head";
import {connect} from "react-redux";
import axios from "@/utils/axios"
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { width } from "window-size";
import {getSuiji,changeSelectTabs,insertBanqu,userBanqu,setSuiji2} from "../../actions";

@connect(
    state=>({
        ...state
    }),
    dispatch=>{
        return{
            Suiji:()=>dispatch(getSuiji()),
            siyouBq:(siyou)=>dispatch(userBanqu(siyou)),
            bb:(list1)=>dispatch(setSuiji2(list1)),
            aa:(tab)=>dispatch(changeSelectTabs(tab)),
            tjBqu:(type,userid,san)=>dispatch(insertBanqu(type,userid,san))
        }
    }
)

export class Boadrs extends Component{
    constructor(props){
        super(props)
        this.state={
            data1:[],
            // suiji2:[]
        }
    }
    componentWillMount(){
        axios.get('/react/userBanqu',{
            params:{
                siyou:sessionStorage.getItem("id")
            }
        }).then(res=>{
            var list1=[]
            for(var i=0;i<res.data.result.length;i++)
            {
                list1.push(res.data.result[i].sptitle)
            }
            bb(list1);
            console.log(list1);
        });
         
         axios.get('/react/getBoadrsCount').then(res=>{
             this.setState({data1:res.data.result})
         });

        const{aa,siyouBq,user,bb}=this.props; 
        aa("boadrs");
        siyouBq(sessionStorage.getItem("id"));
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
            // data,
            data1,
            // suiji2
        } = this.state;
        const{
            suiji2,
            Suiji,
            tjBqu,
            user,
            banqu,
            data
        }=this.props;
        return(
            <div>
                <Head title="版区"></Head>
                {/* <h2>Boadrs Boadrs Boadrs</h2> */}
                <div className="top2">
                    <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#000"
                    tabBarInactiveTextColor="#706e6e"
                    tabBarUnderlineStyle={{border:'1px solid red',width:'8%',marginLeft:'21%'}}
                    onChange={(tab, index) => { console.log('onChange', index, tab);}}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab);}}
                    >
                    <div style={{ overflow: 'hidden', backgroundColor: '#fff',marginBottom:"90px"}}>
                        <div className="b_div1">
                            <h6>推荐的版区</h6>
                            {
                                suiji2&&suiji2.map((num2,i)=>{
                                    return(
                                        <div key={i} className="b_div2">
                                            <img src={num2.imgs} className="img1"/>
                                            <span className="span5">{num2.title}</span>
                                            <h5>帖子:{num2.works/10000}万</h5>
                                            <div className="anDiv" onClick={num2.typeC=="+加入"?()=>tjBqu(num2.num,user._id,suiji2):this.handleFirst}>{num2.typeC}</div>
                                        </div>
                                    )
                                })
                            }
                            <p className="b_p2"><span onClick={()=>Suiji()}>换一批</span></p>
                        </div>
                        <div className="b_div3">
                            <h6>加入的版区</h6>
                            {
                                banqu&&banqu.map((ban,i)=>{
                                    return(
                                        <div key={i} className="b_div4">
                                            <img src={ban.spimg} className="img5"/>
                                            <span className="span4">{ban.sptitle}</span>
                                        </div>
                                    )
                                })
                            }
                            <div className="b_div4">
                                <i className="iconfont icon-tianjia" style={{'fontSize':'50px',float:'left',marginLeft:'2%'}}></i>
                                <span className="tjspan">添加新版区</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', overflow:"hidden", backgroundColor: '#fff',marginBottom:"30px"}}>
                        {/* <div> */}
                            <Tabs tabs={tabs_top}
                            initialPage={0}
                            tabBarActiveTextColor="#000"
                            tabBarInactiveTextColor="#706e6e"
                            tabBarUnderlineStyle={{border:'1px solid red',width:'8%',marginLeft:'6%'}}
                            onChange={(tab, index) => { console.log('onChange', index, tab);}}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab);}}
                            className="top2"
                            >
                            <div style={{ backgroundColor: '#fff', paddingBottom:'150px'}}>
                                <div className="div_xia">
                                    <p className="p1"><i className="i1"></i><span className="span2">手机游戏</span></p>  
                                    {
                                        data1&&data1.map((shuju,i)=>{     
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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
                                        data&&data.map((shuju,i)=>{
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