"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
exports.wayfair = void 0;
var axios_1 = require("axios");
var json_to_graphql_query_1 = require("json-to-graphql-query");
var token = '';
var ax = function (auth, body) { return __awaiter(void 0, void 0, void 0, function () {
    var login_response, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!token) return [3 /*break*/, 2];
                return [4 /*yield*/, axios_1["default"].post("https://sso.auth.wayfair.com/oauth/token", {
                        grant_type: 'client_credentials',
                        client_id: auth.client_id,
                        client_secret: auth.client_secret
                    })["catch"](function (err) {
                        debugger;
                    })];
            case 1:
                login_response = _a.sent();
                token = login_response.data.access_token;
                _a.label = 2;
            case 2: return [4 /*yield*/, axios_1["default"].post(auth.base_url, body, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })];
            case 3:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var Wayfair = /** @class */ (function () {
    function Wayfair() {
        var _this = this;
        /**
        * Loads the API applications.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: A single Wayfair API application.
        */
        this.query_applications = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ applications: query }) + "}" })
                /**
                * Retrieves CastleGate purchase orders.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
                * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
                * @param poNumbers The list of Purchase Order numbers to return.
                * @param sortOrder Order the result set by ascending or descending order of poDate.
                * @returns A list where each element is: A purchase order.
                */
            ];
        }); }); };
        /**
        * Retrieves CastleGate purchase orders.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
        * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
        * @param poNumbers The list of Purchase Order numbers to return.
        * @param sortOrder Order the result set by ascending or descending order of poDate.
        * @returns A list where each element is: A purchase order.
        */
        this.query_get_castle_gate_purchase_orders = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ getCastleGatePurchaseOrders: query }) + "}" })
                /**
                * Loads CastleGate warehouse shipping advice.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param hasResponse Return only open or only acknowledged Warehouse Shipping Advices
                * @param fromDate The Warehouse Shipping Advice starting date period. Specifies the starting date from which to grab Warehouse Shipping Advices
                * @param wsaIds List of Castlegate WSA Id's for which to return associated Warehouse Shipping Advices.
                * @param sortOrder Order the result set by ascending or descending order of creationDate.
                * @returns A list where each element is: A warehouse shipping advice
                */
            ];
        }); }); };
        /**
        * Loads CastleGate warehouse shipping advice.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param hasResponse Return only open or only acknowledged Warehouse Shipping Advices
        * @param fromDate The Warehouse Shipping Advice starting date period. Specifies the starting date from which to grab Warehouse Shipping Advices
        * @param wsaIds List of Castlegate WSA Id's for which to return associated Warehouse Shipping Advices.
        * @param sortOrder Order the result set by ascending or descending order of creationDate.
        * @returns A list where each element is: A warehouse shipping advice
        */
        this.query_get_castle_gate_warehouse_shipping_advice = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ getCastleGateWarehouseShippingAdvice: query }) + "}" })
                /**
                * Retrieves Dropship purchase orders.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
                * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
                * @param poNumbers The list of Purchase Order numbers to return.
                * @param sortOrder Order the result set by ascending or descending order of poDate.
                * @returns A list where each element is: A purchase order.
                */
            ];
        }); }); };
        /**
        * Retrieves Dropship purchase orders.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
        * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
        * @param poNumbers The list of Purchase Order numbers to return.
        * @param sortOrder Order the result set by ascending or descending order of poDate.
        * @returns A list where each element is: A purchase order.
        */
        this.query_get_dropship_purchase_orders = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ getDropshipPurchaseOrders: query }) + "}" })
                /**
                * Fetches the current, authenticated Extranet user.
                 
                * @returns A single Wayfair API user.
                */
            ];
        }); }); };
        /**
        * Fetches the current, authenticated Extranet user.
         
        * @returns A single Wayfair API user.
        */
        this.query_identity = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ identity: query }) + "}" })
                /**
                * Loads information about inbound stock purchase order stats.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Stats for Inbound Stock Purchase Orders
                */
            ];
        }); }); };
        /**
        * Loads information about inbound stock purchase order stats.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Stats for Inbound Stock Purchase Orders
        */
        this.query_inbound_stock_purchase_order_stats = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ inboundStockPurchaseOrderStats: query }) + "}" })
                /**
                * Retrieves inventory data.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
                */
            ];
        }); }); };
        /**
        * Retrieves inventory data.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
        */
        this.query_inventory = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ inventory: query }) + "}" })
                /**
                * Load label generation events that occurred through the API
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: This type includes all the information that resulted from the generation of labels for a purchase order.
                */
            ];
        }); }); };
        /**
        * Load label generation events that occurred through the API
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: This type includes all the information that resulted from the generation of labels for a purchase order.
        */
        this.query_label_generation_events = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ labelGenerationEvents: query }) + "}" })
                /**
                * Fetches data for a Wayfair-initiated order cancellation.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Represents an order cancellation.
                */
            ];
        }); }); };
        /**
        * Fetches data for a Wayfair-initiated order cancellation.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Represents an order cancellation.
        */
        this.query_order_cancellations = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ orderCancellations: query }) + "}" })
                /**
                * Load a catalog of products and their catalog information.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Information about a product that a specific supplier has provided.
                */
            ];
        }); }); };
        /**
        * Load a catalog of products and their catalog information.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Information about a product that a specific supplier has provided.
        */
        this.query_parts = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ parts: query }) + "}" })
                /**
                *
            Fetches catalog data for the supplier/suppliers.
            
            Example:
            query catalog {
              catalog(
                ordering: [{
                  desc: "lead_time"
                }],
                limit: 3,
                offset: 3
              ) {
                supplier_id,
                supplier_part_number,
                manufacturer_model_number,
                manufacturer_name,
                product_name
              }
            }
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: This type contains all the necessary information about an item in a catalog.
                */
            ];
        }); }); };
        /**
        *
    Fetches catalog data for the supplier/suppliers.
    
    Example:
    query catalog {
      catalog(
        ordering: [{
          desc: "lead_time"
        }],
        limit: 3,
        offset: 3
      ) {
        supplier_id,
        supplier_part_number,
        manufacturer_model_number,
        manufacturer_name,
        product_name
      }
    }
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: This type contains all the necessary information about an item in a catalog.
        */
        this.query_product_catalogs = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ productCatalogs: query }) + "}" })
                /**
                * Retrieves inventory data.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
                */
            ];
        }); }); };
        /**
        * Retrieves inventory data.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
        */
        this.query_product_inventory = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ productInventory: query }) + "}" })
                /**
                * Retrieves purchase order errors.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Error information related to purchase orders
                */
            ];
        }); }); };
        /**
        * Retrieves purchase order errors.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Error information related to purchase orders
        */
        this.query_purchase_order_errors = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ purchaseOrderErrors: query }) + "}" })
                /**
                * Retrieves purchase orders.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @param dryRun Whether to query test purchase order data, or production purchase order data. Results of any dryRun purchase order mutations will only be exposed if this argument is true.
                * @returns A list where each element is: A purchase order.
                */
            ];
        }); }); };
        /**
        * Retrieves purchase orders.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @param dryRun Whether to query test purchase order data, or production purchase order data. Results of any dryRun purchase order mutations will only be exposed if this argument is true.
        * @returns A list where each element is: A purchase order.
        */
        this.query_purchase_orders = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ purchaseOrders: query }) + "}" })
                /**
                * Retrieves transaction information for long-running processes.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: The status of a transaction made
                */
            ];
        }); }); };
        /**
        * Retrieves transaction information for long-running processes.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: The status of a transaction made
        */
        this.query_transactions = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ transactions: query }) + "}" })
                /**
                * Shows upcoming scheduled UPS pickups.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: Represents a scheduled UPS pickup event
                */
            ];
        }); }); };
        /**
        * Shows upcoming scheduled UPS pickups.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: Represents a scheduled UPS pickup event
        */
        this.query_ups_pickup_events = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ upsPickupEvents: query }) + "}" })
                /**
                * Retrieves Extranet users.
                * @param filters A list of filters to apply.
                * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
                * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
                * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
                * @returns A list where each element is: A single Wayfair API user.
                */
            ];
        }); }); };
        /**
        * Retrieves Extranet users.
        * @param filters A list of filters to apply.
        * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
        * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
        * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
        * @returns A list where each element is: A single Wayfair API user.
        */
        this.query_users = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ users: query }) + "}" })
                /**
                * Retrieves an instance of the SupplierVetting namespace.
                 
                * @returns Querying Namespace object capable of running queries for supplier vetting.
                */
            ];
        }); }); };
        /**
        * Retrieves an instance of the SupplierVetting namespace.
         
        * @returns Querying Namespace object capable of running queries for supplier vetting.
        */
        this.query_workflow_vetting = function (auth, query) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { query: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ workflowVetting: query }) + "}" })
                /**
                * Retrieves an instance of ApplicationMutator with which to run application mutations.
                 
                * @returns Mutator object capable of running mutations on applications.
                */
            ];
        }); }); };
        /**
        * Retrieves an instance of ApplicationMutator with which to run application mutations.
         
        * @returns Mutator object capable of running mutations on applications.
        */
        this.mutate_applications = function (auth, mutation) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { mutation: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ applications: mutation }) + "}" })
                /**
                * The Type containing all the mutations for catalog projects.
                 
                * @returns Mutator object capable of running mutations on catalog projects.
                */
            ];
        }); }); };
        /**
        * The Type containing all the mutations for catalog projects.
         
        * @returns Mutator object capable of running mutations on catalog projects.
        */
        this.mutate_catalog_projects = function (auth, mutation) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { mutation: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ catalogProjects: mutation }) + "}" })
                /**
                * The Type containing all mutations for inventory.
            
            Click into a mutation below to see an example of the that mutation.
                 
                * @returns Mutator object capable of running mutations on inventory.
                */
            ];
        }); }); };
        /**
        * The Type containing all mutations for inventory.
    
    Click into a mutation below to see an example of the that mutation.
         
        * @returns Mutator object capable of running mutations on inventory.
        */
        this.mutate_inventory = function (auth, mutation) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { mutation: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ inventory: mutation }) + "}" })
                /**
                * The Type containing all mutations for inventory.
            
            Click into a mutation below to see an example of the that mutation.
                 
                * @returns Mutator object capable of running mutations on inventory.
                */
            ];
        }); }); };
        /**
        * The Type containing all mutations for inventory.
    
    Click into a mutation below to see an example of the that mutation.
         
        * @returns Mutator object capable of running mutations on inventory.
        */
        this.mutate_product_inventory = function (auth, mutation) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { mutation: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ productInventory: mutation }) + "}" })
                /**
                * Retrieves an instance of PurchaseOrderMutator to run purchase order mutations with.
                 
                * @returns Mutator object capable of running mutations on purchase orders.
            
            NOTE: Purchase order mutations are under active development and should be considered as an Alpha release.
                */
            ];
        }); }); };
        /**
        * Retrieves an instance of PurchaseOrderMutator to run purchase order mutations with.
         
        * @returns Mutator object capable of running mutations on purchase orders.
    
    NOTE: Purchase order mutations are under active development and should be considered as an Alpha release.
        */
        this.mutate_purchase_orders = function (auth, mutation) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ax(auth, { mutation: "{" + json_to_graphql_query_1.jsonToGraphQLQuery({ purchaseOrders: mutation }) + "}" })];
        }); }); };
    }
    return Wayfair;
}());
exports.wayfair = new Wayfair();
