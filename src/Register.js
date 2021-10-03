import { useState, useEffect } from 'react'


function Register() {
    const [authed, setAuthed] = useState(true)
    const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

    return <div className="container">
        
        {(authed) && <form>
            <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
    </div>
    </div>
    <div class="form-group row">
    <label for="username" class="col-sm-2 col-form-label">Username</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="Enter Username" onChange={e=> setUsername(e.target.value)}/>
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>}
    </div>
}

export default Register;