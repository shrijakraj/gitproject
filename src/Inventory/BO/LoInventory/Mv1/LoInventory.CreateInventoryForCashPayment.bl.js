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
 * @function createInventoryForCashPayment
 * @this LoInventory
 * @kind listobject
 * @namespace CORE
 * @param {LiCheckInPaymentItem} paymentItem
 * @param {Object} ivcInformation
 * @returns ivcMainPKey
 */
function createInventoryForCashPayment(paymentItem, ivcInformation){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
var ivcMetaByPaymentMeta;
var ivcMainPKey;
var jsonIvcData = {};

ivcMetaByPaymentMeta = ivcInformation.ivcMetaByPaymentMeta;

// Consider only UserInventories
if (Utils.isDefined(ivcMetaByPaymentMeta)) {
  ivcMainPKey = PKey.next();
  jsonIvcData = {};
  jsonIvcData.pKey = ivcMainPKey;
  jsonIvcData.id = ivcMainPKey;
  jsonIvcData.ivcMetaPKey = ivcMetaByPaymentMeta.getIvcMetaPKey();
  jsonIvcData.usrMainPKey = ivcMetaByPaymentMeta.getUsrMainPKey();
  jsonIvcData.bpaMainPKey = ivcMetaByPaymentMeta.getBpaMainPKey();
  jsonIvcData.prdMainPKey = " ";
  jsonIvcData.phase = "Active";
  jsonIvcData.validFrom = Utils.addDays2AnsiDate(Utils.createAnsiDateToday(), -1);
  jsonIvcData.validThru = Utils.getMaxDate();
  jsonIvcData.invalid = "0";
  jsonIvcData.salesOrg = ApplicationContext.get('user').getBoUserSales().getSalesOrg();
  jsonIvcData.tmgTourPKey = ivcMetaByPaymentMeta.getTmgTourPKey();
  jsonIvcData.etpVehiclePKey = ivcMetaByPaymentMeta.getEtpVehiclePKey();
  jsonIvcData.currency = paymentItem.getCurrency();

  me.addItems([jsonIvcData]);
  me.getItemByPKey(jsonIvcData.pKey).setObjectStatus(STATE.NEW | STATE.DIRTY);
}

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return ivcMainPKey;
}