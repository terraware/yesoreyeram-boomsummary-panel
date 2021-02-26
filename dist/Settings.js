System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            plugin_id = "yesoreyeram-boomsummary-panel";
            exports_1("config", config = {
                compareOperators: [
                    { text: "equals", value: "equals" },
                    { text: "notequals", value: "notequals" },
                    { text: "contains", value: "contains" },
                    { text: "notcontains", value: "notcontains" },
                    { text: "startswith", value: "startswith" },
                    { text: "endswith", value: "endswith" },
                    { text: "in", value: "in" },
                    { text: "equals (ignore case)", value: "equals ignorecase" },
                    { text: "notequals (ignore case)", value: "notequals ignorecase" },
                    { text: "contains (ignore case)", value: "contains ignorecase" },
                    { text: "notcontains (ignore case)", value: "notcontains ignorecase" },
                    { text: "startswith (ignore case)", value: "startswith ignorecase" },
                    { text: "endswith (ignore case)", value: "endswith ignorecase" },
                    { text: "in (ignore case)", value: "in ignorecase" },
                    { text: "==", value: "==" },
                    { text: "!=", value: "!=" },
                    { text: "<", value: "<" },
                    { text: "<=", value: "<=" },
                    { text: ">", value: ">" },
                    { text: ">=", value: ">=" },
                    { text: "insiderange", value: "insiderange" },
                    { text: "outsiderange", value: "outsiderange" }
                ],
                cssThemes: {
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
                },
                ctrl_width: [
                    { text: "100%", value: "12" },
                    { text: "50%", value: "6" },
                    { text: "33%", value: "4" },
                    { text: "25%", value: "3" }
                ],
                decimalValues: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" }
                ],
                default_templateURL: "partials/module.html",
                editorTabs: [
                    {
                        position: 2,
                        templatePath: "public/plugins/" + plugin_id + "/partials/stats.html",
                        title: "Stats"
                    },
                    {
                        position: 3,
                        templatePath: "public/plugins/" + plugin_id + "/partials/options.html",
                        title: "Panel Options"
                    }
                ],
                format_as: ["String", "Number", "Date"],
                grafana_events: {
                    dataReceived: "data-received",
                    initEditMode: "init-edit-mode"
                },
                plugin_id: plugin_id,
                statTypes: [
                    { text: "Random", value: "random" },
                    { text: "Min", value: "min" },
                    { text: "Max", value: "max" },
                    { text: "Mean", value: "mean" },
                    { text: "Sum", value: "sum" },
                    { text: "Count", value: "count" },
                    { text: "Unique Count", value: "uniquecount" }
                ],
                templateTypes: [
                    { text: "Auto Template", value: "auto" },
                    { text: "Jumbo Stat", value: "jumbo" },
                    { text: "Jumbo Stat w/o title", value: "jumbo_without_title" },
                    { text: "Value only", value: "titleonly" },
                    { text: "Custom", value: "custom" },
                ]
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFJLFNBQVMsR0FBRywrQkFBK0IsQ0FBQztZQUVoRCxvQkFBVyxNQUFNLEdBQUc7Z0JBQ2hCLGdCQUFnQixFQUFFO29CQUNkLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNuQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDekMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO29CQUM3QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7b0JBQzVELEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRTtvQkFDbEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7b0JBQ3RFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtvQkFDcEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFB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T0FBTyxFQUFFO29CQUNqQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtpQkFDakQ7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUN4QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDdEMsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUM5RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7aUJBQ3RDO2FBQ0osRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb21zdW1tYXJ5LXBhbmVsXCI7XG5cbmV4cG9ydCBsZXQgY29uZmlnID0ge1xuICAgIGNvbXBhcmVPcGVyYXRvcnM6IFtcbiAgICAgICAgeyB0ZXh0OiBcImVxdWFsc1wiLCB2YWx1ZTogXCJlcXVhbHNcIiB9LFxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzXCIsIHZhbHVlOiBcIm5vdGVxdWFsc1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJjb250YWluc1wiLCB2YWx1ZTogXCJjb250YWluc1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJub3Rjb250YWluc1wiLCB2YWx1ZTogXCJub3Rjb250YWluc1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGhcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiZW5kc3dpdGhcIiwgdmFsdWU6IFwiZW5kc3dpdGhcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiaW5cIiwgdmFsdWU6IFwiaW5cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90ZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiY29udGFpbnMgKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJjb250YWlucyBpZ25vcmVjYXNlXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90Y29udGFpbnMgaWdub3JlY2FzZVwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwic3RhcnRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcImVuZHN3aXRoIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZW5kc3dpdGggaWdub3JlY2FzZVwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJpbiAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImluIGlnbm9yZWNhc2VcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiPT1cIiwgdmFsdWU6IFwiPT1cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiIT1cIiwgdmFsdWU6IFwiIT1cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiPFwiLCB2YWx1ZTogXCI8XCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIjw9XCIsIHZhbHVlOiBcIjw9XCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIj5cIiwgdmFsdWU6IFwiPlwiIH0sXG4gICAgICAgIHsgdGV4dDogXCI+PVwiLCB2YWx1ZTogXCI+PVwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJpbnNpZGVyYW5nZVwiLCB2YWx1ZTogXCJpbnNpZGVyYW5nZVwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJvdXRzaWRlcmFuZ2VcIiwgdmFsdWU6IFwib3V0c2lkZXJhbmdlXCIgfVxuICAgIF0sXG4gICAgY3NzVGhlbWVzOiB7XG4gICAgICAgIGRhcms6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXG4gICAgICAgIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxuICAgIH0sXG4gICAgY3RybF93aWR0aDogW1xuICAgICAgICB7IHRleHQ6IFwiMTAwJVwiLCB2YWx1ZTogXCIxMlwiIH0sXG4gICAgICAgIHsgdGV4dDogXCI1MCVcIiwgdmFsdWU6IFwiNlwiIH0sXG4gICAgICAgIHsgdGV4dDogXCIzMyVcIiwgdmFsdWU6IFwiNFwiIH0sXG4gICAgICAgIHsgdGV4dDogXCIyNSVcIiwgdmFsdWU6IFwiM1wiIH1cbiAgICBdLFxuICAgIGRlY2ltYWxWYWx1ZXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sXG4gICAgICAgIHsgdGV4dDogXCIxXCIsIHZhbHVlOiBcIjFcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiMlwiLCB2YWx1ZTogXCIyXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIjNcIiwgdmFsdWU6IFwiM1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCI0XCIsIHZhbHVlOiBcIjRcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiNVwiLCB2YWx1ZTogXCI1XCIgfVxuICAgIF0sXG4gICAgZGVmYXVsdF90ZW1wbGF0ZVVSTDogXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiLFxuICAgIGVkaXRvclRhYnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcG9zaXRpb246IDIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvc3RhdHMuaHRtbGAsXG4gICAgICAgICAgICB0aXRsZTogXCJTdGF0c1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAzLFxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsXG4gICAgICAgICAgICB0aXRsZTogXCJQYW5lbCBPcHRpb25zXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgZm9ybWF0X2FzOiBbXCJTdHJpbmdcIiwgXCJOdW1iZXJcIiwgXCJEYXRlXCJdLFxuICAgIGdyYWZhbmFfZXZlbnRzOiB7XG4gICAgICAgIGRhdGFSZWNlaXZlZDogXCJkYXRhLXJlY2VpdmVkXCIsXG4gICAgICAgIGluaXRFZGl0TW9kZTogXCJpbml0LWVkaXQtbW9kZVwiXG4gICAgfSxcbiAgICBwbHVnaW5faWQ6IHBsdWdpbl9pZCxcbiAgICBzdGF0VHlwZXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIlJhbmRvbVwiLCB2YWx1ZTogXCJyYW5kb21cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiTWluXCIsIHZhbHVlOiBcIm1pblwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJNYXhcIiwgdmFsdWU6IFwibWF4XCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIk1lYW5cIiwgdmFsdWU6IFwibWVhblwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJTdW1cIiwgdmFsdWU6IFwic3VtXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIkNvdW50XCIsIHZhbHVlOiBcImNvdW50XCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlVuaXF1ZSBDb3VudFwiLCB2YWx1ZTogXCJ1bmlxdWVjb3VudFwiIH1cbiAgICBdLFxuICAgIHRlbXBsYXRlVHlwZXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIkF1dG8gVGVtcGxhdGVcIiwgdmFsdWU6IFwiYXV0b1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJKdW1ibyBTdGF0XCIsIHZhbHVlOiBcImp1bWJvXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIkp1bWJvIFN0YXQgdy9vIHRpdGxlXCIsIHZhbHVlOiBcImp1bWJvX3dpdGhvdXRfdGl0bGVcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiVmFsdWUgb25seVwiLCB2YWx1ZTogXCJ0aXRsZW9ubHlcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiQ3VzdG9tXCIsIHZhbHVlOiBcImN1c3RvbVwiIH0sXG4gICAgXVxufTtcbiJdfQ==