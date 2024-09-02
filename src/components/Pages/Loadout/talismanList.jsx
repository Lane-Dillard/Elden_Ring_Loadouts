import { useEffect, useState } from "react"
import { getAllTalisman } from "../../../services/loadoutService"
import '/root/workspace/Elden_Ring_Loadouts/src/styles/talisman.css'

export const TalismanList = ({ onSelectTalisman }) => {
    const [allTalisman, setAllTalisman] = useState([])
    const [selectedTalisman, setSelectedTalisman] = useState('')

    useEffect(() => {
        getAllTalisman().then((talismanArray) => {
            setAllTalisman(talismanArray)
        })
    }, [])

    const handleChange = (event) => {
        const selectedId = event.target.value
        setSelectedTalisman(selectedId)
        onSelectTalisman(allTalisman.find(talisman => talisman.id == selectedId))
    }

    return (
        <div className="talisman-list-container">
            <div className="talisman-select">
                <select value={selectedTalisman} onChange={handleChange}>
                    <option value="">Select a Talisman</option>
                    {allTalisman.map((talisman) => (
                        <option key={talisman.id} value={talisman.id}>
                            {talisman.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>

            </div>
        </div>
    )
}