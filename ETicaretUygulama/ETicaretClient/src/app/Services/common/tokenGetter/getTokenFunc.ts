export function getTokenFunck(){
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem("accessToken");
      }
      return null;
}