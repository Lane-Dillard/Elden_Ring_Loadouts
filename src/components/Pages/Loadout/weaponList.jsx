import React, { useState, useEffect } from "react";
import { getAllWeapons } from "../../../services/letsGetThisService";
import '/root/workspace/Elden_Ring_Loadouts/src/styles/WeaponList.css'

export const WeaponList = ({ onSelectWeapon1, onSelectWeapon2 }) => {
    const [allWeapons, setAllWeapons] = useState([]);
    const [selectedWeapon1, setSelectedWeapon1] = useState('');
    const [selectedWeapon2, setSelectedWeapon2] = useState('');

    useEffect(() => {
        getAllWeapons().then((weaponArray) => {
            setAllWeapons(weaponArray);
        });
    }, []);

    const handleChange1 = (event) => {
        const selectedId = event.target.value;
        setSelectedWeapon1(selectedId);
        onSelectWeapon1(allWeapons.find(weapon => weapon.id == selectedId));
    }

    const handleChange2 = (event) => {
        const selectedId = event.target.value;
        setSelectedWeapon2(selectedId);
        onSelectWeapon2(allWeapons.find(weapon => weapon.id == selectedId));
    }

    return (
        <div className="weapon-list-container">
            <div className="weapon-select">
                <select value={selectedWeapon1} onChange={handleChange1}>
                    <option value="">Select a weapon</option>
                    {allWeapons.map((weapon) => (
                        <option key={weapon.id} value={weapon.id}>
                            {weapon.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="weapon-select">
                <select value={selectedWeapon2} onChange={handleChange2}>
                    <option value="">Select a weapon</option>
                    {allWeapons.map((weapon) => (
                        <option key={weapon.id} value={weapon.id}>
                            {weapon.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

