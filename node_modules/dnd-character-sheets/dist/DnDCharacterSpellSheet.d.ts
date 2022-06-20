import React from 'react';
import DnDCharacter from './DnDCharacter';
import './dndstyles.css';
interface IDnDCharacterSpellsSheetProps {
    character?: DnDCharacter;
    defaultCharacter?: DnDCharacter;
    onCharacterChanged?: (character: DnDCharacter, changedField: string, newValue: any) => void;
}
interface IDnDCharacterSpellsSheetState {
    character: DnDCharacter;
}
declare class DnDCharacterSpellsSheet extends React.Component<IDnDCharacterSpellsSheetProps, IDnDCharacterSpellsSheetState> {
    constructor(props: IDnDCharacterSpellsSheetProps);
    updateCharacter(name: string, value: any): void;
    getCharacter(): DnDCharacter;
    render(): JSX.Element;
}
export default DnDCharacterSpellsSheet;
