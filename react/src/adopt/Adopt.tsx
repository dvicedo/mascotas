import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover, CardGroup, CardDeck, Card, Button } from 'react-bootstrap';
import { Adopt, loadAdopts } from "./adoptApi";
import "../styles.css";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import FormButtonBar from "../common/components/FormButtonBar";
import FormButton from "../common/components/FormButton";
import FormTitle from "../common/components/FormTitle";
import GlobalContent from "../common/components/GlobalContent";
import { RouteComponentProps } from "react-router-dom";

export default function Adopts(props: RouteComponentProps) {
    const [adopts, setAdopts] = useState(new Array<Adopt>())

    const errorHandler = useErrorHandler()

    const popover =  (contact: string) => (
		  <Popover id="popover-basic">
		    <Popover.Title as="h3">Datos de contacto</Popover.Title>
		    <Popover.Content>
		      <strong>{contact}</strong>
		    </Popover.Content>
	          </Popover>
	  );


    const loadCurrentAdopts = async () => {
        try {
            const result = await loadAdopts();
            setAdopts(result);
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    useEffect(() => {
        loadCurrentAdopts()
        // eslint-disable-next-line
    }, [])

   return (
	<GlobalContent>
	<FormTitle>Adopciones</FormTitle>
	<div style={{display:'flex', flexWrap: 'wrap', flexDirection: 'row', width: '80vw'}}>
                    {adopts.map((adopt, i) => {
                        return (
				//<tr key={i}>
				<Card className="text-center" style={{display: 'flex', width: '20rem', margin: '10px'}}>	
				<Card.Img variant="top" src={`data:image/jpeg;base64,${adopt.image}`} />
				<Card.Body>
				 <Card.Title>{adopt.subject}</Card.Title>
				  <Card.Text> {adopt.description} </Card.Text>
			           <OverlayTrigger trigger="click" placement="right" overlay={popover(adopt.contact)}>
				    <Button variant="success">Ver Contacto</Button>
				  </OverlayTrigger>
			        </Card.Body>
			        </Card>
			       //</tr>
                        );
		    })}
	 </div>   
	 </GlobalContent>
   );
}
