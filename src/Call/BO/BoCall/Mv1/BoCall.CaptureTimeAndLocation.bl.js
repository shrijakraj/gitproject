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
 * -> namespace: Use CORE or CUSTOM. If you are a Salesforce client or an implementation partner, always use CUSTOM to enable a seamless release upgrade.

 * -> maxRuntime: Maximum time this function is allowed to run, takes integer value in ms. If the max time is exceeded, error is logged.
 * -> returns: Type and variable name in which the return value is stored.
 *
 * ------- METHOD RELEVANT GENERATOR PARAMETERS BELOW - ADAPT WITH CAUTION -------
 * @function captureTimeAndLocation
 * @this BoCall
 * @kind businessobject
 * @async
 * @namespace CORE
 * @param {String} actionName
 * @returns promise
 */
function captureTimeAndLocation(actionName){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    
    if (actionName == "Start" && me.getClbStatus() == "Planned") {
      if (me.getLuCallMeta().getCaptureProceedingTime() == "1") {
          var currentDateTime = Utils.createDateNow();
          me.setStartTimeEffective(Utils.convertFullDate2Ansi(currentDateTime));
          me.setStartTimeEffectiveTimezoneOffset(currentDateTime.getTimezoneOffset());
          me.setStartTimeEffectiveUI(Utils.convertTime2Ansi(currentDateTime));
      }
      var promise;
      if (me.getLuCallMeta().getLocCaptureDuringStart() == "1") {
          promise = Utils.getCurrentPosition().then(function(position) {
              if (!Utils.isDefined(position)) {
                  position = {
                      longitude: 0,
                      latitude: 0
                  };
              }
              me.setStartGeolocationLatitude(position.latitude);
              me.setStartGeolocationLongitude(position.longitude);
          });
      } else {
          promise = when.resolve();
      }
  }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

   
}