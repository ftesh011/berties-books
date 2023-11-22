module.exports = function(app, shopData) {

    // Handle our routes
    app.get('/addbook',function(req,res){
        res.render('addbook.ejs', shopData);
    });//THis is the index route
    app.get('/',function(req,res){
        res.render('index.ejs', shopData);
    });//This is the about route
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });//This is the search route
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });//This is the search-result route
    app.get('/search-result', function (req, res) {
        //searching in the database
        let sqlquery = "SELECT * FROM books WHERE name LIKE"+"'%"+req.query.keyword+"%'"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("search-result.ejs", newData)

         });
    });//This is the register route
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });                                                                                                 
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    });//Thi is the list route
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("list.ejs", newData)

         });
    });//This is the book added route
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.book_name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          else {
            res.send(' This book is added to database, name: '
                      + req.body.book_name + ' price '+ req.body.price);
          }
        });
  });//This is the bargain book route    
  app.get('/bargainbooks', function(req, res) {
    let sqlquery = "SELECT * FROM books WHERE price<20" ; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');     
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
        console.log(newData)
        res.render("bargainbooks.ejs", newData)
        });
    });
}
