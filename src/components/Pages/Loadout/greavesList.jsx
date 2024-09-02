import { useEffect, useState } from "react"
import { getAllGreaves } from "../../../services/letsGetThisService"
import '/root/workspace/Elden_Ring_Loadouts/src/styles/greaves.css'

export const GreavesList = ({ onSelectGreave }) => {
    const [allGreaves, setAllGreaves] = useState([])
    const [selectedGreaves, setSelectedGreaves] = useState('')

    useEffect(() => {
        getAllGreaves().then((greavesArray) => {
            setAllGreaves(greavesArray)
        })
    }, [])

    const handleChange = (event) => {
        const selectedId = event.target.value
        const selectedGreave = allGreaves.find(greave => greave.id == selectedId)
        setSelectedGreaves(selectedId)
        onSelectGreave(selectedGreave)
    }

    return(
        <div className="greaves-list-container">
            <div className="greaves-select">
                <select value={selectedGreaves} onChange={handleChange}>
                    <option value="">Select a greave</option>
                    {allGreaves.map((greave, index) => (
                        <option key={index} value={greave.id}>
                            {greave.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}