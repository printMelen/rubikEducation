async function useAuth() {
    let isAuth=false;
    let isRefresh=false;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('accessToken=')) {
            isAuth=true;
            // return cookie.substring('accessToken='.length);
        }else if(cookie.startsWith('refreshToken=')){
            isRefresh=true;
            // return cookie.substring('refreshToken='.length);
        }
    }
    if (isAuth) {
        return true;
    }else if(isRefresh){
        const accessCookie= await fetch('http://localhost:5000/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        expires=new Date();
        expires.setTime(expires.getTime() + 5 * 60 * 1000);
        expires = "expires=" + expires.toUTCString();
        document.cookie = "accessToken" + "=" + accessCookie + ";" + expires + ";path=/;secure";
        return true;
    }else{
        return false;
    }
}