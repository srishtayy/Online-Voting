document.getElementById('listElection').addEventListener('click',listElection);

document.querySelector('.content').addEventListener('click',locationfinder);

async function locationfinder(event){
    // console.log(event.target.classList[0])
    var Class = event.target.classList[0].split('#');
    console.log(Class)
    if(Class[0]==="activate") permission(Class[1],1);
    else if(Class[0]==="deactivate") permission(Class[1],0);

}

function addElection() {

    // For connecting Backend
    /********************************/

    var user = {
        election_id: document.getElementById('aeID').value,
        title: document.getElementById('aeTitle').value,
        address: document.getElementById('address').value,
    }
    console.log(user)
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    fetch('http://localhost:5440/election/create', options)
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
async function listElection(){


    document.querySelector('#listElec').innerHTML='';
    // let eID = input.value;
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('http://localhost:5440/election/list',options)
    .then((res)=>{
        res.json()
        .then((data)=>{
            console.log(data)
            let results = data.elections;
            // console.log(results);
            var i=1;
            results.forEach(curr => {
                console.log(curr)
                let html = `<tr><td>${i}</td><td>${curr.election_id}</td><td>${curr.title}</td><td>${curr.address}</td><td class=${curr.election_id}>${getStatus(curr.active)}</td>`;
                html+=  `<td>
                            <button class="activate#${curr.election_id} btn btn-pill btn-success" type="button" >Activate</button>
                            <button class="deactivate#${curr.election_id} btn btn-pill btn-danger" type="button" >Deactivate</button>
                        </td></tr>`;
                document.querySelector('#listElec').insertAdjacentHTML('beforeend',html);
                i++;

            });
        })
    })
    .catch(err => console.error(err))

}

async function permission(election_id,active){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            election_id: election_id,
            active:active
        })
    }

    fetch('http://localhost:5440/election/permission',options)
    .then((res)=>{
        console.log(res.status)
        document.querySelector(`.${election_id}`).innerHTML=`${getStatus(active)}`;
        
    })
    .catch(err => console.error(err))
}

function getStatus(active){
    if(active) return "Activated";
    else return "Deactivated";
}