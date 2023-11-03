import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();

app.use(
  "/",
  serveStatic({
    path: "./client/index.html"
  })
);

app.get("/hello", (c) => c.text("Welcome to HTMX Live Chat!", 200));

app.get("/chatroom", (c) => {
    let request = c.req;
      const { socket, response } = Deno.upgradeWebSocket(request);

      socket.onopen = () => {
        console.log("CONNECTED");
      };
      
      socket.onmessage = (event) => {
        console.log(`RECEIVED: ${event.data}`);
        socket.send("pong");
      };

      socket.onclose = () => console.log("DISCONNECTED");
      socket.onerror = (error) => console.error("ERROR:", error);

      return response;
})


export default app.fetch;