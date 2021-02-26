System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, replaceFontAwesomeTokens, replaceImageTokens, replaceTokens, getStatsFromArrayOfObjects, getStatFromStatsGroup, isMatch;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("replaceFontAwesomeTokens", replaceFontAwesomeTokens = function (value) {
                var FA_TOKEN_PREFIX = "#{fa-";
                var FA_TOKEN_SUFFIX = "}";
                var FA_DELIMITER = ",";
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith(FA_TOKEN_PREFIX) && a.endsWith(FA_TOKEN_SUFFIX)) {
                        var mytoken = a
                            .replace(/\#/g, "")
                            .replace(/\{/g, "")
                            .replace(/\}/g, "");
                        var icon = mytoken.split(FA_DELIMITER)[0];
                        var color = a.indexOf(FA_DELIMITER) > -1
                            ? " style=\"color:" + mytoken.split(FA_DELIMITER)[1] + "\" "
                            : "";
                        var repeatCount = a.split(FA_DELIMITER).length > 2
                            ? +mytoken.split(FA_DELIMITER)[2]
                            : 1;
                        if (a.split(FA_DELIMITER).length > 4) {
                            var operator = mytoken.split(FA_DELIMITER)[3];
                            var _value = +mytoken.split(FA_DELIMITER)[4];
                            switch (operator) {
                                case "plus":
                                    repeatCount = repeatCount + _value;
                                    break;
                                case "minus":
                                    repeatCount = repeatCount - _value;
                                    break;
                                case "multiply":
                                    repeatCount = Math.round(repeatCount * _value);
                                    break;
                                case "divideby":
                                    repeatCount = Math.round(repeatCount / _value);
                                    break;
                                case "min":
                                    repeatCount = Math.round(lodash_1.default.min([repeatCount, _value]));
                                    break;
                                case "max":
                                    repeatCount = Math.round(lodash_1.default.max([repeatCount, _value]));
                                    break;
                                case "mean":
                                    repeatCount = Math.round(lodash_1.default.mean([repeatCount, _value]));
                                    break;
                            }
                        }
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
                return value;
            });
            exports_1("replaceImageTokens", replaceImageTokens = function (value) {
                var IMG_TOKEN_PREFIX = "#{img-";
                var IMG_TOKEN_SUFFIX = "}";
                var IMG_DELIMITER = ",";
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith(IMG_TOKEN_PREFIX) && a.endsWith(IMG_TOKEN_SUFFIX)) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[0];
                        var imgWidth = a.split(IMG_DELIMITER).length > 1
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[1]
                            : "20px";
                        var imgHeight = a.split(IMG_DELIMITER).length > 2
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[2]
                            : "20px";
                        var repeatCount = a.split(IMG_DELIMITER).length > 3
                            ? +a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[3]
                            : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
                return value;
            });
            exports_1("replaceTokens", replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + "";
                value = replaceFontAwesomeTokens(value);
                value = replaceImageTokens(value);
                return value;
            });
            exports_1("getStatsFromArrayOfObjects", getStatsFromArrayOfObjects = function (arrayOfObjects) {
                var statsgroup = {};
                statsgroup.count = arrayOfObjects.length;
                statsgroup.uniquecount = lodash_1.default.uniq(arrayOfObjects).length;
                statsgroup.sum = lodash_1.default.sum(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.mean = lodash_1.default.mean(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.min = lodash_1.default.min(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.max = lodash_1.default.max(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.random = lodash_1.default.first(arrayOfObjects);
                statsgroup.first = lodash_1.default.first(arrayOfObjects);
                return statsgroup;
            });
            exports_1("getStatFromStatsGroup", getStatFromStatsGroup = function (statsGroup, statName) {
                statName = statName
                    .toLowerCase()
                    .trim()
                    .replace("${", "")
                    .replace("}", "");
                return statsGroup[statName] || null;
            });
            exports_1("isMatch", isMatch = function (ov, op, cv1, cv2) {
                var returnvalue = false;
                op = op
                    .toLowerCase()
                    .replace(/\ /g, "")
                    .trim();
                if (op.includes("ignorecase")) {
                    op = op.replace("ignorecase", "").trim();
                    ov = (ov || "").toLowerCase();
                    cv1 = (cv1 || "").toLowerCase();
                    cv2 = (cv2 || "").toLowerCase();
                }
                if (op.includes("ignorespace")) {
                    op = op.replace("ignorespace", "").trim();
                    ov = ov.replace(/\ /g, "");
                    cv1 = cv1.replace(/\ /g, "");
                    cv2 = cv2.replace(/\ /g, "");
                }
                switch (op.trim()) {
                    case "equals":
                    case "is":
                        returnvalue = +cv1 === +ov || cv1 === ov;
                        break;
                    case "notequals":
                    case "isnotequals":
                    case "not":
                    case "isnot":
                        returnvalue = cv1 !== ov;
                        break;
                    case "contains":
                    case "has":
                        returnvalue = ov.includes(cv1);
                        break;
                    case "notcontains":
                    case "nothas":
                    case "nothave":
                        returnvalue = !ov.includes(cv1);
                        break;
                    case "startswith":
                    case "beginswith":
                    case "beginwith":
                        returnvalue = ov.startsWith(cv1);
                        break;
                    case "endswith":
                    case "endwith":
                        returnvalue = ov.endsWith(cv1);
                        break;
                    case "in":
                        returnvalue = cv1.split(cv2 || " ").indexOf(ov) > -1;
                        break;
                    case "===":
                    case "==":
                    case "=":
                        returnvalue = +ov === +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case "!==":
                    case "!=":
                    case "<>":
                        returnvalue = +ov !== +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case "<":
                    case "lessthan":
                    case "below":
                        returnvalue = +ov < +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case ">":
                    case "greaterthan":
                    case "above":
                        returnvalue = +ov > +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case ">=":
                    case "greaterthanorequalto":
                        returnvalue = +ov >= +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case "<=":
                    case "lessthanorequalto":
                        returnvalue = +ov <= +cv1 && !isNaN(ov) && !isNaN(cv1);
                        break;
                    case "insiderange":
                        returnvalue =
                            +ov > lodash_1.default.min([+cv1, +cv2]) &&
                                +ov < lodash_1.default.max([+cv1, +cv2]) &&
                                !isNaN(ov) &&
                                !isNaN(cv1) &&
                                !isNaN(cv2);
                        break;
                    case "outsiderange":
                        returnvalue =
                            ((+ov < lodash_1.default.min([+cv1, +cv2]) && +ov > lodash_1.default.max([+cv1, +cv2])) ||
                                (+ov < +cv1 && +ov < +cv2) ||
                                (+ov > +cv1 && +ov > +cv2)) &&
                                !isNaN(ov) &&
                                !isNaN(cv1) &&
                                !isNaN(cv2);
                        break;
                    default:
                        returnvalue = false;
                        break;
                }
                return returnvalue;
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVBLHNDQUFXLHdCQUF3QixHQUFHLFVBQVUsS0FBSztnQkFDbkQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDO2dCQUM5QixJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUM7Z0JBQzFCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxvQkFBaUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSTs0QkFDckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLFdBQVcsR0FDYixDQUFD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RyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO2dDQUMxQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzdCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FDVixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0NBQ1gsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2QsTUFBTTtvQkFDUjt3QkFDRSxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNO2lCQUNUO2dCQUNELE9BQU8sV0FBVyxDQUFDO1lBQ3JCLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGxldCByZXBsYWNlRm9udEF3ZXNvbWVUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgbGV0IEZBX1RPS0VOX1BSRUZJWCA9IFwiI3tmYS1cIjtcbiAgbGV0IEZBX1RPS0VOX1NVRkZJWCA9IFwifVwiO1xuICBsZXQgRkFfREVMSU1JVEVSID0gXCIsXCI7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XG4gIHZhbHVlID0gdmFsdWVcbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcChhID0+IHtcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoRkFfVE9LRU5fUFJFRklYKSAmJiBhLmVuZHNXaXRoKEZBX1RPS0VOX1NVRkZJWCkpIHtcbiAgICAgICAgbGV0IG15dG9rZW4gPSBhXG4gICAgICAgICAgLnJlcGxhY2UoL1xcIy9nLCBcIlwiKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHsvZywgXCJcIilcbiAgICAgICAgICAucmVwbGFjZSgvXFx9L2csIFwiXCIpO1xuICAgICAgICBsZXQgaWNvbiA9IG15dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVswXTtcbiAgICAgICAgbGV0IGNvbG9yID1cbiAgICAgICAgICBhLmluZGV4T2YoRkFfREVMSU1JVEVSKSA+IC0xXG4gICAgICAgICAgICA/IGAgc3R5bGU9XCJjb2xvcjoke215dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVsxXX1cIiBgXG4gICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XG4gICAgICAgICAgYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDJcbiAgICAgICAgICAgID8gK215dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVsyXVxuICAgICAgICAgICAgOiAxO1xuICAgICAgICBpZiAoYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICBsZXQgb3BlcmF0b3IgPSBteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbM107XG4gICAgICAgICAgbGV0IF92YWx1ZSA9ICtteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbNF07XG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcInBsdXNcIjpcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCArIF92YWx1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWludXNcIjpcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCAtIF92YWx1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibXVsdGlwbHlcIjpcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50ICogX3ZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGl2aWRlYnlcIjpcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50IC8gX3ZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWluXCI6XG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1pbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWF4XCI6XG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1heChbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVhblwiOlxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tZWFuKFtyZXBlYXRDb3VudCwgX3ZhbHVlXSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhO1xuICAgIH0pXG4gICAgLmpvaW4oXCIgXCIpO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgbGV0IHJlcGxhY2VJbWFnZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBsZXQgSU1HX1RPS0VOX1BSRUZJWCA9IFwiI3tpbWctXCI7XG4gIGxldCBJTUdfVE9LRU5fU1VGRklYID0gXCJ9XCI7XG4gIGxldCBJTUdfREVMSU1JVEVSID0gXCIsXCI7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XG4gIHZhbHVlID0gdmFsdWVcbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcChhID0+IHtcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoSU1HX1RPS0VOX1BSRUZJWCkgJiYgYS5lbmRzV2l0aChJTUdfVE9LRU5fU1VGRklYKSkge1xuICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XG4gICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMF07XG4gICAgICAgIGxldCBpbWdXaWR0aCA9XG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsxXVxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcbiAgICAgICAgbGV0IGltZ0hlaWdodCA9XG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID1cbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDNcbiAgICAgICAgICAgID8gK2EucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVszXVxuICAgICAgICAgICAgOiAxO1xuICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChcbiAgICAgICAgICByZXBlYXRDb3VudFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGE7XG4gICAgfSlcbiAgICAuam9pbihcIiBcIik7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydCBsZXQgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICB2YWx1ZSA9IHJlcGxhY2VGb250QXdlc29tZVRva2Vucyh2YWx1ZSk7XG4gIHZhbHVlID0gcmVwbGFjZUltYWdlVG9rZW5zKHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGxldCBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyA9IGZ1bmN0aW9uIChhcnJheU9mT2JqZWN0cykge1xuICBsZXQgc3RhdHNncm91cDogYW55ID0ge307XG4gIHN0YXRzZ3JvdXAuY291bnQgPSBhcnJheU9mT2JqZWN0cy5sZW5ndGg7XG4gIHN0YXRzZ3JvdXAudW5pcXVlY291bnQgPSBfLnVuaXEoYXJyYXlPZk9iamVjdHMpLmxlbmd0aDtcbiAgc3RhdHNncm91cC5zdW0gPSBfLnN1bShhcnJheU9mT2JqZWN0cy5tYXAocyA9PiArcykpO1xuICBzdGF0c2dyb3VwLm1lYW4gPSBfLm1lYW4oYXJyYXlPZk9iamVjdHMubWFwKHMgPT4gK3MpKTtcbiAgc3RhdHNncm91cC5taW4gPSBfLm1pbihhcnJheU9mT2JqZWN0cy5tYXAocyA9PiArcykpO1xuICBzdGF0c2dyb3VwLm1heCA9IF8ubWF4KGFycmF5T2ZPYmplY3RzLm1hcChzID0+ICtzKSk7XG4gIHN0YXRzZ3JvdXAucmFuZG9tID0gXy5maXJzdChhcnJheU9mT2JqZWN0cyk7XG4gIHN0YXRzZ3JvdXAuZmlyc3QgPSBfLmZpcnN0KGFycmF5T2ZPYmplY3RzKTtcbiAgcmV0dXJuIHN0YXRzZ3JvdXA7XG59O1xuXG5leHBvcnQgbGV0IGdldFN0YXRGcm9tU3RhdHNHcm91cCA9IGZ1bmN0aW9uIChzdGF0c0dyb3VwLCBzdGF0TmFtZSkge1xuICBzdGF0TmFtZSA9IHN0YXROYW1lXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoXCIke1wiLCBcIlwiKVxuICAgIC5yZXBsYWNlKFwifVwiLCBcIlwiKTtcbiAgcmV0dXJuIHN0YXRzR3JvdXBbc3RhdE5hbWVdIHx8IG51bGw7XG59O1xuXG5leHBvcnQgbGV0IGlzTWF0Y2ggPSBmdW5jdGlvbiAob3YsIG9wLCBjdjEsIGN2Mik6IGJvb2xlYW4ge1xuICBsZXQgcmV0dXJudmFsdWUgPSBmYWxzZTtcbiAgb3AgPSBvcFxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1xcIC9nLCBcIlwiKVxuICAgIC50cmltKCk7XG4gIGlmIChvcC5pbmNsdWRlcyhcImlnbm9yZWNhc2VcIikpIHtcbiAgICBvcCA9IG9wLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKTtcbiAgICBvdiA9IChvdiB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGN2MSA9IChjdjEgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBjdjIgPSAoY3YyIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgaWYgKG9wLmluY2x1ZGVzKFwiaWdub3Jlc3BhY2VcIikpIHtcbiAgICBvcCA9IG9wLnJlcGxhY2UoXCJpZ25vcmVzcGFjZVwiLCBcIlwiKS50cmltKCk7XG4gICAgb3YgPSBvdi5yZXBsYWNlKC9cXCAvZywgXCJcIik7XG4gICAgY3YxID0gY3YxLnJlcGxhY2UoL1xcIC9nLCBcIlwiKTtcbiAgICBjdjIgPSBjdjIucmVwbGFjZSgvXFwgL2csIFwiXCIpO1xuICB9XG4gIHN3aXRjaCAob3AudHJpbSgpKSB7XG4gICAgY2FzZSBcImVxdWFsc1wiOlxuICAgIGNhc2UgXCJpc1wiOlxuICAgICAgcmV0dXJudmFsdWUgPSArY3YxID09PSArb3YgfHwgY3YxID09PSBvdjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJub3RlcXVhbHNcIjpcbiAgICBjYXNlIFwiaXNub3RlcXVhbHNcIjpcbiAgICBjYXNlIFwibm90XCI6XG4gICAgY2FzZSBcImlzbm90XCI6XG4gICAgICByZXR1cm52YWx1ZSA9IGN2MSAhPT0gb3Y7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICBjYXNlIFwiaGFzXCI6XG4gICAgICByZXR1cm52YWx1ZSA9IG92LmluY2x1ZGVzKGN2MSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibm90Y29udGFpbnNcIjpcbiAgICBjYXNlIFwibm90aGFzXCI6XG4gICAgY2FzZSBcIm5vdGhhdmVcIjpcbiAgICAgIHJldHVybnZhbHVlID0gIW92LmluY2x1ZGVzKGN2MSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3RhcnRzd2l0aFwiOlxuICAgIGNhc2UgXCJiZWdpbnN3aXRoXCI6XG4gICAgY2FzZSBcImJlZ2lud2l0aFwiOlxuICAgICAgcmV0dXJudmFsdWUgPSBvdi5zdGFydHNXaXRoKGN2MSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZW5kc3dpdGhcIjpcbiAgICBjYXNlIFwiZW5kd2l0aFwiOlxuICAgICAgcmV0dXJudmFsdWUgPSBvdi5lbmRzV2l0aChjdjEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImluXCI6XG4gICAgICByZXR1cm52YWx1ZSA9IGN2MS5zcGxpdChjdjIgfHwgXCIgXCIpLmluZGV4T2Yob3YpID4gLTE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPT09XCI6XG4gICAgY2FzZSBcIj09XCI6XG4gICAgY2FzZSBcIj1cIjpcbiAgICAgIHJldHVybnZhbHVlID0gK292ID09PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiIT09XCI6XG4gICAgY2FzZSBcIiE9XCI6XG4gICAgY2FzZSBcIjw+XCI6XG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiAhPT0gK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIjxcIjpcbiAgICBjYXNlIFwibGVzc3RoYW5cIjpcbiAgICBjYXNlIFwiYmVsb3dcIjpcbiAgICAgIHJldHVybnZhbHVlID0gK292IDwgK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIj5cIjpcbiAgICBjYXNlIFwiZ3JlYXRlcnRoYW5cIjpcbiAgICBjYXNlIFwiYWJvdmVcIjpcbiAgICAgIHJldHVybnZhbHVlID0gK292ID4gK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIj49XCI6XG4gICAgY2FzZSBcImdyZWF0ZXJ0aGFub3JlcXVhbHRvXCI6XG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiA+PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPD1cIjpcbiAgICBjYXNlIFwibGVzc3RoYW5vcmVxdWFsdG9cIjpcbiAgICAgIHJldHVybnZhbHVlID0gK292IDw9ICtjdjEgJiYgIWlzTmFOKG92KSAmJiAhaXNOYU4oY3YxKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpbnNpZGVyYW5nZVwiOlxuICAgICAgcmV0dXJudmFsdWUgPVxuICAgICAgICArb3YgPiBfLm1pbihbK2N2MSwgK2N2Ml0pICYmXG4gICAgICAgICtvdiA8IF8ubWF4KFsrY3YxLCArY3YyXSkgJiZcbiAgICAgICAgIWlzTmFOKG92KSAmJlxuICAgICAgICAhaXNOYU4oY3YxKSAmJlxuICAgICAgICAhaXNOYU4oY3YyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJvdXRzaWRlcmFuZ2VcIjpcbiAgICAgIHJldHVybnZhbHVlID1cbiAgICAgICAgKCgrb3YgPCBfLm1pbihbK2N2MSwgK2N2Ml0pICYmICtvdiA+IF8ubWF4KFsrY3YxLCArY3YyXSkpIHx8XG4gICAgICAgICAgKCtvdiA8ICtjdjEgJiYgK292IDwgK2N2MikgfHxcbiAgICAgICAgICAoK292ID4gK2N2MSAmJiArb3YgPiArY3YyKSkgJiZcbiAgICAgICAgIWlzTmFOKG92KSAmJlxuICAgICAgICAhaXNOYU4oY3YxKSAmJlxuICAgICAgICAhaXNOYU4oY3YyKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm52YWx1ZSA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHJldHVybnZhbHVlO1xufTtcbiJdfQ==