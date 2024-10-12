import { DriverParams } from "../models/driver-models";
import fastify from "fastify";
import { drivers } from "../utils/drivers";

const server = fastify({logger: true});
server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
  const id  = request.params.id;
  const driver = drivers.find(d => d.id === parseInt(id));

  if (!driver) {
    response.status(404).send({ error: "Driver not found" });
    return;
  } else {
    response.type("application/json").code(200);
    return { driver };
  }
})