'use strict';

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
    function Response(model, config, response) {
        /**
         * Entities created by Vuex ORM.
         */
        this.entities = null;
        /**
         * Whether if response data is saved to the store or not.
         */
        this.isSaved = false;
        this.model = model;
        this.config = config;
        this.response = response;
    }
    /**
     * Save response data to the store.
     */
    Response.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = this.getDataFromResponse();
                        if (!this.validateData(data)) {
                            console.warn('[Vuex ORM Axios] The response data could not be saved to the store because it\'s not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store.');
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.model.insertOrUpdate({ data: data })];
                    case 1:
                        _a.entities = _b.sent();
                        this.isSaved = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete store record depending on `delete` option.
     */
    Response.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.delete === undefined) {
                            throw new Error('[Vuex ORM Axios] Could not delete records because the `delete` option is not set.');
                        }
                        return [4 /*yield*/, this.model.delete(this.config.delete)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get data from the given response object. If the `dataTransformer` config is
     * provided, it tries to execute the method with the response as param. If the
     * `dataKey` config is provided, it tries to fetch the data at that key.
     */
    Response.prototype.getDataFromResponse = function () {
        if (this.config.dataTransformer) {
            return this.config.dataTransformer(this.response);
        }
        if (this.config.dataKey) {
            return this.response.data[this.config.dataKey];
        }
        return this.response.data;
    };
    /**
     * Validate if the given data is insertable to Vuex ORM.
     */
    Response.prototype.validateData = function (data) {
        return data !== null && typeof data === 'object';
    };
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
            var requestConfig, axiosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestConfig = this.createConfig(config);
                        return [4 /*yield*/, this.axios.request(requestConfig)];
                    case 1:
                        axiosResponse = _a.sent();
                        return [2 /*return*/, this.createResponse(axiosResponse, requestConfig)];
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
     * Create a new response instance by applying a few initialization processes.
     * For example, it saves response data if `save` option id set to `true`.
     */
    Request.prototype.createResponse = function (axiosResponse, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = new Response(this.model, config, axiosResponse);
                        if (!(config.delete !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.delete()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response];
                    case 2:
                        _a = config.save;
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.save()];
                    case 3:
                        _a = (_b.sent());
                        _b.label = 4;
                    case 4:
                        return [2 /*return*/, response];
                }
            });
        });
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

module.exports = index_cjs;
