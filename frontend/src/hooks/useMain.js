import { useContext } from "react";
import MainContext from "../context/mainContext";

export default function useMain() {
    return useContext(MainContext);
}