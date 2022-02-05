const respond = (request, response, status, content, type) => {
    response.writeHead(status, { 'Content-Type': type });
    if(type === 'text/xml')
    {
        response.write(content);
    }
    else // if(type === 'application/json')
    {
        response.write(JSON.stringify(content));
    }
    response.end();
};
  
const success = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>This is a successful response</message></response>`;
        return respond(request, response, 200, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'This is a successful response',
    };
    respond(request, response, 200, responseJSON, acceptedTypes[0]);
};

const badRequest = (request, response, acceptedTypes, params) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>`;
        return respond(request, response, 400, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'This request has the required parameters',
    };

    if(!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        return respond(request, response, 400, responseJSON, acceptedTypes[0]);
    }

    return respond(request, response, 200, responseJSON, acceptedTypes[0]);
};

const unauthorized = (request, response, acceptedTypes, params) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>`;
        return respond(request, response, 401, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'You have successfully viewed the content.',
    };

    if(!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';
        return respond(request, response, 401, responseJSON, acceptedTypes[0]);
    }

    return respond(request, response, 200, responseJSON, acceptedTypes[0]);
};

const forbidden = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>You do not have access to this content</message><id>forbidden</id></response>`;
        return respond(request, response, 403, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'You do not have access to this content',
        id: 'forbidden'
    };
    respond(request, response, 403, responseJSON, acceptedTypes[0]);
};

const internal = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>Internal Server Error. Something went wrong</message><id>internalError</id></response>`;
        return respond(request, response, 500, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong',
        id: 'internalError'
    };
    respond(request, response, 500, responseJSON, acceptedTypes[0]);
};

const notImplemented = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>A get request for this page has not been implemented yet. Check again later for updated content</message><id>notImplemented</id></response>`;
        return respond(request, response, 501, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
        id: 'notImplemented'
    };
    respond(request, response, 501, responseJSON, acceptedTypes[0]);
};

const notFound = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml')
    {
        let responseXML = `<response><message>The page you are looking for was not found.</message><id>internalError</id></notFound>`;
        return respond(request, response, 404, responseXML, acceptedTypes[0]);
    }
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    //return our json with a 404 not found error code
    respond(request, response, 404, responseJSON, acceptedTypes[0]);
};

module.exports = {
success,
badRequest,
unauthorized,
forbidden,
internal,
notImplemented,
notFound,
};