import React from 'react';
import DnDCharacter from './DnDCharacter';
import './dndstyles.css';
interface IDnDCharacterProfileSheetProps {
    character?: DnDCharacter;
    defaultCharacter?: DnDCharacter;
    onCharacterChanged?: (character: DnDCharacter, changedField: string, newValue: any) => void;
}
interface IDnDCharacterProfileSheetState {
    character: DnDCharacter;
}
declare class DnDCharacterProfileSheet extends React.Component<IDnDCharacterProfileSheetProps, IDnDCharacterProfileSheetState> {
    constructor(props: IDnDCharacterProfileSheetProps);
    updateCharacter(name: string, value: any): void;
    getCharacter(): DnDCharacter;
    render(): JSX.Element;
}
export default DnDCharacterProfileSheet;
