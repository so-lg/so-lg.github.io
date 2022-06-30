import React, { useState, useEffect } from 'react';
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
import { DnDCharacterStatsSheet, DnDCharacterProfileSheet, DnDCharacterSpellSheet, DnDCharacter } from 'dnd-character-sheets';
import 'dnd-character-sheets/dist/index.css';
import { resolve } from 'node:path/win32';



function ScrollToTop() {
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);

return null;
}


initDB(DBConfig);


export function PanelExample() {
const db = useIndexedDB('Character');
return (<div>{JSON.stringify(db)}</div>);
}

const App: React.FC = (props: any) => {
const { getByID } = useIndexedDB('Character');
const [character, setCharacter] = useState<DnDCharacter>(loadDefaultCharacter())
const [navTop, setNavTop] = useState<number>(0)
const [prevScrollpos, setPrevScrollpos] = useState<number>(window.pageYOffset)
const [, setLoading] = useState<boolean>(false)
const [sk, setSK] = useState<JSON>();
const { search } = useLocation();
useEffect(() => {
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
  character = JSON.parse(lsData)
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
  const { add } = useIndexedDB('Character');
  const json = JSON.parse(JSON.stringify(character, null, 2));
  var promptedSheetKey = RequestSheetKey();
  if(promptedSheetKey == undefined){
    alert("Operation Aborted: The Key provided was undefined.")
    return;
  }
  const handleClick = () => {
    add({name:json.name, classLevel:json.classLevel, background:json.background, playerName:json.playerName, faction:json.faction, race:json.race, alignment:json.alignment, xp:json.xp, dciNo:json.dciNo, str:json.str, dex:json.dex, con:json.con, int:json.int, wis:json.wis, cha:json.cha, inspiration:json.inspiration, proficiencyBonus:json.proficiencyBonus, strSave:json.strSave, strSaveChecked:json.strSaveChecked, dexSave:json.dexSave, dexSaveChecked:json.dexSaveChecked, conSave:json.conSave, conSaveChecked:json.conSaveChecked, intSave:json.intSave, intSaveChecked:json.intSaveChecked, wisSave:json.wisSave, wisSaveChecked:json.wisSaveChecked, chaSave:json.chaSave, chaSaveChecked:json.chaSaveChecked, skillAcrobatics:json.skillAcrobatics, skillAcrobaticsChecked:json.skillAcrobaticsChecked, skillAnimalHandling:json.skillAnimalHandling, skillAnimalHandlingChecked:json.skillAnimalHandlingChecked, skillArcana:json.skillArcana, skillArcanaChecked:json.skillArcanaChecked, skillAthletics:json.skillAthletics, skillAthleticsChecked:json.skillAthleticsChecked, skillDeception:json.skillDeception, skillDeceptionChecked:json.skillDeceptionChecked, skillHistory:json.skillHistory, skillHistoryChecked:json.skillHistoryChecked, skillInsight:json.skillInsight, skillInsightChecked:json.skillInsightChecked, skillIntimidation:json.skillIntimidation, skillIntimidationChecked:json.skillIntimidationChecked, skillInvestigation:json.skillInvestigation, skillInvestigationChecked:json.skillInvestigationChecked, skillMedicine:json.skillMedicine, skillMedicineChecked:json.skillMedicineChecked, skillNature:json.skillNature, skillNatureChecked:json.skillNatureChecked, skillPerception:json.skillPerception, skillPerceptionChecked:json.skillPerceptionChecked, skillPerformance:json.skillPerformance, skillPerformanceChecked:json.skillPerformanceChecked, skillPersuasion:json.skillPersuasion, skillPersuasionChecked:json.skillPersuasionChecked, skillReligion:json.skillRegiligion, skillReligionChecked:json.skillReligionChecked, skillSlightOfHand:json.skillSlightofHand, skillSlightOfHandChecked:json.skillSlightOfHandChecked, skillStealth:json.skillStealth, skillStealthChecked:json.skillStealthChecked, skillSurvival:json.skillSurvival, skillSurvivalChecked:json.skillSurvivalChecked, passivePerception:json.passivePerception, otherProficiencies:json.otherProficiencies, ac:json.ac, init:json.init, speed:json.speed, maxHp:json.maxHp, hp:json.hp, tempHp:json.tempHp, hitDiceMax:json.hitDiceMax, hitDice:json.hitDice, deathsaveSuccesses:json.deathsaveSuccesses, deathsaveFailures:json.deathsaveFailures, attacks:json.attacks, attacksText:json.attacksText, cp:json.cp, sp:json.sp, ep:json.ep, gp:json.gp, pp:json.pp, equipment:json.equipment, equipment2:json.equipment2, personalityTraits:json.personalityTraits, ideals:json.ideals, bonds:json.bonds, flaws:json.flaws, featuresTraits:json.featuresTraits, age:json.age, height:json.height, weight:json.weight, eyes:json.eyes, skin:json.skin, hair:json.hair, appearance:json.appearance, backstory:json.backstory, factionImg:json.factionImg, factionRank:json.factionRank, allies:json.allies, allies2:json.allies2, additionalFeatures:json.additionalFeatures, additionalFeatures2:json.additionalFeatures2, totalNonConsumableMagicItems:json.totalNonConsumableMagicItems, treasure:json.treasure, treasure2:json.treasure2, spellcastingClass:json.spellcastingClass, preparedSpellsTotal:json.preparedSpellsTotal, spellSaveDC:json.spellSaveDC, spellAttackBonus:json.spellAttackBonus, cantrips:json.cantrips, lvl1SpellSlotsTotal:json.lvl1SpellSlotsTotal, lvl1SpellSlotsUsed:json.lvl1SpellSlotsUsed, lvl1Spells:json.lvl1Spells, lvl2SpellSlotsTotal:json.lvl2SpellSlotsTotal, lvl2SpellSlotsUsed:json.lvl2SpellSlotsUsed, lvl2Spells:json.lvl2Spells, lvl3SpellSlotsTotal:json.lvl3SpellSlotsTotal, lvl3SpellSlotsUsed:json.lvl3SpellSlotsUsed, lvl3Spells:json.lvl3Spells, lvl4SpellSlotsTotal:json.lvl4SpellSlotsTotal, lvl4SpellSlotsUsed:json.lvl4SpellSlotsUsed, lvl4Spells:json.lvl4Spells, lvl5SpellSlotsTotal:json.lvl5SpellSlotsTotal, lvl5SpellSlotsUsed:json.lvl5SpellSlotsUsed, lvl5Spells:json.lvl5Spells, lvl6SpellSlotsTotal:json.lvl6SpellSlotsTotal, lvl6SpellSlotsUsed:json.lvl6SpellSlotsUsed, lvl6Spells:json.lvl6Spells, lvl7SpellSlotsTotal:json.lvl7SpellSlotsTotal, lvl7SpellSlotsUsed:json.lvl7SpellSlotsUsed, lvl7Spells:json.lvl7Spells, lvl8SpellSlotsTotal:json.lvl8SpellSlotsTotal, lvl8SpellSlotsUsed:json.lvl8SpellSlotsUsed, lvl8Spells:json.lvl8Spells, lvl9SpellSlotsTotal:json.lvl9SpellSlotsTotal, lvl9SpellSlotsUsed:json.lvl9SpellSlotsUsed, lvl9Spells:json.lvl9Spells, sheetKey:promptedSheetKey} 
          ).then(
      event => {
        console.log('ID Generated: Added Character', event.toString());
      },
      error => {
        console.log(error);
      }
    );
  };
  handleClick();
}

function LoadCharacterSheet(){
const { getByID } = useIndexedDB('Character');
var id = ObtainSheetId();
if(id === null){
  alert("The sheet associated to your Key was not found.");
  return;
}
getByID(id).then(characterSheetPromise=>{
  setCharacter(characterSheetPromise);
});
loadCharacter(JSON.stringify(character, null, 2));
}
//Deletes the given sheetKey from the DB
function DeleteCharacterSheet(){
  const { deleteRecord, clear} = useIndexedDB('Character');
  var providedId = ObtainSheetId();
  if(providedId === null){
    alert("The sheet associated to your Key was not found.");
    return;
  }
  deleteRecord(providedId);
  alert("The sheet was deleted.");
}
//Updates the given sheet via sheetKey
function UpdateCharacterSheet(){
  const { update } = useIndexedDB('Character');
  var providedId = ObtainSheetId();
  if(providedId === null){
    alert("The sheet associated to your Key was not found.");
    return;
  }
  const json = JSON.parse(JSON.stringify(character, null, 2));
  const handleClick = () => {
    update({ id:providedId, name:json.name, classLevel:json.classLevel, background:json.background, playerName:json.playerName, faction:json.faction, race:json.race, alignment:json.alignment, xp:json.xp, dciNo:json.dciNo, str:json.str, dex:json.dex, con:json.con, int:json.int, wis:json.wis, cha:json.cha, inspiration:json.inspiration, proficiencyBonus:json.proficiencyBonus, strSave:json.strSave, strSaveChecked:json.strSaveChecked, dexSave:json.dexSave, dexSaveChecked:json.dexSaveChecked, conSave:json.conSave, conSaveChecked:json.conSaveChecked, intSave:json.intSave, intSaveChecked:json.intSaveChecked, wisSave:json.wisSave, wisSaveChecked:json.wisSaveChecked, chaSave:json.chaSave, chaSaveChecked:json.chaSaveChecked, skillAcrobatics:json.skillAcrobatics, skillAcrobaticsChecked:json.skillAcrobaticsChecked, skillAnimalHandling:json.skillAnimalHandling, skillAnimalHandlingChecked:json.skillAnimalHandlingChecked, skillArcana:json.skillArcana, skillArcanaChecked:json.skillArcanaChecked, skillAthletics:json.skillAthletics, skillAthleticsChecked:json.skillAthleticsChecked, skillDeception:json.skillDeception, skillDeceptionChecked:json.skillDeceptionChecked, skillHistory:json.skillHistory, skillHistoryChecked:json.skillHistoryChecked, skillInsight:json.skillInsight, skillInsightChecked:json.skillInsightChecked, skillIntimidation:json.skillIntimidation, skillIntimidationChecked:json.skillIntimidationChecked, skillInvestigation:json.skillInvestigation, skillInvestigationChecked:json.skillInvestigationChecked, skillMedicine:json.skillMedicine, skillMedicineChecked:json.skillMedicineChecked, skillNature:json.skillNature, skillNatureChecked:json.skillNatureChecked, skillPerception:json.skillPerception, skillPerceptionChecked:json.skillPerceptionChecked, skillPerformance:json.skillPerformance, skillPerformanceChecked:json.skillPerformanceChecked, skillPersuasion:json.skillPersuasion, skillPersuasionChecked:json.skillPersuasionChecked, skillReligion:json.skillRegiligion, skillReligionChecked:json.skillReligionChecked, skillSlightOfHand:json.skillSlightofHand, skillSlightOfHandChecked:json.skillSlightOfHandChecked, skillStealth:json.skillStealth, skillStealthChecked:json.skillStealthChecked, skillSurvival:json.skillSurvival, skillSurvivalChecked:json.skillSurvivalChecked, passivePerception:json.passivePerception, otherProficiencies:json.otherProficiencies, ac:json.ac, init:json.init, speed:json.speed, maxHp:json.maxHp, hp:json.hp, tempHp:json.tempHp, hitDiceMax:json.hitDiceMax, hitDice:json.hitDice, deathsaveSuccesses:json.deathsaveSuccesses, deathsaveFailures:json.deathsaveFailures, attacks:json.attacks, attacksText:json.attacksText, cp:json.cp, sp:json.sp, ep:json.ep, gp:json.gp, pp:json.pp, equipment:json.equipment, equipment2:json.equipment2, personalityTraits:json.personalityTraits, ideals:json.ideals, bonds:json.bonds, flaws:json.flaws, featuresTraits:json.featuresTraits, age:json.age, height:json.height, weight:json.weight, eyes:json.eyes, skin:json.skin, hair:json.hair, appearance:json.appearance, backstory:json.backstory, factionImg:json.factionImg, factionRank:json.factionRank, allies:json.allies, allies2:json.allies2, additionalFeatures:json.additionalFeatures, additionalFeatures2:json.additionalFeatures2, totalNonConsumableMagicItems:json.totalNonConsumableMagicItems, treasure:json.treasure, treasure2:json.treasure2, spellcastingClass:json.spellcastingClass, preparedSpellsTotal:json.preparedSpellsTotal, spellSaveDC:json.spellSaveDC, spellAttackBonus:json.spellAttackBonus, cantrips:json.cantrips, lvl1SpellSlotsTotal:json.lvl1SpellSlotsTotal, lvl1SpellSlotsUsed:json.lvl1SpellSlotsUsed, lvl1Spells:json.lvl1Spells, lvl2SpellSlotsTotal:json.lvl2SpellSlotsTotal, lvl2SpellSlotsUsed:json.lvl2SpellSlotsUsed, lvl2Spells:json.lvl2Spells, lvl3SpellSlotsTotal:json.lvl3SpellSlotsTotal, lvl3SpellSlotsUsed:json.lvl3SpellSlotsUsed, lvl3Spells:json.lvl3Spells, lvl4SpellSlotsTotal:json.lvl4SpellSlotsTotal, lvl4SpellSlotsUsed:json.lvl4SpellSlotsUsed, lvl4Spells:json.lvl4Spells, lvl5SpellSlotsTotal:json.lvl5SpellSlotsTotal, lvl5SpellSlotsUsed:json.lvl5SpellSlotsUsed, lvl5Spells:json.lvl5Spells, lvl6SpellSlotsTotal:json.lvl6SpellSlotsTotal, lvl6SpellSlotsUsed:json.lvl6SpellSlotsUsed, lvl6Spells:json.lvl6Spells, lvl7SpellSlotsTotal:json.lvl7SpellSlotsTotal, lvl7SpellSlotsUsed:json.lvl7SpellSlotsUsed, lvl7Spells:json.lvl7Spells, lvl8SpellSlotsTotal:json.lvl8SpellSlotsTotal, lvl8SpellSlotsUsed:json.lvl8SpellSlotsUsed, lvl8Spells:json.lvl8Spells, lvl9SpellSlotsTotal:json.lvl9SpellSlotsTotal, lvl9SpellSlotsUsed:json.lvl9SpellSlotsUsed, lvl9Spells:json.lvl9Spells}).then(event => {
      alert('Your sheet was updated ' + json.playerName + '!');
    });
  };
}
//This function is used for existing sheet keys.
function promptSheetKey(){
  let sheetKey = prompt("Please enter your Sheet Key:", "");
  return sheetKey;
}
//This function is used when creating a new sheet key.
async function RequestSheetKey(){
  const { getByIndex } = useIndexedDB('Character');
  var validKey = false;
  var sheetKey;
  do {
    let sheetKey = await prompt("Please enter the desired Sheet Key, a sheet key is used to access your sheet and should be kept secret. If you lose your sheet key, you lose your sheet, choose carefully:", "");
    getByIndex('sheetKey', sheetKey).then(skPromise=>{
      setSK(skPromise);
    });
    console.log(sk);
    if(sk == undefined){
      validKey = true;
    } else {
      alert("This Sheet Key is unavailable, please pick something else:");
    }
  } while (validKey == false);
  console.log(sheetKey);
  return sheetKey;
}
//Function used to obtain the ID.
function CastSheetKeyToId(sheetKey: string){
  const { getByIndex } = useIndexedDB('Character');
  getByIndex('sheetKey', sheetKey).then(skPromise=>{
    setSK(skPromise);
  });
  if(sk == undefined){
    return null;
  } else {
    return JSON.parse(JSON.stringify(sk, null, 2)).id;
  }
}
//This function is called when attempting to obtain a sheet ID.
function ObtainSheetId(){
  var sheetKey = promptSheetKey();
  if(sheetKey == null)
  {
    alert("The Sheet Key provided was NULL");
    return null;
  }
  console.log(sheetKey);
  var id = CastSheetKeyToId(sheetKey);
  return id;
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

          <ul className='navbar-nav ml-auto mr-lg-5' data-toggle='collapse' data-target='.navbar-collapse.show'>
              <li className='nav-item mr-lg-3'>
                <button className='btn btn-success' onClick={() => SaveAsNewCharacterSheet()}>Save as new</button>
                <button className='btn btn-success' onClick={() => UpdateCharacterSheet()}>Update sheet</button>
                <button className='btn btn-success' onClick={() => LoadCharacterSheet()}>Load sheet</button>
                <button className='btn btn-dark' onClick={() => exportCharacter()}>Export</button>
                <input style={{display: 'none'}} type="file" id="selectFiles" accept="application/json" onChange={(e) => importCharacter(e)} />
                <button className='btn btn-dark' onClick={() => document.getElementById("selectFiles")?.click()}>Import</button>
                <button className='btn btn-dark' onClick={() => window.print()}>Print</button>
                <button className='btn btn-danger' onClick={() => DeleteCharacterSheet()}>Destroy Sheet</button>
                <button className='btn btn-danger' onClick={() => clearCharacter()}>Clear</button>
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
<footer className="no-print page-footer font-small text-white pt-4" style={{ backgroundColor: 'rgb(211, 49, 21)' }}>
  <div className="container-fluid container-xl text-center text-md-left mt-2 mb-3">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5>DnD Character Sheets</h5>
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
    MIT © Daryl Buckle 2020
  </div>
</footer>
</div>

)
}

export default withRouter(App)