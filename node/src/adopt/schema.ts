"use strict";

import * as mongoose from "mongoose";

export interface IAdopt extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  subject: string;
  description: string;
  contact: string;
  image: string;
  enabled: Boolean;
}

/**
 * Esquema de Mascotas
 */
export let AdoptSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Usuario es requerido"
  },
   subject: {
    type: String,
    default: "",
    trim: true,
    required: "Titulo es requerido"
  },
  description: {
    type: String,
    default: "",
    trim: true,
    required: "Descripcion es requerida"
  },
  contact: {
    type: String,
    default: "",
    trim: true,
    required: "Contacto es requerida",

  },
  image: {
    type: String,
    default: "",
    trim: true,
    required: "Imagen es requerida",

  },
  enabled: {
    type: Boolean,
    default: true,
  }
}, { collection: "adopts" });

export let Adopt = mongoose.model<IAdopt>("Adopt", AdoptSchema);
