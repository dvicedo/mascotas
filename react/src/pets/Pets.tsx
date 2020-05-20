import React, { useState, useEffect } from "react";
import { IPet, loadPets } from "./api/petsApi";
import "../styles.css";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome, DefaultProps } from "../common/utils/Tools";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";

export default function Pets(props: DefaultProps) {
    const [pets, setPets] = useState(new Array<IPet>())

    const errorHandler = useErrorHandler()

    const loadCurrentPets = async () => {
        try {
            const result = await loadPets();
            setPets(result);
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    const editPetClick = (petId: string) => {
        props.history.push("/editPet/" + petId);
    }

    const newPetClick = () => {
        props.history.push("/editPet");
    }

    useEffect(() => {
        loadCurrentPets()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="global_content">
            <h2 className="global_title">Mascotas</h2>
            <table id="mascotas" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                <td className="text">
                                    <img
                                        src="/assets/edit.png"
                                        alt=""
                                        onClick={() => editPetClick(pet.id)} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <FormButtonBar>
                <FormAcceptButton label="Nueva Mascota" onClick={newPetClick} />
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </div>
    );
}
