import { useEffect, useState } from "react"
import { getAllGauntlets } from "../../../services/letsGetThisService"
import '/root/workspace/Elden_Ring_Loadouts/src/styles/gauntlet.css'

export const GauntletsList = ({ onSelectGauntlet }) => {
    const [AllGauntlets, setAllGauntlets] = useState([])
    const [selectedGauntlets, setSelectedGauntlets] = useState('')

    useEffect(() => {
        getAllGauntlets().then((gauntletsArray) => {
            setAllGauntlets(gauntletsArray)
        })
    }, [])

    const handleChange = (event) => {
        const selectedId = event.target.value
        const selectedGauntlet = AllGauntlets.find(gauntlet => gauntlet.id == selectedId)
        setSelectedGauntlets(selectedId)
        onSelectGauntlet(selectedGauntlet)
    }

    return(
        <div className="gauntlet-list-container">
            <div className="gauntlet-select">
                <select value={selectedGauntlets} onChange={handleChange}>
                    <option value="">Select a gauntlet</option>
                    {AllGauntlets.map((gauntlet, index) => (
                        <option key={index} value={gauntlet.id}>
                            {gauntlet.name}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}