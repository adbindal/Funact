function createElement(type, ...children) {
    return { type, children };
}

class Component {
    static isComponent = true;
    constructor() {
        this.state = null;
        this.domElement = null;
    }

    setState(partialState) {
        this.state = { ...this.state, ...partialState }
        updateElement(this);
    }
}

function updateElement(component) {
    const oldElement = component.domElement;
    const newElement = component.render();
    // diffing algorithm
    component.domElement = diffDom(oldElement, newElement);
}

function diffDom(oldElement, newVElement) {
    const newChildrenCount = newVElement.children.length;
    const hasNewElements = oldElement.childNodes.length < newChildrenCount;

    let newElement = null;
    if(hasNewElements) {
        const newItem = newVElement.children[newVElement.children.length - 1];
        oldElement.appendChild(renderElement(newItem));
    }

    return oldElement;
}

function renderElement(velem) {
    const {type, children} = velem;
    if (typeof type === "string") {
        const elem = document.createElement(type);
        children.forEach(child => {
            if(typeof child === 'string') {
                elem.appendChild(document.createTextNode(child))
            } else {
                elem.appendChild(renderElement(child));
            }
        });
        return elem;
    } 
    else if(type.isComponent === true) {
        const instance = new type();
        const vNode = instance.render();
        const e = renderElement(vNode);
        instance.domElement = e;
        return e;
    }
}

function render(vNode, elem) {
    elem.appendChild(renderElement(vNode));
}

export { render, Component, createElement };