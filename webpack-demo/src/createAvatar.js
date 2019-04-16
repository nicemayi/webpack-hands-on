import file from './Dota2.jpg';

function createAvatar() { 
    const img = new Image();
    img.src = file;
    img.classList.add('avatar');
    
    const root = document.getElementById('root')
    root.append(img)
}

export default createAvatar;