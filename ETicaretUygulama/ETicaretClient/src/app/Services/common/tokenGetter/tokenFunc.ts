export function getTokenFunck(){
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem("accessToken");
      }
      return null;
}

export function getRefleshTokenFunck(){
  if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("refleshToken");
    }
    return null;
}

export function localStorageClear(){
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refleshToken");
  }
  
}
