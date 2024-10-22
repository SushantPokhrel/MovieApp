export default function Form() {
  return (
    <div className="login">
      <h1>Customer Sign In</h1>
      <form className="form-login">
        <div className="input-div">
          <label htmlFor="email" className="label-text">
            Email:
          </label>
          <input type="email" id="email" required name="email" />
        </div>
        <div className="input-div input-pass">
          <label htmlFor="password" className="label-text">
            Password:
          </label>
          <input type="password" required name="password" minLength={8}></input>
        </div>
        <div>
          <a
            style={{
              color: "red",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
