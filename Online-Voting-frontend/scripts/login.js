let users = [];
window.localStorage.setItem('user_id', '');

function checkCred() {

    var cred = {
        user_id: document.getElementById('inputUsername').value,
        password: document.getElementById('inputPass').value,
        admin_level: parseInt(document.querySelectorAll('input[name="role"]:checked')[0].value),
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    }

    fetch('http://localhost:5440/login', options)
        .then(res => {

                    // console.log(data)
                    // data["admin_level"] = cred["admin_level"];
                    if(res.status===200){
                        window.localStorage.setItem('user_id', cred["user_id"]);
                        if(cred["admin_level"] === 0){
                            window.location.replace('./voter/index.html');
                        }
                        else if(cred["admin_level"] === 1){
                            window.location.replace('./agent/verify.html');
                        }
                        else if(cred["admin_level"] === 2){
                            window.location.replace('./admin/index.html');
                        }
                        // window.location.replace('./sysadmin/index.html')
                    } else {
                        window.alert("Please check your credentials.");
                    }

        })
        .catch(err => console.error(err))

    users.push(cred);
    document.forms[0].reset();

    console.log('check for ', { users });
}


