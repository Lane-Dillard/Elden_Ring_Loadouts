import React, { useState, useEffect, useCallback } from 'react';
import { deleteLoadout, getUserLoadoutsWithDetails } from '../../../services/loadoutService';
import { useNavigate } from 'react-router-dom';
import '/root/workspace/Elden_Ring_Loadouts/src/styles/usersLoadouts.css';

const UserLoadouts = () => {
    const [loadouts, setLoadouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('eldenRing_user'));
        if (user && user.id) {
            getUserLoadoutsWithDetails(user.id).then((data) => {
                console.log("Fetched loadouts with details:", data);
                setLoadouts(data);
            });
        }
    }, []);

    const handleDelete = useCallback(async (loadoutId) => {
        try {
            await deleteLoadout(loadoutId);
            setLoadouts(loadouts.filter(loadout => loadout.id !== loadoutId));

        } catch (error) {
            alert("Failed to delete loadout.");
        }
    }, [loadouts]);

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
                        <li key={loadout.id} className="loadout-item">
                            <div className="loadout-header">
                                <h2 className="loadout-name">{loadout.name}</h2>
                                <div className="loadout-actions">
                                    <button onClick={() => handleEdit(loadout.id)} className='button'>Edit</button>
                                    <button onClick={() => handleDelete(loadout.id)} className='button'>Delete</button>
                                </div>
                            </div>
                            <div className="loadout-grid">
                                {loadout.weapon1 && (
                                    <div>
                                        <img src={loadout.weapon1.image} alt={loadout.weapon1.name} />
                                    </div>
                                )}
                                {loadout.weapon2 && (
                                    <div>
                                        <img src={loadout.weapon2.image} alt={loadout.weapon2.name} />
                                    </div>
                                )}
                                {loadout.helmet && (
                                    <div>
                                        <img src={loadout.helmet.image} alt={loadout.helmet.name} />
                                    </div>
                                )}
                                {loadout.chest && (
                                    <div>
                                        <img src={loadout.chest.image} alt={loadout.chest.name} />
                                    </div>
                                )}
                                {loadout.gauntlets && (
                                    <div>
                                        <img src={loadout.gauntlets.image} alt={loadout.gauntlets.name} />
                                    </div>
                                )}
                                {loadout.greaves && (
                                    <div>
                                        <img src={loadout.greaves.image} alt={loadout.greaves.name} />
                                    </div>
                                )}
                                {loadout.talisman && (
                                    <div>
                                        <img src={loadout.talisman.image} alt={loadout.talisman.name} />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserLoadouts;


