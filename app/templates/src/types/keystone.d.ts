import { ErrorCallback } from "async";

/**
 * Reexport mongoose so that we rely on keystone's mongoose dependency
 */
import * as mongoose from "mongoose";

/**
 * Import the description of an ObjectID.
 * NOTE:  should not have to do this.  Mongoose should export its own description of an ObjectID (it already defines ObjectId...why not export it)
 */
import { ObjectID } from "mongodb";

// Type definitions for keystonejs v0.4
// Project: http://keystonejs.com/
// Definitions by: Carlos Colon <https://github.com/webteckie/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/************************************************
*                                               *
*               keystonejs v0.4 API             *
*                                               *
************************************************/

declare module "keystone" {


    /**
     * Describe a Keystone Document.
     */
    export type IKeystoneDocument = mongoose.Document;

    /**
     * Describe a Keystone Model.
     */
    export type IKeystoneModel<T extends mongoose.Document> = mongoose.Model<T>;

    /**
     * Describe a Keystone Model Identifier.
     */
    export type IKeystoneModelId = ObjectID;

    const keystone: IKeystone;
    /**
     * The main interface to export here
     */
    export = keystone; // IKeystone;

    export enum frameGuard {
        sameOrigin,                                                                        // allows requests from iframe tags that originate from the same server
        deny,                                                                                          // denies requests form all iframe tags, regardless of origin
        true,                                                                                          // same as "deny"
        false                                                                                          // disables frame guard
    }

    /**
     * For full option explanations see http://keystonejs.com/docs/configuration/
     */
    export interface IConfig {
        // Project Options
        name?: string;                                                            // The name of the KeystoneJS application
        brand?: string;                                                            // Displayed in the top left hand corner of the Admin UI
        moduleRoot?: string;                                          // Tells Keystone the root path of your app
        frameGuard?: frameGuard;                              // Tells Keystone how to handle iframe tags
        nav?: any;                                                                        // An object that specifies the navigation structure for the Admin UI
        csvFieldDelimiter?: string;                        // Allow you to choose a custom field delimiter to be used for CSV export instead of the default comma.
        app?: any;                                                                        // Instance of Express to be used instead of the default instance
        mongoose?: mongoose.Mongoose;                  // Instance of Mongoose to be used instead of the default instance
        autoUpdate?: boolean;                                          // Keystone includes an updates framework, which you can enable by setting the auto update option to true.  Updates provide an easy way to seed your database, transition data when your models change, or run transformation scripts against your database.

        // Web Server Options
        env?: string;                                                                  // The environment setting to use. Defaults to process.env.NODE_ENV || "development"
        port?: number;                                                            // The port to listen for request on. Defaults to process.env.PORT || 3000
        host?: string;                                                            // The ip address to listen for request on. Defaults to process.env.IP || '127.0.0.1'
        views?: string;                                                            // The path to your application's view templates. This is required for using the keystone.View Class, and will also be set on the express app.
        viewEngine?: string;                                          // The template engine to use by default. Any engine with express support should work.
        customEngine?: any;                                                // If you want to use a custom template engine, set this option to the function that should be used to process your templates.
        viewCache?: boolean;                                          // This option is passed through to Express, and controls whether compiled view templates are cached between requests.
        locals?: any;                                                                  // The default local variables to pass to your view templates.
        staticAssets?: string | string[];      // One or more paths to your application's static files. Setting this will include the serve-static middleware.
        staticOptions?: any;                                          // Optional config options that will be passed to the serve-static middleware
        lessPath?: string | string[];                  // If you want Keystone to automatically compile .less files into .css files, set this value to the same path as the static option.
        lessOptions?: any;                                                // Optional config options that will be passed to the less middleware
        sassPath?: string | string[];                  // If you want Keystone to automatically compile .sass files into .css files, set this value to the same path as the static option.
        sassOptions?: any;                                                // Optional config options that will be passed to the sass middleware
        favicon?: string;                                                      // The path to your application's favicon. Setting this will include the serve-favicon middleware. Should be relative to your project's root.
        compress?: boolean;                                                // Set this to true to enable HTTP compression. This will include the compression middleware.
        logger?: string;                                                      // Set this to include the morgan middleware. The value will be passed to the middleware initialisation.  Set this to false to disable logging altogether. Defaults to :method :url :status :response-time ms.
        loggerOptions?: any;                                          // Optional config options that will be passed to the morgan middleware
        trustProxy?: boolean;                                          // Set this to enable processing of the HTTP request X-Forwarded-For header. Extracted IP addresses will be available as the array req.ips
        // HTTPS Web Server Options
        ssl?: boolean | string;                                    // Whether to start the SSL Server. Defaults to false.
        sslKey?: string;                                                      // The path to your SSL Key. Should be either absolute or relative to process.cwd() (which is usually your project root).
        sslCert?: string;                                                      // The path to your SSL Certificate. Should be either absolute or relative to process.cwd() (which is usually your project root).
        sslCA?: string;                                                            // The path to your SSL CA Bundle. Should be either absolute or relative to process.cwd() (which is usually your project root).
        sslPort?: number;                                                      // The port to start the SSL Server on. Defaults to 3001.
        sslHost?: string;                                                      // The ip address to listen for request on. Defaults to process.env.SSL_IP or the value of the host option.
        // Unix Socket Web Server Option
        unixSocket?: string;                                                // Path to a writable unix socket. Should be either absolute or relative to process.cwd() (which is usually your project root). File will be removed first if present.
        // Database and User Auth Options
        mongo?: string;                                                            // The url for your MongoDB connection.  You should typically set this to process.env.MONGO_URI || "mongodb://localhost/your-db"
        modelPrefix?: string;                                          // A prefix to apply to all the mongodb collections used by the models.
        auth?: any;                                                                        // Whether to enable built-in auth for Keystone's Admin UI, or a custom function to use to authenticate users.
        userModel?: string;                                                // The key of the Keystone List for users, required if auth is set to true.  Typically this would be set to User.
        cookieSecret?: string;                                    // The encryption key to use for your cookies. Passed to Express's cookie parser.  It's a really good idea to set this to a long, random string.
        sessionStore?: any;                                                // Set this to mongo to use your MongoDB database to persist session data.
        sessionStoreOptions?: any;                        // This option allows you to override the default session store configuration, and is passed to the session store package.
        backUrl?: string;                                                      // href to use for the 'back to (site name)' link in the header of the Admin UI.  Defaults to /
        signinUrl?: string;                                                // href to bounce visitors to when they fail the default auth check (e.g. not signed in).  Defaults to /keystone/signin, only used when auth is set to true.
        signinRedirect?: string;                              // href to bounce visitors to after they successfully sign in via the built-in signin route.  Defaults to /keystone
        signoutUrl?: string;                                          // href for the signout link in the top right of the UI.  Defaults to /keystone/signout if auth is set to true.
        signoutRedirect?: string;                          // href to bounce visitors to after they successfully sign out via the built-in sign out route.  Defaults to /keystone.
        // Admin UI Options
        wysiwygImages?: boolean;                              // Adds an image button which enables including images from other URLS in your WYSIWYG Editor.
        wysiwygCloudinaryImages?: boolean; // Adds an image upload button and enables cloudinary image uploads directly in your WYSIWYG Editor.      }
        wysiwygAdditionalButtons?: string; // Allows to add additional extra functionality buttons such as blockquote.
        wysiwygAdditionalPlugins?: string; // Allows for additional plugins to be activated which can be found at: http://www.tinymce.com/wiki.php/Plugins
        wysiwygAdditionalOptions?: any;            // Allows for additional TinyMCE options, such as { menubar: true } to be modified.
        wysiwygOverrideToolbar?: boolean;      // This will remove the default set of buttons for wysiwyg mode. Use this with wysiwyg additional buttons and wysiwyg additional plugins. Defaults to false.
        wysiwygMenubar?: boolean;                              // Show the menubar for wysiwyg editor. Defaults to false.  See http://www.tinymce.com/wiki.php/Configuration:menubar for more details.
        wysiwygImportCSS?: string;                        // Sets the content_css and configures the importcss plugin for TinyMCE.  See http://www.tinymce.com/wiki.php/Configuration:content_css for more details.
        wysiwygSkin?: string;                                          // Allow you to change the TinyMCE skin. Defaults to keystone.  See http://www.tinymce.com/wiki.php/Configuration:skin for more details.

        // Services
        gaProperty?: string;                                          // Your Google Analytics Property.  Will default to process.env.GA_PROPERTY
        gaDomain?: string;                                                // Your Google Analytics Domain.  Will default to process.env.GA_DOMAIN

        // Google Maps
        googleBrowserApiKey?: string;                  // Your Google API browser key, used to authenticate the Javascript Maps API in the Admin UI.  Will default to process.env.GOOGLE_BROWSER_KEY
        googleServerApiKey?: string;                  // Your Google API server key, used to authenticate requests to the Maps API from the server.  Will default to process.env.GOOGLE_SERVER_KEY
        defaultRegion?: string;                                    // Optional setting to limit autocomplete results to a specific region.  This option takes a region code, specified as a IANA language region subtag.  Can be specified on a per-field basis by setting the region option on any Location field.

        // Amazon S3
        s3Config?: any;                                                            // KeystoneJS supports Amazon S3 for file upload and hosting, with the S3File field type.  To use the S3File field in your app, sign up for an account, create an S3 bucket, and get your key and secret.

        // Windows Azure Storage
        azurefileConfig?: any;                                    // KeystoneJS supports Windows Azure Storage for file upload and hosting, with the AzureFile field type.  To use the AzureFile field in your app, sign up for an account, enter into Azure Management Portal. Create a storage account with new(button), data                                                                                                                               // services, storage. In storage account page get the access (account name, key (valid primary or secondary key)) with the button "manage access key".
        // Cloudinary
        cloudinaryConfig?: any;                                    // Cloudinary is an image upload / resizing / hosting service that makes it easy to implement image management in your KeystoneJS app using the CloudinaryImage and CloudinaryImages field types.  To use the Cloudinary Image fields in your app, sign up for an                                                                                                                   // account (Cloudinary offers a free tier with up to 500MB storage, 50,000 images and 1GB data transfer) and get your cloud name, api key and api secret.
        // Embed.ly
        embedlyApiKey?: string;


        // Mandrill
        mandrillApiKey?: string;                        // Mandrill is a scalable and affordable email infrastructure service that allows you to send emails easily. They offer a free plan for up to 12,000 emails per month.  To configure KeystoneJS to support the Mandrill API, simply sign up for an account, get your
        mandrillUsername?: string;                  // api key, and set both the mandrill api key and mandrill username options.

        // Disabling the Admin UI
        headless?: boolean;                                          // You can disable the Admin UI by setting the headless option to true.  This will allow you to use keystone.start() or keystone.routes(app) without Keystone creating route bindings for the Admin UI routes under /keystone.
    }


    /**
     * Keystone Field Interface -- https://github.com/keystonejs/keystone/blob/master/fields/types/Type.js
     */
    export interface IField {
        /**
         * Constructor
         *
         * @param list the parent list
         * @param path the parent list path
         * @param options the field options
         */
        new(list: IList, path: string, options: Object): IField;

        /**
         * Get the field's options.
         */
        getOptions(): Object;

        /**
         * Get the field's width size.
         */
        getSize(): string;

        /**
         * Get the field's default value.
         */
        getDefaultValue(): any;

        /**
         * Get the field's data.
         */
        getData(): any;

        /**
         * Get the field's pre-save watcher.
         */
        getPreSaveWatcher(): boolean;

        /**
         * Register the field in the list's mongoose schema.
         */
        addToSchema(): void;

        /**
         * Bind the field's underscore methods.
         */
        bindUnderscoreMethods(): void;

        /**
         * Adds a method to the underscoreMethods collection on the field's list,
         * with a path prefix to match this field's path and bound to the document.
         *
         * @param path the underscore method path
         * @param function the underscore method to call
         */
        underscoreMethod(path: string, fn: () => any): void;

        /**
         * Format the field's value.
         *
         * @param list item containing the field's data
         */
        format(item: IList): any;

        /**
         * Check if the field been modified.
         *
         * @param list item containing the field's data
         */
        isModified(item: IList): boolean;

        /**
         * Validate the field's input.
         *
         * @param data the field's data
         * @param callback the function to call after done processing
         */
        validateInput(data: Object, callback: () => void): void;

        /**
         * Validate the field's requied input.
         *
         * @param list item containing the field's data
         * @param data the field's data
         * @param callback the function to call after done processing
         */
        validateRequiredInput(item: IList, data: Object, callback: () => void): void;

        /**
         * Updates the value for this field in the item from a data object.
         *
         * @param list item containing the field's data
         * @param data the field's data
         * @param callback the function to call after done processing
         */
        updateItem(item: IList, data: Object, callback: () => void): void;

        /**
         * Retrieves the value from an object, whether the path is nested or flattened.
         *
         * @param data the field's data
         * @param subpath the subpath to return data for
         */
        getValueFromData(data: Object, subpath: string): any;

        /**
         * Define the available field types.
         */
        Types: any;      // TODO:  create modules for all field types and reference them here?
        /**
         * Relationship reference list.
         */
        refList: IList;

        /**
         * The field type.
         */
        type: string;

        /**
         * The field path.
         */
        path: string;

        /**
         * The field paths.
         */
        paths: [string];

        /**
         * The field label.
         */
        label: string;

        /**
         * The field note.
         */
        note: string;

        /**
         * The field size.
         */
        size: number;

        /**
         * Whether the field is initially filled when constructed.
         */
        initial: boolean;

        /**
         * Whether the field is required.
         */
        required: boolean;

        /**
         * The field column.
         */
        col: string;

        /**
         * Whether the field is not editable.
         */
        noedit: boolean;

        /**
         * Whether the field is not col.
         */
        nocol: boolean;

        /**
         * Whether the field is not sortable.
         */
        nosort: boolean;

        /**
         * The field indentation.
         */
        indent: string;

        /**
         * Whether the field is hidden.
         */
        hidden: boolean;

        /**
         * Whether the field should be collapse.
         */
        collapse: boolean;

        /**
         * The field's dependencies.
         */
        dependsOn: any;

        /**
         * Whether the field should auto clean.
         */
        autoCleanup: any;
    }

    /**
     *
     */
    export interface IRelationship extends IField {
        options: {
            many: boolean;
            ref: string;
        };
    }

    /**
     * Keystone List Interface -- https://github.com/keystonejs/keystone/blob/master/lib/list.js
     */
    export interface IList extends mongoose.Document {

        // https://github.com/keystonejs/keystone/blob/master/lib/list.js
        new(key: string, options?: Object): IList;

        key: string;

        singular: string;

        plural: string;

        // https://github.com/keystonejs/keystone/blob/master/lib/list/add.js
        add(obj: Object, prefix?: string, ...args: any[]): void;
        add(prefix?: string, ...args: any[]): void;

        getDocumentName(doc: any): string;

        // https://github.com/keystonejs/keystone/blob/master/lib/list/relationship.js
        relationship(def: Object): IList;

        // https://github.com/keystonejs/keystone/blob/master/lib/list.js
        defaultColumns: string;

        defaultSort: string;

        // https://github.com/keystonejs/keystone/blob/master/lib/list/register.js
        register(): IList;

        model: IKeystoneModel;
        fields: [IField];

        fieldsArray: [IField];

        __doc: mongoose.Document;

        paginate(args?: any);
        /**
         * Updates the value for this field in the item from a data object.
         *
         * @param list item containing the field's data
         * @param data the field's data
         * @param options optional options
         * @param callback the function to call after done processing
         */
        updateItem(item: IList, data: Object, options: any, callback: (err: ErrorCallback<any>) => void): void;
    }

    /**
     * The keystone's view interface. See https://github.com/keystonejs/keystone/blob/master/lib/view.js
     */
    export interface IView {
        new(req: any, res: any): IView;

        /**
         * Adds a method (or array of methods) to be executed in parallel
         * to the `init`, `action` or `render` queue.
         */
        on(arg1?, arg2?, arg3?): any;

        /**
         * Queues a mongoose query for execution before the view is rendered.
         * The results of the query are set in `locals[key]`.
         *
         * Keys can be nested paths, containing objects will be created as required.
         *
         * The third argument `then` can be a method to call after the query is completed
         * like function(err, results, callback), or a `populatedRelated` definition
         * (string or array).
         *
         * Examples:
         *
         * view.query('books', keystone.list('Book').model.find());
         *
         *     an array of books from the database will be added to locals.books. You can
         *     also nest properties on the locals variable.
         *
         * view.query(
         *     'admin.books',
         *      keystone.list('Book').model.find().where('user', 'Admin')
         * );
         *
         *     locals.admin.books will be the result of the query
         *     views.query().then is always called if it is available
         *
         * view.query('books', keystone.list('Book').model.find())
         *     .then(function (err, results, next) {
         *         if (err) return next(err);
         *         console.log(results);
         *         next();
         *     });
         */
        query(arg1?, arg2?, arg3?): any;

        /**
         * Executes the current queue of init and action methods in series, and
         * then executes the render function. If renderFn is a string, it is provided
         * to `res.render`.
         *
         * It is expected that *most* init and action stacks require processing in
         * series.  If there are several init or action methods that should be run in
         * parallel, queue them as an array, e.g. `view.on('init', [first, second])`.
         */
        render(path: string, callback?: () => void): void;
    }

    /**
     * Keystone Main Interface. See https://github.com/keystonejs/keystone/blob/master/index.js
     */
    export class IKeystone {
        /**
         * Constructor
         */
        new(): IKeystone;

        /**
         * Initialize the keystone instance.
         */
        init(IConfig: IConfig): void;

        /**
         * Start the keystone instance.
         * TODO:  work in the 'any' part
         */
        start(any?: any): void;

        /**
         * An instance of mongoose
         */
        mongoose: mongoose.Mongoose;

        /**
         * Class that implements the Field interface
         */
        Field: IField;

        /**
         * Class that implements the List interface
         */
        List: IList;

        /**
         * Gets a list model by its key.
         */
        list(key: string): IList;

        /**
         * Return the model collection properly prefixed
         */
        prefixModel(string: string): string;

        /**
         * Gets a value by its key.
         */
        get(key: string): any;

        /**
         * Sets a key/value pair.
         */
        set(key: string, value: any): void;

        /**
         * A keystone view constructor
         */
        View: IView;

        /**
         * Configure a pre-route
         */
        pre(routes: string, middleware: (req, res, next) => void): void;

        /**
         * Imports all modules in the given directory
         */
        importer(dir: string): any;

        import(key: string): void;

        /**
         * Middleware to init the keystone API
         */
        middleware: {
            api(req: any, res: any, next: () => void): void
        };

        /**
         * Utilities
         */
        utils: any;

        /**
         * Content
         */
        content: {
            editable: boolean
        };

        /**
         * The keystone types
         * TODO:  can we define any?
         */
        Types: any;

        session: any;
        Email: any;
    }
}