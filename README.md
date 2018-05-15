# Calculator Web Service

The project is a simple calculator, built as a web service with an API endpoint and BASE64 encoding. Use tools are React in terms of real-world implementability and Express JS. There is also a GUI implemented, which validates user input and handles errors. However, the endpoint itself is also capable of error handling. 

## Handled use cases

Original | Role | Encoded
--- | --- | ---
2 * (23/(33))- 23 * (23) | Regular case with whitespaces | [MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp](https://guarded-wildwood-31902.herokuapp.com/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp)
5-----3 | standard eval() dies here | [NS0tLS0tMw==](https://guarded-wildwood-31902.herokuapp.com/calculus?query=NS0tLS0tMw==)
2 + 4*3/0/1 | standard eval() does nothing here, needs to be at least null | [MiArIDQqMy8wLzE=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=MiArIDQqMy8wLzE=)
2/2.5+2*2.5 | Float numbers | [Mi8yLjUrMioyLjU=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=Mi8yLjUrMioyLjU=)
Apple | Invalid input | [QXBwbGU=](https://guarded-wildwood-31902.herokuapp.com/calculus?query=QXBwbGU=)
Яблоко | Non-latin characters | [0K/QsdC70L7QutC+](https://guarded-wildwood-31902.herokuapp.com/calculus?query=0K/QsdC70L7QutC+)
console.log('Hack world') | Code injections | [Y29uc29sZS5sb2coJ0hhY2sgd29ybGQnKQ==](https://guarded-wildwood-31902.herokuapp.com/calculus?query=Y29uc29sZS5sb2coJ0hhY2sgd29ybGQnKQ==)


