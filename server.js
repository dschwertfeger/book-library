var application_root = __dirname,
    express          = require( 'express' ),
    path             = require( 'path' ),
    mongoose         = require( 'mongoose' );

// Create server
var app = express();

// Configure server
app.configure( function() {
    // parses request body and populates request.body
    app.use( express.bodyParser() );

    // checks request.body fot HTTP method overrides
    app.use( express.methodOverride() );

    // perform route lookup based on url and HTTP method
    app.use( app.router );

    // where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    // show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

// Get a list of all books
app.get( '/api/books', function( request, response ) {
    return BookModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

// Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if ( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

// Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    });
    book.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( book );
});

// Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

// Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

// Models
var BookModel = mongoose.model( 'Book', Book );

// Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env);
});