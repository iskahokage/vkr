import { jwtDecode } from 'jwt-decode';
import a from '../assets/noAvatar.png'
export const  base64ToFile = (base64String: string, filename: string): File => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function formatDateToMMDDYYYY(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

export const roleOptions = [{key: 'user', label: 'Пользователь'}, {key: 'admin', label: 'Администратор'}]

export const NO_AVATAR = a;

export function idFromJwt(token: string){
   const a  =  jwtDecode(token)
   console.log(a)
}