
# Color Picker

A simple and elegant React Native app for finding inspiration through color.

![ColorPicker home](https://i.imgur.com/8fdNm6F.png)

![ColorPicker swatch](https://i.imgur.com/3vywmpj.png)

![ColorPicker color wheel](https://i.imgur.com/IXx1z4L.png)

![ColorPicker gif](https://media4.giphy.com/media/0jYrq8E5ouFZwFgMOf/giphy.gif?cid=790b76119fe6169ca572bcf6f99187b860ae7797faf55847&rid=giphy.gif&ct=g)





## Run Locally

Clone the project

```bash
  git clone https://github.com/AdamPJohnson/ColorPicker
```

Go to the project directory

```bash
  cd ColorPicker
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

```bash
  npm run server
```

## API Reference

#### Get colors associated with a word

```http
  GET /colors/${searchWord}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchWord` | `string` |  Word to be searched with|

```http
  GET /randomColors/${num}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `num` | `number` |  Returns random colors |

#### Add color and words

```http
  POST /colors/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `colorName`      | `string` | **Required**. Id of item to fetch |
| `color`      | `string` | Hex code for color to add |
| `description`      | `string` | A comma-separated list of associated words |


## Authors

- [@adampjohnson](https://www.github.com/AdamPJohnson)


## License

[MIT](https://choosealicense.com/licenses/mit/)

