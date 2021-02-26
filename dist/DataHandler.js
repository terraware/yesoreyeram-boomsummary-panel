System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, buildMasterData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRGF0YUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFHQSw2QkFBVyxlQUFlLEdBQUcsVUFBUyxJQUFJO2dCQUN4QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO2dCQUNyQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNaLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQ3RCLElBQUksT0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3BCLGdCQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDcEIsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQzs0QkFDOUIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ2pCLElBQUksTUFBTSxHQUFnQjtvQ0FDeEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQ0FDMUIsS0FBSyxTQUFBO29DQUNMLEtBQUssRUFBRSxDQUFDLENBQUM7b0NBQ1QsS0FBSyxFQUFFLEdBQUc7aUNBQ1gsQ0FBQztnQ0FDRixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQzs0QkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7cUJBQ2xFO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sVUFBVSxDQUFDO1lBQ3BCLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IElNYXN0ZXJEYXRhIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGxldCBidWlsZE1hc3RlckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGxldCBtYXN0ZXJkYXRhOiBJTWFzdGVyRGF0YVtdW10gPSBbXTtcbiAgXy5lYWNoKGRhdGEsIGQgPT4ge1xuICAgIGlmIChkLnR5cGUgPT09IFwidGFibGVcIikge1xuICAgICAgbGV0IHJlZklkID0gZC5yZWZJZDtcbiAgICAgIF8uZWFjaChkLnJvd3MsIChyb3csIGkpID0+IHtcbiAgICAgICAgbGV0IGdyb3VwOiBJTWFzdGVyRGF0YVtdID0gW107XG4gICAgICAgIF8uZWFjaChyb3csIChjb2wsIGopID0+IHtcbiAgICAgICAgICBsZXQgbXlkYXRhOiBJTWFzdGVyRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbG5hbWU6IGQuY29sdW1uc1tqXS50ZXh0LFxuICAgICAgICAgICAgcmVmSWQsXG4gICAgICAgICAgICByb3dpZDogK2ksXG4gICAgICAgICAgICB2YWx1ZTogY29sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBncm91cC5wdXNoKG15ZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBtYXN0ZXJkYXRhLnB1c2goZ3JvdXApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogT25seSB0YWJsZSBmb3JtYXQgaXMgY3VycmVudGx5IHN1cHBvcnRlZFwiKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbWFzdGVyZGF0YTtcbn07XG4iXX0=