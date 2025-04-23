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
 * @function validateInventory
 * @this BoInventoryDocument
 * @kind businessobject
 * @async
 * @namespace CORE
 * @param {messageCollector} messageCollector
 * @returns promise
 */
function validateInventory(messageCollector) {
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * When we click on the release button, we need to invoke `processInventoryActions` method and in other cases we will reset the LoInventories and LoInventoriesTransactions values.
     */
    var promise = when.resolve();

    // If phase has been set to released, then process inventory actions and collect validation messages
    if (me.getValidateForRelease() == "1") {
      if (me.getReleaseValidationDone() == "0") {
        promise = me
          .processInventoryActions()
          .then(function (validationMessages) {
            var i;

            for (i = 0; i < validationMessages.length; i++) {
              messageCollector = messageCollector.extendParams(
                validationMessages[i]
              );
            }

            if (
              me.getSetPhaseInBeforeSave() == "1" &&
              validationMessages[i].level == "error"
            ) {
              me.setSetPhaseInBeforeSave("0");
            }
          });
      }
    } else {
      me.setObjectStatusFrozen(true);
      me.setLoInventories(undefined);
      me.setLoInventoryTransactions(undefined);
      me.setObjectStatusFrozen(false);
    }

    if (me.getSetPhaseInBeforeSave() != "1") {
      me.setObjectStatusFrozen(true);
      me.setLoInventories(undefined);
      me.setLoInventoryTransactions(undefined);
      me.setObjectStatusFrozen(false);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    
}