

import ReactDOM, {render} from "react-dom"

import {Provider} from "react-redux";
import store from "./views/store";

import {IndexView} from "./views"

const hotRender=()=>{
    render(
        <Provider store={store}>
            <IndexView/>
        </Provider>,
        document.getElementById("app")
    )
}

hotRender();