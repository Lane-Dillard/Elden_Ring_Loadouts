export const getAllWeapons = () => {
    return fetch('http://localhost:8088/eldenWeapons').then((res) => res.json())
}

export const getAllHelms = () => {
    return fetch('http://localhost:8088/eldenHelmets').then((res) => res.json())
}

export const getAllChests = () => {
    return fetch('http://localhost:8088/eldenChest').then((res) => res.json())
}

export const getAllGauntlets = () => {
    return fetch('http://localhost:8088/eldenGauntlets').then((res) => res.json())
}

export const getAllGreaves = () => {
    return fetch('http://localhost:8088/eldenGreaves').then((res) => res.json())
}

export const getDefaultImage = async () => {
    const response = await fetch('http://localhost:8088/defaultSlotImage');
    return response.json();
}