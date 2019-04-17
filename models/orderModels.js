var mongoose        = require('mongoose'),
    date            = require('date-and-time');

date.locale('es');

let now = new Date();

var orderSchema     = mongoose.Schema({
        client: String,
        adress: String,
        phone: Number,
        dateSp: {type: String, default: date.format(now, 'dddd D de MMMM')},
        date: {type: Date, default: new Date()},
        wants: String
    }),
    historicSchema  = mongoose.Schema({
        name: String,
        orders: [orderSchema]
    });

module.exports = {
    orders: mongoose.model("Order", orderSchema),
    histOrders: mongoose.model("HistOrder", historicSchema)
}