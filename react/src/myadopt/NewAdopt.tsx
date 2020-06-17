import React, { useEffect, useState } from "react";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import "../styles.css";
import { Card } from 'react-bootstrap';
import { deleteAdopt, loadAdopt, newAdopt, saveAdopt } from "./myAdoptApi";
import DangerLabel from "../common/components/DangerLabel";
import FormInput from "../common/components/FormInput";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormWarnButton from "../common/components/FormWarnButton";
import FormTitle from "../common/components/FormTitle";
import Form from "../common/components/Form";
import GlobalContent from "../common/components/GlobalContent";
import { RouteComponentProps } from "react-router-dom";

export default function NewAdopt(props: RouteComponentProps<{ id: string }>) {
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [adoptId, setAdoptId] = useState("")
    const [image, setImage] = useState("")
    const [contact, setContact] = useState("")
    

    const errorHandler = useErrorHandler()
    const onChangeFile = (e : any) => {
	    const files = e.target.files;
	    const file = files[0];
	    getBase64(file);
    };

    const onLoad = (fileString : any) => {
	    console.log(fileString);
	    setImage(fileString);
    };

    const getBase64 = (file : any) => {
	    let reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => {
		onLoad(reader.result);
	    };
	     };
		  

    const loadAdoptById = async (id: string) => {
        if (id) {
            try {
                const result = await loadAdopt(id);
                setSubject(result.subject)
                setAdoptId(result.id)
                setDescription(result.description)
		setImage(result.image)
		setContact(result.contact)
            } catch (error) {
                errorHandler.processRestValidations(error);
            }
        }
    }
    const deleteClick = async () => {
        if (adoptId) {
            try {
                await deleteAdopt(adoptId);
                props.history.push("/myAdopts");
            } catch (error) {
                errorHandler.processRestValidations(error);
            }
        }
    }

    const saveClick = async () => {
	errorHandler.cleanRestValidations();
        if (!subject) {
            errorHandler.addError("subject", "No puede estar vacío");
        }

        if (errorHandler.hasErrors()) {
            return;
        }

        try {
            if (adoptId) {
                await saveAdopt({ id: adoptId, subject, description, image, contact});
            } else {
                await newAdopt({ id: adoptId, subject, description, image, contact});
            }
            props.history.push("/myAdopts");
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    useEffect(() => {
        const id  = props.match.params.id;
        if (id) {
            loadAdoptById(id)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Nueva Adopcion</FormTitle>

            <Form>
                <FormInput
                    label="Titulo"
                    name="title"
                    value={subject}
                    onChange={event => setSubject(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

	    <Card.Img variant="top" src={`${image}`} />
		<input type="file" onChange={onChangeFile} />

	    	<FormInput
                    label="Contacto"
                    name="contact"
                    value={contact}
                    onChange={event => setContact(event.target.value)}
                    errorHandler={errorHandler} />
		
                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormWarnButton hidden={!adoptId} label="Eliminar" onClick={deleteClick} />

		    <FormButton label="Cancelar" onClick={() => props.history.push("/myAdopts/")} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    );
}
