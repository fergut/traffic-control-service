import { app } from './app';

const port = '6000';

app.listen(port, () => {
    console.log("traffic-control-service listening in port %s", port);
});