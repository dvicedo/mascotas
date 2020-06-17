import React, { useState, useEffect } from "react";
import { myAdopt, loadMyAdopts } from "./myAdoptApi";
import "../styles.css";
import { Card } from 'react-bootstrap';
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormTitle from "../common/components/FormTitle";
import GlobalContent from "../common/components/GlobalContent";
import { RouteComponentProps } from "react-router-dom";

export default function MyAdopts(props: RouteComponentProps) {
    const [myAdopts, setMyAdopts] = useState(new Array<myAdopt>())

    const errorHandler = useErrorHandler()

    const loadCurrentAdopts = async () => {
        try {
            const result = await loadMyAdopts();
            setMyAdopts(result);
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    const editAdoptClick = (adoptId: string) => {
	        props.history.push("/editMyAdopts/" + adoptId);
    }

    const newAdoptClick = () => {
		            props.history.push("/editMyAdopts");
    }

    useEffect(() => {
        loadCurrentAdopts()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
	   <FormTitle>Mis Adopciones</FormTitle>
	   <table id="adopciones" className="table">
	     <thead>
		<tr>
		  <th> Titulo </th>
		  <th> Descripcion </th>
		  <th> Imagen </th>
		  <th> Contacto </th>
	  	</tr>
	      </thead>
	      <tbody>
		{myAdopts.map((adopt, i) => {
			 return (
			     <tr key={i}>
				<td>{adopt.subject}</td>
				<td>{adopt.description}</td>
				<td><Card.Img variant="top" src={`${adopt.image}`} /></td>
				<td>{adopt.contact}</td>
			 	  <td className="text">
				    <img
					src="/assets/edit.png"
					alt=""
					onClick={() => editAdoptClick(adopt.id)} />
				   </td>
			      </tr>
			);
		  })}
		</tbody>
	     </table>
	     <FormButtonBar>
	         <FormAcceptButton label="Nueva Adopcion" onClick={newAdoptClick} />
	         <FormButton label="Cancelar" onClick={() => goHome(props) }/>
	     </FormButtonBar>
	  </GlobalContent>
		  );
}

