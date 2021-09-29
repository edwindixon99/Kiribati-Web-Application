import { useState, useEffect } from 'react'


function Register() {
    const [authed, setAuthed] = useState(false)

    return <div>
    hello
        {(authed) && <div>hello</div>}
    </div>
}

export default Register;