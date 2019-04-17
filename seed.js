var mongoose    = require('mongoose'),
    orderModels = require('./models/orderModels'),
    HistOrder   = orderModels.histOrders,
    Orders      = orderModels.orders;

function seedDb() {
    HistOrder.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Historial Reseteado!');
            HistOrder.create({
                name: "historic",
                orders: []
            });
            console.log('Historial Creado!');
            Orders.remove({}, function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log('Pedidos Reseteado!');
                    Orders.create({
                       client: 'Jorge',
                       adress: 'Córdoba 143',
                       phone: 3535646191,
                       wants: '1 Especial'
                    }),
                    Orders.create({
                       client: 'Lucas',
                       adress: 'Córdoba 142',
                       phone: 3535646196,
                       wants: '1 Napo'
                    }),
                    Orders.create({
                       client: 'Nico',
                       adress: 'Córdones 1432',
                       phone: 3535623496,
                       wants: '1 Común',
                       date: new Date(2018, 11, 24, 10, 33, 30, 0)
                    }),
                console.log('Pedido Creado!');
                }
            });
        }
    });

}


module.exports = seedDb;