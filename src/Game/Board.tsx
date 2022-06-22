import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import './Board.css';
import { checkWinner, fill, refresh } from "./boardService";

const INITIAL_STATE = new Array(9).fill("");

export function Board() {
    const id = localStorage.getItem("id");
    const char = localStorage.getItem("char"); 
    const player = localStorage.getItem("user");
    const history = useNavigate();
    const [squares, setSquares] = useState<(string | null)[]>(INITIAL_STATE);
    //0 = playing, 1 = draw , 2 = xwon , 3 = owon
    const [status, setStatus] = useState<0 | 1 | 2 | 3>(0);
    const errorHandler = useErrorHandler()

    const checkfill = async (i: number) => {
        errorHandler.cleanRestValidations()
        if (status !== 0) return;
        const draft = [...squares];
        if (draft[i] === "") {
            let index = i.toString();
            try {
                await fill({
                    index,
                    id,
                    char,
                    player
                })
                draft[i] = char;
                setSquares(draft);
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const checkrefresh = async () => {
        errorHandler.cleanRestValidations()
        try {
            let state = await refresh({
                id
            })
            let str = state.status;
            let arr = str.split('');
            for (let i in arr) {
                if (arr[i] !== "X" && arr[i] !== "O") {
                    arr[i] = "";
                }
            }
            setSquares(arr);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const exit = () => {
        localStorage.removeItem("char")
        localStorage.removeItem("id")
        history("/");
    }

    useEffect(() => {
        const win = async () => {
            errorHandler.cleanRestValidations()
            try {
                let winner = await checkWinner({
                    id
                })

                if (winner.char === "X") {
                    setStatus(2);
                } else if (winner.char === "O") {
                    setStatus(3);
                } else if (!squares.some((square) => square === "")) {
                    setStatus(1);
                }
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        win();
    }, [squares]);

    return (
        <>
            <div className="board">
                {squares.map((square, i) => (
                    <div key={i} className="cell" onClick={() => checkfill(i)}>
                        {square}
                    </div>
                ))}
                {status !== 0 && (<article role="alert">
                    {status === 1 && "Draw!"}
                    {status === 2 && "Winner X!"}
                    {status === 3 && "Winner O!"}
                </article>)}
            </div>
            <div>
                <button className="btn btn-primary" onClick={checkrefresh}>Actualizar</button>
                <button className="btn btn-primary" onClick={exit}>Abandonar Sala</button>
            </div>
        </>
    );
}