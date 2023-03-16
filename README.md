# Asynchronous Back-end Database API

-   `Asynchronous`

-   Express `Routing` is how an application's endpoints respond to client request.

    -   Express uses [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) for matching route paths.

    -   express.`Router` used to create modular, mountable route handlers. **`mini-app`**

-   `Mongoose` is a _Object Data Modeling (ODM) library_ for MongoDB and Node.js.

*   Used to translate between objects in code and representation of the objects in MongoDB

    <a href="https://drive.google.com/uc?export=view&id=1dQKa7JZFjKzKZKt5OdU9Nq7o3qlbf1q5"><img src="https://drive.google.com/uc?export=view&id=1dQKa7JZFjKzKZKt5OdU9Nq7o3qlbf1q5" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

    -   Write Asynchronous functions to a database.
        -   Handles:
            -   Object Mapping
            -   Relationships between data
            -   Provides Schema Validation

### Cross-Origin Resource Sharing - CORS

-   > Headers
-   **Request Headers**
    -   Origin
    -   Access-Control-Request-Method
    -   Access-Control-Request-Headers
-   **Response Header**
    -   Access-Control-Allow-Origin
    -   Access-Control-Allow-Credentials
    -   Access-Control-Expose-Headers
    -   Access-Control-Max-Age
    -   Access-Control-Allow-Methods
    -   Access-Control-Allow-Headers

---

Resources used:

-   [Morgan](https://github.com/expressjs/morgan)
-   [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
-   [Express Routing](https://expressjs.com/en/guide/routing.html)
