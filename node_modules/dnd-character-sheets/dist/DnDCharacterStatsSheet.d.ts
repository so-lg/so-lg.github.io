import React from 'react';
import DnDCharacter from './DnDCharacter';
import './dndstyles.css';
interface IDnDCharacterStatsSheetProps {
    character?: DnDCharacter;
    defaultCharacter?: DnDCharacter;
    onCharacterChanged?: (character: DnDCharacter, changedField: string, newValue: any) => void;
}
interface IDnDCharacterStatsSheetState {
    character: DnDCharacter;
}
declare class DnDCharacterStatsSheet extends React.Component<IDnDCharacterStatsSheetProps, IDnDCharacterStatsSheetState> {
    constructor(props: IDnDCharacterStatsSheetProps);
    updateCharacter(name: string, value: any): void;
    getCharacter(): DnDCharacter;
    render(): JSX.Element;
}
export default DnDCharacterStatsSheet;
