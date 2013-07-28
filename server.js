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

// Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env);
});