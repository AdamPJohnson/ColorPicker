
# Color Picker



A simple and elegant React Native app for finding inspiration through color.
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

