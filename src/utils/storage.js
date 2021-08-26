export function getStorage(key){
  const value = localStorage.getItem(key);
  if(!value) return null;
  return typeof value === 'object' ? JSON.parse(value):value
}
export const saveStorage = (key, value) =>{
  const data = typeof value === 'object' ? JSON.stringify(value): value;
  localStorage.setItem(key, data);
}

export const removeStorage = key => {
  localStorage.removeItem(key);
}

export const clearStorage = () =>{
  localStorage.clear();
}