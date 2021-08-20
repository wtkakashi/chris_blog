export function getStorage(key){
  const value = localStorage.get(key);
  if(!value) return null;
  
}