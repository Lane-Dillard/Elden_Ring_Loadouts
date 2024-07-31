import { useState } from "react"
import { ChestList } from "./chestList"
import { GauntletsList } from "./gauntletsList"
import { GreavesList } from "./greavesList"
import { HelmList } from "./helmList"
import { WeaponList } from "./weaponList"
import { SelectedItemImage } from "./thatsAImage"
import { saveLoadout } from "../../../services/loadoutService"


export const LoadoutPage = () => {
    const [selectedWeapon1, setSelectedWeapon1] = useState(null);
    const [selectedWeapon2, setSelectedWeapon2] = useState(null);
    const [selectedHelm, setSelectedHelm] = useState(null);
    const [selectedChest, setSelectedChest] = useState(null);
    const [selectedGauntlets, setSelectedGauntlets] = useState(null);
    const [selectedGreaves, setSelectedGreaves] = useState(null);
    const [loadoutName, setLoadoutName] = useState('')
    const [mostRecentSelection, setMostRecentSelection] = useState(null);


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
                greavesId: selectedGreaves?.id
            };

            console.log("Creating loadout:", newLoadout);

            saveLoadout(newLoadout).then(response => {
                if (response.success) {
                    alert("Loadout created successfully!");
                }
            });
        }
    };

    return (
        <div>
            <h1>Build Your Loadout</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SelectedItemImage item={mostRecentSelection} />
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

                    <div>
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

                    <button onClick={handleCreateLoadout}>Create Loadout</button>
                </div>
            </div>
        </div>
    );
};