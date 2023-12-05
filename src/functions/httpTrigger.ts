import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Person } from "../models/person";

export async function httpTriggerGet(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

export async function httpTriggerPost(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const person = JSON.parse(await request.text()) as Person;

    return { body: `Hello, ${person.name}!` };
};

app.http('get', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerGet
});

app.http('post', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: httpTriggerPost
});
