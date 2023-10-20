function addCandidate() {

    // For connecting Backend
    /********************************/

    var user = {
        candidate_id: document.getElementById('aCanID').value,
        election_id: document.getElementById('eID').value,
        name: document.getElementById('fullName').value,
        gender: document.getElementById('gender').value,
        party: document.getElementById('pName').value,
        party_logo : document.getElementById('pLogo').value,
    }
    console.log(user)
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    fetch('http://localhost:5440/candidate/create', options)
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(`${err}`))
        })
        .catch(err => console.error(err))

    /********************************/

}
function removeCandidate(){

    // For connecting Backend
    /********************************/

    var user = {
        candidate_id: document.getElementById('rCanID').value,
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    
    fetch('http://localhost:5440/candidate/remove', options)
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


}
