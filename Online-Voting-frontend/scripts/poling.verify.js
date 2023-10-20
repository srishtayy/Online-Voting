document.querySelector('.content').addEventListener('click',locationfinder);

async function locationfinder(event){
    // console.log(event.target.classList[0])
    var Class = event.target.classList[0].split('#');
    console.log(Class)
    if(Class[0]==="search-result") showVoters();
    else if(Class[0]==="verify") verify(Class[2],Class[1],1);
    else if(Class[0]==="discard") verify(Class[2],Class[1],0);

}

async function showVoters(){
    const election_id = document.getElementById('elecID').value;
    console.log(election_id);

    document.querySelector('#voter-list').innerHTML='';
    // let eID = input.value;
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            election_id: election_id
        })
    }

    fetch('http://localhost:5440/poling/listvoters',options)
    .then((res)=>{
        res.json()
        .then((data)=>{
            console.log(data)
            let results = data.voters;
            // console.log(results);
            var i=1;
            results.forEach(curr => {
                let html = `<tr class=row-${curr.user_id}-${curr.election_id}><td>${i}</td><td>${curr.user_id}</td><td>${curr.name}</td><td>${curr.dob}</td>`;
                html+=  `<td>
                            <button class="verify#${curr.user_id}#${curr.election_id} btn btn-pill btn-success" type="button" name="verify" >Verify</button>
                            <button class="discard#${curr.user_id}#${curr.election_id} btn btn-pill btn-danger" type="button" name="discard" >Discard</button>
                        </td></tr>`;
                document.querySelector('#voter-list').insertAdjacentHTML('beforeend',html);
            });
            i++;
        })
    })
    .catch(err => console.error(err))
}

async function verify(election_id,user_id,verify){
    console.log(user_id+election_id+verify)
    let Class = "row-"+user_id+'-'+election_id;
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            election_id: election_id,
            user_id:user_id,
            verify:verify
        })
    }

    fetch('http://localhost:5440/poling/verify',options)
    .then((res)=>{
        console.log(res.status)
        document.querySelector(`.${Class}`).remove();
        
    })
    .catch(err => console.error(err))
}