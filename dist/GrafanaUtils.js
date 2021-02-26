System.register(["lodash", "app/core/utils/kbn"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, kbn_1, getDecimalsForValue, getFormattedOutput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }
        ],
        execute: function () {
            exports_1("getDecimalsForValue", getDecimalsForValue = function (value, _decimals) {
                if (lodash_1.default.isNumber(+_decimals)) {
                    var o = {
                        decimals: _decimals,
                        scaledDecimals: null
                    };
                    return o;
                }
                var delta = value / 2;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                var magn = Math.pow(10, -dec), norm = delta / magn, size;
                if (norm < 1.5) {
                    size = 1;
                }
                else if (norm < 3) {
                    size = 2;
                    if (norm > 2.25) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5) {
                    size = 5;
                }
                else {
                    size = 10;
                }
                size *= magn;
                if (Math.floor(value) === value) {
                    dec = 0;
                }
                var result = {
                    decimals: Math.max(0, dec),
                    scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                };
                return result;
            });
            exports_1("getFormattedOutput", getFormattedOutput = function (value, format, decimals) {
                if (isNaN(value) || !value) {
                    return value;
                }
                else {
                    var decimalInfo = getDecimalsForValue(value, decimals || "0");
                    var formatFunc = kbn_1.default.valueFormats[format || "none"];
                    var value_formatted = formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                    return String(value_formatted);
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZmFuYVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dyYWZhbmFVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtBLGlDQUFhLG1CQUFtQixHQUFHLFVBQVUsS0FBSyxFQUFFLFNBQVM7Z0JBQzNELElBQUksZ0JBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLEdBQVc7d0JBQ2QsUUFBUSxFQUFFLFNBQVM7d0JBQ25CLGNBQWMsRUFBRSxJQUFJO3FCQUNyQixDQUFDO29CQUNGLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2dCQUVELElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDM0IsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQ25CLElBQUksQ0FBQztnQkFFUCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDVjtxQkFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ25CLElBQUksR0FBRyxDQUFDLENBQUM7b0JBRVQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO3dCQUNmLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ1gsRUFBRSxHQUFHLENBQUM7cUJBQ1A7aUJBQ0Y7cUJBQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNWO3FCQUFNO29CQUNMLElBQUksR0FBRyxFQUFFLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFHYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUMvQixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO2dCQUVELElBQUksTUFBTSxHQUFXO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO29CQUMxQixjQUFjLEVBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNoRSxDQUFDO2dCQUVGLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsRUFBQztZQUVGLGdDQUFXLGtCQUFrQixHQUFHLFVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRO2dCQUMvRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsSUFBSSxXQUFXLEdBQVEsbUJBQW1CLENBQUMsS0FBSyxFQUFFLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDbkUsSUFBSSxVQUFVLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUM7b0JBQ3BELElBQUksZUFBZSxHQUFHLFVBQVUsQ0FDOUIsS0FBSyxFQUNMLFdBQVcsQ0FBQyxRQUFRLEVBQ3BCLFdBQVcsQ0FBQyxjQUFjLENBQzNCLENBQUM7b0JBQ0YsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ2hDO1lBQ0gsQ0FBQyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XG5cbmV4cG9ydCBjb25zdCBnZXREZWNpbWFsc0ZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBfZGVjaW1hbHMpIHtcbiAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcbiAgICBsZXQgbzogT2JqZWN0ID0ge1xuICAgICAgZGVjaW1hbHM6IF9kZWNpbWFscyxcbiAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXG4gICAgfTtcbiAgICByZXR1cm4gbztcbiAgfVxuXG4gIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcbiAgbGV0IGRlYyA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGRlbHRhKSAvIE1hdGguTE4xMCk7XG5cbiAgbGV0IG1hZ24gPSBNYXRoLnBvdygxMCwgLWRlYyksXG4gICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxuICAgIHNpemU7XG5cbiAgaWYgKG5vcm0gPCAxLjUpIHtcbiAgICBzaXplID0gMTtcbiAgfSBlbHNlIGlmIChub3JtIDwgMykge1xuICAgIHNpemUgPSAyO1xuICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXG4gICAgaWYgKG5vcm0gPiAyLjI1KSB7XG4gICAgICBzaXplID0gMi41O1xuICAgICAgKytkZWM7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcbiAgICBzaXplID0gNTtcbiAgfSBlbHNlIHtcbiAgICBzaXplID0gMTA7XG4gIH1cblxuICBzaXplICo9IG1hZ247XG5cbiAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcbiAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xuICAgIGRlYyA9IDA7XG4gIH1cblxuICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XG4gICAgZGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYyksXG4gICAgc2NhbGVkRGVjaW1hbHM6XG4gICAgICBNYXRoLm1heCgwLCBkZWMpIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyXG4gIH07XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBsZXQgZ2V0Rm9ybWF0dGVkT3V0cHV0ID0gZnVuY3Rpb24gKHZhbHVlLCBmb3JtYXQsIGRlY2ltYWxzKSB7XG4gIGlmIChpc05hTih2YWx1ZSkgfHwgIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGxldCBkZWNpbWFsSW5mbzogYW55ID0gZ2V0RGVjaW1hbHNGb3JWYWx1ZSh2YWx1ZSwgZGVjaW1hbHMgfHwgXCIwXCIpO1xuICAgIGxldCBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1tmb3JtYXQgfHwgXCJub25lXCJdO1xuICAgIGxldCB2YWx1ZV9mb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKFxuICAgICAgdmFsdWUsXG4gICAgICBkZWNpbWFsSW5mby5kZWNpbWFscyxcbiAgICAgIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzXG4gICAgKTtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlX2Zvcm1hdHRlZCk7XG4gIH1cbn07XG4iXX0=