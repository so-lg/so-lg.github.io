import React, { useState, useEffect } from 'react';
import defaultExport from 'module'
import {
Switch,
Route,
Link,
withRouter,
Redirect,
useLocation
} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { DBConfig } from './DBConfig';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { DnDCharacterStatsSheet, DnDCharacterProfileSheet, DnDCharacterSpellSheet, DnDCharacter} from 'dnd-character-sheets';
import 'dnd-character-sheets/dist/index.css';
import { resolve } from 'node:path/win32';
import { render } from 'react-dom';
import { clear } from 'console';
interface InputWrapperProps {
  children?: React.ReactNode
}
function ScrollToTop() {
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);

return null;
}
initDB(DBConfig);

export function PanelExample() {
  const db = useIndexedDB('CharacterSheets');
return (<div>{JSON.stringify(db)}</div>);
}

const App: React.FC = (props: any) => {
const { getByID } = useIndexedDB('CharacterSheets');
const [character, setCharacter] = useState<DnDCharacter>(loadDefaultCharacter())
const [navTop, setNavTop] = useState<number>(0)
const [prevScrollpos, setPrevScrollpos] = useState<number>(window.pageYOffset)
const [, setLoading] = useState<boolean>(false)
const { search } = useLocation();
const [sheetList, setSheetList] = useState<any>();
const [selectedSheet, setSelectedSheet] = useState<any>();
/*useEffect(() => {
  const characterToLoad = true
  if (characterToLoad) {
    setLoading(true)
    getByID(1)
    .then((response: any) => {
      setLoading(false)
      try {
        if (!Array.isArray(response) && typeof response === 'object') {
          console.log('Loaded Character - ' + characterToLoad)
          updateCharacter(response)
        } else {
          throw new Error('Json file does not contain a DnD character.')
        }
      }
      catch {
        throw new Error('Json file does not contain a DnD character.')
      }
    })
    .catch((error: any) => {
      console.log('Failed to load Character - ' + characterToLoad)
      console.log(error)
      setLoading(false)
    })
  }
}, [search]);
*/
const statsSheet = (
<DnDCharacterStatsSheet
character={character}
onCharacterChanged={updateCharacter}
/>
)
const profileSheet = (
<DnDCharacterProfileSheet
character={character}
onCharacterChanged={updateCharacter}
/>
)

const spellSheet = (
<DnDCharacterSpellSheet
character={character}
onCharacterChanged={updateCharacter}
/>
)

window.onscroll = function() {onScroll()};
function onScroll() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos || currentScrollPos < 20) {
setNavTop(0)
} else {
setNavTop(-280);
}
setPrevScrollpos(currentScrollPos)
}

function loadDefaultCharacter () {
  let character: DnDCharacter = {}
  const lsData = localStorage.getItem('dnd-character-data')
  if (lsData) {
  try {
    //character = JSON.parse(lsData)
  } catch {}
  }
  return character
}

function updateCharacter (character: DnDCharacter) {
setCharacter(character)
localStorage.setItem('dnd-character-data', JSON.stringify(character))
}
function exportCharacter () {
const json = JSON.stringify(character, null, 2)

var a = document.createElement('a');
var file = new Blob([json], {type: 'application/json'});
a.href = URL.createObjectURL(file);
a.download = character.name ? character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.json' : 'dnd-character.json';
a.click();
}


function importCharacter (event: any) {
  if (event.target.files.length > 0){
  var fr = new FileReader();

  fr.onload = function(e) { 
    if (e.target && e.target.result && typeof e.target.result === 'string') {
      loadCharacter(e.target.result)
    }
  }
  fr.readAsText(event.target.files[0]);
  }
}

function loadCharacter(json: string) {
  try {
    var result = JSON.parse(typeof json === 'string' ? json : '{}');
    if (!Array.isArray(result) && typeof result === 'object') {
      updateCharacter(result)
    } else {
      window.alert('Json file does not contain a DnD character.')
    }
  }
    catch {
    window.alert('Json file does not contain a DnD character.')
  }
}
function clearCharacter() {
  updateCharacter({ })
}
//Functions dedicated to save and load character sheets from our DB. 
function SaveAsNewCharacterSheet() {
  const { add } = useIndexedDB('CharacterSheets');
  const json = JSON.parse(JSON.stringify(character, null, 2));
  var password = registerPassword();
  if(password == null||password==undefined){
    alert("Operation Aborted: The password provided was undefined.")
    return;
  }
  const createChar = () => {
    add({password:password, name:json.name, classLevel:json.classLevel, background:json.background, playerName:json.playerName, faction:json.faction, race:json.race, alignment:json.alignment, xp:json.xp, dciNo:json.dciNo, str:json.str, dex:json.dex, con:json.con, int:json.int, wis:json.wis, cha:json.cha, inspiration:json.inspiration, proficiencyBonus:json.proficiencyBonus, strSave:json.strSave, strSaveChecked:json.strSaveChecked, dexSave:json.dexSave, dexSaveChecked:json.dexSaveChecked, conSave:json.conSave, conSaveChecked:json.conSaveChecked, intSave:json.intSave, intSaveChecked:json.intSaveChecked, wisSave:json.wisSave, wisSaveChecked:json.wisSaveChecked, chaSave:json.chaSave, chaSaveChecked:json.chaSaveChecked, skillAcrobatics:json.skillAcrobatics, skillAcrobaticsChecked:json.skillAcrobaticsChecked, skillAnimalHandling:json.skillAnimalHandling, skillAnimalHandlingChecked:json.skillAnimalHandlingChecked, skillArcana:json.skillArcana, skillArcanaChecked:json.skillArcanaChecked, skillAthletics:json.skillAthletics, skillAthleticsChecked:json.skillAthleticsChecked, skillDeception:json.skillDeception, skillDeceptionChecked:json.skillDeceptionChecked, skillHistory:json.skillHistory, skillHistoryChecked:json.skillHistoryChecked, skillInsight:json.skillInsight, skillInsightChecked:json.skillInsightChecked, skillIntimidation:json.skillIntimidation, skillIntimidationChecked:json.skillIntimidationChecked, skillInvestigation:json.skillInvestigation, skillInvestigationChecked:json.skillInvestigationChecked, skillMedicine:json.skillMedicine, skillMedicineChecked:json.skillMedicineChecked, skillNature:json.skillNature, skillNatureChecked:json.skillNatureChecked, skillPerception:json.skillPerception, skillPerceptionChecked:json.skillPerceptionChecked, skillPerformance:json.skillPerformance, skillPerformanceChecked:json.skillPerformanceChecked, skillPersuasion:json.skillPersuasion, skillPersuasionChecked:json.skillPersuasionChecked, skillReligion:json.skillRegiligion, skillReligionChecked:json.skillReligionChecked, skillSlightOfHand:json.skillSlightofHand, skillSlightOfHandChecked:json.skillSlightOfHandChecked, skillStealth:json.skillStealth, skillStealthChecked:json.skillStealthChecked, skillSurvival:json.skillSurvival, skillSurvivalChecked:json.skillSurvivalChecked, passivePerception:json.passivePerception, otherProficiencies:json.otherProficiencies, ac:json.ac, init:json.init, speed:json.speed, maxHp:json.maxHp, hp:json.hp, tempHp:json.tempHp, hitDiceMax:json.hitDiceMax, hitDice:json.hitDice, deathsaveSuccesses:json.deathsaveSuccesses, deathsaveFailures:json.deathsaveFailures, attacks:json.attacks, attacksText:json.attacksText, cp:json.cp, sp:json.sp, ep:json.ep, gp:json.gp, pp:json.pp, equipment:json.equipment, equipment2:json.equipment2, personalityTraits:json.personalityTraits, ideals:json.ideals, bonds:json.bonds, flaws:json.flaws, featuresTraits:json.featuresTraits, age:json.age, height:json.height, weight:json.weight, eyes:json.eyes, skin:json.skin, hair:json.hair, appearance:json.appearance, backstory:json.backstory, factionImg:json.factionImg, factionRank:json.factionRank, allies:json.allies, allies2:json.allies2, additionalFeatures:json.additionalFeatures, additionalFeatures2:json.additionalFeatures2, totalNonConsumableMagicItems:json.totalNonConsumableMagicItems, treasure:json.treasure, treasure2:json.treasure2, spellcastingClass:json.spellcastingClass, preparedSpellsTotal:json.preparedSpellsTotal, spellSaveDC:json.spellSaveDC, spellAttackBonus:json.spellAttackBonus, cantrips:json.cantrips, lvl1SpellSlotsTotal:json.lvl1SpellSlotsTotal, lvl1SpellSlotsUsed:json.lvl1SpellSlotsUsed, lvl1Spells:json.lvl1Spells, lvl2SpellSlotsTotal:json.lvl2SpellSlotsTotal, lvl2SpellSlotsUsed:json.lvl2SpellSlotsUsed, lvl2Spells:json.lvl2Spells, lvl3SpellSlotsTotal:json.lvl3SpellSlotsTotal, lvl3SpellSlotsUsed:json.lvl3SpellSlotsUsed, lvl3Spells:json.lvl3Spells, lvl4SpellSlotsTotal:json.lvl4SpellSlotsTotal, lvl4SpellSlotsUsed:json.lvl4SpellSlotsUsed, lvl4Spells:json.lvl4Spells, lvl5SpellSlotsTotal:json.lvl5SpellSlotsTotal, lvl5SpellSlotsUsed:json.lvl5SpellSlotsUsed, lvl5Spells:json.lvl5Spells, lvl6SpellSlotsTotal:json.lvl6SpellSlotsTotal, lvl6SpellSlotsUsed:json.lvl6SpellSlotsUsed, lvl6Spells:json.lvl6Spells, lvl7SpellSlotsTotal:json.lvl7SpellSlotsTotal, lvl7SpellSlotsUsed:json.lvl7SpellSlotsUsed, lvl7Spells:json.lvl7Spells, lvl8SpellSlotsTotal:json.lvl8SpellSlotsTotal, lvl8SpellSlotsUsed:json.lvl8SpellSlotsUsed, lvl8Spells:json.lvl8Spells, lvl9SpellSlotsTotal:json.lvl9SpellSlotsTotal, lvl9SpellSlotsUsed:json.lvl9SpellSlotsUsed, lvl9Spells:json.lvl9Spells} 
          ).then(
      event => {
        alert('Operation succesful: Created Character "'+json.name+'".');
        clearCharacter();
      },
      error => {
        console.log(error);
        alert('Error encountered: An unknown error occured while attempting to create your character.');
      }
    );
  };
  createChar();
}
function LoadCharacterSheet(){
  const { getByID } = useIndexedDB('CharacterSheets');
  var id = parseInt((document.getElementById("currentSheet") as HTMLSelectElement).options[(document.getElementById("currentSheet") as HTMLSelectElement).selectedIndex].value);
  if(isNaN(id)){
      setSelectedSheet(undefined);
      clearCharacter();
      return;
  }
  getByID(id).then(characterSheetPromise=>{
    setCharacter(characterSheetPromise);
    if(characterSheetPromise!=undefined)
      setSelectedSheet(characterSheetPromise);
    loadCharacter(JSON.stringify(characterSheetPromise, null, 2));
  });
}
//This anihilates the sheet database.
function ClearAllSheets(){
  const { clear} = useIndexedDB('CharacterSheets');
  const handleClick = () => {
    clear().then(() => {
      alert('All Clear!');
    });
  };
  handleClick();
  return
}
//Deletes the given sheetKey from the DB
function DeleteCharacterSheet(){
  const { deleteRecord} = useIndexedDB('CharacterSheets');
  var id = (document.getElementById("currentSheet") as HTMLSelectElement).options[(document.getElementById("currentSheet") as HTMLSelectElement).selectedIndex].value;
  //We verify if the user knows the password to the selected sheet.
  if(CheckPassword() == false){
    return;
  }
  const destroySheet = () => {
    deleteRecord(selectedSheet.id).then(event => {
      alert("Operation succesful: The sheet was deleted.");
      clearCharacter();
      setSelectedSheet(JSON.parse(JSON.stringify(character, null , 2)));
      (document.getElementById("currentSheet") as HTMLSelectElement).selectedIndex = 0;
    });
  }
  destroySheet();
}
//Updates the given sheet via sheetKey
function UpdateCharacterSheet(){
  const { update } = useIndexedDB('CharacterSheets');
  var tempId = (document.getElementById("currentSheet") as HTMLSelectElement).options[(document.getElementById("currentSheet") as HTMLSelectElement).selectedIndex].value;
  //We verify if the user knows the password to the selected sheet.
  if(CheckPassword() == false){
    return;
  }
  const json = JSON.parse(JSON.stringify(character, null, 2));
  const updateChar = () => {
    update({id:selectedSheet.id ,password:selectedSheet.password, name:json.name, classLevel:json.classLevel, background:json.background, playerName:json.playerName, faction:json.faction, race:json.race, alignment:json.alignment, xp:json.xp, dciNo:json.dciNo, str:json.str, dex:json.dex, con:json.con, int:json.int, wis:json.wis, cha:json.cha, inspiration:json.inspiration, proficiencyBonus:json.proficiencyBonus, strSave:json.strSave, strSaveChecked:json.strSaveChecked, dexSave:json.dexSave, dexSaveChecked:json.dexSaveChecked, conSave:json.conSave, conSaveChecked:json.conSaveChecked, intSave:json.intSave, intSaveChecked:json.intSaveChecked, wisSave:json.wisSave, wisSaveChecked:json.wisSaveChecked, chaSave:json.chaSave, chaSaveChecked:json.chaSaveChecked, skillAcrobatics:json.skillAcrobatics, skillAcrobaticsChecked:json.skillAcrobaticsChecked, skillAnimalHandling:json.skillAnimalHandling, skillAnimalHandlingChecked:json.skillAnimalHandlingChecked, skillArcana:json.skillArcana, skillArcanaChecked:json.skillArcanaChecked, skillAthletics:json.skillAthletics, skillAthleticsChecked:json.skillAthleticsChecked, skillDeception:json.skillDeception, skillDeceptionChecked:json.skillDeceptionChecked, skillHistory:json.skillHistory, skillHistoryChecked:json.skillHistoryChecked, skillInsight:json.skillInsight, skillInsightChecked:json.skillInsightChecked, skillIntimidation:json.skillIntimidation, skillIntimidationChecked:json.skillIntimidationChecked, skillInvestigation:json.skillInvestigation, skillInvestigationChecked:json.skillInvestigationChecked, skillMedicine:json.skillMedicine, skillMedicineChecked:json.skillMedicineChecked, skillNature:json.skillNature, skillNatureChecked:json.skillNatureChecked, skillPerception:json.skillPerception, skillPerceptionChecked:json.skillPerceptionChecked, skillPerformance:json.skillPerformance, skillPerformanceChecked:json.skillPerformanceChecked, skillPersuasion:json.skillPersuasion, skillPersuasionChecked:json.skillPersuasionChecked, skillReligion:json.skillRegiligion, skillReligionChecked:json.skillReligionChecked, skillSlightOfHand:json.skillSlightofHand, skillSlightOfHandChecked:json.skillSlightOfHandChecked, skillStealth:json.skillStealth, skillStealthChecked:json.skillStealthChecked, skillSurvival:json.skillSurvival, skillSurvivalChecked:json.skillSurvivalChecked, passivePerception:json.passivePerception, otherProficiencies:json.otherProficiencies, ac:json.ac, init:json.init, speed:json.speed, maxHp:json.maxHp, hp:json.hp, tempHp:json.tempHp, hitDiceMax:json.hitDiceMax, hitDice:json.hitDice, deathsaveSuccesses:json.deathsaveSuccesses, deathsaveFailures:json.deathsaveFailures, attacks:json.attacks, attacksText:json.attacksText, cp:json.cp, sp:json.sp, ep:json.ep, gp:json.gp, pp:json.pp, equipment:json.equipment, equipment2:json.equipment2, personalityTraits:json.personalityTraits, ideals:json.ideals, bonds:json.bonds, flaws:json.flaws, featuresTraits:json.featuresTraits, age:json.age, height:json.height, weight:json.weight, eyes:json.eyes, skin:json.skin, hair:json.hair, appearance:json.appearance, backstory:json.backstory, factionImg:json.factionImg, factionRank:json.factionRank, allies:json.allies, allies2:json.allies2, additionalFeatures:json.additionalFeatures, additionalFeatures2:json.additionalFeatures2, totalNonConsumableMagicItems:json.totalNonConsumableMagicItems, treasure:json.treasure, treasure2:json.treasure2, spellcastingClass:json.spellcastingClass, preparedSpellsTotal:json.preparedSpellsTotal, spellSaveDC:json.spellSaveDC, spellAttackBonus:json.spellAttackBonus, cantrips:json.cantrips, lvl1SpellSlotsTotal:json.lvl1SpellSlotsTotal, lvl1SpellSlotsUsed:json.lvl1SpellSlotsUsed, lvl1Spells:json.lvl1Spells, lvl2SpellSlotsTotal:json.lvl2SpellSlotsTotal, lvl2SpellSlotsUsed:json.lvl2SpellSlotsUsed, lvl2Spells:json.lvl2Spells, lvl3SpellSlotsTotal:json.lvl3SpellSlotsTotal, lvl3SpellSlotsUsed:json.lvl3SpellSlotsUsed, lvl3Spells:json.lvl3Spells, lvl4SpellSlotsTotal:json.lvl4SpellSlotsTotal, lvl4SpellSlotsUsed:json.lvl4SpellSlotsUsed, lvl4Spells:json.lvl4Spells, lvl5SpellSlotsTotal:json.lvl5SpellSlotsTotal, lvl5SpellSlotsUsed:json.lvl5SpellSlotsUsed, lvl5Spells:json.lvl5Spells, lvl6SpellSlotsTotal:json.lvl6SpellSlotsTotal, lvl6SpellSlotsUsed:json.lvl6SpellSlotsUsed, lvl6Spells:json.lvl6Spells, lvl7SpellSlotsTotal:json.lvl7SpellSlotsTotal, lvl7SpellSlotsUsed:json.lvl7SpellSlotsUsed, lvl7Spells:json.lvl7Spells, lvl8SpellSlotsTotal:json.lvl8SpellSlotsTotal, lvl8SpellSlotsUsed:json.lvl8SpellSlotsUsed, lvl8Spells:json.lvl8Spells, lvl9SpellSlotsTotal:json.lvl9SpellSlotsTotal, lvl9SpellSlotsUsed:json.lvl9SpellSlotsUsed, lvl9Spells:json.lvl9Spells}
      ).then(event => {
      alert('Operation succesful: Your sheet was updated, ' + json.playerName + '.');
    },
    error => {
      console.log(error);
    })};
  updateChar();
}
//This function is used for existing sheet keys.
function requestPassword(){
  let password = prompt("Please enter the sheet's password:", "");
  return password;
}
//This function is used when creating a new sheet key.
function registerPassword(){
  let password = prompt("Please choose a password to access the sheet in the future:", "");
  return password;
}
//This function is used to verify identity and to validate if the user should be able to access other functions.
function CheckPassword() : boolean{
  if(selectedSheet == null || selectedSheet == undefined){
    return false;
  }
  var temp = requestPassword();
  if(temp!=null && (selectedSheet.password) == temp){
    return true;
  } else {
    alert("Access Denied: Credentials invalid")
    return false;
  }
}
//Constructs the sheet selector.
function ConstructList(){
  const { getAll } = useIndexedDB('CharacterSheets');
  getAll().then(sheetsFromDB => {
    setSheetList(sheetsFromDB);
  });
  if(sheetList==undefined)
    return null;
  var sheet = JSON.parse(JSON.stringify(sheetList));
  var options = Array<JSX.Element>(sheet+1);
  options[0] = <option key={0} value={undefined} onSelect={() => loadDefaultCharacter()}>NO SHEET SELECTED</option>;
  for(var i=0; i<sheet.length; i++){
    options[i+1] = <option key={sheet[i].id} value={sheet[i].id}>{sheet[i].name} | created by {sheet[i].playerName}</option>;
  }
  return options;
}
//Default redirect
function getDefaultRedirect(search: string | undefined) {
  let defaultRedirect = '/stats' + search
  if (window.innerWidth < 992) { 
    // is mobile device
    defaultRedirect = '/all' + search
  }
  return defaultRedirect
}
return ( 
<div>
<nav className='navbar navbar-expand-lg navbar-dark fixed-top' style={{ backgroundColor: 'rgb(204, 10, 33)', top: navTop === 0 ? '' : navTop + 'px' }}>
  <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon'></span>
  </button>
  <div style={{width:'100%'}}>
    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-lg-5' data-toggle='collapse' data-target='.navbar-collapse.show'>
            <li className='nav-item mr-lg-3'>
                <Link className={props.location.pathname === '/stats' ? 'nav-link active' : 'nav-link'} to='/stats'>Stats</Link>
            </li>
            <li className='nav-item mr-lg-3'>
                <Link className={props.location.pathname === '/profile' ? 'nav-link active' : 'nav-link'} to='/profile'>Profile</Link>
            </li>
            <li className='nav-item mr-lg-3'>
                <Link className={props.location.pathname === '/spells' ? 'nav-link active' : 'nav-link'} to='/spells'>Spells</Link>
            </li>
            <li className='nav-item mr-lg-3'>
                <Link className={props.location.pathname === '/all' ? 'nav-link active' : 'nav-link'} to='/all'>All</Link>
            </li>
        </ul>
        <ul className='navbar-nav ml-auto mr-lg-5' data-target='.navbar-collapse.show'>
            <li className='nav-item mr-lg-3'>

                <label htmlFor='currentSheet' className='text-white'>Selected Character Sheet:</label>
                <select className="btn-dark ml-2 form-select form-select-lg" name="currentSheet" id="currentSheet" onChange={() => LoadCharacterSheet()}>
                  {
                    ConstructList()
                  }
                </select>
            
              <button className='btn btn-success' onClick={() => SaveAsNewCharacterSheet()}>Save as new</button>
              <button className='btn btn-success' onClick={() => UpdateCharacterSheet()}>Update sheet</button>
              <button className='btn btn-danger' onClick={() => DeleteCharacterSheet()}>Destroy Sheet</button>
              <button className='btn btn-danger' onClick={() => clearCharacter()}>Clear</button>
              <button className='btn btn-dark' onClick={() => document.getElementById("selectFiles")?.click()}>Import</button>
              <input style={{display: 'none'}} type="file" id="selectFiles" accept="application/json" onChange={(e) => importCharacter(e)} />
              <button className='btn btn-dark' onClick={() => exportCharacter()}>Export</button>
              <button className='btn btn-dark' onClick={() => window.print()}>Print</button>
            </li>
        </ul>
    </div>
  </div>
</nav>
<div className='app-holder'>
<Switch>
  <Route exact path='/'>
    <ScrollToTop />
    <Redirect to={getDefaultRedirect(search)} />
  </Route>
  <Route exact path='/stats'>
    <ScrollToTop />
    {statsSheet}
  </Route>
  <Route exact path='/profile'>
    <ScrollToTop />
    {profileSheet}
  </Route>
  <Route exact path='/spells'>
    <ScrollToTop />
    {spellSheet}
  </Route>
  <Route exact path='/all'>
    <ScrollToTop />
    {statsSheet}
    <div className='page-break' />
    <div className='page-space' />
    {profileSheet}
    <div className='page-break' />
    <div className='page-space' />
    {spellSheet}
  </Route>
</Switch>
</div>
<footer className="no-print page-footer font-small text-white pt-4" style={{ backgroundColor: 'rgb(151, 19, 21)' }}>
<div className="container-fluid container-xl text-center text-md-left mt-2 mb-3">
    <div className="row">
      <div className="col-md-6 mt-md-0 mt-3">
        <h5>Uinderal Character Sheets</h5>
        <p>This page was created with the help of dnd-character-sheets, an open source ReactJs library.</p>
      </div>
      <hr className="clearfix w-100 d-md-none pb-3" />
      <div className="col-md-3 mb-md-0 mb-3">
        <h5>Links</h5>
        <ul className="list-unstyled">
          <li>
            <a href="https://github.com/darylbuckle/dnd-character-sheets">Source Code</a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/dnd-character-sheets">Npm</a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 mb-md-0 mb-3">
        <h5>Related</h5>
        <ul className="list-unstyled">
          <li>
            <a href="https://Calvery.ca">Calvery.ca</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
<div className="footer-copyright text-center mt-5 py-2 text-white small" style={{ backgroundColor: 'rgb(204, 10, 33)' }}>
  Simon-Olivier "BobCalvery" Lachance-Gagné - 2022
</div>
</footer>
</div>


)
}

export default withRouter(App)