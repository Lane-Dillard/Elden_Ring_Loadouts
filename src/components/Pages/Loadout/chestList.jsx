import { useEffect, useState } from "react"
import { getAllChests } from "../../../services/letsGetThisService"


export const ChestList = ({ onSelectChest }) => {
    const [allChests, setAllChests] = useState([])
    const [selectedChest, setSelectedChest] = useState('')

    useEffect(() => {
        getAllChests().then((chestArray) => {
            setAllChests(chestArray)
        })
    }, [])

    const handleChange = (event) => {
        const selectedId = event.target.value
        const selectedChest = allChests.find(chest => chest.id == selectedId)
        setSelectedChest(selectedId)
        onSelectChest(selectedChest)
    }

    return (
        <div>
            <select value={selectedChest} onChange={handleChange}>
                <option value="">Select a chest</option>
                {allChests.map((chest, index) => (
                    <option key={index} value={chest.id}>
                        {chest.name}
                    </option>
                ))}
            </select>
        </div>
    )
}