import fastify from "fastify";
import { drivers } from "./utils/drivers";
import { teams } from "./utils/teams";
import fastifyCors from "@fastify/cors";

const server = fastify({logger: true});
server.register(fastifyCors, {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

server.get("/teams/:id?", async (request, response) => {
  const { id } = request.params as { id?: string };
  if (id) {
    const team = teams.find((d) => d.id === Number(id)); 

    if (team) {
      response.type("application/json").code(200);
      return team;  
    } else {
      response.type("application/json").code(404);
      return { message: `Team with id ${id} not found` };  
    }
  } else {
    response.type("application/json").code(200);
    return { teams };
  }
});

server.get("/drivers/:id?", async (request, response) => {
  const { id } = request.params as { id?: string };
  if (id) {
    const driver = drivers.find((d) => d.id === Number(id)); 

    if (driver) {
      response.type("application/json").code(200);
      return driver;  
    } else {
      response.type("application/json").code(404);
      return { message: `Driver with id ${id} not found` };  
    }
  } else {
    response.type("application/json").code(200);
    return { drivers };
  }
});

server.listen({port: 3333}, () => {
  console.log("Iniciando o servidor...");
})

