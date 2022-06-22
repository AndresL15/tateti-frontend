import { useNavigate } from "react-router-dom";
import { Board } from "./Board";
import { create } from "./boardService"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useState } from "react";
import { join } from "./boardService";
import GlobalContent from "../common/components/GlobalContent";
import FormTitle from "../common/components/FormTitle";
import Form from "../common/components/Form";
import FormInput from "../common/components/FormInput";
import DangerLabel from "../common/components/DangerLabel";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";

export interface User {
    name: string
}

export function Room() {

    const history = useNavigate()
    const [name, setName] = useState("")

    const errorHandler = useErrorHandler()
    

    const createClick = async () => {
        const player1 = localStorage.getItem("user");
        try {
            await create({
                name,
                player1
            })
            history("/tateti")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const joinClick = async () => {
        const player2 = localStorage.getItem("user");
        try {
            await join({
                name,
                player2
            })
            history("/tateti")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Crear Sala</FormTitle>
            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    errorHandler={errorHandler}
                    onChange={(event) => setName(event.target.value)} />
                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Create" onClick={createClick} />
                </FormButtonBar>
            </Form >
            <FormTitle>Entrar en una sala</FormTitle>
            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    errorHandler={errorHandler}
                    onChange={(event) => setName(event.target.value)} />
                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Join" onClick={joinClick} />
                </FormButtonBar>
            </Form >
            <FormButton label="Cancelar" onClick={() => history('/')} />
        </GlobalContent >
    );
}

