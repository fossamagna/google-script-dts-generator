import { GASClient } from 'gas-client';

// Use case: plain google.script.run
google.script.run
    .withSuccessHandler(v => {})
    .withFailureHandler(e => console.error(e))
    .echo("hello gas");

// Use case: gas-client
const { serverFunctions } = new GASClient<google.script.PublicEndpoints>();
serverFunctions.echo("hello gas")
    .then((s) => console.log(s))
    .catch(e => console.error(e));
