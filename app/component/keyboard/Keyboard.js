import {createRef} from "react";
import {InteractionManager} from "react-native";

export const inputRef = createRef()

export const componentDidMount = () => {
    focusInputWithKeyboard()
}
const focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
        inputRef.current.focus()
    })
}
