import React,{Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../views/Home';
import NotMatch from '../views/NotMatch';
import Admin from '../views/Admin';
import OrderDemo from '../views/order_demo';

class Router extends Component {
    
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/admin' render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/admin/home' component={Home}></Route>
                                    <Route path='/admin/OrderDemo' component={OrderDemo}></Route>
                                    <Route component={NotMatch}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>
                </div>
            </HashRouter> 
        )
    }
}
export default Router