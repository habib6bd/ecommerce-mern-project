const app = require("./app");
const { serverPort } = require("./secret");

app.listen(serverPort, () => {
    console.log(`Sever is running on http://localhost:${serverPort}`);
});

