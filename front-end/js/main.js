require('whatwg-fetch')

const
    tap = x => { console.log(x); return x },
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore} = require('redux'),
    {BrowserRouter: Router, Route, Link} = require('react-router-dom'),
    {Provider} = require('react-redux'),
    reducer = (state = '', action) => {
        switch(action.type) {
            case 'ADD_TEXT':
                return action.text
            default:
                return state
        }
    },
    store = createStore(reducer),
    Typing = () =>
        <div>
            <p>{store.getState()}</p>
            <input
                type="text"
                onChange={({target:{value: text}}) => store.dispatch({type: 'ADD_TEXT', text})}/>
        </div>,
    render = () =>
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" component={Typing}/>
                    </div>
                </Router>
            </Provider>,
            document.getElementById('root'))

store.subscribe(render)
render()
