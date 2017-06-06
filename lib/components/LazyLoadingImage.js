'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyLoadingImage = function (_React$Component) {
    _inherits(LazyLoadingImage, _React$Component);

    function LazyLoadingImage(props) {
        _classCallCheck(this, LazyLoadingImage);

        var _this = _possibleConstructorReturn(this, (LazyLoadingImage.__proto__ || Object.getPrototypeOf(LazyLoadingImage)).call(this, props));

        _this.state = {
            isVisible: false
        };
        _this.handleVisible = _this.handleVisible.bind(_this);
        return _this;
    }

    _createClass(LazyLoadingImage, [{
        key: 'handleVisible',
        value: function handleVisible() {
            this.setState({
                isVisible: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var src = this.props.src;

            src = this.state.isVisible ? src : "#";
            return _react2.default.createElement('img', { ref: "img", src: src });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var element = this.refs.img;
            var addElementDetails = this.context.addElementDetails;

            this.elementDetails = {
                element: element,
                isVisible: false,
                visibleMethod: this.handleVisible
            };
            if (addElementDetails && typeof addElementDetails === 'function') {
                addElementDetails(this.elementDetails);
            } else {
                this.setState({
                    isVisible: true
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var removeElementDetails = this.context.removeElementDetails;

            if (removeElementDetails && typeof removeElementDetails === 'function') {
                removeElementDetails(this.elementDetails);
            }
        }
    }]);

    return LazyLoadingImage;
}(_react2.default.Component);

exports.default = LazyLoadingImage;


LazyLoadingImage.contextTypes = {
    addElementDetails: _propTypes2.default.func,
    removeElementDetails: _propTypes2.default.func
};

LazyLoadingImage.propTypes = {
    src: _propTypes2.default.string,
    loadingSrc: _propTypes2.default.string
};

LazyLoadingImage.defaultProps = {
    loadingSrc: 'https://www.wallies.com/filebin/images/loading_apple.gif',
    scr: '#'
};