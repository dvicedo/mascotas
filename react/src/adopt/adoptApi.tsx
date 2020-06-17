import axios, { AxiosError } from "axios";
import { logout } from "../store/sessionStore";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface Adopt {
    id: string;
    subject: string;
    description: string;
    contact: string;
    image: string;
}

export async function loadAdopts(): Promise<Adopt[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/adopts");
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}
/*
export async function loadPet(id: string): Promise<Pet> {
    try {
        const res = await axios.get("http://localhost:3000/v1/pet/" + id);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function newPet(payload: Pet): Promise<Pet> {
    try {
        const res = await axios.post("http://localhost:3000/v1/pet", payload);
        return Promise.resolve(res.data as Pet);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function savePet(payload: Pet): Promise<Pet> {
    try {
        const res = await axios.post("http://localhost:3000/v1/pet/" + payload.id, payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function deletePet(id: string): Promise<void> {
    try {
        await axios.delete("http://localhost:3000/v1/pet/" + id);
        return Promise.resolve();
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
 */
