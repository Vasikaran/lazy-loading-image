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

var Scroll = function (_React$Component) {
    _inherits(Scroll, _React$Component);

    function Scroll(props) {
        _classCallCheck(this, Scroll);

        var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, props));

        _this.elements = [];
        _this.parent = window;
        _this.updateViewport = _this.updateViewport.bind(_this);
        _this.getScrollableParentNode = _this.getScrollableParentNode.bind(_this);
        _this.addElementDetails = _this.addElementDetails.bind(_this);
        _this.removeElementDetails = _this.removeElementDetails.bind(_this);
        _this.getViewportObj = _this.getViewportObj.bind(_this);
        _this.debounce = _this.debounce.bind(_this);
        return _this;
    }

    _createClass(Scroll, [{
        key: 'debounce',
        value: function debounce(fun, wait) {
            var timeout = void 0;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(fun, wait);
            };
        }
    }, {
        key: 'getScrollableParentNode',
        value: function getScrollableParentNode(node) {
            if (node === null || node.tagName === 'BODY') {
                return window;
            }
            if (node.scrollHeight > node.clientHeight) {
                return node;
            } else {
                return this.getScrollableParentNode(node.parentElement);
            }
        }
    }, {
        key: 'getViewportObj',
        value: function getViewportObj(element) {
            var viewportObj = {};
            if (element === window) {
                viewportObj.top = pageYOffset;
                viewportObj.height = innerHeight;
                viewportObj.distance = 0;
            } else {
                viewportObj.top = element.scrollTop;
                viewportObj.height = element.offsetHeight;
                viewportObj.distance = element.getBoundingClientRect().top;
            }
            return viewportObj;
        }
    }, {
        key: 'updateViewport',
        value: function updateViewport() {
            var thisObj = this.getViewportObj(this.scroll);
            var parentObj = this.getViewportObj(this.parent);
            var isView = false;
            if (this.scroll.getBoundingClientRect().top <= innerHeight) {
                isView = true;
            }
            isView ? this.elements.forEach(function (elementObj) {
                var element = elementObj.element,
                    visibleMethod = elementObj.visibleMethod,
                    isVisible = elementObj.isVisible;

                if (isVisible) return;

                var _element$getBoundingC = element.getBoundingClientRect(),
                    top = _element$getBoundingC.top,
                    bottom = _element$getBoundingC.bottom;

                var elementTop = top - parentObj.distance;
                var newTop = top - thisObj.distance;
                if (newTop <= thisObj.height && elementTop <= parentObj.height && bottom >= 0 && top <= innerHeight) {
                    visibleMethod();
                    elementObj.isVisible = true;
                }
            }) : null;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'addElementDetails',
        value: function addElementDetails(elementDetails) {
            this.elements.push(elementDetails);
        }
    }, {
        key: 'removeElementDetails',
        value: function removeElementDetails(elementDetails) {
            var index = this.elements.indexOf(elementDetails);
            this.elements.splice(index, 1);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                addElementDetails: this.addElementDetails,
                removeElementDetails: this.removeElementDetails
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'scroll', className: this.props.style },
                this.props.children
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scroll = this.refs.scroll;
            this.debounceFun = this.debounce(this.updateViewport, 100);
            window.addEventListener('resize', this.debounceFun);
            this.scroll.addEventListener('scroll', this.debounceFun);
            this.parent = this.getScrollableParentNode(this.scroll.parentElement);
            this.parent.addEventListener('scroll', this.debounceFun);
            if (this.parent !== window) {
                window.addEventListener('scroll', this.debounceFun);
            }
            this.updateViewport();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.scroll.removeEventListener('scroll', this.debounceFun);
            window.removeEventListener('resize', this.debounceFun);
            if (this.parent !== window) {
                window.removeEventListener('scroll', this.debounceFun);
            }
        }
    }]);

    return Scroll;
}(_react2.default.Component);

exports.default = Scroll;


Scroll.childContextTypes = {
    addElementDetails: _propTypes2.default.func,
    removeElementDetails: _propTypes2.default.func
};

Scroll.propTypes = {
    className: _propTypes2.default.string
};