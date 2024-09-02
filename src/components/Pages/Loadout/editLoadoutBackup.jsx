import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoadoutById, updateLoadout } from "../../../services/loadoutService";
import { WeaponList } from "./weaponList";
import { HelmList } from "./helmList";
import { ChestList } from "./chestList";
import { GauntletsList } from "./gauntletsList";
import { GreavesList } from "./greavesList";
import { SelectedItemImage } from "./thatsAImage";
import { TalismanList } from "./talismanList";

const EditLoadout = () => {
    const { loadoutId } = useParams();
    const navigate = useNavigate();
    const [loadout, setLoadout] = useState(null);
    const [newName, setNewName] = useState("");
    const [selectedWeapon1, setSelectedWeapon1] = useState(null);
    const [selectedWeapon2, setSelectedWeapon2] = useState(null);
    const [selectedHelm, setSelectedHelm] = useState(null);
    const [selectedChest, setSelectedChest] = useState(null);
    const [selectedGauntlets, setSelectedGauntlets] = useState(null);
    const [selectedGreaves, setSelectedGreaves] = useState(null);
    const [selectedTalisman, setSelectedTalisman] = useState(null)
    const [userId, setUserId] = useState(null);
    const [mostRecentSelection, setMostRecentSelection] = useState(null); // State for the most recent selection

    useEffect(() => {
        getLoadoutById(loadoutId).then(data => {
            setLoadout(data);
            console.log('Fetched loadout:', data);
            setNewName(data.name || "");
            setSelectedWeapon1(data.weapon1Id || null);
            setSelectedWeapon2(data.weapon2Id || null);
            setSelectedHelm(data.helmetId || null);
            setSelectedChest(data.chestId || null);
            setSelectedGauntlets(data.gauntletsId || null);
            setSelectedGreaves(data.greavesId || null);
            setSelectedTalisman()
            setUserId(data.userId || null);
        });
    }, [loadoutId]);

    const handleSave = () => {
        const updatedLoadout = {
            name: newName,
            weapon1Id: selectedWeapon1?.id,
            weapon2Id: selectedWeapon2?.id,
            helmetId: selectedHelm?.id,
            chestId: selectedChest?.id,
            gauntletsId: selectedGauntlets?.id,
            greavesId: selectedGreaves?.id,
            talismanId: selectedTalisman?.id,
            userId: userId
        };

        updateLoadout(loadoutId, updatedLoadout).then((response) => {
            if (response.success) {
                alert("Loadout updated successfully!");
                navigate('/');
            }
        });

        navigate(`/user/loadouts`)
    };

    if (!loadout) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Loadout</h1>
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
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                        placeholder="Loadout Name"
                    />
                    <div>
                        <h2>Weapons</h2>
                        <WeaponList 
                            selectedWeapon1={selectedWeapon1} 
                            selectedWeapon2={selectedWeapon2}
                            onSelectWeapon1={(weapon) => {
                                setSelectedWeapon1(weapon);
                                setMostRecentSelection(weapon);
                            }} 
                            onSelectWeapon2={(weapon) => {
                                setSelectedWeapon2(weapon);
                                setMostRecentSelection(weapon);
                            }} 
                        />
                    </div>
                    <div>
                        <h2>Helmets</h2>
                        <HelmList 
                            selectedHelm={selectedHelm} 
                            onSelectHelm={(helm) => {
                                setSelectedHelm(helm);
                                setMostRecentSelection(helm);
                            }} 
                        />
                    </div>
                    <div>
                        <h2>Chest Armor</h2>
                        <ChestList 
                            selectedChest={selectedChest} 
                            onSelectChest={(chest) => {
                                setSelectedChest(chest);
                                setMostRecentSelection(chest);
                            }} 
                        />
                    </div>
                    <div>
                        <h2>Gauntlets</h2>
                        <GauntletsList 
                            selectedGauntlets={selectedGauntlets} 
                            onSelectGauntlet={(gauntlets) => {
                                setSelectedGauntlets(gauntlets);
                                setMostRecentSelection(gauntlets);
                            }} 
                        />
                    </div>
                    <div>
                        <h2>Greaves</h2>
                        <GreavesList 
                            selectedGreaves={selectedGreaves} 
                            onSelectGreave={(greaves) => {
                                setSelectedGreaves(greaves);
                                setMostRecentSelection(greaves);
                            }} 
                        />
                    </div>
                    <div>
                        <h2>Talisman</h2>
                        <TalismanList
                            selectedTalisman = {selectedTalisman}
                            onSelectTalisman={(talisman) => {
                                setSelectedTalisman(talisman)
                                setMostRecentSelection(talisman)
                            }}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
                    <div>
                        <p>There will be a list that will show minimum requirements for the loadout in the future</p>
                    </div>
            </div>
        </div>
    );
};

export default EditLoadout;