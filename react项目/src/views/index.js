
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import {App} from "./app";
import {Login} from "./login";
import {Login1} from "./login1";

export class IndexView extends Component{
    render(){
        return(
            <Router>
                <div id="main">
                    <Route path="" exact component={Layout}/>
                </div>
            </Router>
        )
    }
}
//路由配置
export class Layout extends Component{
    render(){
        return(
            <Switch>
                <Route path="/" exact render={()=>(<Redirect to="/login"/>)}/>
                <Route path="/app/" strtic component={App}/>
                <Route path="/login" strtic component={Login}/>
                <Route path="/login1" exact component={Login1}/>
                <Route
                    render={
                        ()=>(<Redirect to="/login"/>)
                    }
                />
            </Switch>
        )
    }
}