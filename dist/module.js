System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./BoomSummaryGroup", "./DataHandler", "./Settings"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomSummaryGroup_1, DataHandler_1, Settings_1, BoomSummaryCtl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (BoomSummaryGroup_1_1) {
                BoomSummaryGroup_1 = BoomSummaryGroup_1_1;
            },
            function (DataHandler_1_1) {
                DataHandler_1 = DataHandler_1_1;
            },
            function (Settings_1_1) {
                Settings_1 = Settings_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss(Settings_1.config.cssThemes);
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = Settings_1.config.statTypes;
                    _this.compareOperators = Settings_1.config.compareOperators;
                    _this.decimalValues = Settings_1.config.decimalValues;
                    _this.format_as = Settings_1.config.format_as;
                    _this.templateTypes = Settings_1.config.templateTypes;
                    _this.ctrl_width = Settings_1.config.ctrl_width;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(Settings_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(Settings_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats_groups.map(function (stats_group) {
                        Object.setPrototypeOf(stats_group, BoomSummaryGroup_1.BoomSummaryGroup.prototype);
                        stats_group.stats.map(function (stat) {
                            Object.setPrototypeOf(stat, BoomSummaryGroup_1.BoomStat.prototype);
                        });
                        return stats_group;
                    });
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(Settings_1.config.editorTabs, function (editorTab) {
                        _this.addEditorTab(editorTab.title, editorTab.templatePath, editorTab.position);
                    });
                };
                BoomSummaryCtl.prototype.onDataReceived = function (data) {
                    var _this = this;
                    this.masterdata = DataHandler_1.buildMasterData(data);
                    this.colnames = [];
                    lodash_1.default.each(this.masterdata, function (group) {
                        lodash_1.default.each(group, function (item) {
                            _this.colnames.push(item.colname);
                        });
                    });
                    this.colnames = lodash_1.default.uniq(this.colnames);
                    this.render();
                };
                BoomSummaryCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                BoomSummaryCtl.prototype.addSummaryGroup = function (statgroupType) {
                    this.panel.stats_groups = this.panel.stats_groups || [];
                    var templateType = "auto";
                    if (statgroupType && statgroupType.toUpperCase() === "JUMBO") {
                        templateType = "jumbo";
                    }
                    else if (statgroupType && statgroupType.toUpperCase() === "JUMBO_WITHOUT_TITLE") {
                        templateType = "jumbo_without_title";
                    }
                    var stats = [];
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats_groups.length && this.masterdata[0][this.panel.stats_groups.length].colname) {
                            stats.push(new BoomSummaryGroup_1.BoomStat({
                                field: this.masterdata[0][this.panel.stats_groups.length].colname,
                                stat_type: "count",
                                title: "Total rows"
                            }));
                        }
                    }
                    this.panel.stats_groups.push(new BoomSummaryGroup_1.BoomSummaryGroup({
                        bgColor: "green",
                        stats: stats,
                        templateType: templateType || "auto",
                        textColor: "white",
                        title: "Summary " + (this.panel.stats_groups.length + 1)
                    }));
                    this.activeStatIndex = this.panel.stats_groups.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeSummaryGroup = function (index) {
                    this.panel.stats_groups.splice(index, 1);
                    this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveSummaryGroup = function (direction, index) {
                    var tempElement = this.panel.stats_groups[Number(index)];
                    if (direction === "UP") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) - 1];
                        this.panel.stats_groups[Number(index) - 1] = tempElement;
                        this.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) + 1];
                        this.panel.stats_groups[Number(index) + 1] = tempElement;
                        this.activeStatIndex = Number(index) + 1;
                    }
                    this.render();
                };
                BoomSummaryCtl.prototype.removeAllSummaryGroups = function () {
                    this.panel.stats_groups = [];
                    this.render();
                };
                BoomSummaryCtl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                BoomSummaryCtl.templateUrl = Settings_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "";
                output += "<style>" + (this.ctrl.panel.custom_css || "") + "</style>";
                output += "<div class=\"container-fluid\"><div class=\"row\">";
                if (this.ctrl.panel.enable_repeater) {
                    if (this.ctrl.panel.stats_groups && this.ctrl.panel.stats_groups.length > 0) {
                        var cols = lodash_1.default.uniq(lodash_1.default.flatMap(this.masterdata).filter(function (t) { return t.colname === _this.ctrl.panel.repeater_column; }).map(function (t) { return t.value; }));
                        lodash_1.default.each(cols, function (col) {
                            output += "<div class=\"col-md-" + lodash_1.default.min([+(_this.ctrl.panel.repeater_width), 12]) + "\" style=\"margin-bottom:" + (_this.ctrl.panel.repeater_margin_bottom || "20") + "px;\">";
                            var mycoldata = _this.masterdata.filter(function (t) { return t.filter(function (t1) { return t1.value === col && t1.colname === _this.ctrl.panel.repeater_column; }).length === 1; });
                            lodash_1.default.each(_this.ctrl.panel.stats_groups, function (stats_group) {
                                output += stats_group.getoutput(mycoldata);
                            });
                            output += "</div>";
                        });
                    }
                }
                else {
                    output += "<div class=\"col-md-12\">";
                    lodash_1.default.each(this.ctrl.panel.stats_groups, function (stats_group) {
                        output += stats_group.getoutput(_this.masterdata);
                    });
                    output += "</div>";
                }
                output += "</div></div>";
                this.elem.find("#boomsummary-panel").html(output);
                if (this.ctrl && this.ctrl.elem[0]) {
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.ctrl.elem[0].clientHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGlCQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUVILGtDQUFnQjtnQkFlekMsd0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQVkzQjtvQkF2Qk0scUJBQWUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLGdCQUFVLEdBQVEsRUFBRSxDQUFDO29CQUVyQixpQkFBVyxHQUFHLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkMsZUFBUyxHQUFHLGlCQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixzQkFBZ0IsR0FBRyxpQkFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGlCQUFNLENBQUMsYUFBYSxDQUFDO29CQUNyQyxlQUFTLEdBQUcsaUJBQU0sQ0FBQyxTQUFTLENBQUM7b0JBQzdCLG1CQUFhLEdBQUcsaUJBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGdCQUFVLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUM7b0JBR2xDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztvQkFDeEQsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNWLGlCQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQ2pDLENBQUM7b0JB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LElBQUksUUFBUSxDQUFDO3dCQUN2QixDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtxQkFBTTtvQkFDSCxNQUFNLElBQUksMkJBQXlCLENBQUM7b0JBQ3BDLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFBLFdBQVc7d0JBQzVDLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxJQUFJLFFBQVEsQ0FBQztpQkFDdEI7Z0JBQ0QsTUFBTSxJQUFJLGNBQWMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUMzRCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzNEO1lBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgTWV0cmljc1BhbmVsQ3RybCwgbG9hZFBsdWdpbkNzcyB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xuaW1wb3J0IHsgQm9vbVN1bW1hcnlHcm91cCwgQm9vbVN0YXQgfSBmcm9tIFwiLi9Cb29tU3VtbWFyeUdyb3VwXCI7XG5pbXBvcnQgeyBidWlsZE1hc3RlckRhdGEgfSBmcm9tIFwiLi9EYXRhSGFuZGxlclwiO1xuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL1NldHRpbmdzXCI7XG5cbmxvYWRQbHVnaW5Dc3MoY29uZmlnLmNzc1RoZW1lcyk7XG5cbmNsYXNzIEJvb21TdW1tYXJ5Q3RsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeUN0bCB7XG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IGNvbmZpZy5kZWZhdWx0X3RlbXBsYXRlVVJMO1xuICAgIHB1YmxpYyBjdHJsOiBhbnk7XG4gICAgcHVibGljIGVsZW06IGFueTtcbiAgICBwdWJsaWMgYXR0cnM6IGFueTtcbiAgICBwdWJsaWMgYWN0aXZlU3RhdEluZGV4ID0gMDtcbiAgICBwdWJsaWMgbWFzdGVyZGF0YTogYW55ID0gW107XG4gICAgcHVibGljIGNvbG5hbWVzO1xuICAgIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xuICAgIHB1YmxpYyBzdGF0VHlwZXMgPSBjb25maWcuc3RhdFR5cGVzO1xuICAgIHB1YmxpYyBjb21wYXJlT3BlcmF0b3JzID0gY29uZmlnLmNvbXBhcmVPcGVyYXRvcnM7XG4gICAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcbiAgICBwdWJsaWMgZm9ybWF0X2FzID0gY29uZmlnLmZvcm1hdF9hcztcbiAgICBwdWJsaWMgdGVtcGxhdGVUeXBlcyA9IGNvbmZpZy50ZW1wbGF0ZVR5cGVzO1xuICAgIHB1YmxpYyBjdHJsX3dpZHRoID0gY29uZmlnLmN0cmxfd2lkdGg7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyB8fCBbXTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFxuICAgICAgICAgICAgY29uZmlnLmdyYWZhbmFfZXZlbnRzLmluaXRFZGl0TW9kZSxcbiAgICAgICAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmV2ZW50cy5vbihcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5kYXRhUmVjZWl2ZWQsXG4gICAgICAgICAgICB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5tYXAoc3RhdHNfZ3JvdXAgPT4ge1xuICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXRzX2dyb3VwLCBCb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBzdGF0c19ncm91cC5zdGF0cy5tYXAoc3RhdCA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXQsIEJvb21TdGF0LnByb3RvdHlwZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdGF0c19ncm91cDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XG4gICAgICAgIF8uZWFjaChjb25maWcuZWRpdG9yVGFicywgZWRpdG9yVGFiID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50aXRsZSxcbiAgICAgICAgICAgICAgICBlZGl0b3JUYWIudGVtcGxhdGVQYXRoLFxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi5wb3NpdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFzdGVyZGF0YSA9IGJ1aWxkTWFzdGVyRGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IFtdO1xuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhLCBncm91cCA9PiB7XG4gICAgICAgICAgICBfLmVhY2goZ3JvdXAsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbmFtZXMucHVzaChpdGVtLmNvbG5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbG5hbWVzID0gXy51bmlxKHRoaXMuY29sbmFtZXMpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcbiAgICB9XG4gICAgcHVibGljIGFkZFN1bW1hcnlHcm91cChzdGF0Z3JvdXBUeXBlKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XG4gICAgICAgIGxldCB0ZW1wbGF0ZVR5cGUgPSBcImF1dG9cIjtcbiAgICAgICAgaWYgKHN0YXRncm91cFR5cGUgJiYgc3RhdGdyb3VwVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIkpVTUJPXCIpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9cIjtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0Z3JvdXBUeXBlICYmIHN0YXRncm91cFR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT19XSVRIT1VUX1RJVExFXCIpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9fd2l0aG91dF90aXRsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdGF0czogYW55W10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YSAmJiB0aGlzLm1hc3RlcmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YVswXS5sZW5ndGggPiB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggJiYgdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aF0uY29sbmFtZSkge1xuICAgICAgICAgICAgICAgIHN0YXRzLnB1c2gobmV3IEJvb21TdGF0KHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRfdHlwZTogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUb3RhbCByb3dzXCJcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMucHVzaChuZXcgQm9vbVN1bW1hcnlHcm91cCh7XG4gICAgICAgICAgICBiZ0NvbG9yOiBcImdyZWVuXCIsXG4gICAgICAgICAgICBzdGF0cyxcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZTogdGVtcGxhdGVUeXBlIHx8IFwiYXV0b1wiLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgICAgICB0aXRsZTogYFN1bW1hcnkgJHt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggKyAxfWBcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCAtIDE7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVTdW1tYXJ5R3JvdXAoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzICYmIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCA+IDAgPyB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggLSAxIDogLTE7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBtb3ZlU3VtbWFyeUdyb3VwKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXTtcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpICsgMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQWxsU3VtbWFyeUdyb3VwcygpIHtcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgTnVtYmVyKG1heGxlbmd0aCkgLSAzKSArIFwiLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufVxuXG5Cb29tU3VtbWFyeUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBvdXRwdXQgPSBgYDtcbiAgICBvdXRwdXQgKz0gYDxzdHlsZT4ke3RoaXMuY3RybC5wYW5lbC5jdXN0b21fY3NzIHx8IFwiXCJ9PC9zdHlsZT5gO1xuICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPjxkaXYgY2xhc3M9XCJyb3dcIj5gO1xuICAgIGlmICh0aGlzLmN0cmwucGFuZWwuZW5hYmxlX3JlcGVhdGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmN0cmwucGFuZWwuc3RhdHNfZ3JvdXBzICYmIHRoaXMuY3RybC5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNvbHMgPSBfLnVuaXEoXy5mbGF0TWFwKHRoaXMubWFzdGVyZGF0YSkuZmlsdGVyKHQgPT4gdC5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5tYXAodCA9PiB0LnZhbHVlKSk7XG4gICAgICAgICAgICBfLmVhY2goY29scywgY29sID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYDxkaXYgY2xhc3M9XCJjb2wtbWQtJHtfLm1pbihbKyh0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfd2lkdGgpLCAxMl0pfVwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToke3RoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl9tYXJnaW5fYm90dG9tIHx8IFwiMjBcIn1weDtcIj5gO1xuICAgICAgICAgICAgICAgIGxldCBteWNvbGRhdGEgPSB0aGlzLm1hc3RlcmRhdGEuZmlsdGVyKHQgPT4gdC5maWx0ZXIodDEgPT4gdDEudmFsdWUgPT09IGNvbCAmJiB0MS5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5sZW5ndGggPT09IDEpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmN0cmwucGFuZWwuc3RhdHNfZ3JvdXBzLCBzdGF0c19ncm91cCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBzdGF0c19ncm91cC5nZXRvdXRwdXQobXljb2xkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+YDtcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5zdGF0c19ncm91cHMsIHN0YXRzX2dyb3VwID0+IHtcbiAgICAgICAgICAgIG91dHB1dCArPSBzdGF0c19ncm91cC5nZXRvdXRwdXQodGhpcy5tYXN0ZXJkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dCArPSBgPC9kaXY+YDtcbiAgICB9XG4gICAgb3V0cHV0ICs9IGA8L2Rpdj48L2Rpdj5gO1xuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcbiAgICBpZiAodGhpcy5jdHJsICYmIHRoaXMuY3RybC5lbGVtWzBdKSB7XG4gICAgICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XG4gICAgICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0IC0gMzE7XG4gICAgICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBCb29tU3VtbWFyeUN0bCBhcyBQYW5lbEN0cmwgfTtcbiJdfQ==