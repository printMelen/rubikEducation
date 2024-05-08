async function useAuth() {
    console.log("entro");
    let isAuth=false;
    let isRefresh=false;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        console.log("Aquí si");
        if (cookie.startsWith('accessToken=')) {
            isAuth=true;
            // return cookie.substring('accessToken='.length);
        }
        // else if(cookie.startsWith('jwt=')){
        //     console.log("Aquí tambien");
        //     isRefresh=true;
        //     // return cookie.substring('refreshToken='.length);
        // }
    }
    if (isAuth) {
        return true;
    // }else if(isRefresh){
    }else{
        const accessCookie= await fetch('http://localhost:5000/auth/refresh', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (accessCookie.status === 200) {
            expires=new Date();
            expires.setTime(expires.getTime() + 5 * 60 * 1000);
            expires = "expires=" + expires.toUTCString();
            document.cookie = "accessToken" + "=" + accessCookie + ";" + expires + ";path=/;secure";
            return true;
        }else{
            return false;
        }
    }
}
export default useAuth;