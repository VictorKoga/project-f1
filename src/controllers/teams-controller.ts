import { TeamsParams } from "../models/teams-models";
import fastify from "fastify";
import { teams } from "../utils/teams";

const server = fastify({logger: true});

server.get<{Params: TeamsParams}>("/teams/:id", async (request, response) => {
  const id  = request.params.id;
  const team = teams.find(d => d.id === parseInt(id));

  if (!team) {
    response.status(404).send({ error: "Team not found" });
    return;
  } else {
    response.type("application/json").code(200);
    return { team };
  }
})