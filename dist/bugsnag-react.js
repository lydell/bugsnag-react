(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bugsnag__react = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function () {
  var React = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.React;

  if (!React) throw new Error('cannot find React');

  return {
    init: function (client) {
      var ErrorBoundary = function (_React$Component) {
        _inherits(ErrorBoundary, _React$Component);

        function ErrorBoundary(props) {
          _classCallCheck(this, ErrorBoundary);

          var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

          _this.state = {
            error: null,
            info: null
          };
          return _this;
        }

        ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error, info) {
          var beforeSend = this.props.beforeSend;

          var BugsnagReport = client.BugsnagReport;
          var handledState = { severity: 'error', unhandled: true, severityReason: { type: 'unhandledException' } };
          var report = new BugsnagReport(error.name, error.message, BugsnagReport.getStacktrace(error), handledState);
          if (info && info.componentStack) info.componentStack = formatComponentStack(info.componentStack);
          report.updateMetaData('react', info);
          client.notify(report, { beforeSend: beforeSend });
          this.setState({ error: error, info: info });
        };

        ErrorBoundary.prototype.render = function render() {
          var error = this.state.error;

          if (error) {
            var FallbackComponent = this.props.FallbackComponent;

            if (FallbackComponent) return React.createElement(FallbackComponent, this.state);
            return null;
          }
          return this.props.children;
        };

        return ErrorBoundary;
      }(React.Component);

      return ErrorBoundary;
    }
  };
};

var formatComponentStack = function (str) {
  var lines = str.split(/\s*\n\s*/g);
  var ret = '';
  for (var line = 0, len = lines.length; line < len; line++) {
    if (lines[line].length) ret += '' + (ret.length ? '\n' : '') + lines[line];
  }
  return ret;
};

module.exports.formatComponentStack = formatComponentStack;
module.exports['default'] = module.exports;

},{}]},{},[1])(1)
});
