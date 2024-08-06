import Mock from "mockjs"

export default Mock.mock({
    'items|10': [{
        'name': '@word',
        'ingredients': '@sentence(3, 5)',
        'price|10-100.1-2': 1,
        'photoName': 'https://picsum.photos/300/200',
        'soldOut': '@boolean'
    }]
});