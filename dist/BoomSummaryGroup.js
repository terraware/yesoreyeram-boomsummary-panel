System.register(["lodash", "./AppUtils", "./BoomUtils", "./GrafanaUtils"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, AppUtils_1, BoomUtils_1, GrafanaUtils_1, BoomUtils_2, buildMasterData, BoomFilter, BoomSummaryFilter, BoomSummaryConditionalFormats, BoomStat, BoomSummaryGroup, replaceStatsFromTemplate, replaceFATokens, getMatchingCondition;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (AppUtils_1_1) {
                AppUtils_1 = AppUtils_1_1;
            },
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
                BoomUtils_2 = BoomUtils_1_1;
            },
            function (GrafanaUtils_1_1) {
                GrafanaUtils_1 = GrafanaUtils_1_1;
            }
        ],
        execute: function () {
            exports_1("buildMasterData", buildMasterData = function (data) {
                var masterdata = [];
                lodash_1.default.each(data, function (d) {
                    if (d.type === "table") {
                        var refId_1 = d.refId;
                        lodash_1.default.each(d.rows, function (row, i) {
                            var group = [];
                            lodash_1.default.each(row, function (col, j) {
                                var mydata = {
                                    colname: d.columns[j].text,
                                    refId: refId_1,
                                    rowid: +i,
                                    value: col
                                };
                                group.push(mydata);
                            });
                            masterdata.push(group);
                        });
                    }
                    else {
                        console.error("ERROR: Only table format is currently supported");
                    }
                });
                return masterdata;
            });
            BoomFilter = (function () {
                function BoomFilter(options) {
                    this.getSecondaryFieldDetails = function (operator) {
                        var CanShowValue2 = false;
                        var Value1Helper = "Value";
                        var Value2Helper = "";
                        switch (operator.replace("ignorecase", "").trim()) {
                            case "between":
                                CanShowValue2 = true;
                                Value1Helper = "From";
                                Value2Helper = "To";
                                break;
                            case "insiderange":
                                CanShowValue2 = true;
                                Value1Helper = "From";
                                Value2Helper = "To";
                                break;
                            case "outsiderange":
                                CanShowValue2 = true;
                                Value1Helper = "From";
                                Value2Helper = "To";
                                break;
                            case "in":
                                CanShowValue2 = true;
                                Value1Helper = "Values";
                                Value2Helper = "Seperator";
                                break;
                            default:
                                break;
                        }
                        return {
                            CanShowValue2: CanShowValue2,
                            Value1Helper: Value1Helper,
                            Value2Helper: Value2Helper
                        };
                    };
                    this.field = options.field || "Sample";
                    this.operator = options.operator || "equals";
                    this.value = options.value || "Something";
                    this.value2 = options.value2 || "";
                }
                return BoomFilter;
            }());
            exports_1("BoomFilter", BoomFilter);
            BoomFilter.prototype.GetValue1Helper = function () {
                return this.getSecondaryFieldDetails(this.operator).Value1Helper;
            };
            BoomFilter.prototype.GetValue2Helper = function () {
                return this.getSecondaryFieldDetails(this.operator).Value2Helper;
            };
            BoomFilter.prototype.CanShowValue2 = function () {
                return this.getSecondaryFieldDetails(this.operator).CanShowValue2;
            };
            BoomSummaryFilter = (function (_super) {
                __extends(BoomSummaryFilter, _super);
                function BoomSummaryFilter(options) {
                    return _super.call(this, options) || this;
                }
                return BoomSummaryFilter;
            }(BoomFilter));
            exports_1("BoomSummaryFilter", BoomSummaryFilter);
            BoomSummaryConditionalFormats = (function (_super) {
                __extends(BoomSummaryConditionalFormats, _super);
                function BoomSummaryConditionalFormats(options) {
                    var _this = _super.call(this, options) || this;
                    _this.custom_css_class = options.custom_css_class || "";
                    _this.stat_type = options.stat_type || "random";
                    _this.bgColor = options.bgColor || "";
                    _this.textColor = options.textColor || "";
                    return _this;
                }
                return BoomSummaryConditionalFormats;
            }(BoomFilter));
            exports_1("BoomSummaryConditionalFormats", BoomSummaryConditionalFormats);
            BoomStat = (function () {
                function BoomStat(options) {
                    this.field = options.field || "Sample";
                    this.stat_type = options.stat_type || "random";
                    this.decimals = options.decimals || "0";
                    this.unit = options.unit || "none";
                    this.title = options.title || this.stat_type + " of " + this.field || "Detail";
                }
                return BoomStat;
            }());
            exports_1("BoomStat", BoomStat);
            BoomStat.prototype.setUnitFormat = function (format) {
                this.unit = format && format.value ? format.value : "none";
            };
            BoomSummaryGroup = (function () {
                function BoomSummaryGroup(options) {
                    this.title = options.title || "";
                    this.stats = options.stats || [];
                    this.statWidth = options.statWidth || "100";
                    this.bgColor = options.bgColor || "";
                    this.textColor = options.textColor || "";
                    this.templateType = options.templateType || "default";
                    this.customTemplate = options.customTemplate || "<div style=\"width:100%;float:left;border:1px solid black;\">\n            <div style=\"width:50%;float:left;padding:10px;\">Total Records</div>\n            <div style=\"width:50%;float:left;padding:10px;\">#{count}</div>\n        </div>";
                    this.filters = options.filters || [];
                    this.conditional_formats = options.conditional_formats || [];
                }
                return BoomSummaryGroup;
            }());
            exports_1("BoomSummaryGroup", BoomSummaryGroup);
            BoomSummaryGroup.prototype.addStat = function () {
                var newMetric = new BoomStat({});
                this.stats = this.stats || [];
                this.stats.push(newMetric);
            };
            BoomSummaryGroup.prototype.removeStat = function (index) {
                if (this.stats.length > 0) {
                    this.stats.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.addFilter = function () {
                var newfilter = new BoomSummaryFilter({
                    field: "Sample Field",
                    operator: "notequals"
                });
                this.filters = this.filters || [];
                this.filters.push(newfilter);
            };
            BoomSummaryGroup.prototype.removeFilter = function (index) {
                if (this.filters.length > 0) {
                    this.filters.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.addConditonalFormat = function () {
                var operator = "equals";
                var stat_type = "random";
                var field = "Sample";
                var value = "Something";
                if (this.stats && this.stats.length > 0 && this.conditional_formats.length === 0) {
                    operator = "<=";
                    stat_type = "count";
                    field = this.stats[0].field || "Sample";
                    value = "0";
                }
                else if (this.conditional_formats.length > 0) {
                    operator = this.conditional_formats[this.conditional_formats.length - 1].operator;
                    stat_type = this.conditional_formats[this.conditional_formats.length - 1].stat_type;
                    field = this.conditional_formats[this.conditional_formats.length - 1].field;
                    value = this.conditional_formats[this.conditional_formats.length - 1].value;
                }
                var new_conditional_formatter = new BoomSummaryConditionalFormats({
                    field: field,
                    operator: operator,
                    stat_type: stat_type,
                    value: value
                });
                this.conditional_formats = this.conditional_formats || [];
                this.conditional_formats.push(new_conditional_formatter);
            };
            BoomSummaryGroup.prototype.removeConditionalFormat = function (index) {
                if (this.conditional_formats.length > 0) {
                    this.conditional_formats.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.moveConditionalFormat = function (direction, index) {
                var tempElement = this.conditional_formats[Number(index)];
                if (direction === "UP") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) - 1];
                    this.conditional_formats[Number(index) - 1] = tempElement;
                }
                if (direction === "DOWN") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) + 1];
                    this.conditional_formats[Number(index) + 1] = tempElement;
                }
            };
            replaceStatsFromTemplate = function (template, stats, data) {
                var output = template;
                if (data.length === 0) {
                    ["count", "random", "uniquecount", "mean", "sum", "min", "max", "default"].forEach(function (statType) {
                        output = output.replace(new RegExp("#{" + statType + "}", "gi"), "No matching data");
                    });
                }
                lodash_1.default.each(stats, function (stat, index) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_1 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === stat.field; });
                            if (matching_field.length > 0) {
                                mystats_1.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_1);
                    }
                    if (index === 0) {
                        output = output.replace(new RegExp("#{count}", "gi"), mystatsObject.count);
                        output = output.replace(new RegExp("#{uniquecount}", "gi"), mystatsObject.uniquecount);
                        output = output.replace(new RegExp("#{sum}", "gi"), mystatsObject.sum);
                        output = output.replace(new RegExp("#{mean}", "gi"), mystatsObject.mean);
                        output = output.replace(new RegExp("#{min}", "gi"), mystatsObject.min);
                        output = output.replace(new RegExp("#{max}", "gi"), mystatsObject.max);
                        output = output.replace(new RegExp("#{randmon}", "gi"), mystatsObject.random);
                        output = output.replace(new RegExp("#{title}", "gi"), stat.title || stat.stat_type + " of " + stat.field);
                        output = output.replace(new RegExp("#{default}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
                    }
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + "}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",raw}", "gi"), mystatsObject[stat.defaultStat]);
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",title}", "gi"), stat.title);
                });
                var colnames = [];
                lodash_1.default.each(data, function (group) {
                    lodash_1.default.each(group, function (item) {
                        colnames.push(item.colname);
                    });
                });
                colnames = lodash_1.default.uniq(colnames);
                lodash_1.default.each(colnames, function (colname, index) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_2 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === colname; });
                            if (matching_field.length > 0) {
                                mystats_2.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_2);
                    }
                    if (index === 0) {
                        output = output.replace(new RegExp("#{title}", "gi"), "" + colname);
                        output = output.replace(new RegExp("#{default}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject.random, "none", "0"));
                    }
                    output = output.replace(new RegExp("#{count," + colname + "}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + "}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + "}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + "}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + "}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + "}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{random," + colname + "}", "gi"), mystatsObject.random);
                    output = output.replace(new RegExp("#{count," + colname + ",raw}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",raw}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + ",raw}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + ",raw}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + ",raw}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + ",raw}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{random," + colname + ",raw}", "gi"), mystatsObject.random);
                    output = output.replace(new RegExp("#{count," + colname + ",title}", "gi"), "Count of " + colname);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",title}", "gi"), "Unique Count of " + colname);
                    output = output.replace(new RegExp("#{sum," + colname + ",title}", "gi"), "Sum of " + colname);
                    output = output.replace(new RegExp("#{mean," + colname + ",title}", "gi"), "Mean of " + colname);
                    output = output.replace(new RegExp("#{min," + colname + ",title}", "gi"), "min of " + colname);
                    output = output.replace(new RegExp("#{max," + colname + ",title}", "gi"), "Max of " + colname);
                    output = output.replace(new RegExp("#{random," + colname + ",title}", "gi"), "Random " + colname);
                });
                output = output.replace(new RegExp("#{count}", "gi"), data.length);
                return output;
            };
            replaceFATokens = function (template) {
                return BoomUtils_2.replaceTokens(template);
            };
            getMatchingCondition = function (data, conditional_formats) {
                var matching_conditions = conditional_formats.filter(function (condition) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_3 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === condition.field; });
                            if (matching_field.length > 0) {
                                mystats_3.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_3);
                    }
                    return BoomUtils_1.isMatch(mystatsObject[condition.stat_type], condition.operator, condition.value, condition.value2);
                });
                return matching_conditions && matching_conditions.length > 0 ? lodash_1.default.first(matching_conditions) : null;
            };
            BoomSummaryGroup.prototype.getoutput = function (masterdata) {
                if (masterdata.length === 0) {
                    return "<div style='text-align:center;'>No Data</div>";
                }
                else {
                    var filteredData = AppUtils_1.getFilteredDataFromMasterData(masterdata, this.filters);
                    var matching_condition = getMatchingCondition(filteredData, this.conditional_formats);
                    var bgColor = matching_condition && matching_condition.bgColor ? matching_condition.bgColor : this.bgColor;
                    var textColor = matching_condition && matching_condition.textColor ? matching_condition.textColor : this.textColor;
                    var custom_css_class = matching_condition && matching_condition.custom_css_class ? matching_condition.custom_css_class : "not_applicable";
                    if (custom_css_class !== "not_applicable") {
                        bgColor = "not_applicable";
                        textColor = "not_applicable";
                    }
                    var outTemplate_1 = filteredData.length + " records found";
                    switch (this.templateType) {
                        case "titleonly":
                            outTemplate_1 = "<div style=\"width:100%;float:left;border:1px solid black;\">\n                                    <div style=\"width:100%;float:left;padding:10px;text-align:center;\">#{default}</div>\n                                </div>";
                            break;
                        case "auto":
                            outTemplate_1 = "";
                            lodash_1.default.each(this.stats, function (stat) {
                                outTemplate_1 += "<div style=\"width:100%;float:left;border:1px solid black;\">\n                    <div style=\"width:50%;float:left;padding:10px;\">#{" + stat.stat_type + "," + stat.field + ",title}</div>\n                    <div style=\"width:50%;float:left;padding:10px;\">#{" + stat.stat_type + "," + stat.field + "}</div>\n                </div>";
                            });
                            break;
                        case "custom":
                            outTemplate_1 = this.customTemplate;
                            break;
                        case "jumbo":
                            outTemplate_1 = "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;\">\n                                    <br/>\n                                    <h5>#{title}</h5>\n                                    <br/>\n                                    <h1>#{default}</h1>\n                                    <br/>\n                                </div>";
                            break;
                        case "jumbo_without_title":
                            outTemplate_1 = "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;\">\n                                    <br/>\n                                    <h1>#{default}</h1>\n                                    <br/>\n                                </div>";
                            break;
                        default:
                            outTemplate_1 = this.customTemplate;
                            break;
                    }
                    if ((this.templateType === "auto" || this.templateType === "jumbo" || this.templateType === "jumbo_without_title" || this.templateType === "titleonly") && this.stats.length === 0) {
                        outTemplate_1 = "<div style=\"background:red;\">Oops. You don't have any stats defined for this summary group</div>";
                    }
                    var output_with_statsReplaced = replaceStatsFromTemplate(outTemplate_1, this.stats, filteredData);
                    var output_with_tokensreplaced = replaceFATokens(output_with_statsReplaced);
                    if (output_with_tokensreplaced.trim().indexOf("<") !== 0) {
                        output_with_tokensreplaced = "" + output_with_tokensreplaced.replace(new RegExp("\n", "gi"), "<br/>");
                    }
                    return "<div style=\"width:" + (this.statWidth || "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\" class=\"" + custom_css_class + "\">\n                    " + output_with_tokensreplaced + "\n                </div>";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN1bW1hcnlHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb29tU3VtbWFyeUdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQSw2QkFBVyxlQUFlLEdBQUcsVUFBVSxJQUFJO2dCQUN2QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO2dCQUNyQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQ3BCLElBQUksT0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3BCLGdCQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQzs0QkFDOUIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ2YsSUFBSSxNQUFNLEdBQWdCO29DQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29DQUMxQixLQUFLLFNBQUE7b0NBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQztvQ0FDVCxLQUFLLEVBQUUsR0FBRztpQ0FDYixDQUFDO2dDQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3ZCLENBQUMsQ0FBQyxDQUFDOzRCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztxQkFDcEU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxVQUFVLENBQUM7WUFDdEIsQ0FBQyxFQUFDO1lBRUY7Z0JBUUksb0JBQVksT0FBTztvQkFNWiw2QkFBd0IsR0FBRyxVQUFVLFFBQVE7d0JBQ2hELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDMUIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDO3dCQUMzQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3RCLFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQy9DLEtBQUssU0FBUztnQ0FDVixhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUNyQixZQUFZLEdBQUcsTUFBTSxDQUFDO2dDQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUNwQixNQUFNOzRCQUNWLEtBQUssYUFBYTtnQ0FDZCxhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUNyQixZQUFZLEdBQUcsTUFBTSxDQUFDO2dDQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUNwQixNQUFNOzRCQUNWLEtBQUssY0FBYztnQ0FDZixhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUNyQixZQUFZLEdBQUcsTUFBTSxDQUFDO2dDQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUNwQixNQUFNOzRCQUNWLEtBQUssSUFBSTtnQ0FDTCxhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUNyQixZQUFZLEdBQUcsUUFBUSxDQUFDO2dDQUN4QixZQUFZLEdBQUcsV0FBVyxDQUFDO2dDQUMzQixNQUFNOzRCQUNWO2dDQUNJLE1BQU07eUJBQ2I7d0JBQ0QsT0FBTzs0QkFDSCxhQUFhLGVBQUE7NEJBQ2IsWUFBWSxjQUFBOzRCQUNaLFlBQVksY0FBQTt5QkFDZixDQUFDO29CQUNOLENBQUMsQ0FBQztvQkF0Q0UsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDdkMsQ0FBQztnQkFvQ0wsaUJBQUM7WUFBRCxDQUFDLEFBakRELElBaURDOztZQUVELFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUNuQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3JFLENBQUMsQ0FBQztZQUVGLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUNuQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3JFLENBQUMsQ0FBQztZQUVGLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHO2dCQUNqQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3RFLENBQUMsQ0FBQztZQUVGO2dCQUF1QyxxQ0FBVTtnQkFDN0MsMkJBQVksT0FBTzsyQkFDZixrQkFBTSxPQUFPLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0wsd0JBQUM7WUFBRCxDQUFDLEFBSkQsQ0FBdUMsVUFBVSxHQUloRDs7WUFFRDtnQkFBbUQsaURBQVU7Z0JBS3pELHVDQUFZLE9BQU87b0JBQW5CLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBS2pCO29CQUpHLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDO29CQUN2RCxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO29CQUMvQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDOztnQkFDN0MsQ0FBQztnQkFDTCxvQ0FBQztZQUFELENBQUMsQUFaRCxDQUFtRCxVQUFVLEdBWTVEOztZQUVEO2dCQU9JLGtCQUFZLE9BQU87b0JBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQztvQkFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO2dCQUNuRixDQUFDO2dCQUNMLGVBQUM7WUFBRCxDQUFDLEFBZEQsSUFjQzs7WUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLE1BQVc7Z0JBQ3BELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMvRCxDQUFDLENBQUM7WUFFRjtnQkFrQkksMEJBQVksT0FBTztvQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO29CQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDO29CQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksZ1BBR3pDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7Z0JBQ2pFLENBQUM7Z0JBQ0wsdUJBQUM7WUFBRCxDQUFDLEFBaENELElBZ0NDOztZQUVELGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUc7Z0JBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsS0FBYTtnQkFDM0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDdkM7WUFDTCxDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHO2dCQUNuQyxJQUFJLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixDQUFDO29CQUNsQyxLQUFLLEVBQUUsY0FBYztvQkFDckIsUUFBUSxFQUFFLFdBQVc7aUJBQ3hCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVUsS0FBYTtnQkFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDekM7WUFDTCxDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUc7Z0JBQzdDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDOUUsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDaEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztvQkFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztvQkFDeEMsS0FBSyxHQUFHLEdBQUcsQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUNsRixTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNwRixLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM1RSxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUMvRTtnQkFDRCxJQUFJLHlCQUF5QixHQUFHLElBQUksNkJBQTZCLENBQUM7b0JBQzlELEtBQUssT0FBQTtvQkFDTCxRQUFRLFVBQUE7b0JBQ1IsU0FBUyxXQUFBO29CQUNULEtBQUssT0FBQTtpQkFDUixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxLQUFhO2dCQUN4RSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQ7WUFDTCxDQUFDLENBQUM7WUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsVUFBVSxTQUFpQixFQUFFLEtBQWE7Z0JBQ3pGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO29CQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUM5RCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNwQixDQUFDO29CQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO2lCQUM3RDtnQkFDRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ3BCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7aUJBQzdEO1lBQ0wsQ0FBQyxDQUFDO1lBRUUsd0JBQXdCLEdBQUcsVUFBVSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUk7Z0JBQzFELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDbkIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTt3QkFDdEYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBSyxRQUFRLE1BQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO29CQUNwRixDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxnQkFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSztvQkFDdEIsSUFBSSxhQUFhLEdBQWU7d0JBQzVCLEtBQUssRUFBRSxHQUFHO3dCQUNWLEdBQUcsRUFBRSxHQUFHO3dCQUNSLElBQUksRUFBRSxHQUFHO3dCQUNULEdBQUcsRUFBRSxHQUFHO3dCQUNSLE1BQU0sRUFBRSxFQUFFO3dCQUNWLEdBQUcsRUFBRSxHQUFHO3dCQUNSLFdBQVcsRUFBRSxHQUFHO3FCQUNuQixDQUFDO29CQUNGLElBQUksSUFBSSxFQUFFO3dCQUNOLElBQUksU0FBTyxHQUFRLEVBQUUsQ0FBQzt3QkFDdEIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUEsS0FBSzs0QkFDZCxJQUFJLGNBQWMsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQXhCLENBQXdCLENBQUMsQ0FBQzs0QkFDcEUsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQ0FDM0IsU0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDL0M7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsYUFBYSxHQUFHLHNDQUEwQixDQUFDLFNBQU8sQ0FBQyxDQUFDO3FCQUN2RDtvQkFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7d0JBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0UsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2RixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6RSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM5RSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBTyxJQUFJLENBQUMsU0FBUyxZQUFPLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQzt3QkFDMUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLGlDQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztxQkFDeEk7b0JBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLGlDQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDdkssTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDL0gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEgsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxRQUFRLEdBQVUsRUFBRSxDQUFDO2dCQUN6QixnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLO29CQUNkLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFBLElBQUk7d0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILFFBQVEsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsT0FBTyxFQUFFLEtBQUs7b0JBQzVCLElBQUksYUFBYSxHQUFlO3dCQUM1QixLQUFLLEVBQUUsR0FBRzt3QkFDVixHQUFHLEVBQUUsR0FBRzt3QkFDUixJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsR0FBRzt3QkFDUixNQUFNLEVBQUUsRUFBRTt3QkFDVixHQUFHLEVBQUUsR0FBRzt3QkFDUixXQUFXLEVBQUUsR0FBRztxQkFDbkIsQ0FBQztvQkFDRixJQUFJLElBQUksRUFBRTt3QkFDTixJQUFJLFNBQU8sR0FBUSxFQUFFLENBQUM7d0JBQ3RCLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLEtBQUs7NEJBQ2QsSUFBSSxjQUFjLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQXJCLENBQXFCLENBQUMsQ0FBQzs0QkFDakUsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQ0FDM0IsU0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDL0M7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsYUFBYSxHQUFHLHNDQUEwQixDQUFDLFNBQU8sQ0FBQyxDQUFDO3FCQUN2RDtvQkFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7d0JBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUcsT0FBUyxDQUFDLENBQUM7d0JBQ3BFLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxpQ0FBa0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNsSDtvQkFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNGLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2RyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZGLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2RixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZGLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDM0csTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMzRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdGLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsR0FBRyxPQUFPLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMzRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pHLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLGNBQVksT0FBUyxDQUFDLENBQUM7b0JBQ25HLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUscUJBQW1CLE9BQVMsQ0FBQyxDQUFDO29CQUNoSCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFVLE9BQVMsQ0FBQyxDQUFDO29CQUMvRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFXLE9BQVMsQ0FBQyxDQUFDO29CQUNqRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFVLE9BQVMsQ0FBQyxDQUFDO29CQUMvRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFVLE9BQVMsQ0FBQyxDQUFDO29CQUMvRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFVLE9BQVMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFRSxlQUFlLEdBQUcsVUFBVSxRQUFRO2dCQUNwQyxPQUFPLHlCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDO1lBRUUsb0JBQW9CLEdBQUcsVUFBVSxJQUFJLEVBQUUsbUJBQW1CO2dCQUMxRCxJQUFJLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFBLFNBQVM7b0JBQzFELElBQUksYUFBYSxHQUFlO3dCQUM1QixLQUFLLEVBQUUsR0FBRzt3QkFDVixHQUFHLEVBQUUsR0FBRzt3QkFDUixJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsR0FBRzt3QkFDUixNQUFNLEVBQUUsRUFBRTt3QkFDVixHQUFHLEVBQUUsR0FBRzt3QkFDUixXQUFXLEVBQUUsR0FBRztxQkFDbkIsQ0FBQztvQkFDRixJQUFJLElBQUksRUFBRTt3QkFDTixJQUFJLFNBQU8sR0FBUSxFQUFFLENBQUM7d0JBQ3RCLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLEtBQUs7NEJBQ2QsSUFBSSxjQUFjLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsS0FBSyxFQUE3QixDQUE2QixDQUFDLENBQUM7NEJBQ3pFLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBQzNCLFNBQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQy9DO3dCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNILGFBQWEsR0FBRyxzQ0FBMEIsQ0FBQyxTQUFPLENBQUMsQ0FBQztxQkFDdkQ7b0JBQ0QsT0FBTyxtQkFBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxtQkFBbUIsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkcsQ0FBQyxDQUFDO1lBRUYsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLFVBQVU7Z0JBQ3ZELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLE9BQU8sK0NBQStDLENBQUM7aUJBQzFEO3FCQUFNO29CQUNILElBQUksWUFBWSxHQUFHLHdDQUE2QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzNFLElBQUksa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUN0RixJQUFJLE9BQU8sR0FBRyxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDM0csSUFBSSxTQUFTLEdBQUcsa0JBQWtCLElBQUksa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25ILElBQUksZ0JBQWdCLEdBQUcsa0JBQWtCLElBQUksa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDMUksSUFBSSxnQkFBZ0IsS0FBSyxnQkFBZ0IsRUFBRTt3QkFDdkMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO3dCQUMzQixTQUFTLEdBQUcsZ0JBQWdCLENBQUM7cUJBQ2hDO29CQUNELElBQUksYUFBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3pELFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDdkIsS0FBSyxXQUFXOzRCQUNaLGFBQVcsR0FBRyxrT0FFUyxDQUFDOzRCQUN4QixNQUFNO3dCQUNWLEtBQUssTUFBTTs0QkFDUCxhQUFXLEdBQUcsRUFBRSxDQUFDOzRCQUNqQixnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUEsSUFBSTtnQ0FDbkIsYUFBVyxJQUFJLDRJQUNxQyxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxLQUFLLCtGQUM1QixJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxLQUFLLG9DQUM3RSxDQUFDOzRCQUNSLENBQUMsQ0FBQyxDQUFDOzRCQUNILE1BQU07d0JBQ1YsS0FBSyxRQUFROzRCQUNULGFBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDOzRCQUNsQyxNQUFNO3dCQUNWLEtBQUssT0FBTzs0QkFDUixhQUFXLEdBQUcsMFdBTVMsQ0FBQzs0QkFDeEIsTUFBTTt3QkFDVixLQUFLLHFCQUFxQjs0QkFDdEIsYUFBVyxHQUFHLHdRQUlTLENBQUM7NEJBQ3hCLE1BQU07d0JBQ1Y7NEJBQ0ksYUFBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2xDLE1BQU07cUJBQ2I7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUsscUJBQXFCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ2hMLGFBQVcsR0FBRyxvR0FBa0csQ0FBQztxQkFDcEg7b0JBQ0QsSUFBSSx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQyxhQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDaEcsSUFBSSwwQkFBMEIsR0FBRyxlQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDNUUsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN0RCwwQkFBMEIsR0FBRyxLQUFHLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFHLENBQUM7cUJBQ3pHO29CQUNELE9BQU8seUJBQXFCLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxpQ0FBMkIsT0FBTyxlQUFVLFNBQVMsb0JBQWEsZ0JBQWdCLGlDQUN2SCwwQkFBMEIsNkJBQ3pCLENBQUM7aUJBQ25CO1lBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgSU1hc3RlckRhdGEsIElCb29tRmlsdGVyLCBJQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMsIElCb29tU3RhdHMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0RmlsdGVyZWREYXRhRnJvbU1hc3RlckRhdGEgfSBmcm9tIFwiLi9BcHBVdGlsc1wiO1xuaW1wb3J0IHsgZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMsIGlzTWF0Y2ggfSBmcm9tIFwiLi9Cb29tVXRpbHNcIjtcbmltcG9ydCB7IGdldEZvcm1hdHRlZE91dHB1dCB9IGZyb20gXCIuL0dyYWZhbmFVdGlsc1wiO1xuaW1wb3J0IHsgcmVwbGFjZVRva2VucyB9IGZyb20gXCIuL0Jvb21VdGlsc1wiO1xuXG5leHBvcnQgbGV0IGJ1aWxkTWFzdGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgbGV0IG1hc3RlcmRhdGE6IElNYXN0ZXJEYXRhW11bXSA9IFtdO1xuICAgIF8uZWFjaChkYXRhLCBkID0+IHtcbiAgICAgICAgaWYgKGQudHlwZSA9PT0gXCJ0YWJsZVwiKSB7XG4gICAgICAgICAgICBsZXQgcmVmSWQgPSBkLnJlZklkO1xuICAgICAgICAgICAgXy5lYWNoKGQucm93cywgKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBncm91cDogSU1hc3RlckRhdGFbXSA9IFtdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChyb3csIChjb2wsIGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG15ZGF0YTogSU1hc3RlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xuYW1lOiBkLmNvbHVtbnNbal0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm93aWQ6ICtpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wdXNoKG15ZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWFzdGVyZGF0YS5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBPbmx5IHRhYmxlIGZvcm1hdCBpcyBjdXJyZW50bHkgc3VwcG9ydGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hc3RlcmRhdGE7XG59O1xuXG5leHBvcnQgY2xhc3MgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcbiAgICBwdWJsaWMgZmllbGQ6IHN0cmluZztcbiAgICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XG4gICAgcHVibGljIENhblNob3dWYWx1ZTI7XG4gICAgcHVibGljIEdldFZhbHVlMkhlbHBlcjtcbiAgICBwdWJsaWMgR2V0VmFsdWUxSGVscGVyO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3IgfHwgXCJlcXVhbHNcIjtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcbiAgICAgICAgdGhpcy52YWx1ZTIgPSBvcHRpb25zLnZhbHVlMiB8fCBcIlwiO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIGxldCBDYW5TaG93VmFsdWUyID0gZmFsc2U7XG4gICAgICAgIGxldCBWYWx1ZTFIZWxwZXIgPSBcIlZhbHVlXCI7XG4gICAgICAgIGxldCBWYWx1ZTJIZWxwZXIgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSkge1xuICAgICAgICAgICAgY2FzZSBcImJldHdlZW5cIjpcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaW5zaWRlcmFuZ2VcIjpcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib3V0c2lkZXJhbmdlXCI6XG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJGcm9tXCI7XG4gICAgICAgICAgICAgICAgVmFsdWUySGVscGVyID0gXCJUb1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluXCI6XG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJWYWx1ZXNcIjtcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlNlcGVyYXRvclwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMixcbiAgICAgICAgICAgIFZhbHVlMUhlbHBlcixcbiAgICAgICAgICAgIFZhbHVlMkhlbHBlclxuICAgICAgICB9O1xuICAgIH07XG5cbn1cblxuQm9vbUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUxSGVscGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFNlY29uZGFyeUZpZWxkRGV0YWlscyh0aGlzLm9wZXJhdG9yKS5WYWx1ZTFIZWxwZXI7XG59O1xuXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTJIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLlZhbHVlMkhlbHBlcjtcbn07XG5cbkJvb21GaWx0ZXIucHJvdG90eXBlLkNhblNob3dWYWx1ZTIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLkNhblNob3dWYWx1ZTI7XG59O1xuXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlGaWx0ZXIgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIsIElCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB7XG4gICAgcHVibGljIHN0YXRfdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xuICAgIHB1YmxpYyBjdXN0b21fY3NzX2NsYXNzOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jdXN0b21fY3NzX2NsYXNzID0gb3B0aW9ucy5jdXN0b21fY3NzX2NsYXNzIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuc3RhdF90eXBlID0gb3B0aW9ucy5zdGF0X3R5cGUgfHwgXCJyYW5kb21cIjtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gb3B0aW9ucy5iZ0NvbG9yIHx8IFwiXCI7XG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3IgfHwgXCJcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCb29tU3RhdCB7XG4gICAgcHVibGljIGZpZWxkO1xuICAgIHB1YmxpYyBzdGF0X3R5cGU7XG4gICAgcHVibGljIGRlY2ltYWxzO1xuICAgIHB1YmxpYyB1bml0O1xuICAgIHB1YmxpYyBzZXRVbml0Rm9ybWF0O1xuICAgIHB1YmxpYyB0aXRsZTtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XG4gICAgICAgIHRoaXMuc3RhdF90eXBlID0gb3B0aW9ucy5zdGF0X3R5cGUgfHwgXCJyYW5kb21cIjtcbiAgICAgICAgdGhpcy5kZWNpbWFscyA9IG9wdGlvbnMuZGVjaW1hbHMgfHwgXCIwXCI7XG4gICAgICAgIHRoaXMudW5pdCA9IG9wdGlvbnMudW5pdCB8fCBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGUgfHwgdGhpcy5zdGF0X3R5cGUgKyBcIiBvZiBcIiArIHRoaXMuZmllbGQgfHwgXCJEZXRhaWxcIjtcbiAgICB9XG59XG5cbkJvb21TdGF0LnByb3RvdHlwZS5zZXRVbml0Rm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdDogYW55KTogdm9pZCB7XG4gICAgdGhpcy51bml0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xufTtcblxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5R3JvdXAge1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdGF0czogQm9vbVN0YXRbXTtcbiAgICBwdWJsaWMgc3RhdFdpZHRoOiBTdHJpbmc7XG4gICAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIHRlbXBsYXRlVHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBjdXN0b21UZW1wbGF0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBmaWx0ZXJzOiBCb29tU3VtbWFyeUZpbHRlcltdO1xuICAgIHB1YmxpYyBjb25kaXRpb25hbF9mb3JtYXRzOiBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0c1tdO1xuICAgIHB1YmxpYyBhZGRTdGF0O1xuICAgIHB1YmxpYyByZW1vdmVTdGF0O1xuICAgIHB1YmxpYyBhZGRGaWx0ZXI7XG4gICAgcHVibGljIHJlbW92ZUZpbHRlcjtcbiAgICBwdWJsaWMgYWRkQ29uZGl0b25hbEZvcm1hdDtcbiAgICBwdWJsaWMgcmVtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XG4gICAgcHVibGljIG1vdmVDb25kaXRpb25hbEZvcm1hdDtcbiAgICBwdWJsaWMgZ2V0b3V0cHV0O1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGUgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5zdGF0cyA9IG9wdGlvbnMuc3RhdHMgfHwgW107XG4gICAgICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gb3B0aW9ucy5iZ0NvbG9yIHx8IFwiXCI7XG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3IgfHwgXCJcIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGUgPSBvcHRpb25zLnRlbXBsYXRlVHlwZSB8fCBcImRlZmF1bHRcIjtcbiAgICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZSA9IG9wdGlvbnMuY3VzdG9tVGVtcGxhdGUgfHwgYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo1MCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7XCI+VG90YWwgUmVjb3JkczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj4je2NvdW50fTwvZGl2PlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmZpbHRlcnMgfHwgW107XG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IG9wdGlvbnMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcbiAgICB9XG59XG5cbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLmFkZFN0YXQgPSBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgbGV0IG5ld01ldHJpYyA9IG5ldyBCb29tU3RhdCh7fSk7XG4gICAgdGhpcy5zdGF0cyA9IHRoaXMuc3RhdHMgfHwgW107XG4gICAgdGhpcy5zdGF0cy5wdXNoKG5ld01ldHJpYyk7XG59O1xuXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5yZW1vdmVTdGF0ID0gZnVuY3Rpb24gKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGF0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RhdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xuICAgIH1cbn07XG5cbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLmFkZEZpbHRlciA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcbiAgICAgICAgZmllbGQ6IFwiU2FtcGxlIEZpZWxkXCIsXG4gICAgICAgIG9wZXJhdG9yOiBcIm5vdGVxdWFsc1wiXG4gICAgfSk7XG4gICAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xuICAgIHRoaXMuZmlsdGVycy5wdXNoKG5ld2ZpbHRlcik7XG59O1xuXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbiAoaW5kZXg6IE51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xuICAgIH1cbn07XG5cbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLmFkZENvbmRpdG9uYWxGb3JtYXQgPSBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgbGV0IG9wZXJhdG9yID0gXCJlcXVhbHNcIjtcbiAgICBsZXQgc3RhdF90eXBlID0gXCJyYW5kb21cIjtcbiAgICBsZXQgZmllbGQgPSBcIlNhbXBsZVwiO1xuICAgIGxldCB2YWx1ZSA9IFwiU29tZXRoaW5nXCI7XG4gICAgaWYgKHRoaXMuc3RhdHMgJiYgdGhpcy5zdGF0cy5sZW5ndGggPiAwICYmIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb3BlcmF0b3IgPSBcIjw9XCI7XG4gICAgICAgIHN0YXRfdHlwZSA9IFwiY291bnRcIjtcbiAgICAgICAgZmllbGQgPSB0aGlzLnN0YXRzWzBdLmZpZWxkIHx8IFwiU2FtcGxlXCI7XG4gICAgICAgIHZhbHVlID0gXCIwXCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBvcGVyYXRvciA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0ub3BlcmF0b3I7XG4gICAgICAgIHN0YXRfdHlwZSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0uc3RhdF90eXBlO1xuICAgICAgICBmaWVsZCA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0uZmllbGQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW3RoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggLSAxXS52YWx1ZTtcbiAgICB9XG4gICAgbGV0IG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIgPSBuZXcgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMoe1xuICAgICAgICBmaWVsZCxcbiAgICAgICAgb3BlcmF0b3IsXG4gICAgICAgIHN0YXRfdHlwZSxcbiAgICAgICAgdmFsdWVcbiAgICB9KTtcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnB1c2gobmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlcik7XG59O1xuXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uIChpbmRleDogTnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XG4gICAgfVxufTtcblxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXG4gICAgICAgICAgICBOdW1iZXIoaW5kZXgpIC0gMVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcbiAgICAgICAgICAgIE51bWJlcihpbmRleCkgKyAxXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcbiAgICB9XG59O1xuXG5sZXQgcmVwbGFjZVN0YXRzRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBzdGF0cywgZGF0YSk6IHN0cmluZyB7XG4gICAgbGV0IG91dHB1dCA9IHRlbXBsYXRlO1xuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBbXCJjb3VudFwiLCBcInJhbmRvbVwiLCBcInVuaXF1ZWNvdW50XCIsIFwibWVhblwiLCBcInN1bVwiLCBcIm1pblwiLCBcIm1heFwiLFwiZGVmYXVsdFwiXS5mb3JFYWNoKHN0YXRUeXBlID0+IHtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoYCN7JHtzdGF0VHlwZX19YCwgXCJnaVwiKSwgXCJObyBtYXRjaGluZyBkYXRhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXy5lYWNoKHN0YXRzLCAoc3RhdCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHMgPSB7XG4gICAgICAgICAgICBjb3VudDogTmFOLFxuICAgICAgICAgICAgbWF4OiBOYU4sXG4gICAgICAgICAgICBtZWFuOiBOYU4sXG4gICAgICAgICAgICBtaW46IE5hTixcbiAgICAgICAgICAgIHJhbmRvbTogXCJcIixcbiAgICAgICAgICAgIHN1bTogTmFOLFxuICAgICAgICAgICAgdW5pcXVlY291bnQ6IE5hTixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcbiAgICAgICAgICAgIF8uZWFjaChkYXRhLCBncm91cCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBzdGF0LmZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXlzdGF0c09iamVjdCA9IGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzKG15c3RhdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnR9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuY291bnQpO1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnR9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QudW5pcXVlY291bnQpO1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtfVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttZWFufVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1lYW4pO1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWlufVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1pbik7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXh9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3JhbmRtb259XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QucmFuZG9tKTtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3RpdGxlfVwiLCBcImdpXCIpLCBzdGF0LnRpdGxlIHx8IGAke3N0YXQuc3RhdF90eXBlfSBvZiAke3N0YXQuZmllbGR9YCk7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tkZWZhdWx0fVwiLCBcImdpXCIpLCBnZXRGb3JtYXR0ZWRPdXRwdXQobXlzdGF0c09iamVjdFtzdGF0LnN0YXRfdHlwZV0sIHN0YXQudW5pdCwgc3RhdC5kZWNpbWFscykpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje1wiICsgc3RhdC5zdGF0X3R5cGUgKyBcIixcIiArIHN0YXQuZmllbGQgKyBcIn1cIiwgXCJnaVwiKSwgZ2V0Rm9ybWF0dGVkT3V0cHV0KG15c3RhdHNPYmplY3Rbc3RhdC5zdGF0X3R5cGVdLCBzdGF0LnVuaXQsIHN0YXQuZGVjaW1hbHMpKTtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7XCIgKyBzdGF0LnN0YXRfdHlwZSArIFwiLFwiICsgc3RhdC5maWVsZCArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdFtzdGF0LmRlZmF1bHRTdGF0XSk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje1wiICsgc3RhdC5zdGF0X3R5cGUgKyBcIixcIiArIHN0YXQuZmllbGQgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgc3RhdC50aXRsZSk7XG4gICAgfSk7XG4gICAgbGV0IGNvbG5hbWVzOiBhbnlbXSA9IFtdO1xuICAgIF8uZWFjaChkYXRhLCBncm91cCA9PiB7XG4gICAgICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XG4gICAgICAgICAgICBjb2xuYW1lcy5wdXNoKGl0ZW0uY29sbmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbG5hbWVzID0gXy51bmlxKGNvbG5hbWVzKTtcbiAgICBfLmVhY2goY29sbmFtZXMsIChjb2xuYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgbXlzdGF0c09iamVjdDogSUJvb21TdGF0cyA9IHtcbiAgICAgICAgICAgIGNvdW50OiBOYU4sXG4gICAgICAgICAgICBtYXg6IE5hTixcbiAgICAgICAgICAgIG1lYW46IE5hTixcbiAgICAgICAgICAgIG1pbjogTmFOLFxuICAgICAgICAgICAgcmFuZG9tOiBcIlwiLFxuICAgICAgICAgICAgc3VtOiBOYU4sXG4gICAgICAgICAgICB1bmlxdWVjb3VudDogTmFOLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xuICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGNvbG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBteXN0YXRzT2JqZWN0ID0gZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMobXlzdGF0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t0aXRsZX1cIiwgXCJnaVwiKSwgYCR7Y29sbmFtZX1gKTtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2RlZmF1bHR9XCIsIFwiZ2lcIiksIGdldEZvcm1hdHRlZE91dHB1dChteXN0YXRzT2JqZWN0LnJhbmRvbSwgXCJub25lXCIsIFwiMFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnQsXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuY291bnQpO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t1bmlxdWVjb3VudCxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC51bmlxdWVjb3VudCk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3N1bSxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5zdW0pO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttZWFuLFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1lYW4pO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWluKTtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWF4LFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1heCk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3JhbmRvbSxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5yYW5kb20pO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuY291bnQpO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t1bmlxdWVjb3VudCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QudW5pcXVlY291bnQpO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW0sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW4sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1lYW4pO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1pbik7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7cmFuZG9tLFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5yYW5kb20pO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudCxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYENvdW50IG9mICR7Y29sbmFtZX1gKTtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnQsXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBVbmlxdWUgQ291bnQgb2YgJHtjb2xuYW1lfWApO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW0sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBTdW0gb2YgJHtjb2xuYW1lfWApO1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttZWFuLFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgTWVhbiBvZiAke2NvbG5hbWV9YCk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21pbixcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYG1pbiBvZiAke2NvbG5hbWV9YCk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heCxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYE1heCBvZiAke2NvbG5hbWV9YCk7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3JhbmRvbSxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYFJhbmRvbSAke2NvbG5hbWV9YCk7XG4gICAgfSk7XG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnR9XCIsIFwiZ2lcIiksIGRhdGEubGVuZ3RoKTtcbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxubGV0IHJlcGxhY2VGQVRva2VucyA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJlcGxhY2VUb2tlbnModGVtcGxhdGUpO1xufTtcblxubGV0IGdldE1hdGNoaW5nQ29uZGl0aW9uID0gZnVuY3Rpb24gKGRhdGEsIGNvbmRpdGlvbmFsX2Zvcm1hdHMpIHtcbiAgICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9ucyA9IGNvbmRpdGlvbmFsX2Zvcm1hdHMuZmlsdGVyKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIGxldCBteXN0YXRzT2JqZWN0OiBJQm9vbVN0YXRzID0ge1xuICAgICAgICAgICAgY291bnQ6IE5hTixcbiAgICAgICAgICAgIG1heDogTmFOLFxuICAgICAgICAgICAgbWVhbjogTmFOLFxuICAgICAgICAgICAgbWluOiBOYU4sXG4gICAgICAgICAgICByYW5kb206IFwiXCIsXG4gICAgICAgICAgICBzdW06IE5hTixcbiAgICAgICAgICAgIHVuaXF1ZWNvdW50OiBOYU4sXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbXlzdGF0czogYW55ID0gW107XG4gICAgICAgICAgICBfLmVhY2goZGF0YSwgZ3JvdXAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gY29uZGl0aW9uLmZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXlzdGF0c09iamVjdCA9IGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzKG15c3RhdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc01hdGNoKG15c3RhdHNPYmplY3RbY29uZGl0aW9uLnN0YXRfdHlwZV0sIGNvbmRpdGlvbi5vcGVyYXRvciwgY29uZGl0aW9uLnZhbHVlLCBjb25kaXRpb24udmFsdWUyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hpbmdfY29uZGl0aW9ucyAmJiBtYXRjaGluZ19jb25kaXRpb25zLmxlbmd0aCA+IDAgPyBfLmZpcnN0KG1hdGNoaW5nX2NvbmRpdGlvbnMpIDogbnVsbDtcbn07XG5cbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLmdldG91dHB1dCA9IGZ1bmN0aW9uIChtYXN0ZXJkYXRhKTogc3RyaW5nIHtcbiAgICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Jz5ObyBEYXRhPC9kaXY+XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhKG1hc3RlcmRhdGEsIHRoaXMuZmlsdGVycyk7XG4gICAgICAgIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBnZXRNYXRjaGluZ0NvbmRpdGlvbihmaWx0ZXJlZERhdGEsIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyk7XG4gICAgICAgIGxldCBiZ0NvbG9yID0gbWF0Y2hpbmdfY29uZGl0aW9uICYmIG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yID8gbWF0Y2hpbmdfY29uZGl0aW9uLmJnQ29sb3IgOiB0aGlzLmJnQ29sb3I7XG4gICAgICAgIGxldCB0ZXh0Q29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvciA/IG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgOiB0aGlzLnRleHRDb2xvcjtcbiAgICAgICAgbGV0IGN1c3RvbV9jc3NfY2xhc3MgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLmN1c3RvbV9jc3NfY2xhc3MgPyBtYXRjaGluZ19jb25kaXRpb24uY3VzdG9tX2Nzc19jbGFzcyA6IFwibm90X2FwcGxpY2FibGVcIjtcbiAgICAgICAgaWYgKGN1c3RvbV9jc3NfY2xhc3MgIT09IFwibm90X2FwcGxpY2FibGVcIikge1xuICAgICAgICAgICAgYmdDb2xvciA9IFwibm90X2FwcGxpY2FibGVcIjtcbiAgICAgICAgICAgIHRleHRDb2xvciA9IFwibm90X2FwcGxpY2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3V0VGVtcGxhdGUgPSBmaWx0ZXJlZERhdGEubGVuZ3RoICsgXCIgcmVjb3JkcyBmb3VuZFwiO1xuICAgICAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwidGl0bGVvbmx5XCI6XG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+I3tkZWZhdWx0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IGBgO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnN0YXRzLCBzdGF0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgKz0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj4jeyR7c3RhdC5zdGF0X3R5cGV9LCR7c3RhdC5maWVsZH0sdGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo1MCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7XCI+I3ske3N0YXQuc3RhdF90eXBlfSwke3N0YXQuZmllbGR9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImp1bWJvXCI6XG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5cXCN7dGl0bGV9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+XFwje2RlZmF1bHR9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwianVtYm9fd2l0aG91dF90aXRsZVwiOlxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+XFwje2RlZmF1bHR9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gdGhpcy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMudGVtcGxhdGVUeXBlID09PSBcImF1dG9cIiB8fCB0aGlzLnRlbXBsYXRlVHlwZSA9PT0gXCJqdW1ib1wiIHx8IHRoaXMudGVtcGxhdGVUeXBlID09PSBcImp1bWJvX3dpdGhvdXRfdGl0bGVcIiB8fCB0aGlzLnRlbXBsYXRlVHlwZSA9PT0gXCJ0aXRsZW9ubHlcIikgJiYgdGhpcy5zdGF0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOnJlZDtcIj5Pb3BzLiBZb3UgZG9uJ3QgaGF2ZSBhbnkgc3RhdHMgZGVmaW5lZCBmb3IgdGhpcyBzdW1tYXJ5IGdyb3VwPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3V0cHV0X3dpdGhfc3RhdHNSZXBsYWNlZCA9IHJlcGxhY2VTdGF0c0Zyb21UZW1wbGF0ZShvdXRUZW1wbGF0ZSwgdGhpcy5zdGF0cywgZmlsdGVyZWREYXRhKTtcbiAgICAgICAgbGV0IG91dHB1dF93aXRoX3Rva2Vuc3JlcGxhY2VkID0gcmVwbGFjZUZBVG9rZW5zKG91dHB1dF93aXRoX3N0YXRzUmVwbGFjZWQpO1xuICAgICAgICBpZiAob3V0cHV0X3dpdGhfdG9rZW5zcmVwbGFjZWQudHJpbSgpLmluZGV4T2YoXCI8XCIpICE9PSAwKSB7XG4gICAgICAgICAgICBvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZCA9IGAke291dHB1dF93aXRoX3Rva2Vuc3JlcGxhY2VkLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcblwiLCBcImdpXCIpLCBcIjxici8+XCIpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHt0aGlzLnN0YXRXaWR0aCB8fCBcIjEwMFwifSU7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kOiR7YmdDb2xvcn07Y29sb3I6JHt0ZXh0Q29sb3J9O1wiIGNsYXNzPVwiJHtjdXN0b21fY3NzX2NsYXNzfVwiPlxuICAgICAgICAgICAgICAgICAgICAke291dHB1dF93aXRoX3Rva2Vuc3JlcGxhY2VkfVxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgfVxufTtcbiJdfQ==