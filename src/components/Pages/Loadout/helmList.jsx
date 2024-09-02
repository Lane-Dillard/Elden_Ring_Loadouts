import { useEffect, useState } from "react"
import { getAllHelms } from "../../../services/letsGetThisService"
import '/root/workspace/Elden_Ring_Loadouts/src/styles/helm.css'

export const HelmList = ({ onSelectHelm }) => {
    const [allHelms, setAllHelms] = useState([]);
    const [selectedHelm, setSelectedHelm] = useState('');

    useEffect(() => {
        getAllHelms().then((helmArray) => {
            setAllHelms(helmArray);
        });
    }, []);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const selectedHelmet = allHelms.find(helm => helm.id == selectedId);
        setSelectedHelm(selectedId);
        onSelectHelm(selectedHelmet); // Pass the full object up to the parent
    }

    return (
        <div className="helm-list-container">
            <div className="helm-select">
                <select value={selectedHelm} onChange={handleChange}>
                    <option value="">Select a helm</option>
                    {allHelms.map((helmet) => (
                        <option key={helmet.id} value={helmet.id}>
                            {helmet.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};