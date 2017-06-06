import React from 'react';
import PropTypes from 'prop-types';

export default class LazyLoadingImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.handleVisible = this.handleVisible.bind(this);
    }

    handleVisible(){
        this.setState({
            isVisible: true
        })
    }

    render() {
        let {src, loadingSrc} = this.props;
        src = this.state.isVisible ? src : loadingSrc;
        return <img ref={"img"} src={src}></img>
    }

    componentDidMount() {
        let element = this.refs.img;
        let { addElementDetails } = this.context;
        this.elementDetails = {
            element,
            isVisible: false,
            visibleMethod: this.handleVisible
        }
        if ( addElementDetails && typeof addElementDetails === 'function'){
            addElementDetails(this.elementDetails);
        }else{
            this.setState({
                isVisible: true
            });
        }
    }

    componentWillUnmount() {
        let { removeElementDetails } = this.context;
        if (removeElementDetails && typeof removeElementDetails === 'function'){
            removeElementDetails(this.elementDetails);
        }
    }
}

LazyLoadingImage.contextTypes = {
    addElementDetails: PropTypes.func,
    removeElementDetails: PropTypes.func
};

LazyLoadingImage.propTypes = {
    src: PropTypes.string,
    loadingSrc: PropTypes.string
}

LazyLoadingImage.defaultProps = {
    loadingSrc: 'https://www.wallies.com/filebin/images/loading_apple.gif',
    scr: '#'
}