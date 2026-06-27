import { baseUrlHandle } from "./baseUrlHandler";


export function imageUrl(imageName) {
 
  return `${baseUrlHandle().replace("/api/v1", "")}/uploads/${imageName}`;
}
