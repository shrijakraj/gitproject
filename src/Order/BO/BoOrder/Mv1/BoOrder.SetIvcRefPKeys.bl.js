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
 * @function setIvcRefPKeys
 * @this BoOrder
 * @kind TODO_ADD_BUSINESS_OBJECT_TYPE
 * @namespace CORE
 */
function setIvcRefPKeys(){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

//Get user from application context
var currentUsrPKey = ApplicationContext.get('user').getPKey();
var luRunningTour = ApplicationContext.get('currentTour');

//Determine user for default user via IvcTAReceiver
var taReceiverUsrPKey = " ";

//Set taReceiverPKey
taReceiverUsrPKey = me.getInitiatorPKey();

//Determine tour pkey and vehicle pkeys
var tmgTourPKey = " ";
var defaultEtpVehiclePKey = " ";
var etpVehiclePKey = " ";

if (Utils.isDefined(luRunningTour) && !Utils.isEmptyString(luRunningTour.getPKey())) {
  tmgTourPKey = luRunningTour.getPKey();
  defaultEtpVehiclePKey = luRunningTour.getDefaultEtpVehicleTruckPKey();
  etpVehiclePKey = luRunningTour.getEtpVehicleTruckPKey();
}

// Set IvcRefPKeys
if (me.getBoOrderMeta().getIvcRefPKey1Usage() == "DefaultUsr") {
  me.setIvcRef1PKey(taReceiverUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey1Usage() == "ActualUsr") {
  me.setIvcRef1PKey(currentUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey1Usage() == "Tour") {
  me.setIvcRef1PKey(tmgTourPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey1Usage() == "DefaultVehicle") {
  me.setIvcRef1PKey(defaultEtpVehiclePKey);
} else if (me.getBoOrderMeta().getIvcRefPKey1Usage() == "ActualVehicle" || me.getBoOrderMeta().getIvcRefPKey1Usage() == "Vehicle") {
  me.setIvcRef1PKey(etpVehiclePKey);
} else {
  //For NGM, all other values are not supported at the moment
  me.setIvcRef1PKey(" ");
}

if (me.getBoOrderMeta().getIvcRefPKey2Usage() == "DefaultUsr") {
  me.setIvcRef2PKey(taReceiverUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey2Usage() == "ActualUsr") {
  me.setIvcRef2PKey(currentUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey2Usage() == "Tour") {
  me.setIvcRef2PKey(tmgTourPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey2Usage() == "DefaultVehicle") {
  me.setIvcRef2PKey(defaultEtpVehiclePKey);
} else if (me.getBoOrderMeta().getIvcRefPKey2Usage() == "ActualVehicle" || me.getBoOrderMeta().getIvcRefPKey2Usage() == "Vehicle") {
  me.setIvcRef2PKey(etpVehiclePKey);  
} else {
  //For NGM, all other values are not supported at the moment
  me.setIvcRef2PKey(" ");
}

if (me.getBoOrderMeta().getIvcRefPKey3Usage() == "DefaultUsr") {
  me.setIvcRef3PKey(taReceiverUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey3Usage() == "ActualUsr") {
  me.setIvcRef3PKey(currentUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey3Usage() == "Tour") {
  me.setIvcRef3PKey(tmgTourPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey3Usage() == "DefaultVehicle") {
  me.setIvcRef3PKey(defaultEtpVehiclePKey);
} else if (me.getBoOrderMeta().getIvcRefPKey3Usage() == "ActualVehicle" || me.getBoOrderMeta().getIvcRefPKey3Usage() == "Vehicle") {
  me.setIvcRef3PKey(etpVehiclePKey);  
} else {
  //For NGM, all other values are not supported at the moment
  me.setIvcRef3PKey(" ");
}

if (me.getBoOrderMeta().getIvcRefPKey4Usage() == "DefaultUsr") {
  me.setIvcRef4PKey(taReceiverUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey4Usage() == "ActualUsr") {
  me.setIvcRef4PKey(currentUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey4Usage() == "Tour") {
  me.setIvcRef4PKey(tmgTourPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey4Usage() == "DefaultVehicle") {
  me.setIvcRef4PKey(defaultEtpVehiclePKey);
} else if (me.getBoOrderMeta().getIvcRefPKey4Usage() == "ActualVehicle" || me.getBoOrderMeta().getIvcRefPKey4Usage() == "Vehicle") {
  me.setIvcRef4PKey(etpVehiclePKey);  
} else {
  //For NGM, all other values are not supported at the moment
  me.setIvcRef4PKey(" ");
}

if (me.getBoOrderMeta().getIvcRefPKey5Usage() == "DefaultUsr") {
  me.setIvcRef5PKey(taReceiverUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey5Usage() == "ActualUsr") {
  me.setIvcRef5PKey(currentUsrPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey5Usage() == "Tour") {
  me.setIvcRef5PKey(tmgTourPKey);
} else if (me.getBoOrderMeta().getIvcRefPKey5Usage() == "DefaultVehicle") {
  me.setIvcRef5PKey(defaultEtpVehiclePKey);
} else if (me.getBoOrderMeta().getIvcRefPKey5Usage() == "ActualVehicle" || me.getBoOrderMeta().getIvcRefPKey5Usage() == "Vehicle") {
  me.setIvcRef5PKey(etpVehiclePKey);  
} else {
  //For NGM, all other values are not supported at the moment
  me.setIvcRef5PKey(" ");
}

me.endEdit();
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    
}