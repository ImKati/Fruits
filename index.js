let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Big_red_apple.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'http://www.menslife.com/upload/iblock/d23/mango.jpg'}
]

const toHTML = fruits => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px;width: 400px;" src="${fruits.img}"  alt="${fruits.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruits.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruits.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-primary" data-btn="remove" data-id="${fruits.id}">Удалить</a>
                </div>
        </div>
    </div>
    `

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}


render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id

    if (btnType === 'price') {
        const fruit = fruits.find(f => f.id === id)


    priceModal.setContent(`
    <p>Цeна на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
    } else if (btnType === 'remove') {
        const fruit = fruits.find(f => f.id === id)
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт:  <strong>${fruit.title}</strong></p>`
        }).then( () => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch( () => {
        console.log('Cancel')
    })
    }
})
