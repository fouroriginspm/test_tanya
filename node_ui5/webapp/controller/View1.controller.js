sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("nodeui5.controller.View1", {
            onInit: function () {
                this._fnGetEmployeeData();
            },

            _fnGetEmployeeData: function () {
                debugger;
                var absolutePath = "http://localhost:8081"
                var relativePath = "/Fetch"
                var sUrl = absolutePath + relativePath;
                $.ajax({
                    url: sUrl,
                    type: 'GET',
                    crossDomain: true,
                    success: function (oData) {
                        debugger;
                        var oEmployeeModel = this.getView().getModel("EmployeeModel");
                        oEmployeeModel.setProperty("/empItems", oData);
                        this.getView().setModel(oEmployeeModel);

                    }.bind(this),
                    error: function (err) {
                        debugger;
                    }
                });
            },

            onSubmit: function () {
                debugger;
                var emp_id = this.byId("emp_id").getValue();
                var Name = this.byId("Name").getValue();
                var Salary = this.byId("Salary").getValue();

                var Items = {
                    "e_Id" : emp_id,
                    "e_Name" :Name,
                    "e_Salary" : Salary
                };

                var absolutePath = "http://localhost:8081"
                var relativePath = "/Insert"
                var sUrl = absolutePath + relativePath;

                $.ajax({
                    type: "POST",
                    url: sUrl,
                    dataType: "json",
                    contentType: 'application/json',
                    crossDomain: true,
                    data: JSON.stringify(Items),
                    success: function (result) {
                        debugger;
            
                    },
                    error: function (error) {
                        debugger;
                    }
                });
            },

            onDelete: function(oEvent) {
                debugger;
                var selectedItem = oEvent.getSource().getBindingContext("EmployeeModel").getObject();
                var ID = selectedItem.e_Id;
                var absolutePath = "http://localhost:8081"
                var relativePath = "/Delete";
                var sUrl = absolutePath + relativePath;
                $.ajax({
                    url: sUrl,
                    type: 'DELETE',
                    crossDomain: true,
                    data: { e_Id:ID },
                 
                    success: function (oData) {
                        debugger;

                    }.bind(this),
                    error: function (err) {
                        debugger;
                    }
                });
            },

            onEdit: function(oEvent){
                debugger;
                // var xyz = oEvent.getSource().getBindingContext("EmployeeModel").getObject();
                var abc = oEvent.getSource().getBindingContext("EmployeeModel").getPath();
                var oModel = this.getOwnerComponent().getModel("EmployeeModel");
                this.SelectedObject = oModel.getObject(abc);
                var selectedRow = this.SelectedObject;
			    oModel.setProperty("/displayForm",selectedRow);
                
                // var absolutePath = "http://localhost:8081"
                // var relativePath = "/Update";
                // var sUrl = absolutePath + relativePath;
                // $.ajax({
                //     url: sUrl,
                //     type: 'POST',
                //     crossDomain: true,

                //     success: function (oData) {
                //         debugger;

                //     }.bind(this),
                //     error: function (err) {
                //         debugger;
                //     }
                // });
            }
        });
    });
