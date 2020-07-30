/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sample_sample__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample/sample */ \"./src/sample/sample.js\");\n\r\n\r\nconst btnHat = document.getElementById('play-hat');\r\nconst btnKik = document.getElementById('play-kik');\r\n\r\nconst audioCtx = new AudioContext();\r\nconst hatSample = new _sample_sample__WEBPACK_IMPORTED_MODULE_0__[\"default\"](audioCtx, './audioFiles/HAT.wav');\r\nconst kikSample = new _sample_sample__WEBPACK_IMPORTED_MODULE_0__[\"default\"](audioCtx, './audioFiles/KIK.wav');\r\n\r\nbtnHat.addEventListener('click', () => playHandler(hatSample));\r\nbtnKik.addEventListener('click', () => playHandler(kikSample));\r\n\r\n\r\nfunction playHandler(sample) {\r\n    if(audioCtx.state !== 'running') {\r\n        audioCtx.resume();\r\n    }\r\n    sample.playSample();\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/sample/sample.js":
/*!******************************!*\
  !*** ./src/sample/sample.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//everything needs to be refactored classbased\r\nclass Sample {\r\n    constructor(audioCtx, filepath) {\r\n        this.ctx = audioCtx;//audio context\r\n        this.filepath = filepath;\r\n        this.sampleIsLoaded = false;\r\n    }\r\n//fetching audionfile\r\n    async loadSample() {\r\n        const res = await fetch(this.filepath);\r\n        const arrayBuff = await res.arrayBuffer();\r\n        this.sample = await this.ctx.decodeAudioData(arrayBuff);\r\n        this.sampleIsLoaded = true;\r\n    }\r\n\r\n    async playSample() {\r\n        if(!this.sampleIsLoaded) {\r\n            await this.loadSample()\r\n        }\r\n        const sampleSource = this.ctx.createBufferSource();\r\n        sampleSource.buffer = this.sample;\r\n        sampleSource.connect(this.ctx.destination);\r\n        sampleSource.start();\r\n        return sampleSource;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sample);\r\n\n\n//# sourceURL=webpack:///./src/sample/sample.js?");

/***/ })

/******/ });