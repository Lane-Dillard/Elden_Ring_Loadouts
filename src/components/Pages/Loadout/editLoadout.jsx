import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItems, getLoadoutById, getLoadoutDetails, updateLoadout } from "../../../services/loadoutService";
import { WeaponList } from "./weaponList";
import { HelmList } from "./helmList";
import { ChestList } from "./chestList";
import { GauntletsList } from "./gauntletsList";
import { GreavesList } from "./greavesList";
import { SelectedItemImage } from "./thatsAImage";
import { TalismanList } from "./talismanList";
import '/root/workspace/Elden_Ring_Loadouts/src/styles/editLoadout.css'

const EditLoadout = () => {
    const [loadout, setLoadout] = useState(null);
    const [items, setItems] = useState({
        weapons: [],
        helmets: [],
        chest: [],
        gauntlets: [],
        greaves: [],
        talismans: []
    });
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const { loadoutId } = useParams();

    useEffect(() => {
        getLoadoutDetails(loadoutId).then((data) => {
            setLoadout(data);

            if (data.weapon1) setSelectedItem(data.weapon1);
            if (data.weapon2) setSelectedItem(data.weapon2);
            if (data.helmet) setSelectedItem(data.helmet);
            if (data.chest) setSelectedItem(data.chest);
            if (data.gauntlets) setSelectedItem(data.gauntlets);
            if (data.greaves) setSelectedItem(data.greaves);
            if (data.talisman) setSelectedItem(data.talisman);
        });

        getItems().then((data) => {
            setItems(data);
        });
    }, [loadoutId]);

    const handleSelectionChange = (type, id) => {
        // Map loadout keys to the corresponding items keys
        const typeMapping = {
            weapon1: 'weapons',
            weapon2: 'weapons',
            helmet: 'helmets',
            chest: 'chest',
            gauntlets: 'gauntlets',
            greaves: 'greaves',
            talisman: 'talismans'
        };
    
        const mappedType = typeMapping[type];
    
        if (!mappedType) {
            console.error(`Invalid type: ${type}`);
            return;
        }
    
        const itemList = items[mappedType];
    
        if (!itemList) {
            console.error(`Item list not found for type: ${mappedType}`);
            return;
        }
    
        const selected = itemList.find(item => item.id === parseInt(id));
    
        if (!selected) {
            console.error(`Item with id ${id} not found in ${mappedType}`);
            return;
        }
    
        console.log('Selected Item:', selected);
        console.log('Loadout Before:', loadout);
    
        setSelectedItem(selected);
    
        setLoadout(prevLoadout => {
            const updatedLoadout = {
                ...prevLoadout,
                [type]: selected
            };
            console.log('Loadout After:', updatedLoadout);
            return updatedLoadout;
        });
    };
    

    const handleSave = () => {
        const updatedLoadout = {
            name: loadout.name,
            weapon1Id: loadout.weapon1?.id,
            weapon2Id: loadout.weapon2?.id,
            helmetId: loadout.helmet?.id,
            chestId: loadout.chest?.id,
            gauntletsId: loadout.gauntlets?.id,
            greavesId: loadout.greaves?.id,
            talismanId: loadout.talisman?.id,
            userId: loadout.userId
        };

        updateLoadout(loadoutId, updatedLoadout).then((response) => {
            if (response.success) {
                alert("Loadout updated successfully!");
                
            }
        });
        navigate('/user/loadouts');
    };

    const handleCancel = () => {
        navigate('/user/loadouts');
    };

    return (
        <div className="edit-loadout-container">
            <h1>Edit Loadout</h1>
            {loadout && (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        height: '300px', 
                        width: '300px', 
                        border: '5px solid rgba(212, 175, 55, 1)',
                        margin: '5px'
                    }}>
                        {selectedItem && <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                    </div>
                    <form className="edit-loadout-form">
                        <div className="form-group">
                            <label htmlFor="loadoutName">Loadout Name</label>
                            <input 
                                type="text" 
                                id="loadoutName" 
                                value={loadout.name} 
                                onChange={(e) => setLoadout({ ...loadout, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weapon1">Weapon 1</label>
                            <select 
                                id="weapon1" 
                                value={loadout.weapon1?.id || ''} 
                                onChange={(e) => handleSelectionChange('weapon1', e.target.value)}
                            >
                                {items.weapons.map((weapon) => (
                                    <option key={weapon.id} value={weapon.id}>{weapon.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="weapon2">Weapon 2</label>
                            <select 
                                id="weapon2" 
                                value={loadout.weapon2?.id || ''} 
                                onChange={(e) => handleSelectionChange('weapon2', e.target.value)}
                            >
                                {items.weapons.map((weapon) => (
                                    <option key={weapon.id} value={weapon.id}>{weapon.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="helmet">Helmet</label>
                            <select 
                                id="helmet" 
                                value={loadout.helmet?.id || ''} 
                                onChange={(e) => handleSelectionChange('helmet', e.target.value)}
                            >
                                {items.helmets.map((helmet) => (
                                    <option key={helmet.id} value={helmet.id}>{helmet.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="chest">Chest</label>
                            <select 
                                id="chest" 
                                value={loadout.chest?.id || ''} 
                                onChange={(e) => handleSelectionChange('chest', e.target.value)}
                            >
                                {items.chest.map((chest) => (
                                    <option key={chest.id} value={chest.id}>{chest.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gauntlets">Gauntlets</label>
                            <select 
                                id="gauntlets" 
                                value={loadout.gauntlets?.id || ''} 
                                onChange={(e) => handleSelectionChange('gauntlets', e.target.value)}
                            >
                                {items.gauntlets.map((gauntlet) => (
                                    <option key={gauntlet.id} value={gauntlet.id}>{gauntlet.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="greaves">Greaves</label>
                            <select 
                                id="greaves" 
                                value={loadout.greaves?.id || ''} 
                                onChange={(e) => handleSelectionChange('greaves', e.target.value)}
                            >
                                {items.greaves.map((greave) => (
                                    <option key={greave.id} value={greave.id}>{greave.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="talisman">Talisman</label>
                            <select 
                                id="talisman" 
                                value={loadout.talisman?.id || ''} 
                                onChange={(e) => handleSelectionChange('talisman', e.target.value)}
                            >
                                {items.talismans.map((talisman) => (
                                    <option key={talisman.id} value={talisman.id}>{talisman.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={handleSave} className="save-button">Save</button>
                            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditLoadout;