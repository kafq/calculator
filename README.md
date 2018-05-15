# Calculator Web Service

The project is a simple calculator, built as a web service with an API endpoint and BASE64 encoding. There is also a GUI implemented, which validates user input and handles errors. However, the endpoint itself is also capable of error handling

## Handled use cases

Original | Role | Encoded
--- | --- | ---
2 * (23/(33))- 23 * (23) | Regular case with whitespaces | MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp
2/2.5+2*2.5 | Float numbers | Mi8yLjUrMioyLjU=
Apple | Invalid input | QXBwbGU=
Яблоко | Non-latin characters | 0K/QsdC70L7QutC+
console.log('Hack world') | Code injections | Y29uc29sZS5sb2coJ0hhY2sgd29ybGQnKQ==


