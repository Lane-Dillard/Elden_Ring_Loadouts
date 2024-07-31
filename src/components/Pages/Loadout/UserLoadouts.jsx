import React, { useState, useEffect } from 'react';
import { deleteLoadout, getUserLoadoutsWithDetails } from '../../../services/loadoutService';
import { useNavigate } from 'react-router-dom';

const UserLoadouts = () => {
    const [loadouts, setLoadouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('eldenRing_user'));
        if (user && user.id) {
            getUserLoadoutsWithDetails(user.id).then((data) => {
                console.log("Fetched loadouts with details:", data); // Log the data to check the structure
                setLoadouts(data);
            });
        }
    }, []);

    const handleDelete = (loadoutId) => {
        deleteLoadout(loadoutId).then((response) => {
            if (response.success) {
                setLoadouts(loadouts.filter(loadout => loadout.id !== loadoutId));
                alert("Loadout deleted successfully!");
            } else {
                alert("Failed to delete loadout.");
            }
        });
    };

    const handleEdit = (loadoutId) => {
        navigate(`/edit/${loadoutId}`);
    };

    
    return (
        <div>
            <h1>Your Loadouts</h1>
            {loadouts.length === 0 ? (
                <p>No loadouts found.</p>
            ) : (
                <ul>
                    {loadouts.map((loadout) => (
                        <li key={loadout.id}>
                            <h2>{loadout.name}</h2>
                            <div>
                                <h3>Weapons</h3>
                                {loadout.weapon1 && (
                                    <div>
                                        <h4>{loadout.weapon1.name}</h4>
                                        <img src={loadout.weapon1.image} alt={loadout.weapon1.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                                {loadout.weapon2 && (
                                    <div>
                                        <h4>{loadout.weapon2.name}</h4>
                                        <img src={loadout.weapon2.image} alt={loadout.weapon2.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3>Helmet</h3>
                                {loadout.helmet && (
                                    <div>
                                        <h4>{loadout.helmet.name}</h4>
                                        <img src={loadout.helmet.image} alt={loadout.helmet.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3>Chest Armor</h3>
                                {loadout.chest && (
                                    <div>
                                        <h4>{loadout.chest.name}</h4>
                                        <img src={loadout.chest.image} alt={loadout.chest.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3>Gauntlets</h3>
                                {loadout.gauntlets && (
                                    <div>
                                        <h4>{loadout.gauntlets.name}</h4>
                                        <img src={loadout.gauntlets.image} alt={loadout.gauntlets.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3>Greaves</h3>
                                {loadout.greaves && (
                                    <div>
                                        <h4>{loadout.greaves.name}</h4>
                                        <img src={loadout.greaves.image} alt={loadout.greaves.name} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => handleEdit(loadout.id)}>Edit</button>
                            <button onClick={() => handleDelete(loadout.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserLoadouts;
