(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.VuexORMAxios = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var Response = /** @class */ (function () {
        /**
         * Create a new response instance.
         */
        function Response(model, config, response, entities) {
            this.model = model;
            this.config = config;
            this.response = response;
            this.entities = entities;
        }
        return Response;
    }());

    var Request = /** @class */ (function () {
        /**
         * Create a new api instance.
         */
        function Request(model) {
            /**
             * The default config.
             */
            this.config = {
                save: true
            };
            this.model = model;
            this.registerActions();
        }
        Object.defineProperty(Request.prototype, "axios", {
            /**
             * Get the axios client.
             */
            get: function () {
                if (!this.model.axios) {
                    throw new Error('[Vuex ORM Axios] The axios instance is not registered. Please register the axios instance to the model.');
                }
                return this.model.axios;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Register actions from the model config.
         */
        Request.prototype.registerActions = function () {
            var actions = this.model.apiConfig.actions;
            if (!actions) {
                return;
            }
            for (var name_1 in actions) {
                var action = actions[name_1];
                typeof action === 'function'
                    ? this.registerFunctionAction(name_1, action)
                    : this.registerObjectAction(name_1, action);
            }
        };
        /**
         * Register the given object action.
         */
        Request.prototype.registerObjectAction = function (name, action) {
            var _this = this;
            this[name] = function (config) {
                return _this.request(__assign(__assign({}, action), config));
            };
        };
        /**
         * Register the given function action.
         */
        Request.prototype.registerFunctionAction = function (name, action) {
            this[name] = action.bind(this);
        };
        /**
         * Perform a get request.
         */
        Request.prototype.get = function (url, config) {
            if (config === void 0) { config = {}; }
            return this.request(__assign({ method: 'get', url: url }, config));
        };
        /**
         * Perform a post request.
         */
        Request.prototype.post = function (url, data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return this.request(__assign({ method: 'post', url: url, data: data }, config));
        };
        /**
         * Perform a put request.
         */
        Request.prototype.put = function (url, data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return this.request(__assign({ method: 'put', url: url, data: data }, config));
        };
        /**
         * Perform a patch request.
         */
        Request.prototype.patch = function (url, data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return this.request(__assign({ method: 'patch', url: url, data: data }, config));
        };
        /**
         * Perform a delete request.
         */
        Request.prototype.delete = function (url, config) {
            if (config === void 0) { config = {}; }
            return this.request(__assign({ method: 'delete', url: url }, config));
        };
        /**
         * Perform an api request.
         */
        Request.prototype.request = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var requestConfig, response, entities;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestConfig = this.createConfig(config);
                            return [4 /*yield*/, this.axios.request(requestConfig)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, this.persistResponseData(response, requestConfig)];
                        case 2:
                            entities = _a.sent();
                            return [2 /*return*/, new Response(this.model, requestConfig, response, entities)];
                    }
                });
            });
        };
        /**
         * Create a new config by merging the global config, the model config,
         * and the given config.
         */
        Request.prototype.createConfig = function (config) {
            return __assign(__assign(__assign(__assign({}, this.config), this.model.globalApiConfig), this.model.apiConfig), config);
        };
        /**
         * Persist the response data to the vuex store.
         */
        Request.prototype.persistResponseData = function (response, config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!config.save) {
                        return [2 /*return*/, null];
                    }
                    if (config.delete !== undefined) {
                        return [2 /*return*/, this.model.delete(config.delete)];
                    }
                    return [2 /*return*/, this.model.insertOrUpdate({
                            data: this.getDataFromResponse(response, config)
                        })];
                });
            });
        };
        /**
         * Get data from the given response object. If the `dataKey` config is
         * provided, it tries to fetch the data at that key.
         */
        Request.prototype.getDataFromResponse = function (response, config) {
            if (!config.dataKey) {
                return response.data;
            }
            return response.data[config.dataKey];
        };
        return Request;
    }());

    function Model(model, config) {
        /**
         * The api client.
         */
        model.axios = config.axios || null;
        /**
         * The global api configuration for all models.
         */
        model.globalApiConfig = config;
        /**
         * The api configuration for the model.
         */
        model.apiConfig = {};
        /**
         * Set the given api client.
         */
        model.setAxios = function (axios) {
            this.axios = axios;
        };
        /**
         * Get the api instance.
         */
        model.api = function () {
            return new Request(this);
        };
    }

    var VuexORMAxios = /** @class */ (function () {
        /**
         * Create a new Vuex ORM Axios instance.
         */
        function VuexORMAxios(components, config) {
            this.model = components.Model;
            this.config = config;
        }
        /**
         * Plug in features.
         */
        VuexORMAxios.prototype.plugin = function () {
            Model(this.model, this.config);
        };
        return VuexORMAxios;
    }());

    var index_cjs = {
        install: function (components, config) {
            (new VuexORMAxios(components, config)).plugin();
        }
    };

    return index_cjs;

}));
