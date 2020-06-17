import axios, { AxiosError } from "axios";
import { logout } from "../store/sessionStore";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface myAdopt {
    id: string;
    subject: string;
    description: string;
    contact: string;	
    image: string;
}

export async function loadMyAdopts(): Promise<myAdopt[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/adopt");
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function loadAdopt(id: string): Promise<myAdopt> {
    try {
        const res = await axios.get("http://localhost:3000/v1/adopt/" + id);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function newAdopt(payload: myAdopt): Promise<myAdopt> {
    try {
        const res = await axios.post("http://localhost:3000/v1/adopt", payload);
        return Promise.resolve(res.data as myAdopt);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function saveAdopt(payload: myAdopt): Promise<myAdopt> {
    try {
        const res = await axios.post("http://localhost:3000/v1/adopt/" + payload.id, payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function deleteAdopt(id: string): Promise<void> {
    try {
        await axios.delete("http://localhost:3000/v1/adopt/" + id);
        return Promise.resolve();
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}
