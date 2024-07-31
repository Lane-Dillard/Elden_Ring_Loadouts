import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLoadoutById, updateLoadout } from "../../../services/loadoutService"
import { WeaponList } from "./weaponList";
import { HelmList } from "./helmList";
import { ChestList } from "./chestList";
import { GauntletsList } from "./gauntletsList";
import { GreavesList } from "./greavesList";

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
    const [userId, setUserId] = useState(null); // Add state for userId

    useEffect(() => {
        getLoadoutById(loadoutId).then(data => {
            setLoadout(data);
            console.log('Fetched loadout:', data)
            setNewName(data.name || "");
            setSelectedWeapon1(data.weapon1Id || null);
            setSelectedWeapon2(data.weapon2Id || null);
            setSelectedHelm(data.helmetId || null);
            setSelectedChest(data.chestId || null);
            setSelectedGauntlets(data.gauntletsId || null);
            setSelectedGreaves(data.greavesId || null);
            setUserId(data.userId || null); // Capture userId
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
            userId: userId // Include userId in update payload
        };

        updateLoadout(loadoutId, updatedLoadout).then((response) => {
            if (response.success) {
                alert("Loadout updated successfully!");
                navigate('/');
            }
        });
    };

    if (!loadout) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Loadout</h1>
            <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
            />
            <div>
                <h2>Weapons</h2>
                <WeaponList 
                    selectedWeapon1={selectedWeapon1} 
                    selectedWeapon2={selectedWeapon2}
                    onSelectWeapon1={setSelectedWeapon1} 
                    onSelectWeapon2={setSelectedWeapon2} 
                />
            </div>
            <div>
                <h2>Helmets</h2>
                <HelmList 
                    selectedHelm={selectedHelm} 
                    onSelectHelm={setSelectedHelm} 
                />
            </div>
            <div>
                <h2>Chest Armor</h2>
                <ChestList 
                    selectedChest={selectedChest} 
                    onSelectChest={setSelectedChest} 
                />
            </div>
            <div>
                <h2>Gauntlets</h2>
                <GauntletsList 
                    selectedGauntlets={selectedGauntlets} 
                    onSelectGauntlet={setSelectedGauntlets} 
                />
            </div>
            <div>
                <h2>Greaves</h2>
                <GreavesList 
                    selectedGreaves={selectedGreaves} 
                    onSelectGreave={setSelectedGreaves} 
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default EditLoadout;
