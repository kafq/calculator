# Calculator Web Service

The project is a simple calculator, built as a web service with an API endpoint and BASE64 encoding. Used tools are React in terms of real-world applicability and frontend and Express JS backend used as a proxy. There is also a GUI implemented, which validates user input and handles errors. The endpoint itself is also capable of error handling, too.

Currently available at: https://guarded-wildwood-31902.herokuapp.com
The endpoint is located at: https://guarded-wildwood-31902.herokuapp.com/calculus


## Handled use cases

While the original approach was to use `eval()` strengthened by string cleanup, it appeared to be too slow and could not handle expressions with several minus signs, e.g. `5 - - - 3` or a basic `4/0`. As the result, I have switched to Math JS. Third column contains links to the endpoint.

Original | Role | Encoded
--- | --- | ---
2 * (23/(33))- 23 * (23) | Regular case with whitespaces | [MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp](https://guarded-wildwood-31902.herokuapp.com/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp)
5-----3 | standard eval() dies here | [NS0tLS0tMw==](https://guarded-wildwood-31902.herokuapp.com/calculus?query=NS0tLS0tMw==)
2 + 4*3/0/1 | standard eval() does nothing here, needs to be at least null | [MiArIDQqMy8wLzE=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=MiArIDQqMy8wLzE=)
2/2.5+2*2.5 | Float numbers | [Mi8yLjUrMioyLjU=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=Mi8yLjUrMioyLjU=)
Apple | Invalid input | [QXBwbGU=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=QXBwbGU=)
Яблоко | Non-latin characters | [0K/QsdC70L7QutC+](https://guarded-wildwood-31902.herokuapp.com/calculus?query=0K/QsdC70L7QutC+)
console.log('Hack world') | Code injections | [Y29uc29sZS5sb2coJ0hhY2sgd29ybGQnKQ==](https://guarded-wildwood-31902.herokuapp.com/calculus?query=Y29uc29sZS5sb2coJ0hhY2sgd29ybGQnKQ==)


## Installation

As a Heroku App with Express JS used as proxy it is available at https://guarded-wildwood-31902.herokuapp.com. However, it can be lauched locally by cloning the repo and running

```javascript
yarn && yarn dev
```

The script uses `concurrently` to run both client and server scripts. Client side will be available at `localhost:3000` and API endpoint is at `localhost:5000`

## Challanges

1. Making Heroku work correctly with Express backend as a proxy
2. Finding an alternative to `eval()`