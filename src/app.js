import * as React from "./lib/Funact.js";

class List extends React.Component {
    constructor() {
        super();
        this.state = {items: []};

        setInterval(() => {
            this.setState({items: [...this.state.items, "dynamic-item"]})
        }, 2000);
    }

    render() {
        return React.createElement('ul',
            ...this.state.items.map(item => React.createElement('li', item))
        );
    }
}

const App = React.createElement('div',
    React.createElement('h1', 'This is VDom'),
    React.createElement(List)
);

React.render(App, document.getElementById('app'));