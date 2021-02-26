System.register(["lodash", "./BoomUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomUtils_1, didSatisfyFilters, getFilteredDataFromMasterData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
            }
        ],
        execute: function () {
            exports_1("didSatisfyFilters", didSatisfyFilters = function (group, filters) {
                if (filters && filters.length > 0) {
                    var matches_1 = 0;
                    lodash_1.default.each(filters, function (filter) {
                        var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === filter.field; });
                        if (matching_field && matching_field.length > 0) {
                            matches_1 +=
                                BoomUtils_1.isMatch(matching_field[0].value, filter.operator, filter.value, filter.value2) === true
                                    ? 1
                                    : 0;
                        }
                    });
                    return matches_1 === filters.length;
                }
                else {
                    return true;
                }
            });
            exports_1("getFilteredDataFromMasterData", getFilteredDataFromMasterData = function (masterdata, filters) {
                var colnames = [];
                lodash_1.default.each(masterdata, function (group) {
                    lodash_1.default.each(group, function (item) {
                        colnames.push(item.colname);
                    });
                });
                colnames = lodash_1.default.uniq(colnames);
                var validFilters = filters.filter(function (filter) { return colnames.indexOf(filter.field) > -1; });
                return masterdata.filter(function (group) { return didSatisfyFilters(group, validFilters); });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFHQSwrQkFBVyxpQkFBaUIsR0FBRyxVQUFVLEtBQUssRUFBRSxPQUFPO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDakMsSUFBSSxTQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixnQkFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQSxNQUFNO3dCQUNwQixJQUFJLGNBQWMsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQTFCLENBQTBCLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQy9DLFNBQU87Z0NBQ0wsbUJBQU8sQ0FDTCxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUN2QixNQUFNLENBQUMsUUFBUSxFQUNmLE1BQU0sQ0FBQyxLQUFLLEVBQ1osTUFBTSxDQUFDLE1BQU0sQ0FDZCxLQUFLLElBQUk7b0NBQ1IsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDVDtvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLFNBQU8sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjtZQUNILENBQUMsRUFBQztZQUVGLDJDQUFXLDZCQUE2QixHQUFHLFVBQVUsVUFBVSxFQUFFLE9BQU87Z0JBQ3RFLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQUEsS0FBSztvQkFDdEIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUEsSUFBSTt3QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILFFBQVEsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7Z0JBQ2pGLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLGlCQUFpQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQzVFLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IGlzTWF0Y2ggfSBmcm9tIFwiLi9Cb29tVXRpbHNcIjtcblxuZXhwb3J0IGxldCBkaWRTYXRpc2Z5RmlsdGVycyA9IGZ1bmN0aW9uIChncm91cCwgZmlsdGVycykge1xuICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbWF0Y2hlcyA9IDA7XG4gICAgXy5lYWNoKGZpbHRlcnMsIGZpbHRlciA9PiB7XG4gICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGZpbHRlci5maWVsZCk7XG4gICAgICBpZiAobWF0Y2hpbmdfZmllbGQgJiYgbWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xuICAgICAgICBtYXRjaGVzICs9XG4gICAgICAgICAgaXNNYXRjaChcbiAgICAgICAgICAgIG1hdGNoaW5nX2ZpZWxkWzBdLnZhbHVlLFxuICAgICAgICAgICAgZmlsdGVyLm9wZXJhdG9yLFxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlLFxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlMlxuICAgICAgICAgICkgPT09IHRydWVcbiAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgOiAwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaGVzID09PSBmaWx0ZXJzLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBnZXRGaWx0ZXJlZERhdGFGcm9tTWFzdGVyRGF0YSA9IGZ1bmN0aW9uIChtYXN0ZXJkYXRhLCBmaWx0ZXJzKSB7XG4gIGxldCBjb2xuYW1lczogYW55ID0gW107XG4gIF8uZWFjaChtYXN0ZXJkYXRhLCBncm91cCA9PiB7XG4gICAgXy5lYWNoKGdyb3VwLCBpdGVtID0+IHtcbiAgICAgIGNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcbiAgICB9KTtcbiAgfSk7XG4gIGNvbG5hbWVzID0gXy51bmlxKGNvbG5hbWVzKTtcbiAgbGV0IHZhbGlkRmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBjb2xuYW1lcy5pbmRleE9mKGZpbHRlci5maWVsZCkgPiAtMSk7XG4gIHJldHVybiBtYXN0ZXJkYXRhLmZpbHRlcihncm91cCA9PiBkaWRTYXRpc2Z5RmlsdGVycyhncm91cCwgdmFsaWRGaWx0ZXJzKSk7XG59O1xuIl19