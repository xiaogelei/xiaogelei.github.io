import "./index.scss";

import {Route,Switch,Redirect} from "react-router-dom";
import { Home } from "../home";
import { Boadrs } from "../boadrs";
import { Message } from "../message";
import { My } from "../my";
import { MFoot } from "@/components/mFoot";

export class App extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact render={()=>(<Redirect to="/home"/>)}/>
                    <Route path="/app/home" component={Home}/>
                    <Route path="/app/boadrs" component={Boadrs}/>
                    <Route path="/app/message" component={Message}/>
                    <Route path="/app/my" component={My}/>
                    <Route
                        render={
                            ()=>(<Redirect to="/app/home"/>)
                        }
                    />
                </Switch>
                <MFoot/>
            </div>
        )
    }
}