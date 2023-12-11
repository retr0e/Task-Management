import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  return (
    <form action='/signin' method='POST' class='card form-control w-25 p-3'>
      <h2 class='h1 text-center'>Logowanie</h2>
      <div class='form-floating mb-3'>
        <input
          type='login'
          class='form-control'
          id='floatingInput'
          placeholder='Login'
        />
        <label for='floatingInput'>Login</label>
      </div>
      <br />
      <div class='form-floating'>
        <input
          type='password'
          class='form-control'
          id='floatingPassword'
          placeholder='Password'
        />
        <label for='floatingPassword'>Password</label>
      </div>
      <br />
      <input type='submit' class='btn' value='Zaloguj' />
      <br />
    </form>
  );
}
export default LoginForm;
