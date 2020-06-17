"use strict";

import * as error from "../server/error";
import { IAdopt, Adopt } from "./schema";
const mongoose = require("mongoose");

export async function getAdopts(userId: string): Promise<Array<IAdopt>> {
  try {
    const result = await Adopt.find({
    user: mongoose.Types.ObjectId(userId),
    enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}
export async function getAllAdopts(): Promise<Array<IAdopt>> {
  try {
    const result = await Adopt.find({
     enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}



export async function findById(userId: string, adoptId: string): Promise<IAdopt> {
  try {
    const result = await Adopt.findOne({
      user: mongoose.Types.ObjectId(userId),
      _id: adoptId,
      enabled: true
    }).exec();
    if (!result) {
      throw error.ERROR_NOT_FOUND;
    }
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}


async function validateUpdate(body: IAdopt): Promise<IAdopt> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (body.subject && body.subject.length > 256) {
    result.messages.push({ path: "subject", message: "Hasta 256 caracteres solamente." });
  }

  if (body.description && body.description.length > 1024) {
    result.messages.push({ path: "description", message: "Hasta 2014 caracteres solamente." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}

export async function update(adoptId: string, userId: string, body: IAdopt): Promise<IAdopt> {
  try {
    let current: IAdopt;
    if (adoptId) {
      current = await Adopt.findById(adoptId);
      if (!current) {
        throw error.ERROR_NOT_FOUND;
      }
    } else {
      current = new Adopt();
      current.user = mongoose.Types.ObjectId.createFromHexString(userId);
    }

    const validBody = await validateUpdate(body);
    if (validBody.subject) {
      current.subject = validBody.subject;
    }
    if (validBody.description) {
      current.description = validBody.description;
    }
    if (validBody.contact) {
      current.contact = validBody.contact;
    }
    if (validBody.image) {
      current.image = validBody.image;
    }
    if (validBody.enabled) {
      current.enabled = validBody.enabled;
    }
    await current.save();
    return Promise.resolve(current);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function remove(userId: string, adoptId: string): Promise<void> {
  try {
    const adopt = await Adopt.findOne({
      user: mongoose.Types.ObjectId(userId),
      _id: adoptId,
      enabled: true
    }).exec();
    if (!adopt) {
      throw error.ERROR_NOT_FOUND;
    }
    adopt.enabled = false;
    await adopt.save();
  } catch (err) {
    return Promise.reject(err);
  }
}

