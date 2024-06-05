const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    subTotal: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.

   // let subTotal = 0;

    for (const product in list) {     
        subTotal = subTotal + (product.Quantity * product.FinalPrice);
        itemTotal = itemTotal + product.Quantity;
    }   
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    
    tax = subTotal * 0.06;
    orderTotal = subTotal + tax + 10 + ((itemTotal - 1) * 2);
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    
  }
  
}
export default checkoutProcess;