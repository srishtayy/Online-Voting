let users = [];


function addVoter() {

    // For connecting Backend
    /********************************/

    var user = {
        user_id: document.getElementById('aUserID').value,
        password: document.getElementById('password').value,
        admin_level: parseInt(document.querySelectorAll('input[name="role"]:checked')[0].value),
    }
    console.log(user);
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    fetch('http://localhost:5440/user/create', options)
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(`${err}`))
        })
        .catch(err => console.error(err))

    /********************************/

    users.push(user);
    document.forms[0].reset();

}
function debarVoter(){

    // For connecting Backend
    /********************************/

    var user = {
        user_id: document.getElementById('dUserID').value,
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    
    fetch('http://localhost:5440/user/remove', options)
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(`${err}`))
        })
        .catch(err => console.error(err))

    /********************************/

    document.forms[0].reset();

    // console.log('Debared', { user });

}
