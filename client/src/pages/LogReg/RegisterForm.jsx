function RegisterForm(){
    return(
        <>
            <form action="/signup" method="POST" class="card form-control w-25 p-3">
            <h2 class="h1 text-center">Rejestracja</h2>
                <div class="form-floating mb-3">
                    <input type="login" class="form-control" id="floatingInput" placeholder="Login"/>
                    <label for="floatingInput">Login</label>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                <br/>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Confirm Password"/>
                    <label for="floatingPassword">Confirm Password</label>
                </div>
                <br/>

                <input type="submit" class = "btn" value="Register"/>
                <br/>
            </form>
        </>
    );
};

export default RegisterForm;