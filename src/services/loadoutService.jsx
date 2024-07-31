export const getUserLoadouts = (userId) => {
    return fetch(`http://localhost:8088/eldenLoadouts?userId=${userId}&_expand=weapon1Id&_expand=weapon2Id&_expand=helmetId&_expand=chestId&_expand=gauntletsId&_expand=greavesId
`).then((res) => res.json());
};

export const getUserLoadoutsWithDetails = (userId) => {
    return fetch(`http://localhost:8088/eldenLoadouts?userId=${userId}`)
        .then(res => res.json())
        .then(loadouts => {
            const loadoutPromises = loadouts.map(loadout => {
                return Promise.all([
                    fetch(`http://localhost:8088/eldenWeapons/${loadout.weapon1Id}`).then(res => res.json()),
                    fetch(`http://localhost:8088/eldenWeapons/${loadout.weapon2Id}`).then(res => res.json()),
                    fetch(`http://localhost:8088/eldenHelmets/${loadout.helmetId}`).then(res => res.json()),
                    fetch(`http://localhost:8088/eldenChest/${loadout.chestId}`).then(res => res.json()),
                    fetch(`http://localhost:8088/eldenGauntlets/${loadout.gauntletsId}`).then(res => res.json()),
                    fetch(`http://localhost:8088/eldenGreaves/${loadout.greavesId}`).then(res => res.json())
                ]).then(([weapon1, weapon2, helmet, chest, gauntlets, greaves]) => ({
                    ...loadout,
                    weapon1,
                    weapon2,
                    helmet,
                    chest,
                    gauntlets,
                    greaves
                }));
            });
            return Promise.all(loadoutPromises);
        });
};

  export const saveLoadout = (loadout) => {
    return fetch('http://localhost:8088/eldenLoadouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadout)
    }).then(res => res.json());
};



export const deleteLoadout = (loadoutId) => {
    return fetch(`http://localhost:8088/eldenLoadouts/${loadoutId}`, {
        method: 'DELETE',
    }).then((res) => res.json());
};

export const updateLoadout = (loadoutId, updatedData) => {
    return fetch(`http://localhost:8088/eldenLoadouts/${loadoutId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    }).then((res) => res.json())
}

export const getLoadoutById = (id) => {
    return fetch(`http://localhost:8088/eldenLoadouts/${id}`)
        .then(response => response.json()) // Parse JSON here
        .then(data => {
            // Debugging log
            console.log('Fetched loadout:', data);
            return data;
        });
};
