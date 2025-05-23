"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////
//                 IMPORTANT - DO NOT MODIFY AUTO-GENERATED CODE OR COMMENTS                 //
//Parts of this file are auto-generated and modifications to those sections will be          //
//overwritten. You are allowed to modify:                                                    //
// - the tags in the jsDoc as described in the corresponding section                         //
// - the function name and its parameters                                                    //
// - the function body between the insertion ranges                                          //
//         "Add your customizing javaScript code below / above"                              //
//                                                                                           //
// NOTE:                                                                                     //
// - If you have created PRE and POST functions, they will be executed in the same order     //
//   as before.                                                                              //
// - If you have created a REPLACE to override core function, only the REPLACE function will //
//   be executed. PRE and POST functions will be executed in the same order as before.       //
//                                                                                           //
// - For new customizations, you can directly modify this file. There is no need to use the  //
//   PRE, POST, and REPLACE functions.                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Use the following jsDoc tags to describe the BL function. Setting these tags will
 * change the runtime behavior in the mobile app. The values specified in the tags determine
 * the name of the contract file. The filename format is “@this . @function .bl.js”.
 * For example, LoVisit.BeforeLoadAsync.bl.js
 * -> function: Name of the businessLogic function.
 * -> this: The LO, BO, or LU object that this function belongs to (and it is part of the filename).
 * -> kind: Type of object this function belongs to. Most common value is "businessobject".
 * -> async: If declared as async then the function should return a promise.
 * -> param: List of parameters the function accepts. Make sure the parameters match the function signature.
 * -> module: Use CORE or CUSTOM. If you are a Salesforce client or an implementation partner, always use CUSTOM to enable a seamless release upgrade.
 * -> maxRuntime: Maximum time this function is allowed to run, takes integer value in ms. If the max time is exceeded, error is logged.
 * -> returns: Type and variable name in which the return value is stored.
 * @function determinePaymentMethods
 * @this BoOrder
 * @kind businessobject
 * @async
 * @namespace CORE
 * @returns promise
 */
function determinePaymentMethods(){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
var promise = when.resolve();

//Check document transaction type that allows payment taking
var isCashCreditOrderPaymentAllowed = (me.getDocumentType() === "OrderEntry") &&
    (me.getDocTaType() === "CashOrder" || me.getDocTaType() === "CreditOrder" || me.getDocTaType() === "VanSalesCashInvoice");
var isCashCreditInvoicePaymentAllowed = (me.getDocumentType() === "Invoice") && 
    (me.getDocTaType() === "InvoiceCashInvoice" || me.getDocTaType() === "InvoiceCreditInvoice");
var paymentAllowed = isCashCreditOrderPaymentAllowed || isCashCreditInvoicePaymentAllowed;
var syncStatus = me.getSyncStatus();

var currentDate = Utils.createAnsiDateToday();
var isPayerRoleValid = me.getLuOrderer().getPayerValidFrom() <= currentDate && me.getLuOrderer().getPayerValidThru() >= currentDate;

if(isPayerRoleValid && paymentAllowed){
  me.setIsOrderPaymentRelevant('1');
} else {
  me.setIsOrderPaymentRelevant('0'); 
}

if (me.getIsOrderPaymentRelevant() === '1') {
  var jsonParams = [];
  jsonParams.push({
    field: "sdoMetaPKey",
    operator: "EQ",
    value: me.getSdoMetaPKey()
  });

  var jsonQuery = {};
  jsonQuery.params = jsonParams;

  promise = BoFactory.loadObjectByParamsAsync("LoPaymentMeta", jsonQuery)
    .then(function(loPaymentMeta) {
    if (Utils.isDefined(loPaymentMeta)) {
      me.getBoOrderMeta().setLoPaymentMeta(loPaymentMeta);

      var paymentMethodsDict = Utils.createDictionary();
      var paymentTemplates = loPaymentMeta.getAllItems();

      paymentTemplates.forEach(function(paymentTemplate) {
        paymentMethodsDict.add(paymentTemplate.getPaymentMethod());
      });

      var customerPaymentMode = me.getLuOrderer().getPaymentMode();

      //Check if order payment method is already set on order load then no need to set the payment method again
      if (!paymentMethodsDict.containsKey(me.getPaymentMethod()) && me.getPhase() === BLConstants.Order.PHASE_INITIAL && me.getSyncStatus() !== BLConstants.Order.NOT_SYNCABLE) {
        //Set customer's preferred payment mode
        if(!Utils.isEmptyString(customerPaymentMode) && paymentMethodsDict.containsKey(customerPaymentMode)) {
          me.setPaymentMethod(customerPaymentMode);
        } 
        //Set Cash as preferred payment method if customer payment mode not available
        else if(paymentMethodsDict.containsKey("Cash")) {
          me.setPaymentMethod("Cash");
        }
        //Set first found payment method
        else if (paymentTemplates.length > 0) {
          me.setPaymentMethod(paymentTemplates[0].getPaymentMethod());
        }
        //Set payment method as empty if no order payment template assigned
        else {
          me.setPaymentMethod(" ");
        }
      }

      var paymentMethodToggleList = Utils.getToggleListObject("PaymentMethod", paymentMethodsDict.keys());
      me.setAllowedPaymentMethods(paymentMethodToggleList);
    }
  });
}
else {
  me.setPaymentMethod(" ");
}

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return promise;
}