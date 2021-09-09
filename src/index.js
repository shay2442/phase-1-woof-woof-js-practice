let dogsArray = []
let filtering = false

const dogBar = document.querySelector("#dog-bar")
const detailDiv = document.querySelector('#dog-info')
const filterButton = document.querySelector("#good-dog-filter")

filterButton.addEventListener('click', () => {
filtering = !filtering
filterButton.textContext =`Filter good dogs: ${filtering ? 'ON' : 'OFF'}`

if (filtering)  {
    const goodDogsOnly = dogsArray.filter(dog => dog.isGoodDog)
    dogBar.innerHTML = ''
    renderAllDogs(goodDogsOnly)

} else {
    dogBar.innerHTML = ""
    renderAllDogs(dogsArray)
}

})


dogBar.addEventListener('click', e => {
if (e.target.tagName ==='SPAN') {
    const dogId = parseInt(e.target.dataset.id)
    const foundDog = dogsArray.find(dog => dog.id === dogId)
    renderDogDetail(foundDog)

}
})

detailDiv.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const dogId = parseInt(e.target.dataset.id)
        const foundDog = dogsArray.find(dog => dog.id === dogId)
        foundDog.isGoodDog = !foundDog.isGoodDog
        renderDogDetail(foundDog)


fetch(`http://localhost:3000/pups${dogId}`), {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify( {isGoodDog: foundDog.isGoodDog })
}







    }
})

function renderDogDetail(dog) {
    const detailDiv = document.querySelector('#dog-info')
    const status = dog.isGoodDog ? "Good" : "Bad"


    detailDiv.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-id=${dog.id}>${status}!</button>
    `
}


function renderAllDogs(dogs) {
    dogs.forEach(renderDogSpan)
}

function renderDogSpan(dog) {
    const dogSpan = document.createElement('span')
    dogSpan.textContent = dog.name
    dogSpan.dataset.id = dog.id

     dogBar.append(dogSpan)
}

fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(actualDogs => {
        dogsArray = actualDogs
        renderAllDogs(dogsArray)
    })
    console.log(dogsArray)