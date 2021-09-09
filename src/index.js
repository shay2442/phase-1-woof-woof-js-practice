let dogsArray = []
const dogBar = document.querySelector("#dog-bar")
const detailDiv = document.querySelector('#dog-info')


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
    }
})

function renderDogDetail(dog) {
    const detailDiv = document.querySelector('#dog-info')
    const status = dog.isGoodDog ? "Good" : "Bad"


    detailDiv.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button>${status}!</button>
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