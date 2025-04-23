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
 * @function calculateItemValue
 * @this BoInventoryDocument
 * @kind TODO_ADD_BUSINESS_OBJECT_TYPE
 * @async
 * @namespace CORE
 * @param {Object} inventoryDocumentItem
 * @returns promise
 */
function calculateItemValue(inventoryDocumentItem){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    // The logic is to compute inventory document item based on the existing simplePricingCalculator
    var deferreds = [];
    // This is set to 0 inorder to reuse the existing simple pricing calculator and setting this will always compute the price
    inventoryDocumentItem.setMergeEngine_invalidated("0");
    var priceCalculator = me.getSimplePricingCalculator();
    var prices = priceCalculator.calculateItemValue(inventoryDocumentItem, me.getBoOrderTemplate());
    inventoryDocumentItem.modified = [];
    deferreds.push(inventoryDocumentItem.setPrice(prices.price));
    deferreds.push(inventoryDocumentItem.setBasePrice(prices.basePrice));
    deferreds.push(inventoryDocumentItem.setBasePriceReceipt(prices.basePriceReceipt));
    deferreds.push(inventoryDocumentItem.setGrossValue(prices.grossValue));
    deferreds.push(inventoryDocumentItem.setGrossValueReceipt(prices.grossValueReceipt));
    deferreds.push(inventoryDocumentItem.setValue(prices.value));
    deferreds.push(inventoryDocumentItem.setValueReceipt(prices.valueReceipt));
    var promise = when.all(deferreds);
   
  
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    
}