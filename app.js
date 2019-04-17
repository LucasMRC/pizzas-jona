// PACKAGES REQUIRED

var mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    orderModels     = require('./models/orderModels'),
    Orders          = orderModels.orders,
    HistOrders      = orderModels.histOrders,
    seedDb          = require('./seed'),
    express         = require('express'),
    app             = express();

// APP CONFIG

seedDb();
mongoose.connect('mongodb://localhost:27017/pizzas_noe', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');



// ========================
// ROUTES CONFIGURATION
// ========================

// Index Order Route

app.get('/', function(req, res){
    Orders.find({}, function(err, orders){
        if(err){
            console.log(err);
        } else {
            res.render('landing', {orders: orders});
        }
    });
});

// Create Order Route

app.post('/', function(req, res){
    Orders.create(req.body.order, function(err, order){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Destroy Order Route

app.delete('/:id', function(req, res){
    Orders.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// =================
//  Other Routes
// =================

// Push to Historic Orders

app.post('/:id', function(req, res){
    Orders.findById(req.params.id, function(err, order){
        if (err) {
            console.log(err);
        } else {
            HistOrders.findOne({name: {$eq: 'historic'}}, function(err, Historic){
                if (err) {
                    console.log(err);
                } else {
                    Historic.orders.push(order);
                    Historic.save();
                    Orders.deleteOne({_id: {$eq: order._id}}, function(err){
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                    console.log('Sumado a la lista');
                    console.log(Historic);
                }
            });
        }
    });
});

// Check the Historic Orders

app.get('/historial', function(req, res){
    HistOrders.findOne({name: {$eq: 'historic'}}, function(err, Historic){
        if (err) {
            console.log(err);
        } else {
            console.log(Historic);
            res.render('historic', {historic: Historic});
        }
    });
});

// APP LISTEN



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App Marchandoo!");
});