
import Avatar from '@mui/material/Avatar';
import { observer } from "mobx-react-lite";

const AvatarImage = observer((src,
    // onClick
) => {
    console.log('src: ', src);
    return (
        <Avatar 
            src={src} 
            alt="Avatar" 
            // onClick={onClick}
        />
        )
})

export default AvatarImage;
