import net from "node:net";
const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

function connectToServer(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(200);
    socket.connect(port, "127.0.0.1");

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("data", (data) => {
      socket.destroy();
      resolve(true);
    });

    socket.on("error", (err: Error) => {
      socket.destroy();
      resolve(false);
    });
  });
}

async function runScanner() {
  for (let port = 8080; port <= 8100; port++) {
    const isActive = await connectToServer(port);
    if (isActive) console.log(`[OPEN] Port ${port} is Open`);

    await delay();
  }

  console.log("Complete");
}
runScanner();
