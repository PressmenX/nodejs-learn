  import net from "node:net";

  const createServer = (port: number, isActived: boolean) => {
    const server = net.createServer((socket) => {
      if (isActived) {
        socket.write("Connect to Client From server!");
        socket.end()
      }
    });

    server.listen(port, () => {
      console.log(`Port ${port} is open`);
    });
  };

  for (let port = 8080; port <= 8100; port += 2) {
    createServer(port, port % 10 === 0);
  }
