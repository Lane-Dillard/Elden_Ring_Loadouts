import { useEffect, useState } from "react"
import { getDefaultImage } from "../../../services/letsGetThisService"

export const SelectedItemImage = ({ item }) => {
    const [defaultImage, setDefaultImage] = useState('');

    useEffect(() => {
        const fetchDefaultImage = async () => {
            const data = await getDefaultImage();
            setDefaultImage(data.image || "https://eldenring.wiki.fextralife.com/file/Elden-Ring/lords-rune-tools-elden-ring-wiki-guide.png"); // Use fetched data or fallback
        };

        fetchDefaultImage();
    }, []);

    const imageUrl = item ? item.image : defaultImage;

    useEffect(() => {
        console.log("SelectedItemImage updated:", item);
    }, [item]);

    return (
        <div style={{ marginRight: '20px' }}>
            <img src={imageUrl} alt={item ? item.name : "Empty Slot"} style={{ width: '200px', height: '200px' }} />
        </div>
    );
};