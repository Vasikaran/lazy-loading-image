import React from 'react';
import PropTypes from 'prop-types';

export default class Scroll extends React.Component {
    constructor(props) {
        super(props);       
        this.elements = [];
        this.parent = window;
        this.updateViewport = this.updateViewport.bind(this);
        this.getScrollableParentNode = this.getScrollableParentNode.bind(this);
        this.addElementDetails = this.addElementDetails.bind(this);
        this.removeElementDetails = this.removeElementDetails.bind(this);
        this.getViewportObj = this.getViewportObj.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    debounce(fun, wait) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(fun, wait);
        }
    }

    getScrollableParentNode(node) {
        if (node === null || node.tagName === 'BODY') {
            return window;
        }
        if (node.scrollHeight > node.clientHeight) {
            return node;
        } else {
            return this.getScrollableParentNode(node.parentElement);
        }
    }

    getViewportObj(element){
        let viewportObj = {};
        if (element === window){
            viewportObj.top = pageYOffset;
            viewportObj.height = innerHeight;
            viewportObj.distance = 0;
        }else{
            viewportObj.top = element.scrollTop;
            viewportObj.height = element.offsetHeight;
            viewportObj.distance = element.getBoundingClientRect().top;
        }
        return viewportObj;
    }

    updateViewport(){
        let thisObj = this.getViewportObj(this.scroll);
        let parentObj = this.getViewportObj(this.parent);
        let isView = false;
        if (this.scroll.getBoundingClientRect().top <= innerHeight){
            isView = true;
        }
        isView ? this.elements.forEach(elementObj => {  
            let { element, visibleMethod, isVisible } = elementObj;
            if (isVisible) return;
            let { top, bottom }  = element.getBoundingClientRect();
            let elementTop;
            if (0 > parentObj.distance){
                elementTop = top + parentObj.distance;
            }else{
                elementTop = top - parentObj.distance;
            }
            let newTop = top-thisObj.distance;
            if (newTop <= thisObj.height && elementTop <= parentObj.height && bottom >= 0 && top <= innerHeight){
                visibleMethod();
                elementObj.isVisible = true;
            }
        }) : null
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    addElementDetails(elementDetails) {
        this.elements.push(elementDetails);
    }

    removeElementDetails(elementDetails) {
        let index = this.elements.indexOf(elementDetails);
        this.elements.splice(index, 1);
    }

    getChildContext() {
        return {
            addElementDetails: this.addElementDetails,
            removeElementDetails: this.removeElementDetails
        };
    }

    render() {
        let { className } = this.props;
        return <div ref="scroll" className={className}>
                {
                    this.props.children
                }
            </div>
    }

    componentDidMount() {
        this.scroll = this.refs.scroll;
        this.debounceFun = this.debounce(this.updateViewport, 100);
        window.addEventListener('resize', this.debounceFun);
        this.scroll.addEventListener('scroll', this.debounceFun);
        this.parent = this.getScrollableParentNode(this.scroll.parentElement);   
        this.parent.addEventListener('scroll', this.debounceFun);
        if (this.parent !== window){
            window.addEventListener('scroll', this.debounceFun);
        }
        this.updateViewport();
    }

    componentWillUnmount() {
        this.scroll.removeEventListener('scroll', this.debounceFun);
        window.removeEventListener('resize', this.debounceFun);
        if (this.parent !== window){
            window.removeEventListener('scroll', this.debounceFun);
        }
    }
}

Scroll.childContextTypes = {
    addElementDetails: PropTypes.func,
    removeElementDetails: PropTypes.func
}

Scroll.propTypes = {
    className: PropTypes.string
}