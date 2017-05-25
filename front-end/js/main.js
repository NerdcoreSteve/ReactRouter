require('whatwg-fetch')

const
    tap = x => { console.log(x); return x },
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore} = require('redux'),
    {BrowserRouter: Router, Route, Link} = require('react-router-dom'),
    {Provider} = require('react-redux'),
    reducer = (state = 'Blathering Blatherskyte!!', action) => {
        switch(action.type) {
            case 'ADD_TEXT':
                return action.text
            case 'BUTTON':
                return `You pressed button ${action.button}`
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
                value={store.getState()}
                onChange={({target:{value: text}}) => store.dispatch({type: 'ADD_TEXT', text})}/>
        </div>,
    Buttons = () =>
        <div>
            <p>{store.getState()}</p>
            <button
                onClick={() => store.dispatch({type: 'BUTTON', button: 1})}
                type="button">
                    Button 1
            </button>
            <button
                onClick={() => store.dispatch({type: 'BUTTON', button: 2})}
                type="button">
                    Button 2
            </button>
            <button
                onClick={() => store.dispatch({type: 'BUTTON', button: 3})}
                type="button">
                    Button 3
            </button>
        </div>,
    Root = () =>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/buttons">Buttons</Link></li>
                </ul>
                <Route exact path="/" component={Typing}/>
                <Route path="/buttons" component={Buttons}/>
            </div>
        </Router>,
    render = () =>
        ReactDOM.render(
            <Provider store={store}>
                <Root/>
            </Provider>,
            document.getElementById('root'))

store.subscribe(render)
render()
