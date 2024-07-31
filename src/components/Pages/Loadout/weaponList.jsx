import { useState, useEffect } from "react"
import { getAllWeapons } from "../../../services/letsGetThisService"


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
        onSelectWeapon1(allWeapons.find(weapon => weapon.id == selectedId)); // Pass the full object up
    }

    const handleChange2 = (event) => {
        const selectedId = event.target.value;
        setSelectedWeapon2(selectedId);
        onSelectWeapon2(allWeapons.find(weapon => weapon.id == selectedId)); // Pass the full object up
    }

    return (
        <div>
            <div>
                <select value={selectedWeapon1} onChange={handleChange1}>
                    <option value="">Select a weapon</option>
                    {allWeapons.map((weapon) => (
                        <option key={weapon.id} value={weapon.id}>
                            {weapon.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
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
