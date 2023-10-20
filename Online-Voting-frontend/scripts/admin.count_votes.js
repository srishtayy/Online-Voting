var input = document.querySelector('#elecID');

document.querySelector('#search_result').addEventListener('click',fetchResults)

async function fetchResults(){
    document.querySelector('#candList').innerHTML='';
    let eID = input.value;
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            election_id: eID
        })
    }

    fetch('http://localhost:5440/election/results',options)
    .then((res)=>{
        res.json()
        .then((data)=>{
            console.log(data)
            let results = data.users;
            // console.log(results);
            var i=1;
            results.forEach(curr => {
                let html = `<td>${i}</td><td>${curr.candidate_id}</td><td>${curr.party}</td><td>${curr.name}</td><td>${curr.votes}</td>`
                document.querySelector('#candList').insertAdjacentHTML('beforeend',html);
            });
            i++;
        })
    })
    .catch(err => console.error(err))

}
