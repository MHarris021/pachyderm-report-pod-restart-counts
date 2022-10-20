"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
var SearchResult = /** @class */ (function () {
    function SearchResult(line, lineNumber, match) {
        this._line = line;
        this._lineNumber = lineNumber;
        this._match = match;
    }
    Object.defineProperty(SearchResult.prototype, "match", {
        get: function () {
            return this._match;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchResult.prototype, "lineNumber", {
        get: function () {
            return this._lineNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchResult.prototype, "line", {
        get: function () {
            return this._line;
        },
        enumerable: false,
        configurable: true
    });
    return SearchResult;
}());
exports.SearchResult = SearchResult;
//# sourceMappingURL=SearchResult.js.map