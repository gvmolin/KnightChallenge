import axios from 'axios';

export function mountDefaultPath(){    
    return sanitazeUrl(`${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_BASE_PORT}/`);
}

export function sanitazeUrl(url:string){
    const splitted = url.split("://");

    const removeDoubleSlash = splitted[1].replaceAll("//", "/");
    return splitted[0] + "://" + removeDoubleSlash;

}

export const axiosInstance = axios.create({
  baseURL: mountDefaultPath(), // Replace with your API base URL
  timeout: 5000, // Set timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // You can add custom headers here
  },
});