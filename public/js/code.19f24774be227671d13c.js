webpackJsonp([2],{

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(311);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(438), __esModule: true };

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(345);
	__webpack_require__(318);
	__webpack_require__(329);
	__webpack_require__(439);
	module.exports = __webpack_require__(7).Promise;

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(321)
	  , global             = __webpack_require__(6)
	  , ctx                = __webpack_require__(8)
	  , classof            = __webpack_require__(440)
	  , $export            = __webpack_require__(5)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(9)
	  , anInstance         = __webpack_require__(441)
	  , forOf              = __webpack_require__(442)
	  , speciesConstructor = __webpack_require__(446)
	  , task               = __webpack_require__(20).set
	  , microtask          = __webpack_require__(447)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(328)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(448)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(327)($Promise, PROMISE);
	__webpack_require__(449)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(450)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },

/***/ 441:
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(8)
	  , call        = __webpack_require__(443)
	  , isArrayIter = __webpack_require__(444)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(292)
	  , getIterFn   = __webpack_require__(445)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(323)
	  , ITERATOR   = __webpack_require__(328)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(9)
	  , SPECIES   = __webpack_require__(328)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(20).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(23)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(10);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , core        = __webpack_require__(7)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(15)
	  , SPECIES     = __webpack_require__(328)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(328)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _reactRedux = __webpack_require__(356);
	var _code = __webpack_require__(454);
	
	
	
	
	
	
	var _Code = __webpack_require__(455);var _Code2 = _interopRequireDefault(_Code);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	/*  Object of action creators (can also be function that returns object).
	                                                                                                                                                                                       Keys will be passed as props to presentational components. Here we are
	                                                                                                                                                                                       implementing our wrapper around increment; the component doesn't care   */
	
	var mapDispatchToProps = {
	    increment: function increment() {return (0, _code.increment)(1);},
	    doubleAsync: _code.doubleAsync }; /*  This is a container component. Notice it does not contain any JSX,
	                                          nor does it import React. This component is **only** responsible for
	                                          wiring in the actions and state necessary to render a presentational
	                                          component - in this case, the counter:   */var mapStateToProps = function mapStateToProps(state) {return {};};
	
	
	
	/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:
	                                                                                                                                                         
	                                                                                                                                                             import { createSelector } from 'reselect'
	                                                                                                                                                             const counter = (state) => state.counter
	                                                                                                                                                             const tripleCount = createSelector(counter, (count) => count * 3)
	                                                                                                                                                             const mapStateToProps = (state) => ({
	                                                                                                                                                               counter: tripleCount(state)
	                                                                                                                                                             })
	                                                                                                                                                         
	                                                                                                                                                             Selectors can compute derived data, allowing Redux to store the minimal possible state.
	                                                                                                                                                             Selectors are efficient. A selector is not recomputed unless one of its arguments change.
	                                                                                                                                                             Selectors are composable. They can be used as input to other selectors.
	                                                                                                                                                             https://github.com/reactjs/reselect    */exports.default =
	
	(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Code2.default);

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.actions = exports.doubleAsync = exports.COUNTER_DOUBLE_ASYNC = exports.COUNTER_INCREMENT = undefined;var _defineProperty2 = __webpack_require__(436);var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _promise = __webpack_require__(437);var _promise2 = _interopRequireDefault(_promise);var _ACTION_HANDLERS;exports.
	
	
	
	
	
	
	
	
	increment = increment;exports.default =
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	counterReducer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // ------------------------------------
	// Constants
	// ------------------------------------
	var COUNTER_INCREMENT = exports.COUNTER_INCREMENT = 'COUNTER_INCREMENT';var COUNTER_DOUBLE_ASYNC = exports.COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'; // ------------------------------------
	// Actions
	// ------------------------------------
	function increment() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;return { type: COUNTER_INCREMENT, payload: value };} /*  This is a thunk, meaning it is a function that immediately
	                                                                                                                                                                 returns a function for lazy evaluation. It is incredibly useful for
	                                                                                                                                                                 creating async actions, especially when combined with redux-thunk! */var doubleAsync = exports.doubleAsync = function doubleAsync() {return function (dispatch, getState) {return new _promise2.default(function (resolve) {setTimeout(function () {dispatch({ type: COUNTER_DOUBLE_ASYNC, payload: getState().counter });resolve();}, 200);});};};var actions = exports.actions = { increment: increment, doubleAsync: doubleAsync }; // ------------------------------------
	// Action Handlers
	// ------------------------------------
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, COUNTER_INCREMENT, function (state, action) {return state + action.payload;}), (0, _defineProperty3.default)(_ACTION_HANDLERS, COUNTER_DOUBLE_ASYNC, function (state, action) {return state * 2;}), _ACTION_HANDLERS); // ------------------------------------
	// Reducer
	// ------------------------------------
	var initialState = 0;function counterReducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];var handler = ACTION_HANDLERS[action.type];return handler ? handler(state, action) : state;}

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Code = undefined;var _react = __webpack_require__(24);var _react2 = _interopRequireDefault(_react);
	__webpack_require__(456);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	var Code = exports.Code = function Code(props) {return (
	    _react2.default.createElement('div', { className: 'code-container' },
	      _react2.default.createElement('h1', null, 'Code'),
	      _react2.default.createElement('p', { className: 'page-desc' }, 'Here are some projects and practice codes that I have worked on:'),
	
	
	      _react2.default.createElement('h3', null, 'Javascript Learning (',
	
	        _react2.default.createElement('a', { href: 'https://github.com/Halooo/ife/tree/master/javascriptPractice' }, 'source code'), ')'),
	
	      _react2.default.createElement('p', null, 'Demos are in Mandarin and English'),
	
	
	      _react2.default.createElement('h4', null, 'Arrays'),
	
	
	      _react2.default.createElement('p', { className: 'desc' },
	        _react2.default.createElement('a', { href: 'https://jsfiddle.net/haosun0226/t3mxoda5/' }, 'Array input & visualized search')),
	
	
	
	      _react2.default.createElement('p', { className: 'desc' },
	        _react2.default.createElement('a', { href: 'https://jsfiddle.net/haosun0226/4gbjcft1/' }, 'Array input & visualized bubble sort')),
	
	
	
	      _react2.default.createElement('h4', null,
	        _react2.default.createElement('a', { href: 'https://jsbin.com/sahuvim/3/edit?html,output' }, 'Binary Search Tree (ES6 classes)')),
	
	
	
	      _react2.default.createElement('p', { className: 'desc' }, 'Visualized BST pre-order, in-order and post-order search'),
	
	
	      _react2.default.createElement('h4', null,
	        _react2.default.createElement('a', { href: 'https://jsbin.com/locofiv/1/edit?html,js,output' }, 'Red and Black Tree (ES6 classes)')),
	
	
	
	      _react2.default.createElement('p', { className: 'desc' }, 'Visualized Black and Red Tree with search, add, delete and delete branch'),
	
	
	      _react2.default.createElement('h4', null,
	        _react2.default.createElement('a', { href: 'https://jsbin.com/piguqis/edit?html,js,output' }, 'General Tree (ES6 classes)')),
	
	
	
	      _react2.default.createElement('p', { className: 'desc' }, 'Visualized General Tree with depth-first search, add and delete node(s)'),
	
	
	
	      _react2.default.createElement('h4', null,
	        _react2.default.createElement('a', { href: 'https://github.com/Halooo/test_genetic_algorithm' }, 'Genetic Algorithm')),
	
	
	
	      _react2.default.createElement('p', { className: 'desc' }, 'Using genetic algorithm to find fairly optimized bundle choice from list of choices and bundles.'),
	
	
	      _react2.default.createElement('br', null),
	      _react2.default.createElement('h3', null,
	        _react2.default.createElement('a', { href: 'https://share-parking.herokuapp.com/' }, 'Shared Parking'), ' (',
	        _react2.default.createElement('a', { href: 'https://github.com/Halooo/shared-parking' }, 'source code'), ')'),
	
	      _react2.default.createElement('p', null, 'Share parking pass with others. Parking passes purchased in University of Waterloo last for one entire day, but most of students only park for few hours. This application helps student to share their parking passes to make the most efficient use of the passes and save money. ',
	
	
	        _react2.default.createElement('br', null), ' ', _react2.default.createElement('br', null), 'The project uses React.js + KOA2(Node.js) + Mongodb and Material Design style. It is hosted on Heroku and the view is (currently) made for mobile only. Functionality includes sign up, login, listing a parking pass, view listed parking pass and deleting own listed passes.'),
	
	
	
	
	
	      _react2.default.createElement('h3', null,
	        _react2.default.createElement('a', { href: 'https://github.com/Halooo/crawler_test' }, 'Node.js Crawler'), ' (', _react2.default.createElement('a', { href: 'https://github.com/Halooo/crawler_test/blob/master/crawlers/canuck.js' }, 'source code'), ')'),
	
	      _react2.default.createElement('p', null, '*screen shots on GitHub. Tutorial is in Mandarin',
	
	        _react2.default.createElement('br', null), 'Node.js crawler which detects appearance of keywords on web pages and send notification to users through Slack messages.'),
	
	
	
	      _react2.default.createElement('h3', null,
	        _react2.default.createElement('a', { href: 'https://mdmkep-slides.herokuapp.com/' }, 'React Slides'), ' (', _react2.default.createElement('a', { href: 'https://github.com/Halooo/mdmkep-slides' }, 'source code'), ')'),
	
	      _react2.default.createElement('p', null, 'Slides created using React + React Router + WebSocket + Node.js. Modified Spectacle boilerplate (add WebSocket feature) to allow remote control of slides by swiping on phone screens.'),
	
	
	
	      _react2.default.createElement('h3', null, 'Chamber Crawler 3000 (',
	        _react2.default.createElement('a', { href: 'https://github.com/Halooo/cc3k' }, 'source code'), ')'),
	
	      _react2.default.createElement('p', null, 'A rouge-like console game in C++. It is a practice project of OOP design patterns. The game design UML is in uml.pdf. Game supports WASD controls for both Windows and Unix platforms.'),
	
	
	
	      _react2.default.createElement('h3', null,
	        _react2.default.createElement('a', { href: 'https://vendingmachinexam.netlify.com/' }, 'Waterloo Helper')),
	
	      _react2.default.createElement('p', null, 'Some tools for University of Waterloo students to look up their exam schedules or find a vending machine in a specific building')));};
	
	
	
	
	
	Code.propTypes = {
	  counter: _react2.default.PropTypes.number.isRequired,
	  doubleAsync: _react2.default.PropTypes.func.isRequired,
	  increment: _react2.default.PropTypes.func.isRequired };exports.default =
	
	
	Code;

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(457);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(389)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(457, function() {
				var newContent = __webpack_require__(457);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(388)();
	// imports
	
	
	// module
	exports.push([module.id, ".code-container {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  justify-content: center;\n  margin: 0 16%;\n  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;\n  font-size: 18px; }\n  .code-container .page-desc {\n    padding: 20px auto; }\n  .code-container .desc {\n    margin-bottom: 20px;\n    padding-left: 50px; }\n  .code-container a {\n    color: #3CA9D1; }\n", "", {"version":3,"sources":["/./src/routes/Code/components/src/routes/Code/components/Code.scss"],"names":[],"mappings":"AAAA;EACE,cAAa;EACb,uBAAsB;EACtB,iBAAgB;EAChB,wBAAuB;EAEvB,cAAa;EACb,oEAAmE;EACnE,gBAAe,EAYhB;EApBD;IAWI,mBAAkB,EACnB;EAZH;IAcI,oBAAmB;IACnB,mBAAkB,EACnB;EAhBH;IAkBI,eAAc,EACf","file":"Code.scss","sourcesContent":[".code-container {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  justify-content: center;\n  //padding: 0 60px;\n  margin: 0 16%;\n  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;\n  font-size: 18px;\n\n  .page-desc {\n    padding: 20px auto;\n  }\n  .desc {\n    margin-bottom: 20px;\n    padding-left: 50px;\n  }\n  a {\n    color: #3CA9D1;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }

});
//# sourceMappingURL=code.19f24774be227671d13c.js.map