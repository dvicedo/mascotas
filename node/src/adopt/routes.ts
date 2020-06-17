"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de mascotas de usuario
 */
export function initModule(app: express.Express) {
  // Rutas de acceso a mascotas
  app
    .route("/v1/adopt")
    .get(onlyLoggedIn, getAdopts)
    .post(onlyLoggedIn, create)
    .delete(onlyLoggedIn, removeById);

  app
    .route("/v1/adopts")
    .get(onlyLoggedIn, getAllAdopts);

  app
    .route("/v1/adopt/:adoptId")
    .get(onlyLoggedIn, readById)
    .post(onlyLoggedIn, updateById)
    .delete(onlyLoggedIn, removeById);
}


/**
 * @api {get} /v1/pet Listar Mascota
 * @apiName Listar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Obtiene un listado de las mascotas del usuario actual.
 *
 * @apiSuccessExample {json} Mascota
 *  [
 *    {
 *      "id": "Id de mascota"
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
async function getAdopts(req: ISessionRequest, res: express.Response) {
  const result = await service.getAdopts(req.user.user_id);
  res.json(result.map(u => {
    return {
      id: u.id,
      subject: u.subject,
      description: u.description,
      contact: u.contact,
      image: u.image,
      enabled: u.enabled,
    };
  }));
}

async function getAllAdopts(req: ISessionRequest, res: express.Response) {
  const result = await service.getAllAdopts();
  res.json(result.map(u => {
    return {
      id: u.id,
      subject: u.subject,
      description: u.description,
      contact: u.contact,
      image: u.image,
    };
  }));
}


/**
 * @apiDefine IMascotaResponse
 *
 * @apiSuccessExample {json} Mascota
 *    {
 *      "id": "Id de mascota",
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 */

/**
 * @api {post} /v1/pet Crear Mascota
 * @apiName Crear Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Crea una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "id": "Id mascota"
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function create(req: ISessionRequest, res: express.Response) {
  const result = await service.update(undefined, req.user.user_id, req.body);
  res.json({
    id: result.id
  });
}


/**
 * @api {get} /v1/pet/:petId Buscar Mascota
 * @apiName Buscar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Busca una mascota por id.
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

async function readById(req: ISessionRequest, res: express.Response) {
  const result = await service.findById(req.user.user_id, req.params.adoptId);
  res.json({
    id: result.id,
    subject: result.subject,
    description: result.description,
    contact: result.contact,
    image: result.image,
  });
}

/**
 * @api {post} /v1/pet/:petId Actualizar Mascota
 * @apiName Actualizar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Actualiza los datos de una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "id": "Id de mascota",
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

async function updateById(req: ISessionRequest, res: express.Response) {
  const result = await service.update(req.params.adoptId, req.user.user_id, req.body);
  res.json({
    id: result.id,
    subject: result.subject,
    description: result.description,
    contact: result.contact,
    image: result.image,
  });
}
/**
 * @api {delete} /v1/pet/:petId Eliminar Mascota
 * @apiName Eliminar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Eliminar una mascota.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */

async function removeById(req: ISessionRequest, res: express.Response) {
  await service.remove(req.user.user_id, req.params.adoptId);
  res.send();
}
