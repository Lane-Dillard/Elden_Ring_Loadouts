import { useState } from "react";
import { ChestList } from "./chestList";
import { GauntletsList } from "./gauntletsList";
import { GreavesList } from "./greavesList";
import { HelmList } from "./helmList";
import { WeaponList } from "./weaponList";
import { SelectedItemImage } from "./thatsAImage";
import { saveLoadout } from "../../../services/loadoutService";
import { TalismanList } from "./talismanList";
import '/root/workspace/Elden_Ring_Loadouts/src/styles/create.css';
import { useNavigate } from "react-router-dom";

export const LoadoutPage = () => {
    const [selectedWeapon1, setSelectedWeapon1] = useState(null);
    const [selectedWeapon2, setSelectedWeapon2] = useState(null);
    const [selectedHelm, setSelectedHelm] = useState(null);
    const [selectedChest, setSelectedChest] = useState(null);
    const [selectedGauntlets, setSelectedGauntlets] = useState(null);
    const [selectedGreaves, setSelectedGreaves] = useState(null);
    const [selectedTalisman, setSelectedTalisman] = useState(null);
    const [loadoutName, setLoadoutName] = useState('');
    const [mostRecentSelection, setMostRecentSelection] = useState(null);
    const navigate = useNavigate()

    const handleSelectWeapon1 = (weapon) => {
        setSelectedWeapon1(weapon);
        setMostRecentSelection(weapon);
    };

    const handleSelectWeapon2 = (weapon) => {
        setSelectedWeapon2(weapon);
        setMostRecentSelection(weapon);
    };

    const handleSelectHelm = (helm) => {
        setSelectedHelm(helm);
        setMostRecentSelection(helm);
    };

    const handleSelectChest = (chest) => {
        setSelectedChest(chest);
        setMostRecentSelection(chest);
    };

    const handleSelectGauntlets = (gauntlets) => {
        setSelectedGauntlets(gauntlets);
        setMostRecentSelection(gauntlets);
    };

    const handleSelectGreaves = (greaves) => {
        setSelectedGreaves(greaves);
        setMostRecentSelection(greaves);
    };

    const handleSelectTalisman = (talisman) => {
        setSelectedTalisman(talisman);
        setMostRecentSelection(talisman);
    };

    const handleCreateLoadout = () => {
        const user = JSON.parse(localStorage.getItem('eldenRing_user'));
        if (user && user.id) {
            const newLoadout = {
                userId: user.id,
                name: loadoutName,
                weapon1Id: selectedWeapon1?.id,
                weapon2Id: selectedWeapon2?.id,
                helmetId: selectedHelm?.id,
                chestId: selectedChest?.id,
                gauntletsId: selectedGauntlets?.id,
                greavesId: selectedGreaves?.id,
                talismanId: selectedTalisman?.id
            };

            console.log("Creating loadout:", newLoadout);

            saveLoadout(newLoadout).then(response => {
                if (response.success) {
                    alert("Loadout created successfully!");
                }
            });
            navigate(`/user/loadouts`)
        }
    };

    return (
        <div className="container">
            <h1>Build Your Loadout</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    height: '300px', 
                    alignContent: 'center', 
                    border: '5px solid rgba(212, 175, 55, 1)',
                    margin: '5px'
                }}>
                    <SelectedItemImage item={mostRecentSelection} />
                </div>
                <div>
                    <section>
                        <h2>Weapons</h2>
                        <WeaponList onSelectWeapon1={handleSelectWeapon1} onSelectWeapon2={handleSelectWeapon2} />
                    </section>

                    <section>
                        <h2>Helmets</h2>
                        <HelmList onSelectHelm={handleSelectHelm} />
                    </section>

                    <section>
                        <h2>Chest Armor</h2>
                        <ChestList onSelectChest={handleSelectChest} />
                    </section>

                    <section>
                        <h2>Gauntlets</h2>
                        <GauntletsList onSelectGauntlet={handleSelectGauntlets} />
                    </section>

                    <section>
                        <h2>Greaves</h2>
                        <GreavesList onSelectGreave={handleSelectGreaves} />
                    </section>
                    <section>
                        <h2>Talisman</h2>
                        <TalismanList onSelectTalisman={handleSelectTalisman}/>
                    </section>

                    <div className="input-name">
                        <label>
                            Loadout Name:
                            <input
                                type="text"
                                value={loadoutName}
                                onChange={(e) => setLoadoutName(e.target.value)}
                                placeholder="Enter loadout name"
                            />
                        </label>
                    </div>

                    <button onClick={handleCreateLoadout} className="creating">Create Loadout</button>
                    
                </div>
                <div>
                    <p className="UPDATE">There will be a list that will show minimum requirements for the loadout in the future</p>
                </div>
            </div>
        </div>
    );
};
