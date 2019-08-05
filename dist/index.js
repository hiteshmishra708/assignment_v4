!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"));else if("function"==typeof define&&define.amd)define(["react"],t);else{var n="object"==typeof exports?t(require("react")):t(e.react);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r=function(e){};e.exports=function(e,t,n,o,i,a,s,l){if(r(t),!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,i,a,s,l],p=0;(u=new Error(t.replace(/%s/g,function(){return c[p++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}}},function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";var r=n(2),o=n(1),i=n(0);e.exports=function(){function e(e,t,n,r,a,s){s!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t,n){e.exports=n(3)()},function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(5)),o=i(n(4));function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var c=/^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/,p=/\.[a-zA-Z0-9]*$/,f=function(e){function t(e,n){var r,o,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(r=!(i=(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))||"object"!==a(i)&&"function"!=typeof i?u(o):i).onDrop=r.onDrop.bind(u(r)),r.onDragEnter=r.onDragEnter.bind(u(r)),r.onDragLeave=r.onDragLeave.bind(u(r)),r.openFileChooser=r.openFileChooser.bind(u(r)),r.id=1,r.state={files:[]},r}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),n=t,(o=[{key:"onDrop",value:function(e){var t=this;e.preventDefault(),this.onDragLeave(e);var n=e.dataTransfer?e.dataTransfer.files:e.target.files;!1===this.props.multiple&&n.length>1&&(n=[n[0]]);for(var r=[],o=0;o<n.length;o++){var i=n[o];if(i.id="files-"+this.id++,i.extension=this.fileExtension(i),i.sizeReadable=this.fileSizeReadable(i.size),i.type&&"image"===this.mimeTypeLeft(i.type)?i.preview={type:"image",url:window.URL.createObjectURL(i)}:i.preview={type:"file"},this.state.files.length+r.length>=this.props.maxFiles){this.onError({code:4,message:"maximum file count reached"},i);break}this.fileTypeAcceptable(i)&&this.fileSizeAcceptable(i)&&r.push(i)}this.setState({files:!1===this.props.multiple?r:s(this.state.files).concat(r)},function(){t.props.onChange.call(t,t.state.files)})}},{key:"onDragOver",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"onDragEnter",value:function(e){this.dropzone.className+=" "+this.props.dropActiveClassName}},{key:"onDragLeave",value:function(e){var t=this.dropzone;this.dropzone.className=t.className.replace(" "+this.props.dropActiveClassName,"")}},{key:"openFileChooser",value:function(){this.inputElement.value=null,this.inputElement.click()}},{key:"fileTypeAcceptable",value:function(e){var t=this,n=this.props.accepts;if(!n)return!0;var r=n.some(function(n){if(e.type&&n.match(c)){var r=t.mimeTypeLeft(e.type),o=t.mimeTypeRight(e.type),i=n.split("/")[0],a=n.split("/")[1];if(i&&a){if(i===r&&"*"===a)return!0;if(i===r&&a===o)return!0}}else if(e.extension&&n.match(p)){var s=n.substr(1);return e.extension.toLowerCase()===s.toLowerCase()}return!1});return r||this.onError({code:1,message:e.name+" is not a valid file type"},e),r}},{key:"fileSizeAcceptable",value:function(e){return e.size>this.props.maxFileSize?(this.onError({code:2,message:e.name+" is too large"},e),!1):!(e.size<this.props.minFileSize)||(this.onError({code:3,message:e.name+" is too small"},e),!1)}},{key:"mimeTypeLeft",value:function(e){return e.split("/")[0]}},{key:"mimeTypeRight",value:function(e){return e.split("/")[1]}},{key:"fileExtension",value:function(e){var t=e.name.split(".");return t.length>1?t[t.length-1]:"none"}},{key:"fileSizeReadable",value:function(e){return e>=1e9?Math.ceil(e/1e9)+"GB":e>=1e6?Math.ceil(e/1e6)+"MB":e>=1e3?Math.ceil(e/1e3)+"kB":Math.ceil(e)+"B"}},{key:"onError",value:function(e,t){this.props.onError.call(this,e,t)}},{key:"removeFile",value:function(e){var t=this;this.setState({files:this.state.files.filter(function(t){return t.id!==e.id})},function(){t.props.onChange.call(t,t.state.files)})}},{key:"removeFiles",value:function(){var e=this;this.setState({files:[]},function(){e.props.onChange.call(e,e.state.files)})}},{key:"render",value:function(){var e=this,t={type:"file",accept:this.props.accepts?this.props.accepts.join():"",multiple:this.props.multiple,name:this.props.name,style:{display:"none"},ref:function(t){e.inputElement=t},onChange:this.onDrop};return r.default.createElement(r.default.Fragment,null,r.default.createElement("input",t),r.default.createElement("div",{className:this.props.className,onClick:!0===this.props.clickable?this.openFileChooser:null,onDrop:this.onDrop,onDragOver:this.onDragOver,onDragEnter:this.onDragEnter,onDragLeave:this.onDragLeave,ref:function(t){e.dropzone=t},style:this.props.style},this.props.children))}}])&&l(n.prototype,o),i&&l(n,i),t}();f.propTypes={children:o.default.oneOfType([o.default.arrayOf(o.default.node),o.default.node]),className:o.default.string.isRequired,dropActiveClassName:o.default.string,onChange:o.default.func,onError:o.default.func,accepts:o.default.array,multiple:o.default.bool,maxFiles:o.default.number,maxFileSize:o.default.number,minFileSize:o.default.number,clickable:o.default.bool,name:o.default.string,style:o.default.object},f.defaultProps={onChange:function(e){console.log(e)},onError:function(e,t){console.log("error code "+e.code+": "+e.message)},className:"files-dropzone",dropActiveClassName:"files-dropzone-active",accepts:null,multiple:!0,maxFiles:1/0,maxFileSize:1/0,minFileSize:0,name:"file",clickable:!0};var h=f;t.default=h}])});